"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, ExternalLink, RotateCcw, Save, X, Layers, Film, ChevronRight } from "lucide-react";

export default function AdminCategoriesManager({ categories, onSave, onReset, isSaving }) {
  const [list, setList] = useState(categories || []);
  const [selectedCatId, setSelectedCatId] = useState(list[0]?.id || "");

  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      setList(categories);
      if (!selectedCatId && categories[0]?.id) {
        setSelectedCatId(categories[0].id);
      }
    }
  }, [categories, selectedCatId]);

  // Category Modal State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCatIndex, setEditingCatIndex] = useState(-1);
  const [catFormData, setCatFormData] = useState({
    id: "",
    name: "",
    fullName: "",
    categorySlug: "",
    iconName: "film",
    description: "",
  });

  // Video Type Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideoIndex, setEditingVideoIndex] = useState(-1);
  const [videoFormData, setVideoFormData] = useState({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    creativeDirection: "",
    image: "",
    duration: "30-45s",
    tag: "Viral & Relatable",
    referenceReels: [],
  });

  const selectedCategory = list.find((c) => c.id === selectedCatId) || list[0];
  const selectedCatIndex = list.findIndex((c) => c.id === selectedCatId);

  // Category Handlers
  const handleOpenAddCat = () => {
    setEditingCatIndex(-1);
    setCatFormData({
      id: "cat-" + Date.now(),
      name: "",
      fullName: "",
      categorySlug: "",
      iconName: "film",
      description: "",
    });
    setIsCatModalOpen(true);
  };

  const handleOpenEditCat = (cat, idx) => {
    setEditingCatIndex(idx);
    setCatFormData({
      id: cat.id,
      name: cat.name,
      fullName: cat.fullName || cat.name,
      categorySlug: cat.categorySlug || cat.id,
      iconName: cat.iconName || "film",
      description: cat.description || "",
    });
    setIsCatModalOpen(true);
  };

  const handleSaveCat = (e) => {
    e.preventDefault();
    if (!catFormData.name || !catFormData.categorySlug) {
      alert("Please provide Category Name and Slug");
      return;
    }

    const updated = [...list];
    if (editingCatIndex >= 0) {
      updated[editingCatIndex] = {
        ...updated[editingCatIndex],
        ...catFormData,
      };
    } else {
      updated.push({
        ...catFormData,
        videoTypes: [],
      });
      setSelectedCatId(catFormData.id);
    }

    setList(updated);
    setIsCatModalOpen(false);
    onSave("categories", updated);
  };

  const handleDeleteCat = (idx) => {
    if (list.length <= 1) {
      alert("At least one category must exist.");
      return;
    }
    const cat = list[idx];
    if (confirm(`Are you sure you want to delete category "${cat.name}" and all its video types?`)) {
      const updated = list.filter((_, i) => i !== idx);
      setList(updated);
      setSelectedCatId(updated[0]?.id || "");
      onSave("categories", updated);
    }
  };

  // Video Type Handlers
  const handleAddReel = () => {
    setVideoFormData((prev) => ({
      ...prev,
      referenceReels: [
        ...(prev.referenceReels || []),
        {
          id: "reel-" + Date.now(),
          title: `Video Reel ${(prev.referenceReels?.length || 0) + 1}`,
          url: "",
        },
      ],
    }));
  };

  const handleUpdateReel = (idx, field, value) => {
    setVideoFormData((prev) => {
      const updated = [...(prev.referenceReels || [])];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, referenceReels: updated };
    });
  };

  const handleRemoveReel = (idx) => {
    setVideoFormData((prev) => {
      const updated = (prev.referenceReels || []).filter((_, i) => i !== idx);
      return { ...prev, referenceReels: updated };
    });
  };

  const handleOpenAddVideo = () => {
    setEditingVideoIndex(-1);
    setVideoFormData({
      id: "type-" + Date.now(),
      title: "",
      subtitle: "",
      description: "",
      creativeDirection: "",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      duration: "30-45s",
      tag: "Viral & Relatable",
      referenceReels: [
        { id: "ref-1", title: "Video Reel 1", url: "" },
      ],
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (vt, idx) => {
    setEditingVideoIndex(idx);
    const rawReels = Array.isArray(vt.referenceReels) && vt.referenceReels.length > 0
      ? vt.referenceReels.map((r, i) => ({
          id: r.id || "ref-" + i + "-" + Date.now(),
          title: r.title || `Video Reel ${i + 1}`,
          url: typeof r === "string" ? r : r.url || "",
        }))
      : vt.referenceReelUrl
      ? [{ id: "ref-1", title: "Video Reel 1", url: vt.referenceReelUrl }]
      : [{ id: "ref-1", title: "Video Reel 1", url: "" }];

    setVideoFormData({
      id: vt.id || "type-" + Date.now(),
      title: vt.title || "",
      subtitle: vt.subtitle || "",
      description: vt.description || "",
      creativeDirection: vt.creativeDirection || "",
      image: vt.image || "",
      duration: vt.duration || "30-45s",
      tag: vt.tag || "Viral & Relatable",
      referenceReels: rawReels,
    });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideo = (e) => {
    e.preventDefault();
    if (!videoFormData.title) {
      alert("Please provide Video Type Title");
      return;
    }

    const updated = [...list];
    const cat = { ...updated[selectedCatIndex] };
    const vts = [...(cat.videoTypes || [])];

    // Filter out reels that have empty URLs
    const cleanedReels = (videoFormData.referenceReels || [])
      .filter((r) => r.url && r.url.trim() !== "")
      .map((r, i) => ({
        title: r.title?.trim() || `Video Reel ${i + 1}`,
        url: r.url.trim(),
      }));

    const newObj = {
      id: videoFormData.id,
      title: videoFormData.title,
      subtitle: videoFormData.subtitle,
      description: videoFormData.description,
      creativeDirection: videoFormData.creativeDirection,
      image: videoFormData.image,
      duration: videoFormData.duration,
      tag: videoFormData.tag,
      referenceReels: cleanedReels,
    };

    if (editingVideoIndex >= 0) {
      vts[editingVideoIndex] = newObj;
    } else {
      vts.push(newObj);
    }

    cat.videoTypes = vts;
    updated[selectedCatIndex] = cat;

    setList(updated);
    setIsVideoModalOpen(false);
    onSave("categories", updated);
  };

  const handleDeleteVideo = (vtIdx) => {
    const vt = selectedCategory?.videoTypes?.[vtIdx];
    if (confirm(`Delete video format "${vt.title}" from ${selectedCategory.name}?`)) {
      const updated = [...list];
      const cat = { ...updated[selectedCatIndex] };
      cat.videoTypes = cat.videoTypes.filter((_, i) => i !== vtIdx);
      updated[selectedCatIndex] = cat;
      setList(updated);
      onSave("categories", updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card rounded-2xl border border-ink/10 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-ink">
            Business Categories &amp; Video Types ({list.length} Categories)
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onReset("categories")}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-ink/15 text-ink/70 hover:text-ink hover:bg-ink/5 transition-all"
            title="Reset to default original categories"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleOpenAddCat}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink hover:bg-accent text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Category Selector List */}
        <div className="lg:col-span-1 bg-card rounded-2xl border border-ink/10 p-3 shadow-xs space-y-1.5">
          <span className="text-[11px] font-bold text-ink/50 uppercase tracking-wider px-3 py-1.5 block">
            Select Category ({list.length})
          </span>

          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {list.map((cat, idx) => {
              const isSelected = cat.id === selectedCatId;
              return (
                <div
                  key={cat.id || idx}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer group ${
                    isSelected
                      ? "bg-ink text-white font-bold shadow-xs"
                      : "hover:bg-ink/5 text-ink/80 border border-transparent"
                  }`}
                  onClick={() => setSelectedCatId(cat.id)}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-xs truncate">{cat.name}</p>
                    <span className={`text-[10px] font-mono ${isSelected ? "text-white/60" : "text-ink/40"}`}>
                      {cat.videoTypes?.length || 0} formats
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditCat(cat, idx);
                      }}
                      className="p-1 hover:text-accent rounded-md hover:bg-white"
                      title="Edit Category"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCat(idx);
                      }}
                      className="p-1 hover:text-red-500 rounded-md hover:bg-white"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Video Formats in Selected Category */}
        <div className="lg:col-span-3 space-y-4">
          {selectedCategory && (
            <div className="p-5 bg-card rounded-2xl border border-ink/10 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-ink/8">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-ink">{selectedCategory.name}</h3>
                    <span className="text-xs font-mono text-ink/40 bg-ink/5 px-2 py-0.5 rounded-md">
                      /videos/{selectedCategory.categorySlug}
                    </span>
                  </div>
                  <p className="text-xs text-ink/65 mt-1 max-w-xl">
                    {selectedCategory.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddVideo}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ink text-white hover:bg-accent text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add Video Type
                </button>
              </div>

              {/* Video Types Grid */}
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(selectedCategory.videoTypes || []).map((vt, vtIdx) => (
                  <div
                    key={vt.id || vtIdx}
                    className="p-4 rounded-xl border border-ink/10 bg-ink/[0.01] hover:border-accent/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/5 text-ink/70 border border-ink/10 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                          {vt.tag || "Viral"}
                        </span>
                        <span className="text-[10.5px] font-mono text-ink/50">{vt.duration || "30-60s"}</span>
                      </div>

                      <h4 className="font-bold text-sm text-ink mb-1">{vt.title}</h4>
                      <p className="text-xs text-ink/60 font-medium mb-2">{vt.subtitle}</p>
                      <p className="text-xs text-ink/65 line-clamp-3 mb-3 leading-relaxed">
                        {vt.description}
                      </p>

                      {/* Multiple Reference Reels list on card */}
                      {vt.referenceReels && vt.referenceReels.length > 0 ? (
                        <div className="space-y-1.5 mb-3">
                          <span className="text-[10px] font-bold text-ink/40 uppercase tracking-wider block">
                            Videos ({vt.referenceReels.length}):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {vt.referenceReels.map((reel, rIdx) => {
                              const url = typeof reel === "string" ? reel : reel.url;
                              if (!url) return null;
                              const label = typeof reel === "object" && reel.title ? reel.title : `Reel #${rIdx + 1}`;
                              return (
                                <a
                                  key={rIdx}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/5 hover:bg-ink hover:text-white text-[11px] font-semibold text-ink/75 transition-all cursor-pointer"
                                  title={url}
                                >
                                  <span className="truncate max-w-[130px]">{label}</span>
                                  <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-ink/40 italic mb-3">No reference videos added yet.</p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-ink/8 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditVideo(vt, vtIdx)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-ink/10 hover:border-ink/20 text-ink/75 hover:text-ink flex items-center gap-1 transition-all"
                      >
                        <Edit3 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(vtIdx)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-red-200 text-red-500 hover:bg-red-50 flex items-center gap-1 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {(!selectedCategory.videoTypes || selectedCategory.videoTypes.length === 0) && (
                  <div className="col-span-2 text-center py-10 border border-dashed border-ink/15 rounded-xl">
                    <Film className="w-8 h-8 text-ink/30 mx-auto mb-2" />
                    <p className="text-xs font-bold text-ink">No video types yet</p>
                    <p className="text-[11px] text-ink/50 mt-0.5 mb-3">
                      Add video reel formats and script blueprints for this category.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenAddVideo}
                      className="px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-lg shadow-xs"
                    >
                      Add First Video Type
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Category Add / Edit */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-card w-full max-w-lg rounded-3xl border border-ink/15 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCatModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-ink/50 hover:text-ink hover:bg-ink/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-ink mb-1">
              {editingCatIndex >= 0 ? "Edit Business Category" : "Add Business Category"}
            </h3>
            <p className="text-xs text-ink/60 mb-5">
              Create or modify a business niche for video marketing strategy.
            </p>

            <form onSubmit={handleSaveCat} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Short Name (e.g. Restaurants & Cafes)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Real Estate & Architecture"
                  value={catFormData.name}
                  onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Full Heading / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Real Estate, Luxury Villas & Properties"
                  value={catFormData.fullName}
                  onChange={(e) => setCatFormData({ ...catFormData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">URL Slug (e.g. real-estate)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. real-estate"
                  value={catFormData.categorySlug}
                  onChange={(e) => setCatFormData({ ...catFormData, categorySlug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Category Description</label>
                <textarea
                  rows="3"
                  placeholder="Cinematic property walkthroughs, pricing breakdowns, drone reveals..."
                  value={catFormData.description}
                  onChange={(e) => setCatFormData({ ...catFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCatModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-ink/15 text-ink/70 hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-ink hover:bg-accent text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Video Type Add / Edit */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-card w-full max-w-2xl rounded-3xl border border-ink/15 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-ink/50 hover:text-ink hover:bg-ink/5"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-ink mb-1">
              {editingVideoIndex >= 0 ? "Edit Video Type" : `Add Video Type to ${selectedCategory.name}`}
            </h3>
            <p className="text-xs text-ink/60 mb-5">
              Define the reel blueprint format, visual hook, script concept, and reference reel.
            </p>

            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Video Format Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Menu & Price Reveal"
                    value={videoFormData.title}
                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Tag / Category Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. Budget & Value / Viral Hook"
                    value={videoFormData.tag}
                    onChange={(e) => setVideoFormData({ ...videoFormData, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Subtitle / Hook</label>
                <input
                  type="text"
                  placeholder="e.g. 'With ₹___, What Can You Eat at This Restaurant?'"
                  value={videoFormData.subtitle}
                  onChange={(e) => setVideoFormData({ ...videoFormData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 30-45s / 45-60s"
                  value={videoFormData.duration}
                  onChange={(e) => setVideoFormData({ ...videoFormData, duration: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden font-mono"
                />
                <span className="text-[11px] text-ink/50 mt-1 block">
                  ✨ Video thumbnail automatically loads directly from the Instagram Reel.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Concept & Script Description</label>
                <textarea
                  rows={6}
                  placeholder="Explain how this reel format works, the visual pacing, and why it performs well..."
                  value={videoFormData.description}
                  onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden leading-relaxed min-h-[140px] resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Creative Direction / Shooting Guide</label>
                <textarea
                  rows={5}
                  placeholder="Camera angles, lightning, voice-over guidelines, sound selection..."
                  value={videoFormData.creativeDirection}
                  onChange={(e) => setVideoFormData({ ...videoFormData, creativeDirection: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden leading-relaxed min-h-[120px] resize-y"
                />
              </div>

              {/* Reference Videos & Showcase Reels */}
              <div className="pt-2 border-t border-ink/10">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <label className="block text-xs font-bold text-ink">
                      Reference Videos / Reels ({videoFormData.referenceReels?.length || 0})
                    </label>
                    <p className="text-[11px] text-ink/60">
                      Add multiple Instagram reels or video links for this format.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddReel}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-ink hover:bg-accent rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Video
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {(videoFormData.referenceReels || []).map((reel, rIdx) => (
                    <div
                      key={reel.id || rIdx}
                      className="p-3 rounded-xl border border-ink/10 bg-black/[0.02] flex items-center gap-2.5"
                    >
                      <span className="text-xs font-bold text-ink/40 w-5 text-center">
                        #{rIdx + 1}
                      </span>

                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2">
                        <div className="sm:col-span-5">
                          <input
                            type="text"
                            placeholder="Video Title / Label (e.g. Menu Reveal)"
                            value={reel.title}
                            onChange={(e) => handleUpdateReel(rIdx, "title", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-ink/15 text-xs focus:border-accent focus:outline-hidden bg-white"
                          />
                        </div>
                        <div className="sm:col-span-7">
                          <input
                            type="url"
                            placeholder="https://www.instagram.com/reel/..."
                            value={reel.url}
                            onChange={(e) => handleUpdateReel(rIdx, "url", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg border border-ink/15 text-xs focus:border-accent focus:outline-hidden bg-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {reel.url && (
                          <a
                            href={reel.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-ink/50 hover:text-accent rounded-md hover:bg-white"
                            title="Test Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveReel(rIdx)}
                          disabled={videoFormData.referenceReels.length <= 1}
                          className="p-1.5 text-ink/40 hover:text-red-500 rounded-md hover:bg-white disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                          title="Remove Video"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-ink/15 text-ink/70 hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-ink hover:bg-accent text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Video Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
