"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Check,
  ArrowUp,
  ArrowDown,
  Tag,
  Clock,
  DollarSign,
  List,
  Star,
  X,
} from "lucide-react";

const PLAN_CATEGORIES = [
  { key: "websitePlans", label: "Website Plans", desc: "One-time website design & development packages" },
  { key: "presencePlans", label: "Presence & Listings", desc: "Google Maps, Apple Maps, Swiggy, Zomato & Social media setups" },
  { key: "seoPlans", label: "SEO Retainer Plans", desc: "Monthly search engine optimization packages" },
];

export default function AdminPricingManager({ initialData, passcode, showToast }) {
  const [pricing, setPricing] = useState(() => initialData || { websitePlans: [], presencePlans: [], seoPlans: [] });

  useEffect(() => {
    if (initialData && typeof initialData === "object") {
      setPricing(initialData);
    }
  }, [initialData]);

  const [activeTab, setActiveTab] = useState("websitePlans");
  const [editingPlan, setEditingPlan] = useState(null);
  const [isNewPlan, setIsNewPlan] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Form State for modal
  const [formData, setFormData] = useState({
    id: "",
    label: "",
    tagline: "",
    original: "",
    current: "",
    period: "one-time",
    timeline: "",
    popular: false,
    cta: "Get Started →",
    features: [""],
  });

  const currentPlans = pricing[activeTab] || [];

  const handleOpenAdd = () => {
    setIsNewPlan(true);
    setFormData({
      id: `plan-${Date.now()}`,
      label: "",
      tagline: "",
      original: "₹9,999",
      current: "₹5,999",
      period: activeTab === "seoPlans" ? "/month" : "one-time",
      timeline: activeTab === "seoPlans" ? "Monthly retainer, cancel anytime" : "2-3 weeks delivery",
      popular: false,
      cta: "Get Started →",
      features: ["Custom feature 1", "Custom feature 2"],
    });
    setEditingPlan("new");
  };

  const handleOpenEdit = (plan) => {
    setIsNewPlan(false);
    setFormData({
      ...plan,
      features: plan.features && plan.features.length > 0 ? [...plan.features] : [""],
    });
    setEditingPlan(plan.id);
  };

  const handleFeatureChange = (index, value) => {
    const nextFeatures = [...formData.features];
    nextFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: nextFeatures }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const handleRemoveFeature = (index) => {
    if (formData.features.length <= 1) return;
    const nextFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: nextFeatures }));
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.label.trim()) {
      showToast("Plan label / title is required", "error");
      return;
    }

    const cleanFeatures = formData.features.map((f) => f.trim()).filter(Boolean);
    const updatedPlan = {
      ...formData,
      features: cleanFeatures.length > 0 ? cleanFeatures : ["Standard service inclusions"],
      btnStyle: formData.popular
        ? "bg-ink text-white hover:bg-accent hover:shadow-[0_8px_24px_rgba(252,54,55,0.25)]"
        : "border-[1.5px] border-ink/20 text-ink hover:border-accent hover:text-accent",
    };

    setPricing((prev) => {
      const list = prev[activeTab] || [];
      let nextList;
      if (isNewPlan) {
        nextList = [...list, updatedPlan];
      } else {
        nextList = list.map((p) => (p.id === updatedPlan.id ? updatedPlan : p));
      }
      return { ...prev, [activeTab]: nextList };
    });

    setHasUnsavedChanges(true);
    setEditingPlan(null);
    showToast(isNewPlan ? "Plan added to list (click Save to publish)" : "Plan updated (click Save to publish)", "info");
  };

  const handleDeletePlan = (planId) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;
    setPricing((prev) => ({
      ...prev,
      [activeTab]: (prev[activeTab] || []).filter((p) => p.id !== planId),
    }));
    setHasUnsavedChanges(true);
    showToast("Plan removed from list (click Save to publish)", "info");
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    const list = [...(pricing[activeTab] || [])];
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    setPricing((prev) => ({ ...prev, [activeTab]: list }));
    setHasUnsavedChanges(true);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          action: "save",
          collection: "pricing",
          data: pricing,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to save pricing");
      }

      setHasUnsavedChanges(false);
      showToast("Pricing plans updated and published successfully!", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset all pricing plans to default? Any custom pricing will be lost.")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          action: "reset",
          collection: "pricing",
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to reset pricing");
      }

      setPricing(json.data);
      setHasUnsavedChanges(false);
      showToast("Pricing reset to factory defaults!", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-ink/10 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-ink">
            Pricing &amp; Packages Manager
          </h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-ink/70 hover:text-ink bg-black/5 hover:bg-black/10 rounded-xl transition cursor-pointer"
            title="Reset to initial default pricing"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-ink hover:bg-accent rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Plan
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving || !hasUnsavedChanges}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl transition ${
              hasUnsavedChanges
                ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md animate-pulse cursor-pointer"
                : "bg-ink/10 text-ink/40 cursor-not-allowed"
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : hasUnsavedChanges ? "Save Changes *" : "Saved"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PLAN_CATEGORIES.map((cat) => {
          const isActive = activeTab === cat.key;
          const count = (pricing[cat.key] || []).length;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? "bg-white border-ink shadow-sm ring-1 ring-ink/20"
                  : "bg-white/40 border-ink/10 hover:border-ink/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-ink">{cat.label}</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${isActive ? "bg-ink text-white" : "bg-ink/10 text-ink/70"}`}>
                  {count} plans
                </span>
              </div>
              <p className="text-[11px] text-ink/60 mt-1 line-clamp-1">{cat.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentPlans.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white/50 rounded-2xl border border-dashed border-ink/20">
            <p className="text-ink/60 text-sm">No plans in this category yet.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-3 text-xs font-semibold text-ink/80 hover:text-accent hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add your first plan
            </button>
          </div>
        ) : (
          currentPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-5 border flex flex-col justify-between transition-all shadow-sm hover:shadow-md group ${
                plan.popular ? "border-ink/30 ring-1 ring-ink/10" : "border-ink/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-ink group-hover:bg-accent text-white rounded-full shadow-sm transition-colors">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <h3 className="font-bold text-base text-ink">{plan.label}</h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMove(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 text-ink/50 hover:text-ink disabled:opacity-20 hover:bg-black/5 rounded-lg cursor-pointer disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(index, 1)}
                      disabled={index === currentPlans.length - 1}
                      className="p-1.5 text-ink/50 hover:text-ink disabled:opacity-20 hover:bg-black/5 rounded-lg cursor-pointer disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-ink/70 mt-1 line-clamp-2 min-h-[32px]">{plan.tagline}</p>

                {/* Price Display */}
                <div className="mt-4 pt-3 border-t border-ink/10 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-ink">{plan.current}</span>
                  {plan.original && (
                    <span className="text-xs text-ink/40 line-through font-medium">{plan.original}</span>
                  )}
                  <span className="text-[11px] text-ink/60">/ {plan.period}</span>
                </div>

                {/* Delivery Timeline */}
                {plan.timeline && (
                  <div className="flex items-center gap-1.5 text-[11px] text-ink/70 mt-2">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    <span>{plan.timeline}</span>
                  </div>
                )}

                {/* Features list preview */}
                <div className="mt-4 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-ink/40 tracking-wider">
                    Features ({plan.features?.length || 0})
                  </div>
                  <ul className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {(plan.features || []).map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-ink/80 flex items-start gap-1.5 leading-snug">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between gap-2">
                <span className="text-[11px] text-ink/50 truncate">CTA: {plan.cta || "Get Started"}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(plan)}
                    className="p-2 text-ink/70 hover:text-ink hover:bg-black/5 rounded-lg text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg text-xs transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit / Add Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-ink/10 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                <Tag className="w-5 h-5 text-accent" />
                {isNewPlan ? "Add New Pricing Plan" : `Edit Plan: ${formData.label}`}
              </h3>
              <button
                onClick={() => setEditingPlan(null)}
                className="text-ink/40 hover:text-ink p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1">Plan Label / Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g. Quick Launch, Growth, Essentials"
                    className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1">Plan Slug / ID</label>
                  <input
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g. quick-launch"
                    className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/80 mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. A single, polished landing page to get you online fast."
                  className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1">Current Price *</label>
                  <input
                    type="text"
                    required
                    value={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                    placeholder="₹6,000"
                    className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1">Original Price</label>
                  <input
                    type="text"
                    value={formData.original}
                    onChange={(e) => setFormData({ ...formData, original: e.target.value })}
                    placeholder="₹9,999"
                    className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1">Billing Period</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="one-time or /month"
                    className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1">Delivery / Retainer Timeline</label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="e.g. 2-3 days delivery, Monthly retainer"
                    className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={formData.cta}
                    onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                    placeholder="e.g. Get Started →"
                    className="w-full px-3 py-2 text-sm border border-ink/20 rounded-xl focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Popular Checkbox */}
              <div className="flex items-center gap-2 p-3 bg-accent/5 rounded-xl border border-accent/20">
                <input
                  type="checkbox"
                  id="popular-plan"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4 text-accent accent-accent rounded cursor-pointer"
                />
                <label htmlFor="popular-plan" className="text-xs font-semibold text-ink cursor-pointer">
                  Highlight as &quot;Most Popular&quot; card (adds red badge and primary button styling)
                </label>
              </div>

              {/* Features List Builder */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-ink/80 flex items-center gap-1.5">
                    <List className="w-4 h-4" /> Plan Features / Bullet Points
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-xs text-accent font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Feature
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[11px] text-ink/40 w-5 font-mono text-right">{idx + 1}.</span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder={`Feature ${idx + 1}`}
                        className="flex-1 px-3 py-1.5 text-xs border border-ink/20 rounded-lg focus:border-accent focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        disabled={formData.features.length <= 1}
                        className="p-1.5 text-red-400 hover:text-red-600 disabled:opacity-20 hover:bg-red-50 rounded cursor-pointer disabled:cursor-not-allowed"
                        title="Remove feature"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink/10">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 text-xs font-semibold text-ink/70 hover:bg-black/5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-semibold text-white bg-ink hover:bg-accent rounded-xl shadow-sm cursor-pointer transition-all"
                >
                  {isNewPlan ? "Add to List" : "Apply Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
