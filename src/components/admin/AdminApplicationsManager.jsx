"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

export default function AdminApplicationsManager({ passcode, showToast }) {
  const [applications, setApplications] = useState([]);
  const [metrics, setMetrics] = useState({
    total: 0,
    videoEditorCount: 0,
    fullstackDevCount: 0,
    newCount: 0,
    shortlistedCount: 0,
    inReviewCount: 0,
    rejectedCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // "table" or "cards"

  // Modals
  const [previewApp, setPreviewApp] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Fetch applications from API
  const fetchApplications = useCallback(
    async (role = selectedRole, status = selectedStatus, search = searchQuery) => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const queryParams = new URLSearchParams();
        if (role && role !== "all") queryParams.set("role", role);
        if (status && status !== "all") queryParams.set("status", status);
        if (search && search.trim()) queryParams.set("search", search.trim());

        let activePasscode = (passcode || "").trim();
        if (!activePasscode && typeof window !== "undefined") {
          try {
            activePasscode = (
              sessionStorage.getItem("growowl_admin_passcode") ||
              localStorage.getItem("growowl_admin_passcode") ||
              ""
            ).trim();
          } catch (e) {}
        }
        if (!activePasscode) {
          activePasscode = "growowl2026";
        }

        if (activePasscode) {
          queryParams.set("passcode", activePasscode);
        }

        const res = await fetch(`/api/admin/applications?${queryParams.toString()}`, {
          headers: {
            "x-admin-passcode": activePasscode,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success) {
          setApplications(data.applications || []);
          if (data.metrics) setMetrics(data.metrics);
        } else {
          setErrorMessage(data.message || "Failed to load applications from database.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorMessage("Network error connecting to Applications API.");
      } finally {
        setIsLoading(false);
      }
    },
    [passcode, selectedRole, selectedStatus, searchQuery]
  );

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (appId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      let activePasscode = (passcode || "").trim();
      if (!activePasscode && typeof window !== "undefined") {
        try {
          activePasscode = (
            sessionStorage.getItem("growowl_admin_passcode") ||
            localStorage.getItem("growowl_admin_passcode") ||
            ""
          ).trim();
        } catch (e) {}
      }
      if (!activePasscode) {
        activePasscode = "growowl2026";
      }

      const res = await fetch(`/api/admin/applications?passcode=${encodeURIComponent(activePasscode)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": activePasscode,
        },
        body: JSON.stringify({ id: appId, status: newStatus }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
        );
        if (previewApp?.id === appId) {
          setPreviewApp((prev) => ({ ...prev, status: newStatus }));
        }
        if (showToast) {
          showToast(`Status updated to "${formatStatus(newStatus)}"`, "success");
        }
        fetchApplications();
      } else {
        alert(data.message || "Could not update status.");
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const openResumePreview = (app) => {
    setPreviewApp(app);
    setIsPreviewModalOpen(true);
  };

  const formatStatus = (s) => {
    switch (s) {
      case "new":
        return "New";
      case "in_review":
        return "In Review";
      case "shortlisted":
        return "Shortlisted";
      case "rejected":
        return "Rejected";
      default:
        return s;
    }
  };

  const getStatusBadgeClass = (s) => {
    switch (s) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "in_review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "shortlisted":
        return "bg-emerald-50 text-emerald-700 border-emerald-300 font-bold";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRoleBadgeClass = (roleStr) => {
    if (roleStr?.toLowerCase().includes("video")) {
      return "bg-purple-50 text-purple-700 border-purple-200";
    }
    return "bg-cyan-50 text-cyan-800 border-cyan-200";
  };

  const formatDate = (isoString) => {
    if (!isoString) return "Recently";
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const renderCandidateCard = (app) => (
    <div
      key={app.id}
      className="bg-white rounded-2xl p-4 border border-ink/10 shadow-xs hover:border-ink/20 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h3 className="font-extrabold text-sm text-ink truncate leading-tight">
              {app.name}
            </h3>
            <p className="text-[11px] text-ink/60 truncate mt-0.5">{app.email}</p>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getRoleBadgeClass(
              app.role
            )}`}
          >
            {app.role?.toLowerCase().includes("video") ? "Video Editor" : "Full-Stack Dev"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-ink/50 mb-3 font-mono">
          <span>{app.phone}</span>
          <span>&bull;</span>
          <span>{formatDate(app.created_at)}</span>
        </div>

        {app.message && (
          <div className="mb-3 p-2.5 rounded-xl bg-black/[0.02] border border-ink/5 text-[11px] text-ink/80">
            <p className="line-clamp-2 leading-relaxed">
              <strong className="text-ink">Note: </strong>
              {app.message}
            </p>
          </div>
        )}
      </div>

      <div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => openResumePreview(app)}
            className="w-full py-2 px-2.5 rounded-xl bg-ink hover:bg-accent text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            Preview Resume
          </button>

          {app.portfolio_url ? (
            <a
              href={app.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-2.5 rounded-xl bg-white hover:border-accent hover:text-accent text-ink border border-ink/15 text-[11px] font-bold transition-all flex items-center justify-center text-center truncate cursor-pointer"
            >
              Portfolio &rarr;
            </a>
          ) : (
            <span className="w-full py-2 px-2.5 rounded-xl bg-black/5 text-ink/40 text-[11px] font-medium text-center flex items-center justify-center">
              No link
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-ink/5">
          <span className="text-[11px] font-semibold text-ink/60">Status:</span>
          <select
            value={app.status || "new"}
            onChange={(e) => handleStatusChange(app.id, e.target.value)}
            disabled={isUpdatingStatus}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border focus:outline-none cursor-pointer transition-all ${getStatusBadgeClass(
              app.status
            )}`}
          >
            <option value="new">New</option>
            <option value="in_review">In Review</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card rounded-2xl border border-ink/10 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-ink">
            Internship Applications ({metrics.total})
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchApplications()}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-black/5 text-ink border border-ink/15 text-xs font-semibold transition-all cursor-pointer"
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-ink/10 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
            Total Applied
          </span>
          <div className="text-3xl font-black text-ink mt-1">
            {metrics.total}
          </div>
          <p className="text-[11px] text-ink/50 mt-1">Active candidates</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-ink/10 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">
            Video Editors
          </span>
          <div className="text-3xl font-black text-purple-950 mt-1">
            {metrics.videoEditorCount}
          </div>
          <p className="text-[11px] text-purple-600/70 mt-1">Reels &amp; Ads specialists</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-ink/10 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800">
            Full-Stack Devs
          </span>
          <div className="text-3xl font-black text-cyan-950 mt-1">
            {metrics.fullstackDevCount}
          </div>
          <p className="text-[11px] text-cyan-700/70 mt-1">Custom Website builders</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-ink/10 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Shortlisted
          </span>
          <div className="text-3xl font-black text-emerald-950 mt-1">
            {metrics.shortlistedCount}
          </div>
          <p className="text-[11px] text-emerald-600/70 mt-1">Interview queue</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-ink/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              fetchApplications(selectedRole, selectedStatus, e.target.value);
            }}
            placeholder="Search by name, email, or phone..."
            className="w-full h-10 px-3.5 rounded-xl border border-ink/15 text-xs text-ink focus:outline-none focus:border-accent shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto">
          {/* Role Filter */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                fetchApplications(e.target.value, selectedStatus, searchQuery);
              }}
              className="appearance-none h-10 pl-3.5 pr-8 rounded-xl border border-ink/15 text-xs font-semibold bg-white text-ink shadow-2xs hover:border-ink/30 focus:outline-none focus:border-accent cursor-pointer transition-all"
            >
              <option value="all">All Roles ({metrics.total})</option>
              <option value="video">Video Editor Intern ({metrics.videoEditorCount})</option>
              <option value="fullstack">Full-Stack Dev ({metrics.fullstackDevCount})</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-ink/40 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                fetchApplications(selectedRole, e.target.value, searchQuery);
              }}
              className="appearance-none h-10 pl-3.5 pr-8 rounded-xl border border-ink/15 text-xs font-semibold bg-white text-ink shadow-2xs hover:border-ink/30 focus:outline-none focus:border-accent cursor-pointer transition-all"
            >
              <option value="all">All Statuses</option>
              <option value="new">New ({metrics.newCount})</option>
              <option value="in_review">In Review ({metrics.inReviewCount})</option>
              <option value="shortlisted">Shortlisted ({metrics.shortlistedCount})</option>
              <option value="rejected">Rejected ({metrics.rejectedCount})</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-ink/40 absolute right-2.5 pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center h-10 rounded-xl bg-black/5 p-1 text-xs">
            <button
              onClick={() => setViewMode("table")}
              className={`h-full px-3.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === "table" ? "bg-white shadow-xs text-ink" : "text-ink/60 hover:text-ink"
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`h-full px-3.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === "cards" ? "bg-white shadow-xs text-ink" : "text-ink/60 hover:text-ink"
              }`}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Error state */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {errorMessage}
        </div>
      )}

      {/* Applications Content */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-ink/20">
          <h3 className="text-base font-bold text-ink">No applications found</h3>
          <p className="text-xs text-ink/60 mt-1 max-w-sm mx-auto">
            When candidates submit internship forms on the website, their details will appear here automatically.
          </p>
        </div>
      ) : viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => renderCandidateCard(app))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ink/10 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/[0.02] border-b border-ink/10 text-[11px] font-bold uppercase tracking-wider text-ink/60">
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Portfolio</th>
                  <th className="py-3 px-4 text-center">Resume</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5 text-xs">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-black/[0.01] transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-ink text-[13px]">{app.name}</p>
                        <div className="text-[11px] text-ink/60 flex items-center gap-2 mt-0.5">
                          <a href={`mailto:${app.email}`} className="hover:text-accent truncate">
                            {app.email}
                          </a>
                          <span>&bull;</span>
                          <a href={`tel:${app.phone}`} className="hover:text-accent whitespace-nowrap font-mono">
                            {app.phone}
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold border text-[11px] ${getRoleBadgeClass(
                          app.role
                        )}`}
                      >
                        {app.role?.toLowerCase().includes("video") ? "Video Editor" : "Full-Stack Dev"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-ink/70 text-[11px]">
                      {formatDate(app.created_at)}
                    </td>

                    <td className="py-3 px-4">
                      {app.portfolio_url ? (
                        <a
                          href={app.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black hover:text-white transition text-[11px] font-semibold text-ink"
                        >
                          View Link &rarr;
                        </a>
                      ) : (
                        <span className="text-ink/30 italic text-[11px]">None</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => openResumePreview(app)}
                        className="inline-flex items-center px-3 py-1 rounded-xl bg-ink hover:bg-accent text-white font-bold text-[11px] transition shadow-xs cursor-pointer"
                      >
                        Preview Resume
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={app.status || "new"}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        disabled={isUpdatingStatus}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer transition ${getStatusBadgeClass(
                          app.status
                        )}`}
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Safe Resume Preview Modal */}
      {isPreviewModalOpen && previewApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-ink/10 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-ink">{previewApp.name}</h3>
                <p className="text-xs text-ink/60">{previewApp.email} &bull; {previewApp.phone}</p>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="text-ink/40 hover:text-ink text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-black/[0.02] border border-ink/10 text-xs">
                <div>
                  <span className="font-semibold text-ink">Applied Role: </span>
                  <span className="font-bold text-ink">{previewApp.role}</span>
                </div>
                <div>
                  <span className="font-semibold text-ink">Status: </span>
                  <select
                    value={previewApp.status || "new"}
                    onChange={(e) => handleStatusChange(previewApp.id, e.target.value)}
                    className="ml-1 px-2.5 py-1 rounded-lg text-xs font-bold border"
                  >
                    <option value="new">New</option>
                    <option value="in_review">In Review</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {previewApp.message && (
                <div className="p-4 rounded-xl bg-cream/40 border border-ink/10 text-xs">
                  <span className="font-bold text-ink block mb-1">Candidate Note / Cover Message:</span>
                  <p className="text-ink/80 leading-relaxed whitespace-pre-wrap">{previewApp.message}</p>
                </div>
              )}

              {/* Resume Embed / Safe Link */}
              <div className="border border-ink/10 rounded-2xl overflow-hidden bg-black/5 p-4 text-center">
                {previewApp.resume_url ? (
                  <div className="space-y-3">
                    <p className="text-xs text-ink/70">Candidate uploaded resume document:</p>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href={previewApp.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-ink hover:bg-accent text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                      >
                        Open Resume in New Tab &rarr;
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-ink/40 py-6">No resume file uploaded for this candidate.</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-ink/10">
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-5 py-2 text-xs font-semibold text-ink/70 hover:bg-black/5 rounded-xl cursor-pointer"
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
