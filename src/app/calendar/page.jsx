"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  Download,
  ExternalLink,
  Video,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ChevronDown,
  RefreshCw,
  CheckCircle2,
  Clock,
  MessageCircle,
  Share2,
  Building2,
  TrendingUp,
  LayoutGrid,
  List,
  Columns,
  Tag,
  Film,
  FileText,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

const TYPE_BADGES = {
  Reel: "bg-rose-50 text-rose-700 border-rose-200",
  "Image Post": "bg-blue-50 text-blue-700 border-blue-200",
  Story: "bg-amber-50 text-amber-700 border-amber-200",
  Carousel: "bg-purple-50 text-purple-700 border-purple-200",
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

const WEEKS_LIST = ["Week 1", "Week 2", "Week 3", "Week 4"];

function CalendarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientQuery = searchParams.get("client") || "";

  const [calendars, setCalendars] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(clientQuery);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // "table" | "board"
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    async function loadCalendars() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/calendars");
        const data = await res.json();
        if (data.success && data.calendars?.length) {
          setCalendars(data.calendars);
          if (clientQuery && data.calendars.some((c) => c.id === clientQuery)) {
            setSelectedClientId(clientQuery);
          } else {
            setSelectedClientId(data.calendars[0].id);
          }
        }
      } catch (err) {
        console.error("Failed loading calendar:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCalendars();
  }, [clientQuery]);

  // Update URL search query when client changes
  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId);
    const params = new URLSearchParams(window.location.search);
    params.set("client", clientId);
    router.replace(`/calendar?${params.toString()}`);
  };

  const activeCalendar = calendars.find((c) => c.id === selectedClientId) || calendars[0] || null;
  const items = activeCalendar?.items || [];

  // Extract unique categories across businesses
  const categories = useMemo(() => {
    return ["all", ...new Set(calendars.map((c) => c.category).filter(Boolean))];
  }, [calendars]);

  // Filter businesses by industry category
  const filteredBusinesses = useMemo(() => {
    if (categoryFilter === "all") return calendars;
    return calendars.filter((c) => c.category === categoryFilter);
  }, [calendars, categoryFilter]);

  // Filter items for current active calendar
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedWeek !== "all" && item.week !== selectedWeek) return false;
      if (selectedType !== "all" && item.contentType?.toLowerCase() !== selectedType.toLowerCase()) return false;
      if (selectedStatus !== "all" && item.status?.toLowerCase() !== selectedStatus.toLowerCase()) return false;
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
  }, [items, selectedWeek, selectedType, selectedStatus, searchQuery]);

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

  const reelsProgress = Math.min(100, Math.round((reelsPublished / (reelsTarget || 1)) * 100));
  const postsProgress = Math.min(100, Math.round((postsPublished / (postsTarget || 1)) * 100));
  const storiesProgress = Math.min(100, Math.round((storiesPublished / (storiesTarget || 1)) * 100));

  const handleExportCSV = () => {
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
    link.setAttribute("download", `${activeCalendar?.id || "growowl"}_content_calendar.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/calendar?client=${activeCalendar?.id || selectedClientId}`;
    if (navigator.share) {
      navigator.share({
        title: `${activeCalendar?.clientName || "Client"} Monthly Content Calendar`,
        text: `Check out the active content calendar & deliverable plan for ${activeCalendar?.clientName || "our brand"}.`,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Calendar link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-ink selection:bg-accent/20 selection:text-accent font-sans">
      {/* Top Client Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-ink/8 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/apple-touch-icon.png"
              alt="GrowOwl Logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-sm font-black text-ink leading-tight flex items-center gap-1.5">
                GrowOwl Studio
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[9.5px] font-bold text-ink/40 tracking-wider uppercase">Content Calendar Portal</span>
            </div>
          </Link>
          <span className="text-ink/20 hidden sm:inline">/</span>
          <span className="text-xs font-bold text-ink/65 hidden sm:inline">Client Delivery Tracker</span>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-ink/75 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Admin Access</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-ink/75 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="Share this client calendar"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          <a
            href={`https://wa.me/919876543210?text=Hi%20GrowOwl%20Team,%20regarding%20the%20content%20calendar%20for%20${encodeURIComponent(activeCalendar?.clientName || "my business")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat With Team</span>
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* SECTION 1: Multi-Business & Plan Filter Bar */}
        <section className="bg-white p-5 rounded-3xl border border-ink/8 shadow-xs space-y-4">
          {/* Industry Category Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/6 pb-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] font-bold text-ink/40 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Industry / Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all capitalize shrink-0 cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-ink text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-ink/70"
                  }`}
                >
                  {cat === "all" ? "All Businesses" : cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-ink/50 font-medium">
              Showing <span className="font-bold text-ink">{filteredBusinesses.length}</span> Active Plans
            </div>
          </div>

          {/* Business & Custom Plan Cards Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredBusinesses.map((cal) => {
              const isSelected = cal.id === activeCalendar?.id;
              const calItems = cal.items || [];
              const published = calItems.filter((i) => i.status === "Published").length;
              const total = calItems.length;
              const percent = total > 0 ? Math.round((published / total) * 100) : 0;

              return (
                <button
                  key={cal.id}
                  type="button"
                  onClick={() => handleClientSelect(cal.id)}
                  className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-accent/5 border-accent shadow-sm ring-2 ring-accent/20"
                      : "bg-slate-50/70 hover:bg-slate-100/70 border-ink/8 hover:border-ink/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-ink/8 text-ink/65 line-clamp-1">
                        {cal.category || "Business"}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-accent text-white shrink-0">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="font-black text-ink text-sm leading-snug line-clamp-1">{cal.clientName}</div>
                    <div className="text-xs font-semibold text-accent mt-0.5 line-clamp-1">
                      {cal.planName || "Monthly Growth Plan"}
                    </div>
                    <div className="text-[11px] text-ink/50 mt-0.5 font-medium">
                      {cal.planPrice || "Custom Package"}
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-ink/6 flex items-center justify-between text-[11px]">
                    <span className="text-ink/50 font-medium">{published}/{total} Completed</span>
                    <span className="font-bold text-emerald-700">{percent}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Active Plan Banner & Deliverables Breakdown */}
        {activeCalendar && (
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-ink/8 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{activeCalendar.category || "Business Growth"}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <span>Active Package: {activeCalendar.planName || "Content Creation Plan"}</span>
                  </div>
                  {activeCalendar.planPrice && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-ink/80 text-xs font-bold">
                      <span>{activeCalendar.planPrice}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
                    {activeCalendar.clientName}
                  </h1>
                  <span className="text-sm px-3 py-1 rounded-full font-bold bg-slate-100 text-ink/75 border border-ink/8">
                    {activeCalendar.month || "Monthly Calendar"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink/65 max-w-2xl leading-relaxed">
                  Tailored content strategy, script ideation, video production, and published performance tracking for{" "}
                  <span className="font-bold text-ink">{activeCalendar.clientName}</span>.
                </p>

                {/* Deliverables & Frequency Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <div className="bg-slate-50 border border-ink/10 px-3 py-1 rounded-xl flex items-center gap-1.5 font-semibold text-ink">
                    <span className="text-ink/40 font-normal">Monthly Deliverables:</span>
                    <span>{activeCalendar.deliverables || "8 Reels / 6 Posts / 12 Stories"}</span>
                  </div>
                  <div className="bg-slate-50 border border-ink/10 px-3 py-1 rounded-xl flex items-center gap-1.5 font-semibold text-ink">
                    <span className="text-ink/40 font-normal">Release Cadence:</span>
                    <span>{activeCalendar.frequency || "2 Reels + 1 Post weekly"}</span>
                  </div>
                </div>
              </div>

              {/* Total Monthly Completion Card */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100/70 p-5 rounded-2xl border border-ink/8 w-full lg:w-72 shadow-xs shrink-0">
                <div className="flex items-center justify-between text-xs font-bold text-ink mb-2">
                  <span>Overall Delivery</span>
                  <span className="text-emerald-700 text-sm">{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center mt-3 pt-3 border-t border-ink/8">
                  <div>
                    <div className="text-base font-black text-emerald-700">{publishedCount}</div>
                    <div className="text-[10px] font-semibold text-ink/50 uppercase">Published</div>
                  </div>
                  <div>
                    <div className="text-base font-black text-amber-700">{inProgressCount}</div>
                    <div className="text-[10px] font-semibold text-ink/50 uppercase">In Progress</div>
                  </div>
                  <div>
                    <div className="text-base font-black text-slate-700">{plannedCount}</div>
                    <div className="text-[10px] font-semibold text-ink/50 uppercase">Planned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Deliverable Quota Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Reels Quota */}
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-ink/8 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-ink flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-rose-600" />
                    <span>Reels Deliverables</span>
                  </span>
                  <span className="font-extrabold text-rose-700">
                    {reelsPublished} / {reelsTarget}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mt-1">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${reelsProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10.5px] text-ink/50 mt-2 font-medium">
                  <span>Short-form viral reels</span>
                  <span className="font-bold text-ink">{reelsProgress}% target met</span>
                </div>
              </div>

              {/* Feed Posts Quota */}
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-ink/8 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-ink flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Posts & Carousels</span>
                  </span>
                  <span className="font-extrabold text-blue-700">
                    {postsPublished} / {postsTarget}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mt-1">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${postsProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10.5px] text-ink/50 mt-2 font-medium">
                  <span>Graphics & photo carousels</span>
                  <span className="font-bold text-ink">{postsProgress}% target met</span>
                </div>
              </div>

              {/* Stories Quota */}
              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-ink/8 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-ink flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-600" />
                    <span>Interactive Stories</span>
                  </span>
                  <span className="font-extrabold text-amber-700">
                    {storiesPublished} / {storiesTarget}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mt-1">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${storiesProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10.5px] text-ink/50 mt-2 font-medium">
                  <span>Polls, Q&As, behind the scenes</span>
                  <span className="font-bold text-ink">{storiesProgress}% target met</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: Weekly Sprints & Filter Toolbar */}
        <section className="space-y-3">
          {/* Weekly Sprint Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-ink/8 shadow-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-[11px] font-bold text-ink/40 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1">
                <CalendarIcon className="w-3 h-3" /> Sprint:
              </span>
              <button
                type="button"
                onClick={() => setSelectedWeek("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedWeek === "all"
                    ? "bg-ink text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-ink/75"
                }`}
              >
                All Month ({items.length})
              </button>

              {WEEKS_LIST.map((w) => {
                const count = items.filter((i) => i.week === w).length;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSelectedWeek(w)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      selectedWeek === w
                        ? "bg-ink text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-ink/75"
                    }`}
                  >
                    <span>{w}</span>
                    <span className="text-[10px] opacity-70 bg-black/10 px-1.5 py-0.2 rounded-full">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher: Table vs Kanban */}
            <div className="flex items-center gap-1.5 self-end md:self-auto shrink-0 bg-slate-100 p-1 rounded-xl border border-ink/5">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-ink shadow-xs"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Spreadsheet</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("board")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === "board"
                    ? "bg-white text-ink shadow-xs"
                    : "text-ink/60 hover:text-ink"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Kanban Board</span>
              </button>
            </div>
          </div>

          {/* Search, Type & Status Filters */}
          <div className="bg-white p-3 rounded-2xl border border-ink/8 shadow-xs flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Search topic, script, campaign or format..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-ink/10 rounded-xl text-xs text-ink placeholder:text-ink/40 focus:outline-hidden focus:border-accent"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {/* Filter by Type */}
              <div className="relative shrink-0">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="appearance-none bg-slate-50 border border-ink/10 text-xs font-semibold text-ink pl-3 pr-7 py-2 rounded-xl focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Formats</option>
                  <option value="reel">Reels</option>
                  <option value="image post">Image Posts</option>
                  <option value="story">Stories</option>
                  <option value="carousel">Carousels</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
              </div>

              {/* Filter by Status */}
              <div className="relative shrink-0">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none bg-slate-50 border border-ink/10 text-xs font-semibold text-ink pl-3 pr-7 py-2 rounded-xl focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="in progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ink text-white rounded-xl text-xs font-bold hover:bg-ink/90 active:scale-95 transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4: View Display (Table vs Kanban) */}
        {isLoading ? (
          <div className="bg-white rounded-3xl border border-ink/8 p-20 text-center shadow-xs">
            <RefreshCw className="w-6 h-6 animate-spin text-accent mx-auto mb-2" />
            <p className="text-xs text-ink/50 font-semibold">Loading content schedule...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-ink/8 p-16 text-center shadow-xs">
            <CalendarIcon className="w-10 h-10 text-ink/20 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-ink">No Scheduled Content Matches Filters</h3>
            <p className="text-xs text-ink/50 mt-1 max-w-sm mx-auto">
              Try switching sprint weeks, clearing search terms, or selecting "All Formats".
            </p>
          </div>
        ) : viewMode === "table" ? (
          /* SPREADSHEET TABLE VIEW */
          <div className="bg-white rounded-3xl border border-ink/8 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-ink/8 text-ink/60 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Sprint</th>
                    <th className="py-3.5 px-4">Date & Day</th>
                    <th className="py-3.5 px-4">Content Type</th>
                    <th className="py-3.5 px-4">Topic / Creative Concept</th>
                    <th className="py-3.5 px-4">Campaign</th>
                    <th className="py-3.5 px-4">Format</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Editing</th>
                    <th className="py-3.5 px-4 text-right">Links & Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/6">
                  {filteredItems.map((item) => {
                    const typeBadgeClass = TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel;
                    const statusInfo = STATUS_BADGES[item.status] || STATUS_BADGES.Planned;
                    const editBadgeClass = EDITING_STATUS_BADGES[item.editingStatus] || "text-slate-500 bg-slate-50 border-slate-200";

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Sprint / Week */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[10px] font-bold text-ink/70 px-2 py-0.5 rounded-md bg-slate-100 border border-ink/5">
                            {item.week || "Week 1"}
                          </span>
                        </td>

                        {/* Date & Day */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-bold text-ink text-xs">{item.postDate || "Scheduled"}</div>
                          <div className="text-[10px] text-ink/50 font-medium">{item.day}</div>
                        </td>

                        {/* Content Type */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${typeBadgeClass}`}>
                            {item.contentType === "Reel" && <Video className="w-3 h-3" />}
                            {item.contentType === "Image Post" && <ImageIcon className="w-3 h-3" />}
                            {item.contentType === "Story" && <Layers className="w-3 h-3" />}
                            {item.contentType === "Carousel" && <LayoutGrid className="w-3 h-3" />}
                            <span>{item.contentType}</span>
                          </span>
                        </td>

                        {/* Topic & Script */}
                        <td className="py-3.5 px-4 max-w-sm">
                          <div className="font-bold text-ink text-xs leading-snug">{item.topic}</div>
                          {item.script && item.script !== "N/A" && (
                            <div className="text-[10.5px] text-ink/60 mt-1 leading-tight flex items-start gap-1">
                              <span className="shrink-0">📝</span>
                              <span className="font-medium">{item.script}</span>
                            </div>
                          )}
                        </td>

                        {/* Campaign */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[11px] font-semibold text-ink/75 bg-slate-100 px-2 py-0.5 rounded-md border border-ink/5">
                            {item.campaign || "General"}
                          </span>
                        </td>

                        {/* Format */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-ink/60 text-[11px] font-medium">
                          {item.format || "Short Form"}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${statusInfo.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                            <span>{statusInfo.label}</span>
                          </span>
                        </td>

                        {/* Editing Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold border ${editBadgeClass}`}>
                            {item.editingStatus || "Not Started"}
                          </span>
                        </td>

                        {/* Links */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {item.referenceReel && (
                              <a
                                href={item.referenceReel}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-[10.5px] font-bold transition-colors"
                                title="View Creative Reference"
                              >
                                <span>Ref Reel</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {item.publishedLink && (
                              <a
                                href={item.publishedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10.5px] font-bold transition-colors"
                                title="View Live Published Post"
                              >
                                <span>Live Post</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {!item.referenceReel && !item.publishedLink && (
                              <span className="text-ink/30 text-[11px]">—</span>
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
        ) : (
          /* KANBAN BOARD VIEW */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {["Planned", "In progress", "Published"].map((statusKey) => {
              const statusItems = filteredItems.filter((i) => i.status === statusKey);
              const statusBadge = STATUS_BADGES[statusKey] || STATUS_BADGES.Planned;

              return (
                <div key={statusKey} className="bg-slate-100/70 p-4 rounded-3xl border border-ink/8 space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                      <h4 className="font-black text-ink text-sm uppercase tracking-wide">
                        {statusBadge.label}
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-ink/8 text-ink/70">
                      {statusItems.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {statusItems.length === 0 ? (
                      <div className="p-8 text-center text-xs text-ink/40 font-medium bg-white/60 rounded-2xl border border-dashed border-ink/10">
                        No posts in {statusBadge.label.toLowerCase()}
                      </div>
                    ) : (
                      statusItems.map((item) => {
                        const typeBadgeClass = TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel;

                        return (
                          <div
                            key={item.id}
                            className="bg-white p-4 rounded-2xl border border-ink/8 shadow-xs space-y-2.5 transition-all hover:shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-1.5">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${typeBadgeClass}`}>
                                {item.contentType}
                              </span>
                              <span className="text-[10px] font-bold text-ink/50 bg-slate-100 px-2 py-0.5 rounded-md">
                                {item.week || "Week 1"} • {item.postDate || item.day}
                              </span>
                            </div>

                            <div className="font-bold text-ink text-xs leading-snug">
                              {item.topic}
                            </div>

                            {item.script && item.script !== "N/A" && (
                              <p className="text-[11px] text-ink/65 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-ink/5">
                                📝 {item.script}
                              </p>
                            )}

                            <div className="pt-2 border-t border-ink/6 flex items-center justify-between text-[10.5px]">
                              <span className="font-semibold text-ink/50">{item.campaign || "General"}</span>
                              <div className="flex items-center gap-1.5">
                                {item.referenceReel && (
                                  <a
                                    href={item.referenceReel}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-rose-600 font-bold hover:underline inline-flex items-center gap-0.5"
                                  >
                                    <span>Ref</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                                {item.publishedLink && (
                                  <a
                                    href={item.publishedLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-0.5"
                                  >
                                    <span>Live</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                )}
                              </div>
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
  );
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-xs text-ink/50 font-bold">Loading Content Calendar...</div>}>
      <CalendarContent />
    </Suspense>
  );
}
