import { createClient } from "@supabase/supabase-js";

// Check if Supabase credentials are configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseServiceKey &&
    !supabaseUrl.includes("your-project") &&
    !supabaseUrl.includes("placeholder")
  );
};

// Server-side client with service role for full admin access
export const supabaseAdmin = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

// In-memory store fallback for submissions
let memoryApplicants = [];

/**
 * Validates if the base64 content is a genuine PDF by checking magic bytes (%PDF-)
 */
export function validatePdfMagicBytes(base64Content) {
  if (!base64Content || typeof base64Content !== "string") return false;
  try {
    // A standard PDF begins with "%PDF-" which in base64 starts with "JVBERi0"
    const trimmed = base64Content.trim();
    if (trimmed.startsWith("JVBERi0")) {
      return true;
    }
    // Also decode the first 16 bytes to check "%PDF-"
    const bufferHeader = Buffer.from(trimmed.slice(0, 32), "base64").toString("latin1");
    return bufferHeader.startsWith("%PDF-");
  } catch {
    return false;
  }
}

/**
 * Sanitizes candidate filename to eliminate path traversal and malicious characters
 */
export function sanitizeFilename(filename) {
  const base = (filename || "resume.pdf").replace(/[^a-zA-Z0-9._-]/g, "_");
  const clean = base.replace(/(\.\.+|\/+)/g, "_");
  return `${Date.now()}_${clean}`;
}

/**
 * Saves internship application to Supabase (or memory fallback)
 */
export async function saveInternshipApplication({
  name,
  email,
  phone = "Not provided",
  role,
  portfolio = "",
  message = "",
  resume = null,
  ip = "127.0.0.1",
  userAgent = "",
}) {
  let resumeFilename = null;
  let resumeStoragePath = null;
  let resumeSize = null;
  let resumeScanStatus = "clean";

  // Process resume if provided
  if (resume?.content && resume?.filename) {
    const isMagicValid = validatePdfMagicBytes(resume.content);
    if (!isMagicValid) {
      console.warn("Security Warning: Uploaded file does not have valid PDF magic bytes. Marking suspicious.");
      resumeScanStatus = "suspicious";
    }

    resumeFilename = resume.filename;
    const sanitizedName = sanitizeFilename(resume.filename);
    resumeStoragePath = `resumes/${sanitizedName}`;

    // Calculate approximate size
    const byteLength = Buffer.byteLength(resume.content, "base64");
    resumeSize = (byteLength / (1024 * 1024)).toFixed(2) + " MB";

    // If Supabase is connected, upload to private bucket
    if (isSupabaseConfigured() && supabaseAdmin) {
      try {
        const fileBuffer = Buffer.from(resume.content, "base64");
        const { error: uploadError } = await supabaseAdmin.storage
          .from("resumes")
          .upload(sanitizedName, fileBuffer, {
            contentType: "application/pdf",
            upsert: false,
          });

        if (uploadError) {
          console.error("Supabase Storage Upload Error:", uploadError);
        } else {
          resumeStoragePath = sanitizedName;
        }
      } catch (err) {
        console.error("Failed to upload resume to Supabase Storage:", err);
      }
    }
  }

  const newRecord = {
    id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim() || "Not provided",
    role: role || "Video Editor Intern",
    portfolio_url: portfolio.trim() || null,
    message: message.trim() || null,
    resume_filename: resumeFilename,
    resume_storage_path: resumeStoragePath,
    resume_size: resumeSize,
    resume_scan_status: resumeScanStatus,
    status: "new",
    notes: "",
    ip_address: ip,
    user_agent: userAgent,
  };

  // If Supabase is configured, write to PostgreSQL table
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("internship_applications")
        .insert([
          {
            name: newRecord.name,
            email: newRecord.email,
            phone: newRecord.phone,
            role: newRecord.role,
            portfolio_url: newRecord.portfolio_url,
            message: newRecord.message,
            resume_filename: newRecord.resume_filename,
            resume_storage_path: newRecord.resume_storage_path,
            resume_size: newRecord.resume_size,
            resume_scan_status: newRecord.resume_scan_status,
            status: newRecord.status,
            ip_address: newRecord.ip_address,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Supabase DB Insert Error:", error);
        // Fallback to memory
        memoryApplicants.unshift(newRecord);
        return { success: true, application: newRecord, fallback: true };
      }

      return { success: true, application: data };
    } catch (dbErr) {
      console.error("Supabase Database connection exception:", dbErr);
      memoryApplicants.unshift(newRecord);
      return { success: true, application: newRecord, fallback: true };
    }
  }

  // Memory store fallback
  memoryApplicants.unshift(newRecord);
  return { success: true, application: newRecord, isDemo: true };
}

/**
 * Fetches applications with filtering, search, and statistical metrics
 */
export async function getInternshipApplications({
  role = "all",
  status = "all",
  search = "",
} = {}) {
  let items = [];
  const isDemo = !isSupabaseConfigured();

  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      let query = supabaseAdmin
        .from("internship_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (role && role !== "all") {
        query = query.ilike("role", `%${role}%`);
      }

      if (status && status !== "all") {
        query = query.eq("status", status);
      }

      if (search && search.trim()) {
        const s = search.trim();
        query = query.or(`name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%`);
      }

      const { data, error } = await query;
      if (!error && data) {
        items = data;
      } else {
        console.warn("Supabase query error, falling back to memory:", error);
        items = memoryApplicants;
      }
    } catch (err) {
      console.error("Supabase fetch exception:", err);
      items = memoryApplicants;
    }
  } else {
    items = memoryApplicants;

    // Filter in-memory
    if (role && role !== "all") {
      items = items.filter((app) =>
        app.role.toLowerCase().includes(role.toLowerCase())
      );
    }

    if (status && status !== "all") {
      items = items.filter((app) => app.status === status);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (app) =>
          app.name.toLowerCase().includes(q) ||
          app.email.toLowerCase().includes(q) ||
          (app.phone && app.phone.toLowerCase().includes(q))
      );
    }
  }

  // Compute metrics across all memory/database records
  const allPool = isSupabaseConfigured() ? items : memoryApplicants;
  const metrics = {
    total: allPool.length,
    videoEditorCount: allPool.filter((a) =>
      a.role?.toLowerCase().includes("video")
    ).length,
    fullstackDevCount: allPool.filter((a) =>
      a.role?.toLowerCase().includes("developer") || a.role?.toLowerCase().includes("full-stack")
    ).length,
    newCount: allPool.filter((a) => a.status === "new").length,
    shortlistedCount: allPool.filter((a) => a.status === "shortlisted").length,
    inReviewCount: allPool.filter((a) => a.status === "in_review").length,
    rejectedCount: allPool.filter((a) => a.status === "rejected").length,
  };

  return {
    success: true,
    applications: items,
    metrics,
    isDemo,
  };
}

/**
 * Updates application status or notes
 */
export async function updateApplicationStatus(id, newStatus, notes = null) {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const updateData = { status: newStatus };
      if (notes !== null) updateData.notes = notes;

      const { data, error } = await supabaseAdmin
        .from("internship_applications")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return { success: true, application: data };
      }
    } catch (err) {
      console.error("Failed to update status in Supabase:", err);
    }
  }

  // Fallback to memory
  const idx = memoryApplicants.findIndex((a) => a.id === id);
  if (idx !== -1) {
    memoryApplicants[idx] = {
      ...memoryApplicants[idx],
      status: newStatus,
      notes: notes !== null ? notes : memoryApplicants[idx].notes,
    };
    return { success: true, application: memoryApplicants[idx] };
  }

  return { success: false, message: "Application not found" };
}

/**
 * Generates a safe, temporary (15 min) signed URL for the resume file in Supabase Storage
 */
export async function getResumeSignedUrl(storagePath) {
  if (!storagePath) return null;

  // In demo mode or if path starts with demo/
  if (!isSupabaseConfigured() || storagePath.startsWith("demo/")) {
    return {
      url: `/sample-resume-preview.pdf`,
      isDemo: true,
      expiresAt: Date.now() + 15 * 60 * 1000,
    };
  }

  try {
    const { data, error } = await supabaseAdmin.storage
      .from("resumes")
      .createSignedUrl(storagePath, 900); // 15 minutes (900 seconds)

    if (error || !data?.signedUrl) {
      console.error("Error creating signed URL:", error);
      return null;
    }

    return {
      url: data.signedUrl,
      isDemo: false,
      expiresAt: Date.now() + 900 * 1000,
    };
  } catch (err) {
    console.error("Signed URL generation exception:", err);
    return null;
  }
}
