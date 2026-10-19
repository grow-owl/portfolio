"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Film,
  FolderGit2,
  Layers,
  CreditCard,
  Users,
  ExternalLink,
  RefreshCw,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
} from "lucide-react";
import AdminReelsManager from "../../components/admin/AdminReelsManager";
import AdminProjectsManager from "../../components/admin/AdminProjectsManager";
import AdminCategoriesManager from "../../components/admin/AdminCategoriesManager";
import AdminPricingManager from "../../components/admin/AdminPricingManager";
import AdminApplicationsManager from "../../components/admin/AdminApplicationsManager";

const TABS = [
  { id: "reels", label: "Reels Showcase", icon: Film },
  { id: "projects", label: "Web Projects", icon: FolderGit2 },
  { id: "categories", label: "Categories & Formats", icon: Layers },
  { id: "pricing", label: "Pricing & Plans", icon: CreditCard },
  { id: "applications", label: "Applications", icon: Users },
];

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const [activeTab, setActiveTab] = useState("reels");
  const [cmsData, setCmsData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Fetch all CMS data
  const loadCmsData = useCallback(async (code) => {
    setLoadingData(true);
    try {
      const res = await fetch("/api/admin/cms", {
        headers: {
          "x-admin-passcode": code,
        },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load CMS content");
      }
      setCmsData(json.data);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoadingData(false);
    }
  }, [showToast]);

  const handleSaveCms = async (collection, data) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          action: "save",
          collection,
          data,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || `Failed to save ${collection}`);
      }
      setCmsData((prev) => ({ ...prev, [collection]: data }));
      showToast(`${collection.toUpperCase()} saved & published live!`, "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetCms = async (collection) => {
    if (!confirm(`Are you sure you want to reset ${collection} to default? Any custom changes will be lost.`)) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          action: "reset",
          collection,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || `Failed to reset ${collection}`);
      }
      setCmsData((prev) => ({ ...prev, [collection]: json.data }));
      showToast(`${collection.toUpperCase()} reset to factory defaults!`, "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Verify Passcode
  const handleVerify = async (codeToTest) => {
    setIsVerifying(true);
    setAuthError("");
    try {
      const res = await fetch("/api/admin/cms", {
        headers: {
          "x-admin-passcode": codeToTest,
        },
      });

      if (!res.ok) {
        throw new Error("Invalid passcode. Please try again.");
      }

      sessionStorage.setItem("growowl_admin_passcode", codeToTest);
      setPasscode(codeToTest);
      setIsAuthenticated(true);
      showToast("Access granted to GrowOwl Admin Studio", "success");
      await loadCmsData(codeToTest);
    } catch (err) {
      setAuthError(err.message || "Incorrect passcode");
      setIsAuthenticated(false);
    } finally {
      setIsVerifying(false);
    }
  };

  // Mount check
  useEffect(() => {
    const stored = sessionStorage.getItem("growowl_admin_passcode");
    if (stored) {
      setPasscode(stored);
      setPasscodeInput(stored);
      handleVerify(stored);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("growowl_admin_passcode");
    setPasscode("");
    setPasscodeInput("");
    setIsAuthenticated(false);
    setCmsData(null);
    showToast("Logged out from admin panel", "info");
  };

  // Lockscreen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0E10] text-white flex items-center justify-center p-4 selection:bg-[#FC3637] selection:text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FC3637]/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative w-full max-w-md bg-[#16161A]/85 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-center">
          <div className="mb-6 flex flex-col items-center">
            <Image
              src="/images/growowl-logo-white.webp"
              alt="GrowOwl Logo"
              width={180}
              height={60}
              className="h-8 sm:h-9 w-auto object-contain mb-2"
              priority
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FC3637]">
              Admin Studio
            </span>
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white mb-2">
            Admin Access Required
          </h1>
          <p className="text-xs text-white/60 mb-8 max-w-sm mx-auto">
            Manage video reels, web projects, business categories, video types, pricing, and candidates.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerify(passcodeInput.trim());
            }}
            className="space-y-4"
          >
            <div>
              <input
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter Admin Passcode"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 focus:border-[#FC3637] rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none transition text-center tracking-widest font-mono"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 font-medium">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying || !passcodeInput.trim()}
              className="w-full py-3 bg-[#FC3637] hover:bg-[#FC3637]/90 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FC3637]/25 transition cursor-pointer"
            >
              {isVerifying ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <span>GrowOwl Digital Studio</span>
            <Link href="/" className="hover:text-white transition">
              Back to Home &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentTabObj = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="min-h-screen bg-[#F6F6F3] text-ink selection:bg-accent selection:text-white flex">
      {/* Toast popup */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            toast.type === "success"
              ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20"
              : toast.type === "error"
              ? "bg-red-600 text-white border-red-500 shadow-red-500/20"
              : "bg-ink text-white border-ink/40 shadow-black/20"
          }`}
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Left Sidebar (Desktop Fixed + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-ink/10 flex flex-col justify-between transition-all duration-300 ease-in-out md:translate-x-0 ${
          isCollapsed ? "md:w-20" : "md:w-64"
        } ${isMobileMenuOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0"}`}
      >
        <div>
          {/* Brand Header with GrowOwl Logo & Collapse Toggle */}
          <div
            className={`border-b border-ink/10 transition-all ${
              isCollapsed
                ? "py-4 px-2 flex flex-col items-center justify-center gap-2 min-h-[82px]"
                : "p-4 sm:p-5 flex items-center justify-between min-h-[73px]"
            }`}
          >
            {!isCollapsed ? (
              <>
                <Link href="/" className="flex flex-col gap-0.5 group">
                  <Image
                    src="/images/growowl-logo.webp"
                    alt="GrowOwl Logo"
                    width={140}
                    height={48}
                    className="h-6 sm:h-7 w-auto object-contain"
                    priority
                  />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 group-hover:text-accent transition-colors pl-0.5">
                    Admin Studio
                  </span>
                </Link>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsCollapsed(true)}
                    title="Collapse Sidebar"
                    className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-ink/50 hover:text-ink hover:bg-black/5 transition cursor-pointer"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="md:hidden text-ink/40 hover:text-ink text-lg font-bold p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  title="GrowOwl Admin Studio"
                  className="p-1 rounded-xl hover:bg-black/5 transition group flex items-center justify-center"
                >
                  <Image
                    src="/apple-touch-icon.png"
                    alt="GrowOwl Mascot"
                    width={38}
                    height={38}
                    className="w-9 h-9 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform"
                    priority
                  />
                </Link>

                <button
                  onClick={() => setIsCollapsed(false)}
                  title="Expand Sidebar"
                  className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-ink/50 hover:text-ink hover:bg-black/5 transition cursor-pointer"
                >
                  <PanelLeftOpen className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          {/* Navigation Links */}
          <nav className={isCollapsed ? "p-2 space-y-2 mt-2" : "p-3 sm:p-4 space-y-1.5"}>
            {!isCollapsed && (
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink/40">
                Studio Navigation
              </div>
            )}
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              if (isCollapsed) {
                return (
                  <div key={tab.id} className="relative group flex justify-center">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      title={tab.label}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isActive
                          ? "bg-ink text-white shadow-sm"
                          : "text-ink/65 hover:text-ink hover:bg-black/5 hover:scale-105"
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                    </button>
                    {/* Hover Floating Tooltip */}
                    <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50">
                      {tab.label}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full rounded-xl text-xs font-semibold px-3.5 py-2.5 flex items-center gap-3 transition-all cursor-pointer ${
                    isActive
                      ? "bg-ink text-white shadow-sm font-bold"
                      : "text-ink/65 hover:text-ink hover:bg-black/5"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Actions */}
        <div className={isCollapsed ? "p-2 border-t border-ink/10 space-y-2" : "p-3 sm:p-4 border-t border-ink/10 space-y-1.5"}>
          {!isCollapsed ? (
            <>
              <Link
                href="/"
                target="_blank"
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-ink/75 hover:text-ink hover:bg-black/5 transition flex items-center justify-between"
              >
                <span className="flex items-center gap-2.5">
                  <ExternalLink className="w-3.5 h-3.5 text-ink/50" />
                  Live Website
                </span>
                <span className="text-[11px] text-ink/40">&rarr;</span>
              </Link>

              <button
                onClick={() => loadCmsData(passcode)}
                disabled={loadingData}
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-ink/75 hover:text-ink hover:bg-black/5 transition flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <RefreshCw className={`w-3.5 h-3.5 text-ink/50 ${loadingData ? "animate-spin" : ""}`} />
                  {loadingData ? "Syncing..." : "Sync Live Data"}
                </span>
                <span className="text-[10px] text-ink/40 font-mono">CMS</span>
              </button>
            </>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <div className="relative group">
                <Link
                  href="/"
                  target="_blank"
                  title="View Live Website"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-ink/65 hover:text-ink hover:bg-black/5 transition cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50">
                  Live Website
                </div>
              </div>

              <div className="relative group">
                <button
                  onClick={() => loadCmsData(passcode)}
                  disabled={loadingData}
                  title="Sync Live Data"
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-ink/65 hover:text-ink hover:bg-black/5 transition cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin" : ""}`} />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-ink text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-150 z-50">
                  Sync Live Data
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 min-w-0 min-h-screen transition-all duration-300 ${
          isCollapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        {/* Top Control Bar (Desktop & Mobile) */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-ink/10 px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden px-3 py-1.5 rounded-lg border border-ink/15 text-xs font-bold text-ink cursor-pointer"
            >
              Menu
            </button>

            <span className="font-bold text-sm text-ink truncate">
              {currentTabObj.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-ink/70 hover:text-ink bg-black/5 hover:bg-black/10 rounded-xl transition"
            >
              <span>View Site</span>
              <span className="text-[11px]">&rarr;</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
            >
              Lock
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {loadingData && !cmsData ? (
            <div className="py-24 text-center">
              <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-semibold text-ink/70">Loading GrowOwl Content Studio...</p>
            </div>
          ) : (
            <div>
              {/* 1. Reels Tab */}
              {activeTab === "reels" && (
                <AdminReelsManager
                  reels={cmsData?.reels}
                  onSave={handleSaveCms}
                  onReset={handleResetCms}
                  isSaving={isSaving}
                />
              )}

              {/* 2. Web Projects Tab */}
              {activeTab === "projects" && (
                <AdminProjectsManager
                  projects={cmsData?.projects}
                  onSave={handleSaveCms}
                  onReset={handleResetCms}
                  isSaving={isSaving}
                />
              )}

              {/* 3. Categories & Video Formats Tab */}
              {activeTab === "categories" && (
                <AdminCategoriesManager
                  categories={cmsData?.categories}
                  onSave={handleSaveCms}
                  onReset={handleResetCms}
                  isSaving={isSaving}
                />
              )}

              {/* 4. Pricing Tab */}
              {activeTab === "pricing" && (
                <AdminPricingManager
                  initialData={cmsData?.pricing}
                  passcode={passcode}
                  showToast={showToast}
                />
              )}

              {/* 5. Applications Tab - Merged directly into dashboard */}
              {activeTab === "applications" && (
                <AdminApplicationsManager
                  passcode={passcode}
                  showToast={showToast}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
