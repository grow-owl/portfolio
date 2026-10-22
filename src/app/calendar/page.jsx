"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  Search,
  Download,
  ExternalLink,
  Video,
  Image as ImageIcon,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  MessageCircle,
  Share2,
  Lock,
  Unlock,
  ShieldAlert,
  ShieldCheck,
  LogOut,
  Eye,
  EyeOff,
  LayoutGrid,
  List,
  Columns,
  CheckCircle2,
  Clock,
  Sparkles,
  FileSpreadsheet,
  X,
} from "lucide-react";

const TYPE_BADGES = {
  Reel: "bg-purple-100 text-purple-800 border-purple-200",
  "Image Post": "bg-yellow-100 text-yellow-800 border-yellow-200",
  Story: "bg-orange-100 text-orange-800 border-orange-200",
  Carousel: "bg-blue-100 text-blue-800 border-blue-200",
};

const STATUS_BADGES = {
  Published: { label: "Published", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  "In progress": { label: "In Progress", bg: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  Planned: { label: "Planned", bg: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

const EDITING_STATUS_BADGES = {
  Completed: "text-emerald-700 bg-emerald-50 border-emerald-200",
  "In Progress": "text-amber-700 bg-amber-50 border-amber-200",
  "Not Started": "text-slate-500 bg-slate-50 border-slate-200",
};

const WEEK_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const WEEKS_LIST = ["Week 1", "Week 2", "Week 3", "Week 4"];

// Helper: Extract day number (1-31) from postDate string (e.g. "06.10.26" or "2026-10-06")
function extractDayNumber(dateStr) {
  if (!dateStr) return null;
  const matchDot = dateStr.match(/^(\d{1,2})[\.\/-]/);
  if (matchDot) return parseInt(matchDot[1], 10);
  const matchIso = dateStr.match(/^\d{4}-\d{2}-(\d{2})/);
  if (matchIso) return parseInt(matchIso[1], 10);
  const num = parseInt(dateStr, 10);
  return isNaN(num) ? null : num;
}

// Generate calendar cells for a month (Default: October 2026)
function generateMonthGrid(year = 2026, month = 9) {
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun, 4 = Thu
  const totalDays = new Date(year, month + 1, 0).getDate(); // 31
  const prevMonthTotalDays = new Date(year, month, 0).getDate(); // 30

  const cells = [];

  // Previous month padding days (Sep 27, 28, 29, 30)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    cells.push({
      dayNumber: dayNum,
      isCurrentMonth: false,
      dateKey: `prev-${dayNum}`,
    });
  }

  // Current month days (1 - 31)
  for (let d = 1; d <= totalDays; d++) {
    cells.push({
      dayNumber: d,
      isCurrentMonth: true,
      dateKey: d,
    });
  }

  // Next month padding days to complete 7 columns
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let next = 1; next <= remaining; next++) {
    cells.push({
      dayNumber: next,
      isCurrentMonth: false,
      dateKey: `next-${next}`,
    });
  }

  return cells;
}

function CalendarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientQuery = searchParams.get("client") || "";
  const keyQuery = searchParams.get("key") || searchParams.get("token") || "";

  const [activeCalendar, setActiveCalendar] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // Lock Screen Input state
  const [inputKey, setInputKey] = useState("");
  const [showKeyPassword, setShowKeyPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // Calendar filtering state
  const [selectedWeek, setSelectedWeek] = useState("all");
  const [viewMode, setViewMode] = useState("calendar"); // "calendar" | "table" | "board"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  // Post detail preview modal
  const [previewPost, setPreviewPost] = useState(null);

  // Month navigation (Defaults to October 2026)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = October

  // Load and verify credentials on mount or query change
  useEffect(() => {
    async function verifyAndLoad() {
      setIsLoading(true);
      setAuthError("");

      let keyToTest = keyQuery;
      let clientToTest = clientQuery;

      if (!keyToTest && typeof window !== "undefined") {
        keyToTest = sessionStorage.getItem("growowl_calendar_key") || "";
        if (!clientToTest) {
          clientToTest = sessionStorage.getItem("growowl_calendar_client") || "";
        }
      }

      if (!keyToTest) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const queryParams = new URLSearchParams();
        if (clientToTest) queryParams.set("client", clientToTest);
        queryParams.set("key", keyToTest);

        const res = await fetch(`/api/calendars?${queryParams.toString()}`);
        const data = await res.json().catch(() => ({}));

        if (res.ok && data.success && data.calendar) {
          setActiveCalendar(data.calendar);
          setIsAuthenticated(true);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("growowl_calendar_key", keyToTest);
            sessionStorage.setItem("growowl_calendar_client", data.calendar.id);
          }
        } else {
          setIsAuthenticated(false);
          setActiveCalendar(null);
          if (keyQuery) {
            setAuthError(data.message || "Invalid Access Key. Access to this calendar is restricted.");
          }
        }
      } catch (err) {
        console.error("Calendar verification failed:", err);
        setAuthError("Network error verifying calendar access.");
      } finally {
        setIsLoading(false);
      }
    }

    verifyAndLoad();
  }, [clientQuery, keyQuery]);

  // Form submit from Lock Screen
  const handleUnlock = async (e) => {
    e.preventDefault();
    if (!inputKey.trim()) return;

    setIsVerifying(true);
    setAuthError("");

    try {
      const res = await fetch("/api/calendars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: clientQuery || undefined,
          key: inputKey.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success && data.calendar) {
        setActiveCalendar(data.calendar);
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("growowl_calendar_key", inputKey.trim());
          sessionStorage.setItem("growowl_calendar_client", data.calendar.id);
        }
        const params = new URLSearchParams();
        params.set("client", data.calendar.id);
        params.set("key", inputKey.trim());
        router.replace(`/calendar?${params.toString()}`);
      } else {
        setAuthError(data.message || "Invalid Access Key. Access is restricted to authorized clients only.");
      }
    } catch {
      setAuthError("Error connecting to server. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("growowl_calendar_key");
      sessionStorage.removeItem("growowl_calendar_client");
    }
    setIsAuthenticated(false);
    setActiveCalendar(null);
    setInputKey("");
    router.replace("/calendar");
  };

  const handleShare = () => {
    if (!activeCalendar) return;
    const currentKey =
      (typeof window !== "undefined" && sessionStorage.getItem("growowl_calendar_key")) || keyQuery;
    const shareUrl = `${window.location.origin}/calendar?client=${activeCalendar.id}&key=${encodeURIComponent(currentKey)}`;

    if (navigator.share) {
      navigator.share({
        title: `${activeCalendar.clientName} Content Calendar`,
        text: `Official content calendar & delivery schedule for ${activeCalendar.clientName}.`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Private Calendar Link copied! You can share this with your authorized team members.");
    }
  };

  const handleExportCSV = () => {
    const items = activeCalendar?.items || [];
    if (!items.length) return;
    const headers = [
      "Week",
      "Channel",
      "Day",
      "Content Type",
      "Post Date",
      "Campaign",
      "Topic",
      "Format",
      "Status",
      "Script",
      "Editing Status",
      "Reference Reel",
      "Link to Published Post",
    ];

    const rows = items.map((i) => [
      `"${i.week || "Week 1"}"`,
      `"${i.channel || "INSTAGRAM"}"`,
      `"${i.day || ""}"`,
      `"${i.contentType || "Reel"}"`,
      `"${i.postDate || ""}"`,
      `"${(i.campaign || "").replace(/"/g, '""')}"`,
      `"${(i.topic || "").replace(/"/g, '""')}"`,
      `"${i.format || ""}"`,
      `"${i.status || "Planned"}"`,
      `"${(i.script || "").replace(/"/g, '""')}"`,
      `"${i.editingStatus || "Not Started"}"`,
      `"${i.referenceReel || ""}"`,
      `"${i.publishedLink || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeCalendar.id}_content_calendar.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const items = activeCalendar?.items || [];

  // Extract unique campaigns
  const campaignsList = useMemo(() => {
    return ["all", ...new Set(items.map((i) => i.campaign).filter(Boolean))];
  }, [items]);

  // Filter items for current active calendar
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedWeek !== "all" && item.week !== selectedWeek) return false;
      if (selectedType !== "all" && item.contentType?.toLowerCase() !== selectedType.toLowerCase()) return false;
      if (selectedStatus !== "all" && item.status?.toLowerCase() !== selectedStatus.toLowerCase()) return false;
      if (selectedCampaign !== "all" && item.campaign?.toLowerCase() !== selectedCampaign.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.topic?.toLowerCase().includes(q) ||
          item.campaign?.toLowerCase().includes(q) ||
          item.format?.toLowerCase().includes(q) ||
          item.script?.toLowerCase().includes(q) ||
          item.day?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, selectedWeek, selectedType, selectedStatus, selectedCampaign, searchQuery]);

  // Quota and delivery calculations
  const totalCount = items.length;
  const publishedCount = items.filter((i) => i.status === "Published").length;
  const inProgressCount = items.filter((i) => i.status === "In progress").length;
  const plannedCount = items.filter((i) => i.status === "Planned").length;
  const progressPercent = totalCount > 0 ? Math.round((publishedCount / totalCount) * 100) : 0;

  // Breakdown by Type
  const reelsPublished = items.filter((i) => i.contentType === "Reel" && i.status === "Published").length;
  const postsPublished = items.filter((i) => (i.contentType === "Image Post" || i.contentType === "Carousel") && i.status === "Published").length;
  const storiesPublished = items.filter((i) => i.contentType === "Story" && i.status === "Published").length;

  const reelsTarget = activeCalendar?.targets?.reels || 8;
  const postsTarget = activeCalendar?.targets?.posts || 6;
  const storiesTarget = activeCalendar?.targets?.stories || 12;

  // Month grid cells
  const monthGrid = useMemo(() => {
    return generateMonthGrid(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  // Group items by day number (1 - 31)
  const itemsByDay = useMemo(() => {
    const map = {};
    filteredItems.forEach((item) => {
      const day = extractDayNumber(item.postDate);
      if (day) {
        if (!map[day]) map[day] = [];
        map[day].push(item);
      }
    });
    return map;
  }, [filteredItems]);

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // RENDER: Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-accent mx-auto" />
          <p className="text-xs font-bold text-ink/60">Verifying secure calendar credentials...</p>
        </div>
      </div>
    );
  }

  // RENDER: Lock Screen (Access Restricted)
  if (!isAuthenticated || !activeCalendar) {
    return (
      <div className="min-h-screen bg-[#faf8f5] text-ink font-sans flex flex-col justify-between p-4 sm:p-8">
        <header className="max-w-md mx-auto w-full flex items-center justify-between pb-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/apple-touch-icon.png"
              alt="GrowOwl Logo"
              width={28}
              height={28}
              className="w-7 h-7 rounded-xl object-contain shadow-xs"
            />
            <span className="text-xs font-black text-ink">GrowOwl Studio</span>
          </Link>
          <span className="text-[10.5px] font-bold text-ink/40 tracking-wider uppercase">Client Portal</span>
        </header>

        <main className="max-w-md mx-auto w-full my-auto">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-ink/8 shadow-lg space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-6 h-6" />
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight pt-1">
                Client Content Portal
              </h1>
            </div>

            {authError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs font-semibold flex items-start gap-2 leading-relaxed">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink/75 mb-1.5">
                  Business Access Key / Passcode
                </label>
                <div className="relative">
                  <input
                    type={showKeyPassword ? "text" : "password"}
                    placeholder="e.g. brand@grow26"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-ink/10 rounded-xl text-xs font-mono font-bold text-ink placeholder:text-ink/30 focus:outline-hidden focus:border-accent"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeyPassword(!showKeyPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink cursor-pointer"
                  >
                    {showKeyPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2.5 bg-ink text-white rounded-xl text-xs font-black hover:bg-ink/90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Unlock My Calendar</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-ink/8 text-center space-y-2">
              <span className="text-[11px] text-ink/50">Don&apos;t have your business key?</span>
              <div>
                <a
                  href="https://wa.me/919876543210?text=Hi%20GrowOwl%20Team,%20please%20share%20our%20business%20access%20key%20for%20the%20Content%20Calendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Request Key from Agency</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // RENDER: Authenticated Single Business Calendar
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-ink selection:bg-accent/20 selection:text-accent font-sans flex flex-col justify-between">
      {/* Top Google Sheets / Workspace Style Nav */}
      <div>
        <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/apple-touch-icon.png"
                alt="GrowOwl Logo"
                width={30}
                height={30}
                className="w-7 h-7 rounded-lg object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xs font-extrabold text-ink leading-tight flex items-center gap-1.5">
                  Content Post Spreadsheet
                </span>
                <span className="text-[10px] text-ink/50 font-medium">
                  {activeCalendar.clientName} Content Calendar
                </span>
              </div>
            </Link>

            <span className="text-slate-300 hidden md:inline">|</span>
            <span className="text-xs font-bold text-slate-700 hidden md:inline-flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Authorized Client Session</span>
            </span>
          </div>

          {/* Top Right Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-ink/75 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              title="Copy private share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <a
              href={`https://wa.me/919876543210?text=Hi%20GrowOwl%20Team,%20regarding%20the%20content%20calendar%20for%20${encodeURIComponent(activeCalendar.clientName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chat With Team</span>
            </a>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
          {/* HEADER ROW: Brand Badge + Title + View Switcher Tabs (Matches Screenshot 2) */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <FileSpreadsheet className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">
                    Pixel Karigars
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-700 text-xs">
                    {activeCalendar.clientName} (Sheet1)
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                    Content Calendar
                  </h1>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {activeCalendar.month || "October 2026"}
                  </span>
                </div>
              </div>
            </div>

            {/* View Mode Switcher: Calendar, Schedule (Table), Pipeline (Kanban) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch sm:self-auto overflow-x-auto">
              <button
                type="button"
                onClick={() => setViewMode("calendar")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  viewMode === "calendar"
                    ? "bg-white text-ink shadow-xs"
                    : "text-slate-600 hover:text-ink"
                }`}
              >
                <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                <span>Calendar Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-ink shadow-xs"
                    : "text-slate-600 hover:text-ink"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Schedule ({items.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("board")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  viewMode === "board"
                    ? "bg-white text-ink shadow-xs"
                    : "text-slate-600 hover:text-ink"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Pipeline</span>
              </button>
            </div>
          </div>

          {/* DELIVERABLES PROGRESS ROW (Matches Screenshot 2) */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Left Quota Trackers */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-500">
                  Deliverables Progress
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  {activeCalendar.month || "October"} Quota
                </span>
              </div>

              {/* Reels Tracker */}
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                <Video className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="font-bold text-slate-600">Reels</span>
                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (reelsPublished / reelsTarget) * 100)}%` }}
                  />
                </div>
                <span className="font-extrabold text-ink">
                  {reelsPublished}/{reelsTarget}
                </span>
                {reelsPublished >= reelsTarget && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>

              {/* Posts Tracker */}
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                <ImageIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-600">Posts</span>
                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (postsPublished / postsTarget) * 100)}%` }}
                  />
                </div>
                <span className="font-extrabold text-ink">
                  {postsPublished}/{postsTarget}
                </span>
                {postsPublished >= postsTarget && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>

              {/* Stories Tracker */}
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
                <Layers className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="font-bold text-slate-600">Stories</span>
                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (storiesPublished / storiesTarget) * 100)}%` }}
                  />
                </div>
                <span className="font-extrabold text-ink">
                  {storiesPublished}/{storiesTarget}
                </span>
                {storiesPublished >= storiesTarget && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>
            </div>

            {/* Right Status Counters & Goal Reached Badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Published: {publishedCount}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg border border-amber-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>In progress: {inProgressCount}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span>Planned: {plannedCount}</span>
              </span>

              <span className="bg-purple-600 text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-xs">
                Goal: {progressPercent}%
              </span>
            </div>
          </div>

          {/* TOOLBAR: Search & Filters (Matches Screenshot 2) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topic, campaign, format..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-ink placeholder:text-slate-400 focus:outline-hidden focus:border-purple-600"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {/* Type Filter */}
              <div className="relative shrink-0">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 pl-3 pr-7 py-2 rounded-xl focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="reel">Reels</option>
                  <option value="image post">Image Posts</option>
                  <option value="story">Stories</option>
                  <option value="carousel">Carousels</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Status Filter */}
              <div className="relative shrink-0">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 pl-3 pr-7 py-2 rounded-xl focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="in progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Campaign Filter */}
              <div className="relative shrink-0">
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="appearance-none bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 pl-3 pr-7 py-2 rounded-xl focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Campaigns</option>
                  {campaignsList.filter((c) => c !== "all").map((camp) => (
                    <option key={camp} value={camp}>
                      {camp}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="text-xs font-semibold text-slate-500 whitespace-nowrap px-1">
                Showing <strong className="text-slate-800">{filteredItems.length}</strong> of {items.length} items
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: MONTHLY CALENDAR GRID (Exact match to Screenshot 2) */}
          {viewMode === "calendar" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              {/* Calendar Grid Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-purple-600" />
                  <h3 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight">
                    {monthName} Calendar Grid ({items.length} scheduled)
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
                    {monthName}
                  </span>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                      title="Previous Month"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer border-l border-slate-200"
                      title="Next Month"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 7-Columns Days Header: SUN, MON, TUE, WED, THU, FRI, SAT */}
              <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-[10.5px] font-black text-slate-500 uppercase tracking-wider py-2">
                {WEEK_DAYS.map((day) => (
                  <div key={day} className="py-0.5">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Body: 35 Cells (5 rows x 7 cols) */}
              <div className="grid grid-cols-7 border-collapse divide-x divide-y divide-slate-200">
                {monthGrid.map((cell, idx) => {
                  const dayItems = cell.isCurrentMonth ? itemsByDay[cell.dayNumber] || [] : [];
                  const hasPosts = dayItems.length > 0;

                  return (
                    <div
                      key={idx}
                      className={`min-h-[115px] sm:min-h-[135px] p-1.5 sm:p-2 transition-colors flex flex-col justify-between ${
                        cell.isCurrentMonth
                          ? hasPosts
                            ? "bg-white hover:bg-purple-50/20"
                            : "bg-white/80 hover:bg-slate-50/70"
                          : "bg-slate-50/50 text-slate-300"
                      }`}
                    >
                      {/* Top Day Number */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-bold leading-none ${
                            cell.isCurrentMonth
                              ? hasPosts
                                ? "text-purple-700 font-black bg-purple-100 px-1.5 py-0.5 rounded"
                                : "text-slate-600"
                              : "text-slate-300 font-normal"
                          }`}
                        >
                          {cell.dayNumber}
                        </span>

                        {hasPosts && (
                          <span className="text-[9.5px] font-bold text-slate-400">
                            {dayItems.length} {dayItems.length === 1 ? "post" : "posts"}
                          </span>
                        )}
                      </div>

                      {/* Scheduled Posts for this Day */}
                      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[90px] sm:max-h-[105px] pr-0.5 scrollbar-thin">
                        {dayItems.map((item) => {
                          const badgeStyle = TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel;
                          const statusDot =
                            item.status === "Published"
                              ? "bg-emerald-500"
                              : item.status === "In progress"
                              ? "bg-amber-500"
                              : "bg-slate-400";

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setPreviewPost(item)}
                              className="w-full text-left p-1.5 rounded-lg border border-slate-200/90 bg-white hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer group space-y-1"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span
                                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold border leading-tight ${badgeStyle}`}
                                >
                                  {item.contentType === "Reel" && <Video className="w-2.5 h-2.5" />}
                                  {item.contentType === "Image Post" && <ImageIcon className="w-2.5 h-2.5" />}
                                  {item.contentType === "Story" && <Layers className="w-2.5 h-2.5" />}
                                  <span>{item.contentType}</span>
                                </span>

                                <span className={`w-1.5 h-1.5 rounded-full ${statusDot} shrink-0`} />
                              </div>

                              <div className="text-[10px] font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-purple-700">
                                {item.topic}
                              </div>

                              {item.campaign && (
                                <div className="text-[8.5px] text-slate-500 font-medium truncate">
                                  {item.campaign}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: SPREADSHEET TABLE VIEW (Matches Screenshot 1 & Schedule) */}
          {viewMode === "table" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3.5">Sprint</th>
                      <th className="py-3 px-3.5">Channel</th>
                      <th className="py-3 px-3.5">Day & Date</th>
                      <th className="py-3 px-3.5">Content Type</th>
                      <th className="py-3 px-3.5">Campaign</th>
                      <th className="py-3 px-3.5">Topic / Concept</th>
                      <th className="py-3 px-3.5">Format</th>
                      <th className="py-3 px-3.5">Status</th>
                      <th className="py-3 px-3.5">Editing</th>
                      <th className="py-3 px-3.5 text-right">Links</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.map((item) => {
                      const typeBadge = TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel;
                      const statusInfo = STATUS_BADGES[item.status] || STATUS_BADGES.Planned;
                      const editBadge = EDITING_STATUS_BADGES[item.editingStatus] || "text-slate-500 bg-slate-50 border-slate-200";

                      return (
                        <tr
                          key={item.id}
                          onClick={() => setPreviewPost(item)}
                          className="hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <td className="py-3 px-3.5 whitespace-nowrap font-semibold text-slate-500 text-[11px]">
                            {item.week || "Week 1"}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap font-bold text-slate-700 text-[10px] uppercase">
                            {item.channel || "INSTAGRAM"}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <div className="font-bold text-slate-800">{item.postDate || "Scheduled"}</div>
                            <div className="text-[10px] text-slate-400">{item.day}</div>
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${typeBadge}`}>
                              {item.contentType}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className="text-[10.5px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {item.campaign || "General"}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 max-w-xs">
                            <div className="font-bold text-slate-900 leading-snug">{item.topic}</div>
                            {item.script && item.script !== "N/A" && (
                              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                📝 {item.script}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 text-[11px]">
                            {item.format || "Short Form"}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusInfo.bg}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                              <span>{statusInfo.label}</span>
                            </span>
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${editBadge}`}>
                              {item.editingStatus || "Not Started"}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {item.referenceReel && (
                                <a
                                  href={item.referenceReel}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:text-purple-800 text-[10.5px] font-bold underline"
                                >
                                  Ref
                                </a>
                              )}
                              {item.publishedLink && (
                                <a
                                  href={item.publishedLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-emerald-600 hover:text-emerald-800 text-[10.5px] font-bold underline"
                                >
                                  Live
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW MODE 3: PIPELINE KANBAN VIEW (Matches Pipeline in Screenshot 2) */}
          {viewMode === "board" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {["Planned", "In progress", "Published"].map((statusKey) => {
                const statusItems = filteredItems.filter((i) => i.status === statusKey);
                const statusBadge = STATUS_BADGES[statusKey] || STATUS_BADGES.Planned;

                return (
                  <div key={statusKey} className="bg-slate-100 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                        <h4 className="font-black text-slate-800 text-xs uppercase tracking-wide">
                          {statusBadge.label}
                        </h4>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                        {statusItems.length}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {statusItems.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400 bg-white/60 rounded-xl border border-dashed border-slate-200">
                          No posts
                        </div>
                      ) : (
                        statusItems.map((item) => {
                          const badgeStyle = TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel;

                          return (
                            <div
                              key={item.id}
                              onClick={() => setPreviewPost(item)}
                              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2 transition-all hover:shadow-xs cursor-pointer group"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[9.5px] font-bold border ${badgeStyle}`}>
                                  {item.contentType}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">
                                  {item.postDate || item.day}
                                </span>
                              </div>

                              <div className="font-bold text-slate-800 text-xs leading-snug group-hover:text-purple-700">
                                {item.topic}
                              </div>

                              {item.script && item.script !== "N/A" && (
                                <p className="text-[10.5px] text-slate-500 line-clamp-2 bg-slate-50 p-1.5 rounded border border-slate-100">
                                  📝 {item.script}
                                </p>
                              )}

                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                                <span className="font-semibold text-slate-400">{item.campaign || "General"}</span>
                                <span className="font-bold text-purple-600 group-hover:underline">View details →</span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* BOTTOM GOOGLE SHEETS STYLE TABS BAR (Matches Screenshot 1 & 2) */}
      <footer className="sticky bottom-0 z-30 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <div className="px-2.5 py-1 rounded bg-slate-100 text-slate-400 text-xs font-semibold shrink-0">
            Sheet1
          </div>

          {/* Active Client Sheet Tab */}
          <div className="px-3.5 py-1 rounded bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-2xs">
            <FileSpreadsheet className="w-3.5 h-3.5 text-purple-600" />
            <span>{activeCalendar.clientName} Content Calendar</span>
          </div>

          <div className="px-2.5 py-1 rounded bg-slate-100 text-slate-400 text-xs font-semibold shrink-0 hidden sm:inline">
            Sheet3
          </div>

          <div className="px-2.5 py-1 rounded bg-slate-100 text-slate-400 text-xs font-semibold shrink-0 hidden md:inline">
            Sheet4
          </div>
        </div>

        <div className="text-[11px] font-bold text-slate-400 hidden sm:inline">
          Pixel Karigars × GrowOwl Production
        </div>
      </footer>

      {/* POST DETAILS POPUP MODAL */}
      {previewPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setPreviewPost(null)}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                    TYPE_BADGES[previewPost.contentType] || TYPE_BADGES.Reel
                  }`}
                >
                  {previewPost.contentType}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {previewPost.postDate || "Scheduled"} • {previewPost.day}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPreviewPost(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Topic / Creative Concept
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5 leading-snug">
                  {previewPost.topic}
                </h3>
              </div>

              {previewPost.script && previewPost.script !== "N/A" && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Script / Content Notes
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {previewPost.script}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block">Campaign</span>
                  <span className="font-bold text-slate-800 text-xs">
                    {previewPost.campaign || "General"}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block">Aspect Format</span>
                  <span className="font-bold text-slate-800 text-xs">
                    {previewPost.format || "Short Form"}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block">Publication Status</span>
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        previewPost.status === "Published"
                          ? "bg-emerald-500"
                          : previewPost.status === "In progress"
                          ? "bg-amber-500"
                          : "bg-slate-400"
                      }`}
                    />
                    <span>{previewPost.status || "Planned"}</span>
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 block">Editing Status</span>
                  <span className="font-bold text-slate-800 text-xs">
                    {previewPost.editingStatus || "Not Started"}
                  </span>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                {previewPost.referenceReel && (
                  <a
                    href={previewPost.referenceReel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold transition-colors"
                  >
                    <span>Reference Reel</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {previewPost.publishedLink && (
                  <a
                    href={previewPost.publishedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                  >
                    <span>View Live Post</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-ink/50 font-bold">Loading Content Portal...</div>}>
      <CalendarContent />
    </Suspense>
  );
}
