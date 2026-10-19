"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, ExternalLink, RotateCcw, Save, X, Video } from "lucide-react";

export default function AdminReelsManager({ reels, onSave, onReset, isSaving }) {
  const [list, setList] = useState(reels || []);

  useEffect(() => {
    if (reels && Array.isArray(reels)) {
      setList(reels);
    }
  }, [reels]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    clientName: "",
    clientCategory: "",
    videoUrl: "",
    clientLink: "",
    description: "",
  });

  const handleOpenAdd = () => {
    setEditingIndex(-1);
    setFormData({
      id: "reel-" + Date.now(),
      clientName: "",
      clientCategory: "Entertainment & Cinema",
      videoUrl: "",
      clientLink: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index) => {
    setEditingIndex(index);
    setFormData({ ...list[index] });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.videoUrl) {
      alert("Please enter Client Name and Reel URL");
      return;
    }

    const updated = [...list];
    if (editingIndex >= 0) {
      updated[editingIndex] = { ...formData };
    } else {
      updated.unshift({ ...formData });
    }

    setList(updated);
    setIsModalOpen(false);
    onSave("reels", updated);
  };

  const handleDelete = (index) => {
    if (confirm(`Are you sure you want to delete reel "${list[index].clientName}"?`)) {
      const updated = list.filter((_, i) => i !== index);
      setList(updated);
      onSave("reels", updated);
    }
  };

  const handleMove = (index, direction) => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= list.length) return;
    const updated = [...list];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    setList(updated);
    onSave("reels", updated);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card rounded-2xl border border-ink/10 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-ink">
            Landing Page Video Reels ({list.length})
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onReset("reels")}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-ink/15 text-ink/70 hover:text-ink hover:bg-ink/5 transition-all"
            title="Reset to default original reels"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-white hover:bg-accent text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Reel
          </button>
        </div>
      </div>

      {/* Reels List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((reel, idx) => (
          <div
            key={reel.id || idx}
            className="bg-card rounded-2xl border border-ink/10 p-4 shadow-xs hover:border-ink/20 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Top: Position Badge & Reorder */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/5 text-ink/70 border border-ink/10 group-hover:border-accent/40 group-hover:text-accent transition-colors">
                  #{idx + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMove(idx, "up")}
                    disabled={idx === 0}
                    className="p-1 rounded-md text-ink/50 hover:text-ink hover:bg-ink/5 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, "down")}
                    disabled={idx === list.length - 1}
                    className="p-1 rounded-md text-ink/50 hover:text-ink hover:bg-ink/5 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="font-bold text-ink text-base line-clamp-1">{reel.clientName}</h3>
              <p className="text-xs text-ink/50 font-medium mb-2 group-hover:text-accent transition-colors">{reel.clientCategory}</p>

              {/* Description */}
              <p className="text-xs text-ink/65 line-clamp-2 mb-3 leading-relaxed">
                {reel.description || "No description provided."}
              </p>
            </div>

            {/* Actions & Links */}
            <div className="pt-3 border-t border-ink/8 flex items-center justify-between gap-2">
              <a
                href={reel.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink/70 hover:text-accent hover:underline transition-colors"
              >
                <span>View Reel</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(idx)}
                  className="p-1.5 rounded-lg border border-ink/10 text-ink/70 hover:text-ink hover:bg-black/5 transition-all cursor-pointer"
                  title="Edit Reel"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 rounded-lg border border-ink/10 text-ink/40 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                  title="Delete Reel"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-card w-full max-w-lg rounded-3xl border border-ink/15 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-ink/50 hover:text-ink hover:bg-ink/5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-ink mb-1">
              {editingIndex >= 0 ? "Edit Video Reel" : "Add New Video Reel"}
            </h3>
            <p className="text-xs text-ink/60 mb-5">
              Enter the client details and Instagram Reel URL to showcase on the homepage.
            </p>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Client / Brand Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PVR INOX Siliguri"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Client Category <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Entertainment & Cinema"
                  value={formData.clientCategory}
                  onChange={(e) => setFormData({ ...formData, clientCategory: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Instagram Reel URL <span className="text-accent">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.instagram.com/reel/DeExBwcR77V/..."
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
                <span className="text-[10.5px] text-ink/50 mt-1 block">
                  Paste the Instagram Reel share link. We automatically extract the embed code.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Website / Profile Link</label>
                <input
                  type="text"
                  placeholder="https://ddinekitchen.shop or Instagram profile"
                  value={formData.clientLink}
                  onChange={(e) => setFormData({ ...formData, clientLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Description / Video SEO Hook</label>
                <textarea
                  rows="3"
                  placeholder="Cinematic commercial reel and audience engagement video created for..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-ink/15 text-ink/70 hover:bg-ink/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-ink hover:bg-accent text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {editingIndex >= 0 ? "Save Changes" : "Add Reel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
