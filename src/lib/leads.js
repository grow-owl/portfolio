import fs from "fs";
import path from "path";
import { isSupabaseConfigured, supabaseAdmin } from "./supabase.js";

const LEADS_FILE_PATH = path.join(process.cwd(), "src", "data", "cms", "leads.json");

// Read leads from local JSON file
export function readLocalLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(LEADS_FILE_PATH, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading leads.json:", err);
    return [];
  }
}

// Write leads to local JSON file
export function writeLocalLeads(leads) {
  try {
    const dir = path.dirname(LEADS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(leads, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing leads.json:", err);
    return false;
  }
}

/**
 * Saves a new client lead into local storage & Supabase (if available)
 */
export async function saveClientLead({
  name,
  email,
  phone = "Not provided",
  service = "Website Development",
  message = "",
  ip = "127.0.0.1",
  userAgent = "",
}) {
  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim() || "Not provided",
    service: service.trim() || "General Enquiry",
    message: message.trim(),
    status: "new", // "new" | "contacted" | "converted" | "archived"
    notes: "",
    ip_address: ip,
    user_agent: userAgent,
  };

  // 1. Always save to local JSON storage
  try {
    const currentLeads = readLocalLeads();
    currentLeads.unshift(newLead);
    writeLocalLeads(currentLeads);
  } catch (err) {
    console.error("Failed saving lead locally:", err);
  }

  // 2. Also save to Supabase client_leads table if configured
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from("client_leads")
        .insert([
          {
            id: newLead.id,
            name: newLead.name,
            email: newLead.email,
            phone: newLead.phone,
            service: newLead.service,
            message: newLead.message,
            status: newLead.status,
            notes: newLead.notes,
            ip_address: newLead.ip_address,
            user_agent: newLead.user_agent,
            created_at: newLead.created_at,
          },
        ]);

      if (error) {
        console.warn("Supabase client_leads insert notice (using local JSON fallback):", error.message);
      }
    } catch (dbErr) {
      console.warn("Supabase client_leads exception (using local JSON fallback):", dbErr.message);
    }
  }

  return { success: true, lead: newLead };
}

/**
 * Retrieves leads with search, filter, and metric counts
 */
export async function getClientLeads({
  service = "all",
  status = "all",
  search = "",
} = {}) {
  let leads = [];

  // Try Supabase first if active
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      let query = supabaseAdmin
        .from("client_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (service && service !== "all") {
        query = query.ilike("service", `%${service}%`);
      }
      if (status && status !== "all") {
        query = query.eq("status", status);
      }
      if (search && search.trim()) {
        const s = search.trim();
        query = query.or(`name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%,message.ilike.%${s}%`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        leads = data;
      } else {
        // Fallback to local leads
        leads = readLocalLeads();
      }
    } catch {
      leads = readLocalLeads();
    }
  } else {
    leads = readLocalLeads();
  }

  // If local leads are used, apply filter & search in-memory
  const allLeads = readLocalLeads();
  let filtered = [...allLeads];

  if (service && service !== "all") {
    filtered = filtered.filter((l) =>
      l.service?.toLowerCase().includes(service.toLowerCase())
    );
  }
  if (status && status !== "all") {
    filtered = filtered.filter((l) => l.status === status);
  }
  if (search && search.trim()) {
    const s = search.toLowerCase().trim();
    filtered = filtered.filter(
      (l) =>
        l.name?.toLowerCase().includes(s) ||
        l.email?.toLowerCase().includes(s) ||
        l.phone?.toLowerCase().includes(s) ||
        l.message?.toLowerCase().includes(s) ||
        l.service?.toLowerCase().includes(s)
    );
  }

  // Calculate stats over all leads
  const stats = {
    total: allLeads.length,
    new: allLeads.filter((l) => l.status === "new").length,
    contacted: allLeads.filter((l) => l.status === "contacted").length,
    converted: allLeads.filter((l) => l.status === "converted").length,
    archived: allLeads.filter((l) => l.status === "archived").length,
  };

  return {
    leads: filtered,
    stats,
  };
}

/**
 * Updates a lead's status or notes
 */
export async function updateClientLead(id, updates = {}) {
  const allLeads = readLocalLeads();
  const idx = allLeads.findIndex((l) => l.id === id);

  if (idx !== -1) {
    allLeads[idx] = {
      ...allLeads[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    writeLocalLeads(allLeads);
  }

  // Also update in Supabase if available
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      await supabaseAdmin.from("client_leads").update(updates).eq("id", id);
    } catch (err) {
      console.warn("Supabase update error:", err);
    }
  }

  return { success: true, lead: idx !== -1 ? allLeads[idx] : null };
}

/**
 * Deletes a lead
 */
export async function deleteClientLead(id) {
  const allLeads = readLocalLeads();
  const filtered = allLeads.filter((l) => l.id !== id);
  writeLocalLeads(filtered);

  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      await supabaseAdmin.from("client_leads").delete().eq("id", id);
    } catch (err) {
      console.warn("Supabase delete error:", err);
    }
  }

  return { success: true };
}
