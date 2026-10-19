"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, ArrowUp, ArrowDown, ExternalLink, RotateCcw, Save, X, Globe } from "lucide-react";

export default function AdminProjectsManager({ projects, onSave, onReset, isSaving }) {
  const [list, setList] = useState(projects || []);

  useEffect(() => {
    if (projects && Array.isArray(projects)) {
      setList(projects);
    }
  }, [projects]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    number: "",
    category: "",
    name: "",
    location: "",
    image: "",
    link: "",
  });

  const handleOpenAdd = () => {
    setEditingIndex(-1);
    const nextNum = `/00${list.length + 1}/`;
    setFormData({
      id: "proj-" + Date.now(),
      number: nextNum,
      category: "saas",
      name: "",
      location: "SaaS Product",
      image: "/images/work-gymai.webp",
      link: "https://",
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
    if (!formData.name || !formData.link) {
      alert("Please provide Project Name and Live Link");
      return;
    }

    const updated = [...list];
    if (editingIndex >= 0) {
      updated[editingIndex] = { ...formData };
    } else {
      updated.push({ ...formData });
    }

    setList(updated);
    setIsModalOpen(false);
    onSave("projects", updated);
  };

  const handleDelete = (index) => {
    if (confirm(`Are you sure you want to delete project "${list[index].name}"?`)) {
      const updated = list.filter((_, i) => i !== index);
      setList(updated);
      onSave("projects", updated);
    }
  };

  const handleMove = (index, direction) => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= list.length) return;
    const updated = [...list];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    setList(updated);
    onSave("projects", updated);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card rounded-2xl border border-ink/10 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-ink">
            Website Projects &amp; Case Studies ({list.length})
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onReset("projects")}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-ink/15 text-ink/70 hover:text-ink hover:bg-ink/5 transition-all"
            title="Reset to default original projects"
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
            Add New Project
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="bg-card rounded-2xl border border-ink/10 overflow-hidden shadow-xs hover:border-ink/20 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image Preview */}
              <div className="relative aspect-[16/9] w-full bg-ink/5 border-b border-ink/8 overflow-hidden">
                <Image
                  src={proj.image || "/images/work-gymai.webp"}
                  alt={proj.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono font-semibold">
                  {proj.number || `/00${idx + 1}/`}
                </span>
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-ink text-[10px] font-semibold">
                  {proj.location || "SaaS Product"}
                </span>
              </div>

              {/* Info Body */}
              <div className="p-4">
                <h3 className="font-bold text-ink text-base line-clamp-1 mb-1">{proj.name}</h3>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-ink/70 hover:text-accent hover:underline transition-colors break-all"
                >
                  <span className="truncate max-w-[220px]">
                    {proj.link.replace(/^https?:\/\//, "")}
                  </span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="px-4 py-3 bg-ink/[0.02] border-t border-ink/8 flex items-center justify-between gap-2">
              {/* Order Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 rounded-md text-ink/50 hover:text-ink hover:bg-black/5 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === list.length - 1}
                  className="p-1 rounded-md text-ink/50 hover:text-ink hover:bg-black/5 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono text-ink/40 ml-1">Pos: {idx + 1}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(idx)}
                  className="p-1.5 rounded-lg border border-ink/10 text-ink/70 hover:text-ink hover:bg-black/5 transition-all cursor-pointer"
                  title="Edit Project"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 rounded-lg border border-ink/10 text-ink/40 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
                  title="Delete Project"
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
              {editingIndex >= 0 ? "Edit Website Project" : "Add New Website Project"}
            </h3>
            <p className="text-xs text-ink/60 mb-5">
              Enter project details, mockup image, and live preview URL.
            </p>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Index Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /001/"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1">Tag / Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SaaS Product / Platform"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Project Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GYMAI Application"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Live Website URL <span className="text-accent">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://gymai-one.vercel.app/"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Screenshot / Image URL or Path <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="/images/work-gymai.webp or https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-ink/15 text-sm focus:border-accent focus:outline-hidden"
                />
                <span className="text-[10.5px] text-ink/50 mt-1 block">
                  Relative local path from /images/ or external image URL.
                </span>
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
                  {editingIndex >= 0 ? "Save Changes" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
