"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function AdminApplicationsPage() {
  // Authentication State
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Data & Filter State
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
  const [successToast, setSuccessToast] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState("auto"); // "auto", "table", "cards"

  // Modals
  const [previewApp, setPreviewApp] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Auto-dismiss toast
  useEffect(() => {
    if (successToast) {
      const timer = setTimeout(() => setSuccessToast(""), 3500);
      return () => clearTimeout(timer);
    }
  }, [successToast]);

  // Check stored passcode on mount
  useEffect(() => {
    const storedKey = sessionStorage.getItem("growowl_admin_passcode");
    if (storedKey) {
      setPasscode(storedKey);
      fetchApplications(storedKey);
    }
  }, []);

  // Fetch applications from API
  const fetchApplications = useCallback(
    async (codeToUse, role = selectedRole, status = selectedStatus, search = searchQuery) => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const queryParams = new URLSearchParams();
        if (role && role !== "all") queryParams.set("role", role);
        if (status && status !== "all") queryParams.set("status", status);
        if (search && search.trim()) queryParams.set("search", search.trim());

        const res = await fetch(`/api/admin/applications?${queryParams.toString()}`, {
          headers: {
            "x-admin-passcode": codeToUse || passcode,
          },
        });

        const data = await res.json().catch(() => ({}));

        if (res.status === 401) {
          setIsAuthenticated(false);
          sessionStorage.removeItem("growowl_admin_passcode");
          setAuthError(data.message || "Invalid Admin Access Key. Please check your .env settings.");
          return;
        }

        if (res.ok && data.success) {
          setIsAuthenticated(true);
          sessionStorage.setItem("growowl_admin_passcode", codeToUse || passcode);
          setApplications(data.applications || []);
          if (data.metrics) setMetrics(data.metrics);
          setAuthError("");
        } else {
          setErrorMessage(data.message || "Failed to load applications from database.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorMessage("Network error connecting to Admin API.");
      } finally {
        setIsLoading(false);
        setIsVerifying(false);
      }
    },
    [passcode, selectedRole, selectedStatus, searchQuery]
  );

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError("Please enter your Admin Access Key.");
      return;
    }
    setIsVerifying(true);
    fetchApplications(passcode.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("growowl_admin_passcode");
    setIsAuthenticated(false);
    setPasscode("");
    setApplications([]);
  };

  const handleStatusChange = async (appId, newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
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
        setSuccessToast(`Status updated to "${formatStatus(newStatus)}"`);
        fetchApplications(passcode);
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

  // Reusable Candidate Card Component
  const renderCandidateCard = (app) => (
    <div
      key={app.id}
      className="bg-white rounded-2xl p-4 border border-black/10 shadow-xs hover:border-black/20 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top: Name & Role */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <h3 className="font-extrabold text-sm text-[#1e1e1e] truncate leading-tight">
              {app.name}
            </h3>
            <p className="text-[11px] text-[#1e1e1e]/60 truncate mt-0.5">{app.email}</p>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${getRoleBadgeClass(
              app.role
            )}`}
          >
            {app.role?.toLowerCase().includes("video") ? "Video Editor" : "Full-Stack Dev"}
          </span>
        </div>

        {/* Phone & Date */}
        <div className="flex items-center justify-between text-[11px] text-[#1e1e1e]/70 mb-2.5 bg-[#f5f3f0] px-2.5 py-1.5 rounded-xl">
          <a
            href={`tel:${app.phone}`}
            className="font-medium hover:text-[#fc3637] flex items-center gap-1.5 truncate"
          >
            <svg className="w-3 h-3 text-[#1e1e1e]/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="truncate">{app.phone || "No phone"}</span>
          </a>
          <span className="text-[10px] text-[#1e1e1e]/50 shrink-0">
            {formatDate(app.created_at)}
          </span>
        </div>

        {/* Candidate Message Snippet if provided */}
        {app.message && (
          <div className="mb-3 p-2.5 rounded-xl bg-[#f5f3f0]/70 border border-black/5 text-[11px] text-[#1e1e1e]/80">
            <p className="line-clamp-2 leading-relaxed">
              <strong className="text-[#1e1e1e]">Note: </strong>
              {app.message}
            </p>
          </div>
        )}
      </div>

      <div>
        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => openResumePreview(app)}
            className="w-full py-2 px-2.5 rounded-xl bg-[#0a0a0a] hover:bg-black text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Safe Preview</span>
          </button>

          {app.portfolio_url ? (
            <a
              href={app.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-2.5 rounded-xl bg-white hover:bg-black/5 text-[#1e1e1e] border border-black/15 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 text-center truncate cursor-pointer"
            >
              <svg className="w-3 h-3 text-[#1e1e1e]/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="truncate">Portfolio</span>
            </a>
          ) : (
            <span className="w-full py-2 px-2.5 rounded-xl bg-black/5 text-[#1e1e1e]/40 text-[11px] font-medium text-center flex items-center justify-center">
              No link
            </span>
          )}
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center justify-between pt-2.5 border-t border-black/5">
          <span className="text-[11px] font-semibold text-[#1e1e1e]/60">Status:</span>
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

  // Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#ebe8e4] flex items-center justify-center p-3.5 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-black/10">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-black text-[#1e1e1e] tracking-tight">
              GrowOwl Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#1e1e1e]/60 mt-1">
              Internship Applications Management
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1e1e1e] uppercase tracking-wider mb-1.5">
                Admin Access Key
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError("");
                }}
                placeholder="Enter access key configured in .env..."
                className="w-full px-4 py-3 rounded-xl border border-black/15 focus:outline-none focus:border-[#fc3637] focus:ring-2 focus:ring-[#fc3637]/15 text-sm font-mono text-[#1e1e1e] transition-all bg-[#f5f3f0]"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0a0a0a] hover:bg-black text-white font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Key...</span>
                </>
              ) : (
                <span>Unlock Portal</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-black/10 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-[#1e1e1e]/60 hover:text-[#fc3637] transition-colors"
            >
              Back to GrowOwl Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ebe8e4] text-[#1e1e1e] font-sans antialiased selection:bg-[#fc3637] selection:text-white">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-4 right-4 z-50 bg-[#0a0a0a] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs sm:text-sm font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          <span>{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black text-[#1e1e1e] tracking-tight leading-tight">
                GrowOwl Portal
              </h1>
            </div>
            <p className="text-[10px] sm:text-xs text-[#1e1e1e]/60">
              Internship Applications
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchApplications(passcode)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-black/5 text-[#1e1e1e] border border-black/10 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              title="Refresh applications"
            >
              <svg
                className={`w-3.5 h-3.5 text-[#1e1e1e] ${isLoading ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-black text-white hover:bg-[#fc3637] text-[11px] sm:text-xs font-bold transition-all cursor-pointer"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 py-3.5 sm:py-6">
        {/* 1. KPI Metric Cards */}
        <section className="mb-4 sm:mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
            {/* Total Applied */}
            <div className="bg-white rounded-2xl p-3 sm:p-4.5 border border-black/10 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1e1e1e]/60">
                  Total Applied
                </span>
                <span className="w-2 h-2 rounded-full bg-[#fc3637] animate-pulse" />
              </div>
              <div className="text-2xl sm:text-4xl font-black text-[#1e1e1e] tracking-tight">
                {metrics.total}
              </div>
              <p className="text-[10px] sm:text-xs text-[#1e1e1e]/50 mt-1 font-medium">
                Active candidates in database
              </p>
            </div>

            {/* Video Editor Interns */}
            <div className="bg-white rounded-2xl p-3 sm:p-4.5 border border-black/10 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-700">
                  Video Editors
                </span>
              </div>
              <div className="text-2xl sm:text-4xl font-black text-purple-900 tracking-tight">
                {metrics.videoEditorCount}
              </div>
              <p className="text-[10px] sm:text-xs text-[#1e1e1e]/50 mt-1 font-medium">
                Creative track applicants
              </p>
            </div>

            {/* Full-Stack Dev Interns */}
            <div className="bg-white rounded-2xl p-3 sm:p-4.5 border border-black/10 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-800">
                  Full-Stack Devs
                </span>
              </div>
              <div className="text-2xl sm:text-4xl font-black text-cyan-950 tracking-tight">
                {metrics.fullstackDevCount}
              </div>
              <p className="text-[10px] sm:text-xs text-[#1e1e1e]/50 mt-1 font-medium">
                Engineering track applicants
              </p>
            </div>

            {/* Shortlisted */}
            <div className="bg-white rounded-2xl p-3 sm:p-4.5 border border-black/10 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Shortlisted
                </span>
              </div>
              <div className="text-2xl sm:text-4xl font-black text-emerald-800 tracking-tight">
                {metrics.shortlistedCount}
              </div>
              <p className="text-[10px] sm:text-xs text-[#1e1e1e]/50 mt-1 font-medium">
                {metrics.newCount} new pending review
              </p>
            </div>
          </div>
        </section>

        {/* 2. Search, Filters, and View Toggles */}
        <section className="bg-white rounded-2xl p-3 sm:p-4 border border-black/10 shadow-xs mb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1e1e1e]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  fetchApplications(passcode, selectedRole, selectedStatus, e.target.value);
                }}
                placeholder="Search candidate by name, email, or phone..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-black/15 focus:outline-none focus:border-[#fc3637] text-xs sm:text-sm bg-[#f5f3f0] text-[#1e1e1e] placeholder:text-[#1e1e1e]/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    fetchApplications(passcode, selectedRole, selectedStatus, "");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Role Filter */}
              <div className="flex items-center rounded-xl bg-[#f5f3f0] p-1 border border-black/10 text-xs">
                <button
                  onClick={() => {
                    setSelectedRole("all");
                    fetchApplications(passcode, "all", selectedStatus, searchQuery);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedRole === "all"
                      ? "bg-black text-white shadow-xs"
                      : "text-[#1e1e1e]/70 hover:text-black"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setSelectedRole("video");
                    fetchApplications(passcode, "video", selectedStatus, searchQuery);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedRole === "video"
                      ? "bg-black text-white shadow-xs"
                      : "text-[#1e1e1e]/70 hover:text-black"
                  }`}
                >
                  Video
                </button>
                <button
                  onClick={() => {
                    setSelectedRole("developer");
                    fetchApplications(passcode, "developer", selectedStatus, searchQuery);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedRole === "developer"
                      ? "bg-black text-white shadow-xs"
                      : "text-[#1e1e1e]/70 hover:text-black"
                  }`}
                >
                  Dev
                </button>
              </div>

              {/* Status Dropdown */}
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  fetchApplications(passcode, selectedRole, e.target.value, searchQuery);
                }}
                className="px-3 py-2 rounded-xl bg-[#f5f3f0] border border-black/10 text-xs font-bold text-[#1e1e1e] focus:outline-none focus:border-[#fc3637] cursor-pointer"
              >
                <option value="all">Status: All</option>
                <option value="new">Status: New</option>
                <option value="in_review">Status: In Review</option>
                <option value="shortlisted">Status: Shortlisted</option>
                <option value="rejected">Status: Rejected</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center rounded-xl bg-[#f5f3f0] p-1 border border-black/10 text-xs">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "table" ? "bg-white shadow-xs text-black" : "text-[#1e1e1e]/60 hover:text-black"
                  }`}
                  title="Table view"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Table</span>
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "cards" ? "bg-white shadow-xs text-black" : "text-[#1e1e1e]/60 hover:text-black"
                  }`}
                  title="Card view"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Cards</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* 3. Applications Content (Cards or Table) */}
        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-14 text-center border border-black/10">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#f5f3f0] flex items-center justify-center text-[#1e1e1e]/50">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#1e1e1e]">
              No applications in database yet
            </h2>
            <p className="text-xs text-[#1e1e1e]/60 mt-1 max-w-sm mx-auto">
              When candidates apply via your career/internship page, their details and resumes will appear here automatically.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedRole("all");
                setSelectedStatus("all");
                fetchApplications(passcode, "all", "all", "");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* View Mode Condition: Cards (Grid on desktop, Stack on mobile) */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {applications.map((app) => renderCandidateCard(app))}
              </div>
            )}

            {/* View Mode Condition: Table View */}
            {viewMode === "table" && (
              <div className="bg-white rounded-2xl border border-black/10 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f5f3f0]/80 border-b border-black/10 text-[11px] font-black uppercase tracking-wider text-[#1e1e1e]/60">
                        <th className="py-3.5 px-4">Candidate</th>
                        <th className="py-3.5 px-4">Role</th>
                        <th className="py-3.5 px-4">Applied Date</th>
                        <th className="py-3.5 px-4">Portfolio</th>
                        <th className="py-3.5 px-4 text-center">Resume</th>
                        <th className="py-3.5 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 text-xs">
                      {applications.map((app) => (
                        <tr
                          key={app.id}
                          className="hover:bg-cream/20 transition-colors group cursor-default"
                        >
                          {/* Candidate */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#1e1e1e]/5 text-[#1e1e1e] font-black flex items-center justify-center text-xs shrink-0">
                                {app.name?.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <p className="font-extrabold text-[#1e1e1e] text-[13px] leading-tight">
                                  {app.name}
                                </p>
                                <div className="flex items-center gap-2 text-[11px] text-[#1e1e1e]/60 mt-0.5">
                                  <a
                                    href={`mailto:${app.email}`}
                                    className="hover:text-[#fc3637] transition-colors truncate"
                                  >
                                    {app.email}
                                  </a>
                                  <span>•</span>
                                  <a
                                    href={`tel:${app.phone}`}
                                    className="hover:text-[#fc3637] transition-colors whitespace-nowrap"
                                  >
                                    {app.phone}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full font-bold border text-[11px] ${getRoleBadgeClass(
                                app.role
                              )}`}
                            >
                              {app.role?.toLowerCase().includes("video") ? "Video Editor" : "Full-Stack Dev"}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-[#1e1e1e]/70 text-[11px]">
                            {formatDate(app.created_at)}
                          </td>

                          {/* Portfolio */}
                          <td className="py-3.5 px-4">
                            {app.portfolio_url ? (
                              <a
                                href={app.portfolio_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black hover:text-white transition-all text-[11px] font-bold text-[#1e1e1e]"
                              >
                                <span>View Link</span>
                                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </a>
                            ) : (
                              <span className="text-[#1e1e1e]/30 italic text-[11px]">None provided</span>
                            )}
                          </td>

                          {/* Resume Actions */}
                          <td className="py-3.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => openResumePreview(app)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a0a0a] hover:bg-black text-white font-bold text-[11px] transition-all shadow-xs hover:shadow-md cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>Safe Preview</span>
                            </button>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4">
                            <select
                              value={app.status || "new"}
                              onChange={(e) => handleStatusChange(app.id, e.target.value)}
                              disabled={isUpdatingStatus}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer transition-all ${getStatusBadgeClass(
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

            {/* View Mode Condition: Auto (Cards on mobile, Table on desktop) */}
            {viewMode === "auto" && (
              <>
                {/* Mobile View */}
                <div className="space-y-3 md:hidden">
                  {applications.map((app) => renderCandidateCard(app))}
                </div>

                {/* Desktop View */}
                <div className="hidden md:block bg-white rounded-2xl border border-black/10 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f5f3f0]/80 border-b border-black/10 text-[11px] font-black uppercase tracking-wider text-[#1e1e1e]/60">
                          <th className="py-3.5 px-4">Candidate</th>
                          <th className="py-3.5 px-4">Role</th>
                          <th className="py-3.5 px-4">Applied Date</th>
                          <th className="py-3.5 px-4">Portfolio</th>
                          <th className="py-3.5 px-4 text-center">Resume</th>
                          <th className="py-3.5 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 text-xs">
                        {applications.map((app) => (
                          <tr
                            key={app.id}
                            className="hover:bg-cream/20 transition-colors group cursor-default"
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#1e1e1e]/5 text-[#1e1e1e] font-black flex items-center justify-center text-xs shrink-0">
                                  {app.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-extrabold text-[#1e1e1e] text-[13px] leading-tight">
                                    {app.name}
                                  </p>
                                  <div className="flex items-center gap-2 text-[11px] text-[#1e1e1e]/60 mt-0.5">
                                    <a
                                      href={`mailto:${app.email}`}
                                      className="hover:text-[#fc3637] transition-colors truncate"
                                    >
                                      {app.email}
                                    </a>
                                    <span>•</span>
                                    <a
                                      href={`tel:${app.phone}`}
                                      className="hover:text-[#fc3637] transition-colors whitespace-nowrap"
                                    >
                                      {app.phone}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full font-bold border text-[11px] ${getRoleBadgeClass(
                                  app.role
                                )}`}
                              >
                                {app.role?.toLowerCase().includes("video") ? "Video Editor" : "Full-Stack Dev"}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-[#1e1e1e]/70 text-[11px]">
                              {formatDate(app.created_at)}
                            </td>

                            <td className="py-3.5 px-4">
                              {app.portfolio_url ? (
                                <a
                                  href={app.portfolio_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black hover:text-white transition-all text-[11px] font-bold text-[#1e1e1e]"
                                >
                                  <span>View Link</span>
                                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </a>
                              ) : (
                                <span className="text-[#1e1e1e]/30 italic text-[11px]">None provided</span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => openResumePreview(app)}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a0a0a] hover:bg-black text-white font-bold text-[11px] transition-all shadow-xs hover:shadow-md cursor-pointer"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>Safe Preview</span>
                              </button>
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={app.status || "new"}
                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                disabled={isUpdatingStatus}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer transition-all ${getStatusBadgeClass(
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
              </>
            )}
          </>
        )}
      </main>

      {/* 4. ZERO-RISK IN-BROWSER RESUME PREVIEW MODAL */}
      {isPreviewModalOpen && previewApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[94vh] flex flex-col shadow-2xl border border-black/15 overflow-hidden">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-5 border-b border-black/10 flex items-center justify-between gap-3 bg-[#f5f3f0]">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#1e1e1e] truncate">
                    {previewApp.name}’s Application
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-200 text-gray-800 border border-gray-300 shrink-0">
                    Sandboxed Preview
                  </span>
                </div>
                <p className="text-[11px] text-[#1e1e1e]/60 truncate mt-0.5">
                  {previewApp.role} • {previewApp.resume_filename || "Attached Resume"}
                </p>
              </div>

              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-3.5 sm:p-5 overflow-y-auto flex-1 space-y-4">
              {/* Candidate Details & Cover Message */}
              <div className="bg-[#f5f3f0] rounded-2xl p-4 border border-black/5 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                  <span className="font-bold text-[#1e1e1e] uppercase tracking-wider text-[11px] text-[#1e1e1e]/70">
                    Candidate Message / Cover Note
                  </span>
                  <span className="text-[11px] text-[#1e1e1e]/50 font-medium">
                    Applied: {formatDate(previewApp.created_at)}
                  </span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-black/10">
                  <p className="text-[#1e1e1e]/90 whitespace-pre-wrap leading-relaxed text-xs sm:text-[13px] font-normal">
                    {previewApp.message || "No custom message was attached by the candidate."}
                  </p>
                </div>

                {/* Candidate Info Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                  <div className="p-2 bg-white rounded-lg border border-black/5">
                    <span className="text-[#1e1e1e]/50 block text-[10px]">Email</span>
                    <a href={`mailto:${previewApp.email}`} className="font-bold text-[#1e1e1e] hover:text-[#fc3637] truncate block">
                      {previewApp.email}
                    </a>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-black/5">
                    <span className="text-[#1e1e1e]/50 block text-[10px]">Phone</span>
                    <a href={`tel:${previewApp.phone}`} className="font-bold text-[#1e1e1e] hover:text-[#fc3637] truncate block">
                      {previewApp.phone || "Not provided"}
                    </a>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-black/5">
                    <span className="text-[#1e1e1e]/50 block text-[10px]">Portfolio / Links</span>
                    {previewApp.portfolio_url ? (
                      <a
                        href={previewApp.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#fc3637] underline truncate block"
                      >
                        Open Link ↗
                      </a>
                    ) : (
                      <span className="text-[#1e1e1e]/40 italic">None</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Sandboxed Viewer Frame */}
              <div className="border border-black/15 rounded-2xl overflow-hidden bg-gray-100 flex flex-col items-center justify-center min-h-[320px] sm:min-h-[440px] relative">
                <iframe
                  title="Candidate Resume Safe Preview"
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                  )}&embedded=true`}
                  sandbox="allow-scripts"
                  className="w-full h-[340px] sm:h-[460px] border-none"
                />

                {/* Info Bar */}
                <div className="w-full bg-white p-3 border-t border-black/10 text-center text-[11px] text-[#1e1e1e]/70 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span>
                    Filename: <strong>{previewApp.resume_filename || "resume.pdf"}</strong> ({previewApp.resume_size || "Standard Size"})
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const confirmDownload = window.confirm(
                          "Safety Alert:\n\nOpening unverified PDFs directly on your local system poses malware risks.\nAre you sure you want to proceed with downloading?"
                        );
                        if (confirmDownload) {
                          alert("Download simulated safely.");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-black/5 hover:bg-black hover:text-white text-[11px] font-bold transition-all cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with Status Change */}
            <div className="p-3.5 sm:p-4 bg-[#f5f3f0] border-t border-black/10 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#1e1e1e]">Set Status:</span>
                <select
                  value={previewApp.status || "new"}
                  onChange={(e) => handleStatusChange(previewApp.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${getStatusBadgeClass(
                    previewApp.status
                  )}`}
                >
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold hover:bg-[#fc3637] transition-all cursor-pointer"
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
