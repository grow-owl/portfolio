"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Inbox,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Download,
  Filter,
  User,
  MessageCircle,
} from "lucide-react";

const SERVICE_COLORS = {
  "website development": "bg-blue-50 text-blue-700 border-blue-200",
  "web development": "bg-blue-50 text-blue-700 border-blue-200",
  "web design": "bg-sky-50 text-sky-700 border-sky-200",
  "social media marketing": "bg-purple-50 text-purple-700 border-purple-200",
  "social media": "bg-purple-50 text-purple-700 border-purple-200",
  "seo services": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "digital marketing": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "profile listings": "bg-amber-50 text-amber-700 border-amber-200",
  "google business": "bg-amber-50 text-amber-700 border-amber-200",
};

function getServiceBadgeColor(service = "") {
  const s = service.toLowerCase().trim();
  for (const [key, val] of Object.entries(SERVICE_COLORS)) {
    if (s.includes(key)) return val;
  }
  return "bg-slate-50 text-slate-700 border-slate-200";
}

const STATUS_BADGES = {
  new: { label: "New Lead", bg: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
  contacted: { label: "Contacted", bg: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  converted: { label: "Converted", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  archived: { label: "Archived", bg: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

export default function AdminLeadsManager({ passcode, showToast }) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, converted: 0, archived: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal
  const [selectedLead, setSelectedLead] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [leadNotes, setLeadNotes] = useState("");

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const queryParams = new URLSearchParams();
      if (selectedService && selectedService !== "all") queryParams.set("service", selectedService);
      if (selectedStatus && selectedStatus !== "all") queryParams.set("status", selectedStatus);
      if (searchQuery && searchQuery.trim()) queryParams.set("search", searchQuery.trim());

      let activePasscode = (passcode || "").trim();
      if (!activePasscode && typeof window !== "undefined") {
        try {
          activePasscode = (
            sessionStorage.getItem("growowl_admin_passcode") ||
            localStorage.getItem("growowl_admin_passcode") ||
            "growowl2026"
          ).trim();
        } catch {
          activePasscode = "growowl2026";
        }
      }

      const res = await fetch(`/api/admin/leads?${queryParams.toString()}`, {
        headers: {
          "x-admin-passcode": activePasscode,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setLeads(data.leads || []);
        if (data.stats) setStats(data.stats);
      } else {
        setErrorMessage(data.message || "Failed to load leads from system.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("Network error connecting to Leads API.");
    } finally {
      setIsLoading(false);
    }
  }, [passcode, selectedService, selectedStatus, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (id, newStatus) => {
    setIsUpdating(true);
    try {
      let activePasscode = (passcode || "").trim();
      if (!activePasscode && typeof window !== "undefined") {
        activePasscode = (
          sessionStorage.getItem("growowl_admin_passcode") ||
          localStorage.getItem("growowl_admin_passcode") ||
          "growowl2026"
        ).trim();
      }

      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": activePasscode,
        },
        body: JSON.stringify({
          action: "update_status",
          id,
          status: newStatus,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast?.(`Lead status changed to ${newStatus}`, "success");
        fetchLeads();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
      } else {
        showToast?.(data.message || "Failed to update status", "error");
      }
    } catch {
      showToast?.("Error updating lead status", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async (id) => {
    setIsUpdating(true);
    try {
      let activePasscode = (passcode || "").trim();
      if (!activePasscode && typeof window !== "undefined") {
        activePasscode = (
          sessionStorage.getItem("growowl_admin_passcode") ||
          localStorage.getItem("growowl_admin_passcode") ||
          "growowl2026"
        ).trim();
      }

      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": activePasscode,
        },
        body: JSON.stringify({
          action: "update_notes",
          id,
          notes: leadNotes,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast?.("Notes saved successfully", "success");
        fetchLeads();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => ({ ...prev, notes: leadNotes }));
        }
      } else {
        showToast?.(data.message || "Failed to save notes", "error");
      }
    } catch {
      showToast?.("Error saving notes", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;

    try {
      let activePasscode = (passcode || "").trim();
      if (!activePasscode && typeof window !== "undefined") {
        activePasscode = (
          sessionStorage.getItem("growowl_admin_passcode") ||
          localStorage.getItem("growowl_admin_passcode") ||
          "growowl2026"
        ).trim();
      }

      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": activePasscode,
        },
        body: JSON.stringify({
          action: "delete",
          id,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast?.("Lead deleted successfully", "success");
        if (selectedLead?.id === id) setSelectedLead(null);
        fetchLeads();
      } else {
        showToast?.(data.message || "Failed to delete lead", "error");
      }
    } catch {
      showToast?.("Error deleting lead", "error");
    }
  };

  const exportCSV = () => {
    if (!leads.length) {
      showToast?.("No leads to export", "info");
      return;
    }
    const headers = ["ID", "Date", "Name", "Email", "Phone", "Service", "Message", "Status", "Notes"];
    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${new Date(l.created_at).toLocaleString()}"`,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.service || "").replace(/"/g, '""')}"`,
      `"${(l.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${l.status || "new"}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `growowl_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.("Leads CSV exported successfully!", "success");
  };

  const cleanPhoneForWhatsApp = (phone = "") => {
    const digits = phone.replace(/[^\d]/g, "");
    if (!digits) return "";
    // If Indian 10 digits without country code, add 91
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs">
          <div className="flex items-center justify-between text-ink/60 text-xs font-semibold mb-1">
            <span>Total Leads</span>
            <Inbox className="w-4 h-4 text-ink/40" />
          </div>
          <div className="text-2xl font-black text-ink">{stats.total}</div>
          <div className="text-[11px] text-ink/50 mt-1">All time inquiries</div>
        </div>

        <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200/70 shadow-xs">
          <div className="flex items-center justify-between text-rose-700 text-xs font-semibold mb-1">
            <span>New Leads</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-rose-800">{stats.new}</div>
          <div className="text-[11px] text-rose-600/80 mt-1">Require action</div>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/70 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 text-xs font-semibold mb-1">
            <span>Contacted</span>
            <MessageSquare className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-800">{stats.contacted}</div>
          <div className="text-[11px] text-amber-600/80 mt-1">Discussion ongoing</div>
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/70 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold mb-1">
            <span>Converted</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-800">{stats.converted}</div>
          <div className="text-[11px] text-emerald-600/80 mt-1">Client onboarded</div>
        </div>
      </div>

      {/* Search, Filter & Actions Bar */}
      <div className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-ink/10 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-accent/30 focus:border-accent text-ink placeholder:text-ink/40"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Service Filter */}
          <div className="relative shrink-0">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="appearance-none bg-slate-50 border border-ink/10 text-xs font-semibold text-ink pl-3 pr-8 py-2 rounded-xl focus:outline-hidden focus:border-accent cursor-pointer"
            >
              <option value="all">All Services</option>
              <option value="website">Website Development</option>
              <option value="social">Social Media Marketing</option>
              <option value="seo">SEO Services</option>
              <option value="profile">Profile Listings (Google/Apple)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative shrink-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-slate-50 border border-ink/10 text-xs font-semibold text-ink pl-3 pr-8 py-2 rounded-xl focus:outline-hidden focus:border-accent cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={fetchLeads}
            disabled={isLoading}
            className="p-2 border border-ink/10 bg-slate-50 hover:bg-slate-100 rounded-xl text-ink/60 hover:text-ink transition-colors cursor-pointer shrink-0"
            title="Refresh leads"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-accent" : ""}`} />
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-ink text-white rounded-xl text-xs font-semibold hover:bg-ink/90 active:scale-95 transition-all cursor-pointer shrink-0 shadow-xs"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Main Leads List / Table */}
      <div className="bg-white rounded-2xl border border-ink/8 shadow-xs overflow-hidden">
        {errorMessage && (
          <div className="p-4 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isLoading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-accent" />
            <p className="text-xs text-ink/50 font-medium">Loading client leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3 px-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-ink">No Client Leads Found</h3>
            <p className="text-xs text-ink/50 max-w-sm">
              {searchQuery || selectedService !== "all" || selectedStatus !== "all"
                ? "No leads matched your filter criteria. Try resetting the filters."
                : "When clients submit enquiries through the contact form, they will appear here in real time."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-ink/8 text-ink/60 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Service</th>
                  <th className="py-3.5 px-4">Direct Contact</th>
                  <th className="py-3.5 px-4">Message Preview</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6">
                {leads.map((lead) => {
                  const statusInfo = STATUS_BADGES[lead.status] || STATUS_BADGES.new;
                  const serviceBadgeClass = getServiceBadgeColor(lead.service);
                  const waNumber = cleanPhoneForWhatsApp(lead.phone);

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/60 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setLeadNotes(lead.notes || "");
                      }}
                    >
                      {/* Client Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-ink/5 border border-ink/10 flex items-center justify-center text-xs font-bold text-ink shrink-0">
                            {lead.name ? lead.name.charAt(0).toUpperCase() : "C"}
                          </div>
                          <div>
                            <div className="font-bold text-ink text-sm leading-tight flex items-center gap-1.5">
                              <span>{lead.name}</span>
                              {lead.status === "new" && (
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                              )}
                            </div>
                            <div className="text-[11px] text-ink/50 leading-tight mt-0.5">
                              {lead.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold border ${serviceBadgeClass}`}
                        >
                          {lead.service || "General Inquiry"}
                        </span>
                      </td>

                      {/* Direct Contact Buttons */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}?subject=Regarding your enquiry at GrowOwl Studio`}
                              className="w-7 h-7 rounded-lg border border-ink/10 bg-white hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 flex items-center justify-center text-ink/60 transition-colors"
                              title={`Email ${lead.email}`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.phone && lead.phone !== "Not provided" && (
                            <>
                              <a
                                href={`tel:${lead.phone}`}
                                className="w-7 h-7 rounded-lg border border-ink/10 bg-white hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 flex items-center justify-center text-ink/60 transition-colors"
                                title={`Call ${lead.phone}`}
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              {waNumber && (
                                <a
                                  href={`https://wa.me/${waNumber}?text=Hi%20${encodeURIComponent(lead.name)},%20thank%20you%20for%20contacting%20GrowOwl%20Studio!`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-7 h-7 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </>
                          )}
                        </div>
                      </td>

                      {/* Message Preview */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-ink/75 truncate text-[11.5px]">{lead.message || "—"}</p>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-ink/50 whitespace-nowrap text-[11px]">
                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                          <select
                            value={lead.status || "new"}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            disabled={isUpdating}
                            className={`appearance-none text-[10.5px] font-bold px-2.5 py-1 pr-6 rounded-full border ${statusInfo.bg} cursor-pointer focus:outline-hidden`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="archived">Archived</option>
                          </select>
                          <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                        </div>
                      </td>

                      {/* Action Menu */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-ink/40 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-3xl border border-ink/10 shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-ink/8 flex items-start justify-between bg-slate-50/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-ink/5 border border-ink/10 flex items-center justify-center text-sm font-bold text-ink">
                  {selectedLead.name ? selectedLead.name.charAt(0).toUpperCase() : "C"}
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink leading-tight flex items-center gap-2">
                    <span>{selectedLead.name}</span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getServiceBadgeColor(
                        selectedLead.service
                      )}`}
                    >
                      {selectedLead.service}
                    </span>
                  </h3>
                  <div className="text-xs text-ink/50 mt-0.5 flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(selectedLead.created_at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-ink/60 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {/* Quick Contact Bar */}
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`mailto:${selectedLead.email}?subject=Regarding your enquiry at GrowOwl Studio`}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors text-xs font-semibold gap-1"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>

                {selectedLead.phone && selectedLead.phone !== "Not provided" ? (
                  <>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-xs font-semibold gap-1"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://wa.me/${cleanPhoneForWhatsApp(selectedLead.phone)}?text=Hi%20${encodeURIComponent(
                        selectedLead.name
                      )},%20thank%20you%20for%20contacting%20GrowOwl%20Studio!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-xs font-semibold gap-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  </>
                ) : (
                  <div className="col-span-2 text-xs text-ink/40 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-ink/10">
                    No phone provided
                  </div>
                )}
              </div>

              {/* Contact Details */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-ink/8 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-ink/6">
                  <span className="text-ink/50 font-medium">Email Address:</span>
                  <span className="text-ink font-semibold select-all">{selectedLead.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-ink/6">
                  <span className="text-ink/50 font-medium">Phone Number:</span>
                  <span className="text-ink font-semibold select-all">{selectedLead.phone || "Not provided"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink/50 font-medium">Interested Service:</span>
                  <span className="text-ink font-semibold">{selectedLead.service}</span>
                </div>
              </div>

              {/* Full Message */}
              <div>
                <label className="block text-xs font-bold text-ink/60 uppercase tracking-wider mb-1.5">
                  Client Message
                </label>
                <div className="p-3.5 bg-slate-50 border border-ink/8 rounded-xl text-xs text-ink/80 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {selectedLead.message || "No message content provided."}
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-xs font-bold text-ink/60 uppercase tracking-wider mb-1.5">
                  Update Lead Status
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["new", "contacted", "converted", "archived"].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(selectedLead.id, st)}
                      className={`py-2 rounded-xl text-xs font-bold capitalize border transition-all cursor-pointer ${
                        selectedLead.status === st
                          ? "bg-ink text-white border-ink shadow-xs"
                          : "bg-slate-50 hover:bg-slate-100 border-ink/10 text-ink/70"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-ink/60 uppercase tracking-wider">
                    Internal Follow-up Notes
                  </label>
                  <button
                    type="button"
                    onClick={() => handleSaveNotes(selectedLead.id)}
                    disabled={isUpdating}
                    className="text-[11px] font-bold text-accent hover:underline cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder="Add notes like: Called on Tuesday, client interested in 5-page business website..."
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs text-ink placeholder:text-ink/40 focus:outline-hidden focus:border-accent"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-ink/8 bg-slate-50/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleDeleteLead(selectedLead.id)}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-ink text-white rounded-xl text-xs font-bold hover:bg-ink/90 cursor-pointer shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
