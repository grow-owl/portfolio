"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter,
  Download,
  Share2,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Video,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Copy,
  Settings,
  Briefcase,
  Building2,
  TrendingUp,
  LayoutGrid,
  List,
  Columns,
  Tag,
} from "lucide-react";

const WEEK_DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Helper: Parse full date (day, month index 0-11, full 4-digit year)
function parseItemDate(dateStr) {
  if (!dateStr) return null;
  const dotMatch = String(dateStr).trim().match(/^(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})/);
  if (dotMatch) {
    const day = parseInt(dotMatch[1], 10);
    const month = parseInt(dotMatch[2], 10) - 1; // 0-indexed (10 = October = 9)
    let year = parseInt(dotMatch[3], 10);
    if (year < 100) year += 2000;
    return { day, month, year };
  }
  const isoMatch = String(dateStr).trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    return { day, month, year };
  }
  return null;
}

function generateMonthGrid(year = 2026, month = 9) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    cells.push({ dayNumber: dayNum, isCurrentMonth: false });
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ dayNumber: d, isCurrentMonth: true });
  }
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let next = 1; next <= remaining; next++) {
    cells.push({ dayNumber: next, isCurrentMonth: false });
  }
  return cells;
}

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

export default function AdminCalendarManager({ passcode, showToast }) {
  const [calendars, setCalendars] = useState([]);
  const [activeClient, setActiveClient] = useState("inox-vega-circle");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState("calendar"); // "calendar" | "table" | "board"
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 9 = October

  // Modals
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    clientName: "",
    category: "",
    planName: "",
    planPrice: "",
    accessKey: "",
    month: "",
    deliverables: "",
    frequency: "",
    targets: { reels: 8, posts: 6, stories: 12 },
  });

  // New Client Form state
  const [newClientForm, setNewClientForm] = useState({
    id: "",
    clientName: "",
    category: "Cafe and Hospitality",
    planName: "Growth Starter Plan",
    planPrice: "₹20,000 / month",
    accessKey: "",
    month: "November 2026",
    deliverables: "6 Reels / 6 Posts / 10 Stories",
    frequency: "2 Reels, 1 Post per week",
    targets: { reels: 6, posts: 6, stories: 10 },
  });

  const getPasscode = () => {
    let p = (passcode || "").trim();
    if (!p && typeof window !== "undefined") {
      try {
        p = (sessionStorage.getItem("growowl_admin_passcode") || localStorage.getItem("growowl_admin_passcode") || "growowl2026").trim();
      } catch {
        p = "growowl2026";
      }
    }
    return p || "growowl2026";
  };

  const fetchCalendars = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const activeCode = getPasscode();
      const res = await fetch("/api/admin/calendars", {
        headers: { "x-admin-passcode": activeCode },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setCalendars(data.calendars || []);
        if (data.calendars?.length && !data.calendars.some((c) => c.id === activeClient)) {
          setActiveClient(data.calendars[0].id);
        }
      } else {
        setErrorMessage(data.message || "Failed to load calendars.");
      }
    } catch (err) {
      console.error("Fetch calendar error:", err);
      setErrorMessage("Network error connecting to Calendars API.");
    } finally {
      setIsLoading(false);
    }
  }, [activeClient]);

  useEffect(() => {
    fetchCalendars();
  }, [fetchCalendars]);

  const currentCalendar = calendars.find((c) => c.id === activeClient) || calendars[0] || null;

  // Automatically sync calendar grid view to the client's configured month
  useEffect(() => {
    if (currentCalendar?.month) {
      const parts = currentCalendar.month.split(" ");
      if (parts.length === 2) {
        const mNames = ["january","february","march","april","may","june","july","august","september","october","november","december"];
        const mIdx = mNames.indexOf(parts[0].toLowerCase());
        const yr = parseInt(parts[1], 10);
        if (mIdx !== -1 && !isNaN(yr)) {
          setCurrentMonth(mIdx);
          setCurrentYear(yr);
        }
      }
    }
  }, [currentCalendar?.month, currentCalendar?.id]);

  // Open settings modal
  const openSettings = () => {
    if (!currentCalendar) return;
    setSettingsForm({
      clientName: currentCalendar.clientName || "",
      category: currentCalendar.category || "",
      planName: currentCalendar.planName || "",
      planPrice: currentCalendar.planPrice || "",
      accessKey: currentCalendar.accessKey || `${currentCalendar.id}@grow26`,
      month: currentCalendar.month || "",
      deliverables: currentCalendar.deliverables || "",
      frequency: currentCalendar.frequency || "",
      targets: currentCalendar.targets || { reels: 8, posts: 6, stories: 12 },
    });
    setIsSettingsModalOpen(true);
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!currentCalendar) return;

    try {
      const res = await fetch("/api/admin/calendars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": getPasscode(),
        },
        body: JSON.stringify({
          action: "update_settings",
          clientId: currentCalendar.id,
          settings: settingsForm,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast?.("Client package plan & deliverables updated!", "success");
        setIsSettingsModalOpen(false);
        fetchCalendars();
      } else {
        showToast?.(data.message || "Failed to update settings.", "error");
      }
    } catch {
      showToast?.("Error saving settings.", "error");
    }
  };

  const handleCreateNewClient = async (e) => {
    e.preventDefault();
    const cleanId = (newClientForm.id || newClientForm.clientName)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    try {
      const res = await fetch("/api/admin/calendars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": getPasscode(),
        },
        body: JSON.stringify({
          action: "update_settings",
          clientId: cleanId,
          settings: {
            ...newClientForm,
            clientName: newClientForm.clientName.trim(),
          },
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast?.(`New business calendar created for ${newClientForm.clientName}!`, "success");
        setIsNewClientModalOpen(false);
        setActiveClient(cleanId);
        fetchCalendars();
      } else {
        showToast?.(data.message || "Failed to create client calendar.", "error");
      }
    } catch {
      showToast?.("Error creating new client calendar.", "error");
    }
  };

  const handleSaveItem = async (itemData) => {
    if (!currentCalendar) return;

    try {
      const res = await fetch("/api/admin/calendars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": getPasscode(),
        },
        body: JSON.stringify({
          action: "save_item",
          clientId: currentCalendar.id,
          item: itemData,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast?.("Post entry saved!", "success");
        setIsEditModalOpen(false);
        setEditingItem(null);
        fetchCalendars();
      } else {
        showToast?.(data.message || "Failed to save item.", "error");
      }
    } catch {
      showToast?.("Error saving calendar entry.", "error");
    }
  };

  const handleQuickStatusChange = async (itemId, field, value) => {
    if (!currentCalendar) return;
    const item = currentCalendar.items.find((i) => i.id === itemId);
    if (!item) return;

    const updatedItem = { ...item, [field]: value };
    await handleSaveItem(updatedItem);
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this scheduled post?")) return;
    if (!currentCalendar) return;

    try {
      const res = await fetch("/api/admin/calendars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": getPasscode(),
        },
        body: JSON.stringify({
          action: "delete_item",
          clientId: currentCalendar.id,
          itemId,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        showToast?.("Post deleted from calendar.", "success");
        fetchCalendars();
      } else {
        showToast?.(data.message || "Failed to delete item.", "error");
      }
    } catch {
      showToast?.("Error deleting item.", "error");
    }
  };

  const handleCopyClientLink = () => {
    if (!currentCalendar) return;
    const accessKey = currentCalendar.accessKey || `${currentCalendar.id}@grow26`;
    const url = `${window.location.origin}/calendar?client=${currentCalendar.id}&key=${encodeURIComponent(accessKey)}`;
    navigator.clipboard.writeText(url);
    showToast?.(`Private link copied! Client ${currentCalendar.clientName} can open this directly without seeing other brands.`, "success");
  };

  const handleCopyAccessKey = () => {
    if (!currentCalendar) return;
    const accessKey = currentCalendar.accessKey || `${currentCalendar.id}@grow26`;
    navigator.clipboard.writeText(accessKey);
    showToast?.(`Client Access Key '${accessKey}' copied to clipboard!`, "success");
  };

  const handleExportCSV = () => {
    if (!currentCalendar?.items?.length) {
      showToast?.("No items to export.", "info");
      return;
    }

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

    const rows = currentCalendar.items.map((i) => [
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
    link.setAttribute("download", `${currentCalendar.id}_content_calendar_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.("Calendar CSV exported successfully!", "success");
  };

  // Filter businesses by category
  const categories = ["all", ...new Set(calendars.map((c) => c.category).filter(Boolean))];
  const displayedCalendars = calendars.filter((c) => {
    if (categoryFilter === "all") return true;
    return c.category === categoryFilter;
  });

  // Filter items
  const items = currentCalendar?.items || [];
  const filteredItems = items.filter((item) => {
    if (selectedWeek !== "all" && item.week !== selectedWeek) return false;
    if (selectedType !== "all" && item.contentType?.toLowerCase() !== selectedType.toLowerCase()) return false;
    if (selectedStatus !== "all" && item.status?.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.topic?.toLowerCase().includes(q) ||
        item.campaign?.toLowerCase().includes(q) ||
        item.script?.toLowerCase().includes(q) ||
        item.format?.toLowerCase().includes(q) ||
        item.day?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate detailed quotas & targets
  const totalItems = items.length;
  const publishedCount = items.filter((i) => i.status === "Published").length;
  const inProgressCount = items.filter((i) => i.status === "In progress").length;
  const plannedCount = items.filter((i) => i.status === "Planned").length;
  const progressPercent = totalItems > 0 ? Math.round((publishedCount / totalItems) * 100) : 0;

  // Breakdown by Type
  const reelsCount = items.filter((i) => i.contentType === "Reel" && i.status === "Published").length;
  const postsCount = items.filter((i) => (i.contentType === "Image Post" || i.contentType === "Carousel") && i.status === "Published").length;
  const storiesCount = items.filter((i) => i.contentType === "Story" && i.status === "Published").length;

  const reelsTarget = currentCalendar?.targets?.reels || 8;
  const postsTarget = currentCalendar?.targets?.posts || 6;
  const storiesTarget = currentCalendar?.targets?.stories || 12;

  // Group items by week
  const weeksList = ["Week 1", "Week 2", "Week 3", "Week 4"];

  return (
    <div className="space-y-6">
      {/* Top Level: Category Filters & Business Switcher */}
      <div className="bg-white p-5 rounded-3xl border border-ink/8 shadow-xs space-y-4">
        {/* Category Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/6 pb-3.5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-bold text-ink/40 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Industry:
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

          <button
            type="button"
            onClick={() => setIsNewClientModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 hover:bg-accent text-accent hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Client / Custom Plan</span>
          </button>
        </div>

        {/* Business Clients Cards Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {displayedCalendars.map((cal) => {
            const isSelected = activeClient === cal.id;
            const clientTotal = cal.items?.length || 0;
            const clientDone = cal.items?.filter((i) => i.status === "Published").length || 0;
            const clientPct = clientTotal > 0 ? Math.round((clientDone / clientTotal) * 100) : 0;

            return (
              <div
                key={cal.id}
                onClick={() => setActiveClient(cal.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-accent/30"
                    : "bg-slate-50 hover:bg-white hover:border-ink/20 border-ink/8 text-ink"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        isSelected ? "bg-white/15 text-white/90" : "bg-ink/5 text-ink/60"
                      }`}
                    >
                      {cal.category || "Business"}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm leading-snug mt-1 truncate">
                    {cal.clientName}
                  </h3>

                  <div className={`text-[11px] font-semibold mt-0.5 truncate ${isSelected ? "text-accent" : "text-ink/65"}`}>
                    {cal.planName || "Monthly Growth Plan"}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-current/10 flex items-center justify-between text-[10.5px]">
                  <span className={isSelected ? "text-white/60" : "text-ink/50"}>
                    {clientDone}/{clientTotal} published
                  </span>
                  <span className={`font-bold ${isSelected ? "text-emerald-400" : "text-emerald-600"}`}>
                    {clientPct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Client Plan Banner & Deliverables Quota Counters */}
      <div className="bg-white p-5 rounded-3xl border border-ink/8 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-ink tracking-tight flex items-center gap-2">
                <span>{currentCalendar?.clientName}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-accent/10 text-accent border border-accent/20">
                  {currentCalendar?.month || "October 2026"}
                </span>
              </h2>

              <button
                type="button"
                onClick={openSettings}
                className="p-1.5 text-ink/40 hover:text-ink hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Edit Plan, Pricing & Deliverables"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Plan Tag, Pricing & Access Key */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-md border border-accent/20">
                Package: {currentCalendar?.planName || "Custom Plan"}
              </span>
              {currentCalendar?.planPrice && (
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  {currentCalendar?.planPrice}
                </span>
              )}
              <span className="text-ink/30">•</span>
              <span className="text-ink/65 font-medium">
                {currentCalendar?.frequency || "2 Reels, 1 Post per week"}
              </span>
              <span className="text-ink/30">•</span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                <span>Access Key: <strong className="font-mono text-amber-950 font-bold">{currentCalendar?.accessKey || `${currentCalendar?.id}@grow26`}</strong></span>
                <button
                  type="button"
                  onClick={handleCopyAccessKey}
                  className="p-0.5 hover:text-black cursor-pointer text-amber-700"
                  title="Copy Client Access Key"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons: Client View Link & CSV Export */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={handleCopyClientLink}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl border border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Link for Client</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="p-2.5 border border-ink/10 bg-slate-50 hover:bg-slate-100 rounded-2xl text-ink/70 hover:text-ink transition-colors cursor-pointer shrink-0"
              title="Download CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Deliverables Quota Progress Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Reels Quota */}
          <div className="bg-rose-50/70 border border-rose-200/80 p-3.5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-rose-800 mb-1">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-rose-600" /> Reels Quota
              </span>
              <span>{reelsCount}/{reelsTarget}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-rose-200 overflow-hidden mt-2">
              <div
                className="h-full bg-rose-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((reelsCount / reelsTarget) * 100))}%` }}
              />
            </div>
            <div className="text-[10px] text-rose-700/80 mt-1.5">
              {Math.max(0, reelsTarget - reelsCount)} reels remaining
            </div>
          </div>

          {/* Posts Quota */}
          <div className="bg-blue-50/70 border border-blue-200/80 p-3.5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-blue-800 mb-1">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-600" /> Posts Quota
              </span>
              <span>{postsCount}/{postsTarget}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-blue-200 overflow-hidden mt-2">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((postsCount / postsTarget) * 100))}%` }}
              />
            </div>
            <div className="text-[10px] text-blue-700/80 mt-1.5">
              {Math.max(0, postsTarget - postsCount)} posts remaining
            </div>
          </div>

          {/* Stories Quota */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" /> Stories Quota
              </span>
              <span>{storiesCount}/{storiesTarget}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-amber-200 overflow-hidden mt-2">
              <div
                className="h-full bg-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((storiesCount / storiesTarget) * 100))}%` }}
              />
            </div>
            <div className="text-[10px] text-amber-700/80 mt-1.5">
              {Math.max(0, storiesTarget - storiesCount)} stories remaining
            </div>
          </div>

          {/* Overall Completion */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Total Plan Status
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-200 overflow-hidden mt-2">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-emerald-700/80 mt-1.5">
              {publishedCount} of {totalItems} published
            </div>
          </div>
        </div>
      </div>

      {/* Week Tabs & Quick Filters Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-ink/8 shadow-xs flex flex-col md:flex-row gap-2.5 items-stretch md:items-center justify-between">
        {/* Weekly Sprints Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setSelectedWeek("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedWeek === "all" ? "bg-ink text-white shadow-xs" : "bg-slate-100 hover:bg-slate-200 text-ink/70"
            }`}
          >
            All October
          </button>
          {weeksList.map((wk) => (
            <button
              key={wk}
              type="button"
              onClick={() => setSelectedWeek(wk)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedWeek === wk ? "bg-ink text-white shadow-xs" : "bg-slate-100 hover:bg-slate-200 text-ink/70"
              }`}
            >
              {wk}
            </button>
          ))}
        </div>

        {/* Right Controls: Search, Type, Status & Add */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="relative min-w-[160px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-ink/10 rounded-xl text-xs text-ink placeholder:text-ink/40 focus:outline-hidden"
            />
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none bg-slate-50 border border-ink/10 text-xs font-semibold text-ink pl-2.5 pr-6 py-1.5 rounded-xl focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="reel">Reels</option>
              <option value="image post">Posts</option>
              <option value="story">Stories</option>
            </select>
            <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
          </div>

          <div className="relative shrink-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-slate-50 border border-ink/10 text-xs font-semibold text-ink pl-2.5 pr-6 py-1.5 rounded-xl focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="in progress">In Progress</option>
              <option value="planned">Planned</option>
            </select>
            <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none" />
          </div>

          {/* View Mode Toggle: Calendar, Schedule (Table), Pipeline (Board) */}
          <div className="bg-slate-100 p-0.5 rounded-xl border border-ink/8 flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === "calendar" ? "bg-white text-ink shadow-xs" : "text-ink/60 hover:text-ink"
              }`}
              title="Calendar Grid"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === "table" ? "bg-white text-ink shadow-xs" : "text-ink/60 hover:text-ink"
              }`}
              title="Spreadsheet Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Schedule</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("board")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === "board" ? "bg-white text-ink shadow-xs" : "text-ink/60 hover:text-ink"
              }`}
              title="Kanban Board View"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pipeline</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingItem({
                id: `post_${Date.now()}`,
                channel: "INSTAGRAM",
                day: "Tuesday",
                week: selectedWeek !== "all" ? selectedWeek : "Week 1",
                contentType: "Reel",
                postDate: "",
                campaign: "Lead Generation",
                topic: "",
                format: "Short Form",
                status: "Planned",
                script: "",
                editingStatus: "Not Started",
                referenceReel: "",
                publishedLink: "",
              });
              setIsEditModalOpen(true);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent text-white rounded-xl text-xs font-bold hover:bg-accent/90 active:scale-95 transition-all cursor-pointer shrink-0 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Post</span>
          </button>
        </div>
      </div>

      {/* Main Content View (Calendar vs Table vs Board) */}
      {viewMode === "calendar" ? (
        <div className="bg-white rounded-3xl border border-ink/8 shadow-xs overflow-hidden">
          {/* Calendar Header with Month Controls */}
          <div className="p-4 border-b border-ink/8 bg-slate-50/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs sm:text-sm font-black text-ink">
                {new Date(currentYear, currentMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })} Calendar Grid
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs">
                {new Date(currentYear, currentMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear((y) => y - 1);
                    } else {
                      setCurrentMonth((m) => m - 1);
                    }
                  }}
                  className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear((y) => y + 1);
                    } else {
                      setCurrentMonth((m) => m + 1);
                    }
                  }}
                  className="p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer border-l border-slate-200"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 7 Columns Day Names */}
          <div className="grid grid-cols-7 border-b border-ink/8 bg-slate-50 text-center text-[10px] font-black text-ink/50 uppercase tracking-wider py-2">
            {WEEK_DAYS.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 border-collapse divide-x divide-y divide-ink/8">
            {generateMonthGrid(currentYear, currentMonth).map((cell, idx) => {
              const dayItems = cell.isCurrentMonth
                ? filteredItems.filter((i) => {
                    const parsed = parseItemDate(i.postDate);
                    if (!parsed) return false;
                    return parsed.day === cell.dayNumber && parsed.month === currentMonth && parsed.year === currentYear;
                  })
                : [];
              const hasPosts = dayItems.length > 0;

              return (
                <div
                  key={idx}
                  className={`min-h-[120px] p-2 flex flex-col justify-between transition-colors ${
                    cell.isCurrentMonth
                      ? hasPosts
                        ? "bg-white hover:bg-purple-50/15"
                        : "bg-white hover:bg-slate-50/60"
                      : "bg-slate-50/50 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold leading-none ${
                        cell.isCurrentMonth
                          ? hasPosts
                            ? "text-purple-700 font-black bg-purple-100 px-1.5 py-0.5 rounded"
                            : "text-ink/70"
                          : "text-slate-300"
                      }`}
                    >
                      {cell.dayNumber}
                    </span>

                    {cell.isCurrentMonth && (
                      <button
                        type="button"
                        onClick={() => {
                          const formattedDate = `${String(cell.dayNumber).padStart(2, "0")}.${String(currentMonth + 1).padStart(2, "0")}.${String(currentYear).slice(-2)}`;
                          setEditingItem({
                            id: `post_${Date.now()}`,
                            channel: "INSTAGRAM",
                            day: new Date(currentYear, currentMonth, cell.dayNumber).toLocaleDateString("en-US", { weekday: "long" }),
                            week: cell.dayNumber <= 7 ? "Week 1" : cell.dayNumber <= 14 ? "Week 2" : cell.dayNumber <= 21 ? "Week 3" : "Week 4",
                            contentType: "Reel",
                            postDate: formattedDate,
                            campaign: "Lead Generation",
                            topic: "",
                            format: "Short Form",
                            status: "Planned",
                            script: "",
                            editingStatus: "Not Started",
                            referenceReel: "",
                            publishedLink: "",
                          });
                          setIsEditModalOpen(true);
                        }}
                        className="text-ink/30 hover:text-purple-600 p-0.5 rounded hover:bg-purple-50 cursor-pointer"
                        title="Add post for this day"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Posts for this Day */}
                  <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[85px] pr-0.5 scrollbar-thin">
                    {dayItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setEditingItem(item);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg border border-ink/10 bg-white hover:border-purple-300 hover:shadow-2xs transition-all cursor-pointer group space-y-1"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className={`inline-flex items-center px-1.5 py-0.2 rounded text-[8.5px] font-bold border ${TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel}`}>
                            {item.contentType}
                          </span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.status === "Published"
                                ? "bg-emerald-500"
                                : item.status === "In progress"
                                ? "bg-amber-500"
                                : "bg-slate-400"
                            }`}
                          />
                        </div>
                        <div className="text-[10px] font-bold text-ink leading-tight line-clamp-2 group-hover:text-purple-700">
                          {item.topic}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : viewMode === "table" ? (
        <div className="bg-white rounded-3xl border border-ink/8 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-24 text-center">
              <RefreshCw className="w-6 h-6 animate-spin text-accent mx-auto mb-2" />
              <p className="text-xs text-ink/50 font-semibold">Loading content calendar...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-20 text-center px-4">
              <CalendarIcon className="w-10 h-10 text-ink/20 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-ink">No Scheduled Content Found</h3>
              <p className="text-xs text-ink/50 mt-1">Try resetting the search or filter options.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-ink/8 text-ink/60 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3.5">Sprint / Week</th>
                    <th className="py-3 px-3.5">Date & Day</th>
                    <th className="py-3 px-3.5">Type</th>
                    <th className="py-3 px-3.5">Topic / Concept</th>
                    <th className="py-3 px-3.5">Campaign</th>
                    <th className="py-3 px-3.5">Format</th>
                    <th className="py-3 px-3.5">Publish Status</th>
                    <th className="py-3 px-3.5">Editing Status</th>
                    <th className="py-3 px-3.5">Reference / Link</th>
                    <th className="py-3 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/6">
                  {filteredItems.map((item) => {
                    const typeBadgeClass = TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel;
                    const statusInfo = STATUS_BADGES[item.status] || STATUS_BADGES.Planned;
                    const editingBadgeClass = EDITING_STATUS_BADGES[item.editingStatus] || EDITING_STATUS_BADGES["Not Started"];

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors group">
                        {/* Sprint / Week */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-ink/70 border border-ink/5">
                            {item.week || "Week 1"}
                          </span>
                        </td>

                        {/* Date & Day */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="font-bold text-ink text-xs">{item.postDate || "TBD"}</div>
                          <div className="text-[10px] text-ink/50">{item.day}</div>
                        </td>

                        {/* Content Type */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${typeBadgeClass}`}>
                            {item.contentType === "Reel" && <Video className="w-2.5 h-2.5" />}
                            {item.contentType === "Image Post" && <ImageIcon className="w-2.5 h-2.5" />}
                            {item.contentType === "Story" && <Layers className="w-2.5 h-2.5" />}
                            <span>{item.contentType}</span>
                          </span>
                        </td>

                        {/* Topic */}
                        <td className="py-3 px-3.5 max-w-xs">
                          <div className="font-bold text-ink text-xs leading-snug">{item.topic || "Untitled Topic"}</div>
                          {item.script && (
                            <div className="text-[10.5px] text-ink/50 truncate mt-0.5 max-w-[200px]" title={item.script}>
                              📝 {item.script}
                            </div>
                          )}
                        </td>

                        {/* Campaign */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <span className="text-[11px] font-semibold text-ink/75 bg-slate-100 px-2 py-0.5 rounded-md border border-ink/5">
                            {item.campaign || "General"}
                          </span>
                        </td>

                        {/* Format */}
                        <td className="py-3 px-3.5 whitespace-nowrap text-ink/60 text-[11px]">
                          {item.format || "Short Form"}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="relative inline-block">
                            <select
                              value={item.status || "Planned"}
                              onChange={(e) => handleQuickStatusChange(item.id, "status", e.target.value)}
                              className={`appearance-none text-[10px] font-bold px-2.5 py-1 pr-6 rounded-full border ${statusInfo.bg} cursor-pointer focus:outline-hidden`}
                            >
                              <option value="Planned">Planned</option>
                              <option value="In progress">In Progress</option>
                              <option value="Published">Published</option>
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                          </div>
                        </td>

                        {/* Editing Status Dropdown */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="relative inline-block">
                            <select
                              value={item.editingStatus || "Not Started"}
                              onChange={(e) => handleQuickStatusChange(item.id, "editingStatus", e.target.value)}
                              className={`appearance-none text-[10px] font-bold px-2 py-0.5 pr-5 rounded-md border ${editingBadgeClass} cursor-pointer focus:outline-hidden`}
                            >
                              <option value="Not Started">Not Started</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                            <ChevronDown className="w-2.5 h-2.5 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                          </div>
                        </td>

                        {/* Reference Reel & Live Link */}
                        <td className="py-3 px-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {item.referenceReel ? (
                              <a
                                href={item.referenceReel}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10.5px] font-semibold text-accent hover:underline flex items-center gap-0.5"
                                title="View Reference Reel on Instagram"
                              >
                                <span>Ref Reel</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ) : (
                              <span className="text-ink/30 text-[10px]">—</span>
                            )}

                            {item.publishedLink && (
                              <a
                                href={item.publishedLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10.5px] font-semibold text-emerald-600 hover:underline flex items-center gap-0.5"
                                title="View Published Post on Instagram"
                              >
                                <span>Live</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem(item);
                                setIsEditModalOpen(true);
                              }}
                              className="p-1.5 text-ink/40 hover:text-ink hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                              title="Edit Post"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1.5 text-ink/40 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Post"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Planned", "In progress", "Published"].map((statusKey) => {
            const columnItems = filteredItems.filter((i) => i.status === statusKey);
            const statusConfig = STATUS_BADGES[statusKey] || STATUS_BADGES.Planned;

            return (
              <div key={statusKey} className="bg-slate-50/80 rounded-3xl border border-ink/8 p-4 flex flex-col space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${statusConfig.dot}`} />
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-ink">
                      {statusConfig.label}
                    </h3>
                  </div>
                  <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full border border-ink/8 text-ink/70">
                    {columnItems.length}
                  </span>
                </div>

                <div className="space-y-2.5 overflow-y-auto max-h-[600px] pr-1">
                  {columnItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3.5 rounded-2xl border border-ink/8 shadow-2xs hover:shadow-sm transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${TYPE_BADGES[item.contentType] || TYPE_BADGES.Reel}`}>
                          {item.contentType}
                        </span>
                        <span className="text-[10px] text-ink/50 font-medium">{item.postDate} ({item.day})</span>
                      </div>

                      <h4 className="font-bold text-xs text-ink leading-snug">{item.topic}</h4>

                      <div className="flex items-center justify-between text-[10px] text-ink/50 pt-1 border-t border-ink/6">
                        <span>{item.campaign || "General"}</span>
                        <span className="font-semibold text-ink/70">{item.editingStatus}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <select
                          value={item.status}
                          onChange={(e) => handleQuickStatusChange(item.id, "status", e.target.value)}
                          className="text-[9.5px] font-bold bg-slate-50 border border-ink/10 rounded-lg px-2 py-0.5 text-ink cursor-pointer"
                        >
                          <option value="Planned">Planned</option>
                          <option value="In progress">In Progress</option>
                          <option value="Published">Published</option>
                        </select>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItem(item);
                              setIsEditModalOpen(true);
                            }}
                            className="p-1 text-ink/40 hover:text-ink rounded cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1 text-ink/40 hover:text-rose-600 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {columnItems.length === 0 && (
                    <div className="py-8 text-center text-xs text-ink/40 border border-dashed border-ink/10 rounded-2xl">
                      No {statusConfig.label} posts
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Post Modal */}
      {isEditModalOpen && editingItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-ink/10 shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-ink/8 flex items-center justify-between bg-slate-50/60">
              <h3 className="text-sm font-bold text-ink">
                {editingItem.topic ? "Edit Scheduled Post" : "Add New Scheduled Post"}
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-ink/60 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem(editingItem);
              }}
              className="p-5 space-y-4 overflow-y-auto flex-1 text-xs"
            >
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Post Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 24.10.26"
                    value={editingItem.postDate || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, postDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Day</label>
                  <input
                    type="text"
                    placeholder="e.g. Saturday"
                    value={editingItem.day || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, day: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Sprint / Week</label>
                  <select
                    value={editingItem.week || "Week 1"}
                    onChange={(e) => setEditingItem({ ...editingItem, week: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-semibold"
                  >
                    <option value="Week 1">Week 1 (1-7)</option>
                    <option value="Week 2">Week 2 (8-14)</option>
                    <option value="Week 3">Week 3 (15-21)</option>
                    <option value="Week 4">Week 4 (22-31)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Content Type</label>
                  <select
                    value={editingItem.contentType || "Reel"}
                    onChange={(e) => setEditingItem({ ...editingItem, contentType: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-semibold"
                  >
                    <option value="Reel">Reel</option>
                    <option value="Image Post">Image Post</option>
                    <option value="Story">Story</option>
                    <option value="Carousel">Carousel</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Format</label>
                  <input
                    type="text"
                    placeholder="Short Form / Image 3:4 / Image 9:16"
                    value={editingItem.format || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, format: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink/70 mb-1">Topic / Creative Concept</label>
                <input
                  type="text"
                  placeholder="e.g. 99₹ Weekend Cinema Offer Reel"
                  value={editingItem.topic || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, topic: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-semibold text-ink"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Campaign Goal</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Generation, Retention, Seasonal Push"
                    value={editingItem.campaign || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, campaign: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Channel</label>
                  <input
                    type="text"
                    placeholder="INSTAGRAM"
                    value={editingItem.channel || "INSTAGRAM"}
                    onChange={(e) => setEditingItem({ ...editingItem, channel: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Publish Status</label>
                  <select
                    value={editingItem.status || "Planned"}
                    onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-bold"
                  >
                    <option value="Planned">Planned</option>
                    <option value="In progress">In Progress</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Editing Status</label>
                  <select
                    value={editingItem.editingStatus || "Not Started"}
                    onChange={(e) => setEditingItem({ ...editingItem, editingStatus: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-bold"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-ink/70 mb-1">Script / Hook Notes</label>
                <textarea
                  rows={2}
                  placeholder="Script details or captions..."
                  value={editingItem.script || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, script: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink/70 mb-1">Reference Reel URL (Instagram)</label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/reel/..."
                  value={editingItem.referenceReel || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, referenceReel: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                />
              </div>

              <div>
                <label className="block font-semibold text-ink/70 mb-1">Published Link (When Live)</label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/reel/..."
                  value={editingItem.publishedLink || ""}
                  onChange={(e) => setEditingItem({ ...editingItem, publishedLink: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                />
              </div>

              <div className="pt-3 border-t border-ink/8 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-ink/70 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-accent text-white rounded-xl text-xs font-bold hover:bg-accent/90 cursor-pointer shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Calendar Plan & Settings Modal */}
      {isSettingsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsSettingsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-ink/10 shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-ink/8 flex items-center justify-between bg-slate-50/60">
              <h3 className="text-sm font-bold text-ink">Edit Business Plan & Deliverables</h3>
              <button
                type="button"
                onClick={() => setIsSettingsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-ink/60 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSettings} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink/70 mb-1">Business Name</label>
                <input
                  type="text"
                  value={settingsForm.clientName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, clientName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Industry / Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Cinema, Cafe, Homestay"
                    value={settingsForm.category}
                    onChange={(e) => setSettingsForm({ ...settingsForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Target Month</label>
                  <input
                    type="text"
                    placeholder="October 2026"
                    value={settingsForm.month}
                    onChange={(e) => setSettingsForm({ ...settingsForm, month: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Package Plan Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Cinema Scale Pro"
                    value={settingsForm.planName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, planName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-bold text-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Monthly Pricing</label>
                  <input
                    type="text"
                    placeholder="₹35,000 / month"
                    value={settingsForm.planPrice}
                    onChange={(e) => setSettingsForm({ ...settingsForm, planPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              {/* Targets Quota */}
              <div>
                <label className="block font-semibold text-ink/70 mb-1">Monthly Targets Quota</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-ink/50">Reels</span>
                    <input
                      type="number"
                      value={settingsForm.targets?.reels || 8}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          targets: { ...settingsForm.targets, reels: parseInt(e.target.value, 10) || 0 },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-ink/10 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50">Posts</span>
                    <input
                      type="number"
                      value={settingsForm.targets?.posts || 6}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          targets: { ...settingsForm.targets, posts: parseInt(e.target.value, 10) || 0 },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-ink/10 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50">Stories</span>
                    <input
                      type="number"
                      value={settingsForm.targets?.stories || 12}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          targets: { ...settingsForm.targets, stories: parseInt(e.target.value, 10) || 0 },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-ink/10 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Release Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Every Week Reel / 1 Post / 3 Stories"
                    value={settingsForm.frequency}
                    onChange={(e) => setSettingsForm({ ...settingsForm, frequency: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Client Access Key (Passcode)</label>
                  <input
                    type="text"
                    placeholder="e.g. brand@grow26"
                    value={settingsForm.accessKey}
                    onChange={(e) => setSettingsForm({ ...settingsForm, accessKey: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs font-mono font-bold focus:outline-hidden focus:border-accent text-accent"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-ink/8 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-ink/70 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-ink text-white rounded-xl text-xs font-bold hover:bg-ink/90 cursor-pointer shadow-xs"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Client Modal */}
      {isNewClientModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsNewClientModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl border border-ink/10 shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-ink/8 flex items-center justify-between bg-slate-50/60">
              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent" />
                <span>Onboard New Business Client</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsNewClientModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-ink/60 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewClient} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-ink/70 mb-1">Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. D Dine Kitchen"
                  value={newClientForm.clientName}
                  onChange={(e) => setNewClientForm({ ...newClientForm, clientName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Industry / Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Restaurant, SaaS, Gym"
                    value={newClientForm.category}
                    onChange={(e) => setNewClientForm({ ...newClientForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Target Month</label>
                  <input
                    type="text"
                    placeholder="November 2026"
                    value={newClientForm.month}
                    onChange={(e) => setNewClientForm({ ...newClientForm, month: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Package Plan Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Growth Starter Plan"
                    value={newClientForm.planName}
                    onChange={(e) => setNewClientForm({ ...newClientForm, planName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent font-bold text-accent"
                  />
                </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Monthly Pricing</label>
                  <input
                    type="text"
                    placeholder="₹20,000 / month"
                    value={newClientForm.planPrice}
                    onChange={(e) => setNewClientForm({ ...newClientForm, planPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs focus:outline-hidden focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-ink/70 mb-1">Client Access Key (Optional)</label>
                  <input
                    type="text"
                    placeholder="Auto: clientid@grow26"
                    value={newClientForm.accessKey}
                    onChange={(e) => setNewClientForm({ ...newClientForm, accessKey: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-ink/10 rounded-xl text-xs font-mono focus:outline-hidden focus:border-accent"
                  />
                </div>
              </div>
              </div>

              <div>
                <label className="block font-semibold text-ink/70 mb-1">Deliverables Targets</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-ink/50">Reels Target</span>
                    <input
                      type="number"
                      value={newClientForm.targets.reels}
                      onChange={(e) =>
                        setNewClientForm({
                          ...newClientForm,
                          targets: { ...newClientForm.targets, reels: parseInt(e.target.value, 10) || 0 },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-ink/10 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50">Posts Target</span>
                    <input
                      type="number"
                      value={newClientForm.targets.posts}
                      onChange={(e) =>
                        setNewClientForm({
                          ...newClientForm,
                          targets: { ...newClientForm.targets, posts: parseInt(e.target.value, 10) || 0 },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-ink/10 rounded-xl text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-ink/50">Stories Target</span>
                    <input
                      type="number"
                      value={newClientForm.targets.stories}
                      onChange={(e) =>
                        setNewClientForm({
                          ...newClientForm,
                          targets: { ...newClientForm.targets, stories: parseInt(e.target.value, 10) || 0 },
                        })
                      }
                      className="w-full p-2 bg-slate-50 border border-ink/10 rounded-xl text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-ink/8 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewClientModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-ink/70 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-ink text-white rounded-xl text-xs font-bold hover:bg-ink/90 cursor-pointer shadow-xs"
                >
                  Create Calendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
