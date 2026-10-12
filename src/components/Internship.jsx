"use client";

import { useState, useEffect, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ROLES_DATA = {
  "video-editor": {
    id: "video-editor",
    title: "Video Editor Intern",
    tagline: "Video Editing & Visual Storytelling",
    duration: "3 Months",
    track: "3 months · Video editing · Storytelling",
    badge: "Creative Track",
    description:
      "Create engaging videos for brands, social media, and digital campaigns.",
    skills: [
      "Premiere Pro / DaVinci",
      "After Effects",
      "Reels & Shorts Pacing",
      "Sound Design",
      "Visual Storytelling",
      "Color Grading",
    ],
    responsibilities: [
      "Edit high-retention short-form reels and content for real client brands.",
      "Work on narrative brand videos with tight pacing, audio mixing, and sound design.",
      "Create clean motion titles, captions, and visual transitions.",
      "Collaborate directly with our creative lead on production edits and revisions.",
    ],
    requirements: [
      "Hands-on proficiency with Premiere Pro, DaVinci Resolve, or Final Cut Pro.",
      "Understanding of short-form video pacing, hook retention, and music sync.",
      "Basic motion graphics knowledge in After Effects is a plus.",
      "Portfolio, Google Drive folder, or sample reel showing your best video edits.",
    ],
  },
  "fullstack-dev": {
    id: "fullstack-dev",
    title: "Full-Stack Developer Intern",
    tagline: "Modern Web Engineering",
    duration: "3 Months",
    track: "3 months · Frontend · Backend",
    badge: "Engineering Track",
    description:
      "Build and improve websites and web applications while working on practical development tasks.",
    skills: [
      "Next.js / React.js",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Node.js & APIs",
      "SEO Optimization",
      "Git / GitHub",
    ],
    responsibilities: [
      "Build clean, responsive user interfaces using Next.js / React.js and Tailwind CSS.",
      "Connect and implement REST APIs, serverless functions, and interactive features.",
      "Work on SEO optimization, responsive layout, and Core Web Vitals.",
      "Participate in code reviews and ship real features for active web projects.",
    ],
    requirements: [
      "Strong core knowledge of HTML, CSS, JavaScript (ES6+), and React.js.",
      "Familiarity with Next.js / React.js, component-based layout, and state management.",
      "Basic understanding of backend fundamentals (APIs, JSON, Node.js).",
      "GitHub link or live project samples showcasing code you have built.",
    ],
  },
};

export default function Internship() {
  const heroRef = useScrollReveal();
  const rolesRef = useScrollReveal();
  const benefitsRef = useScrollReveal();
  const processRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  // Modals state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedRoleKey, setSelectedRoleKey] = useState("video-editor");
  const [detailsRoleKey, setDetailsRoleKey] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    role: "Video Editor Intern",
    message: "",
    website_url_hp: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  // Turnstile Anti-Bot
  const turnstileRef = useRef(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(
        "File size exceeds 5MB limit. Please upload a smaller file or provide a Google Drive link."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Content = reader.result.split(",")[1];
      setResumeFile({
        filename: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        content: base64Content,
      });
      setErrorMessage("");
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read file. Please try again or provide a link.");
    };
    reader.readAsDataURL(file);
  };

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isApplyModalOpen || detailsRoleKey) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isApplyModalOpen, detailsRoleKey]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsApplyModalOpen(false);
        setDetailsRoleKey(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openApplyModal = (roleKey = "video-editor") => {
    const roleObj = ROLES_DATA[roleKey] || ROLES_DATA["video-editor"];
    setSelectedRoleKey(roleObj.id);
    setFormData((prev) => ({
      ...prev,
      role: roleObj.title,
    }));
    setDetailsRoleKey(null);
    setIsApplyModalOpen(true);
  };

  const handleRoleSelectInModal = (roleKey) => {
    const roleObj = ROLES_DATA[roleKey];
    setSelectedRoleKey(roleKey);
    setFormData((prev) => ({
      ...prev,
      role: roleObj.title,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile && !formData.portfolio.trim()) {
      setFormStatus("error");
      setErrorMessage(
        "Please attach your resume file OR provide a portfolio/drive link."
      );
      return;
    }

    setFormStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "Not provided",
          service: `Internship Application — ${formData.role}`,
          message: `Position: ${formData.role}\nAttached Resume: ${
            resumeFile
              ? `${resumeFile.filename} (${resumeFile.size})`
              : "None (provided link instead)"
          }\nPortfolio / Drive / GitHub Link: ${
            formData.portfolio.trim() || "None provided"
          }\n\nNote:\n${
            formData.message.trim() ||
            "Interested in working on practical GrowOwl projects."
          }`,
          website_url_hp: formData.website_url_hp || "",
          turnstileToken: turnstileToken || "",
          resume: resumeFile
            ? {
                filename: resumeFile.filename,
                content: resumeFile.content,
              }
            : undefined,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        setFormStatus("sent");
        setResumeFile(null);
        setTurnstileToken("");
        if (turnstileRef.current) {
          turnstileRef.current.reset();
        }
        setFormData({
          name: "",
          email: "",
          phone: "",
          portfolio: "",
          role: ROLES_DATA[selectedRoleKey]?.title || "Video Editor Intern",
          message: "",
          website_url_hp: "",
        });
      } else {
        throw new Error(
          result.message || "Failed to submit. Please reach out to our team directly."
        );
      }
    } catch (err) {
      console.error("Internship application submission error:", err);
      setFormStatus("error");
      setErrorMessage(
        err.message || "Could not submit application. Please reach out via our contact page."
      );
      if (turnstileRef.current) {
        turnstileRef.current.reset();
      }
    }
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="overflow-x-hidden min-h-screen">
      {/* -------------------------------------------------------------
          1. HERO SECTION
          Balanced, premium 2-column hero layout
      -------------------------------------------------------------- */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 border-b border-ink/10">
        <div className="max-w-[1240px] mx-auto px-5 md:px-10">
          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Heading, Info, and CTAs (Col 1-7) */}
            <div className="lg:col-span-7 max-w-[680px]">
              {/* Category / Status badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-ink/10 shadow-xs mb-5 sm:mb-6">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot" />
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-ink/75 font-heading">
                  GrowOwl Careers · Active Cohort
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.12] tracking-[-0.035em] text-ink mb-5 sm:mb-6">
                Build Skills.{" "}
                <span className="block sm:inline font-normal">
                  Work on <em className="font-serif italic font-normal text-ink">Real Projects.</em>
                </span>
              </h1>

              {/* Short Description */}
              <p className="text-base sm:text-lg text-ink/75 leading-[1.65] max-w-[600px] mb-8 font-normal">
                Start your journey with GrowOwl through hands-on experience, practical learning, and opportunities to work on real-world projects.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-9">
                <button
                  type="button"
                  onClick={() => openApplyModal("video-editor")}
                  className="btn-primary text-sm sm:text-[15px] !py-3.5 !px-8 cursor-pointer shadow-sm hover:shadow-md"
                >
                  Apply Now →
                </button>

                <a
                  href="#open-positions"
                  onClick={(e) => scrollToSection(e, "open-positions")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-ink/20 text-ink hover:border-ink hover:bg-white font-semibold text-sm sm:text-[15px] transition-all bg-white/70 cursor-pointer"
                >
                  <span>Explore Opportunities</span>
                  <span className="text-ink/60">↓</span>
                </a>
              </div>

              {/* Integrated Highlights Strip */}
              <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-[13px] font-medium text-ink/70 flex-wrap pt-5 border-t border-ink/10">
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/70">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  3-Month Duration
                </span>
                <span className="text-ink/30">•</span>
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/70">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  2 Open Roles
                </span>
                <span className="text-ink/30">•</span>
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink/70">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Certificate & Mentorship
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Role Spotlight Card (Col 8-12) */}
            <div className="lg:col-span-5 w-full max-w-[460px] mx-auto lg:ml-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-ink/10 shadow-[0_12px_36px_rgba(0,0,0,0.05)] relative">
                {/* Spotlight Card Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-ink/10">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block font-heading mb-0.5">
                      Current Openings
                    </span>
                    <span className="text-base sm:text-lg font-bold text-ink">
                      Active Positions
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cream text-ink text-xs font-semibold border border-ink/5">
                    2 Tracks Open
                  </span>
                </div>

                {/* Role 1 Card Item */}
                <div
                  onClick={() => openApplyModal("video-editor")}
                  className="group p-4 rounded-2xl bg-cream-light/80 hover:bg-cream border border-ink/5 hover:border-ink/20 transition-all cursor-pointer mb-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-ink group-hover:text-ink leading-tight mb-0.5">
                        Video Editor Intern
                      </h4>
                      <span className="text-[11px] text-ink/60 font-medium">
                        Creative & Storytelling
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-ink bg-white px-3 py-1 rounded-full border border-ink/10 shadow-2xs group-hover:bg-ink group-hover:text-white transition-all">
                      Apply →
                    </span>
                  </div>
                </div>

                {/* Role 2 Card Item */}
                <div
                  onClick={() => openApplyModal("fullstack-dev")}
                  className="group p-4 rounded-2xl bg-cream-light/80 hover:bg-cream border border-ink/5 hover:border-ink/20 transition-all cursor-pointer mb-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-ink group-hover:text-ink leading-tight mb-0.5">
                        Full-Stack Developer Intern
                      </h4>
                      <span className="text-[11px] text-ink/60 font-medium">
                        Frontend & Backend
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-ink bg-white px-3 py-1 rounded-full border border-ink/10 shadow-2xs group-hover:bg-ink group-hover:text-white transition-all">
                      Apply →
                    </span>
                  </div>
                </div>

                {/* Card Bottom Note */}
                <div className="pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink/75">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green" />
                    Remote & 1-on-1 Mentorship
                  </span>
                  <button
                    type="button"
                    onClick={() => openApplyModal("video-editor")}
                    className="font-semibold text-ink hover:underline cursor-pointer"
                  >
                    Quick Apply →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. OPEN POSITIONS
          Clean two-card layout without excessive bright colors
      -------------------------------------------------------------- */}
      <section
        id="open-positions"
        className="py-16 sm:py-20 bg-cream-light/60 border-b border-ink/10 scroll-mt-20"
      >
        <div className="max-w-[1140px] mx-auto px-5 md:px-10">
          <div ref={rolesRef} className="max-w-[640px] mb-10 sm:mb-14">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink/60 font-heading">
                Open Positions
              </span>
            </div>
            <h2 className="text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] text-ink mb-2.5">
              Available Opportunities
            </h2>
            <p className="text-sm sm:text-base text-ink/70">
              Apply for the position that best matches your creative or engineering focus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Position 1: Video Editor Intern */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-ink/10 shadow-xs hover:border-ink/25 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cream text-ink text-xs font-semibold border border-ink/5">
                    Creative Track
                  </span>
                  <span className="text-xs text-ink/60 font-medium">
                    3 Months · Remote
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-ink mb-1.5">
                  Video Editor Intern
                </h3>

                <p className="text-xs sm:text-sm font-medium text-ink/60 mb-4">
                  3 months · Video editing · Storytelling
                </p>

                <p className="text-sm text-ink/75 leading-relaxed mb-6">
                  Create engaging videos for brands, social media, and digital campaigns.
                </p>

                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-2.5">
                    Key Skills & Focus
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ROLES_DATA["video-editor"].skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-cream/70 text-ink text-xs font-medium border border-ink/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-ink/10 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDetailsRoleKey("video-editor")}
                  className="w-full py-2.5 px-4 rounded-full border border-ink/20 text-ink font-semibold text-xs sm:text-sm hover:border-ink hover:bg-cream/40 transition-colors text-center cursor-pointer"
                >
                  View Details →
                </button>
                <button
                  type="button"
                  onClick={() => openApplyModal("video-editor")}
                  className="w-full py-2.5 px-4 rounded-full bg-ink hover:bg-black/85 text-white font-semibold text-xs sm:text-sm transition-all text-center shadow-xs cursor-pointer"
                >
                  Apply Now →
                </button>
              </div>
            </div>

            {/* Position 2: Full-Stack Developer Intern */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-ink/10 shadow-xs hover:border-ink/25 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cream text-ink text-xs font-semibold border border-ink/5">
                    Engineering Track
                  </span>
                  <span className="text-xs text-ink/60 font-medium">
                    3 Months · Remote
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-ink mb-1.5">
                  Full-Stack Developer Intern
                </h3>

                <p className="text-xs sm:text-sm font-medium text-ink/60 mb-4">
                  3 months · Frontend · Backend
                </p>

                <p className="text-sm text-ink/75 leading-relaxed mb-6">
                  Build and improve websites and web applications while working on practical development tasks.
                </p>

                <div className="mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink/50 block mb-2.5">
                    Key Skills & Focus
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ROLES_DATA["fullstack-dev"].skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-cream/70 text-ink text-xs font-medium border border-ink/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-ink/10 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDetailsRoleKey("fullstack-dev")}
                  className="w-full py-2.5 px-4 rounded-full border border-ink/20 text-ink font-semibold text-xs sm:text-sm hover:border-ink hover:bg-cream/40 transition-colors text-center cursor-pointer"
                >
                  View Details →
                </button>
                <button
                  type="button"
                  onClick={() => openApplyModal("fullstack-dev")}
                  className="w-full py-2.5 px-4 rounded-full bg-ink hover:bg-black/85 text-white font-semibold text-xs sm:text-sm transition-all text-center shadow-xs cursor-pointer"
                >
                  Apply Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. WHAT YOU'LL GAIN (Why Join GrowOwl?)
          4 clear, concise benefits in clean neutral cards
      -------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 border-b border-ink/10 bg-white">
        <div className="max-w-[1140px] mx-auto px-5 md:px-10">
          <div ref={benefitsRef} className="text-center max-w-[650px] mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink/60 font-heading block mb-2">
              Why Join GrowOwl?
            </span>
            <h2 className="text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] text-ink mb-2.5">
              What You'll Gain
            </h2>
            <p className="text-sm sm:text-base text-ink/70">
              Structured to give you actual hands-on skills, mentorship, and career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Point 1 */}
            <div className="p-6 rounded-2xl bg-cream-light/60 border border-ink/10 hover:border-ink/20 hover:bg-white transition-all flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-ink/40 font-semibold text-2xl block mb-3">
                  01
                </span>
                <h3 className="text-base font-bold text-ink mb-1.5">
                  Practical Experience
                </h3>
                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                  Work on real projects and meaningful tasks.
                </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="p-6 rounded-2xl bg-cream-light/60 border border-ink/10 hover:border-ink/20 hover:bg-white transition-all flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-ink/40 font-semibold text-2xl block mb-3">
                  02
                </span>
                <h3 className="text-base font-bold text-ink mb-1.5">
                  Guidance & Learning
                </h3>
                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                  Improve your skills with feedback and guidance.
                </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="p-6 rounded-2xl bg-cream-light/60 border border-ink/10 hover:border-ink/20 hover:bg-white transition-all flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-ink/40 font-semibold text-2xl block mb-3">
                  03
                </span>
                <h3 className="text-base font-bold text-ink mb-1.5">
                  Completion Certificate
                </h3>
                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                  Receive a certificate after successful completion.
                </p>
              </div>
            </div>

            {/* Point 4 */}
            <div className="p-6 rounded-2xl bg-cream-light/60 border border-ink/10 hover:border-ink/20 hover:bg-white transition-all flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-ink/40 font-semibold text-2xl block mb-3">
                  04
                </span>
                <h3 className="text-base font-bold text-ink mb-1.5">
                  Career Opportunity
                </h3>
                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                  Potential full-time opportunity based on performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. HOW IT WORKS
          Simple three-step process:
          1. Apply online (01 — Submit your application)
          2. Shortlisting and interview (02 — Attend the selection process)
          3. Start your internship (03 — Begin your GrowOwl journey)
      -------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-cream-light/60 border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-5 md:px-10">
          <div ref={processRef} className="text-center max-w-[650px] mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink/60 font-heading block mb-2">
              Application Flow
            </span>
            <h2 className="text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] text-ink mb-2.5">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-ink/70">
              Simple three-step process to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Step 1 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-ink/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif italic text-ink/40 font-semibold text-2xl">
                    01
                  </span>
                  <span className="text-[11px] font-semibold text-ink/60 uppercase tracking-wider">
                    Step 1
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">
                  Submit your application
                </h3>
                <p className="text-xs text-ink/60 font-semibold uppercase tracking-wider mb-2">
                  Apply online
                </p>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Fill out our straightforward application form with your details and your resume, portfolio, or GitHub link.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-ink/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif italic text-ink/40 font-semibold text-2xl">
                    02
                  </span>
                  <span className="text-[11px] font-semibold text-ink/60 uppercase tracking-wider">
                    Step 2
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">
                  Attend the selection process
                </h3>
                <p className="text-xs text-ink/60 font-semibold uppercase tracking-wider mb-2">
                  Shortlisting & interview
                </p>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Our team reviews candidate submissions and connects with shortlisted applicants for a brief, friendly conversation.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-ink/10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif italic text-ink/40 font-semibold text-2xl">
                    03
                  </span>
                  <span className="text-[11px] font-semibold text-ink/60 uppercase tracking-wider">
                    Step 3
                  </span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">
                  Begin your GrowOwl journey
                </h3>
                <p className="text-xs text-ink/60 font-semibold uppercase tracking-wider mb-2">
                  Start your internship
                </p>
                <p className="text-sm text-ink/70 leading-relaxed">
                  Complete your onboarding, get paired with your mentor, and start working on practical project deliverables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. FINAL CTA
          Normal, clean, neutral CTA card (NO intense red glows or neon shadows)
      -------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-b border-ink/10">
        <div className="max-w-[1140px] mx-auto px-5 md:px-10">
          <div
            ref={ctaRef}
            className="bg-cream-light/80 border border-ink/10 rounded-3xl p-8 sm:p-14 text-center max-w-[840px] mx-auto"
          >
            <span className="text-xs font-semibold tracking-wider uppercase text-ink/60 font-heading block mb-3">
              Careers at GrowOwl
            </span>

            <h2 className="text-[clamp(26px,3.8vw,42px)] font-bold tracking-[-0.03em] text-ink mb-3">
              Ready to start your journey with GrowOwl?
            </h2>

            <p className="text-sm sm:text-base text-ink/75 leading-relaxed mb-8 max-w-[540px] mx-auto">
              Take the first step toward practical experience and professional growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => openApplyModal("video-editor")}
                className="btn-primary text-sm sm:text-[15px] !py-3.5 !px-8 cursor-pointer shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                Apply for Internship →
              </button>

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-ink/20 text-ink hover:border-ink hover:bg-white font-semibold text-sm transition-all w-full sm:w-auto"
              >
                Have questions? Contact Team →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          6. ROLE DETAILS MODAL
      -------------------------------------------------------------- */}
      {detailsRoleKey && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="role-details-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setDetailsRoleKey(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 border border-ink/10 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setDetailsRoleKey(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream text-ink/60 hover:text-ink transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-cream text-ink text-xs font-semibold border border-ink/5">
                {ROLES_DATA[detailsRoleKey]?.badge}
              </span>
              <span className="text-xs text-ink/60 font-medium">
                {ROLES_DATA[detailsRoleKey]?.duration} · Remote
              </span>
            </div>

            <h3 id="role-details-title" className="text-2xl font-bold text-ink mb-1.5">
              {ROLES_DATA[detailsRoleKey]?.title}
            </h3>
            <p className="text-sm text-ink/75 mb-6">
              {ROLES_DATA[detailsRoleKey]?.description}
            </p>

            {/* What you'll do */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2.5">
                What You'll Work On
              </h4>
              <ul className="space-y-2">
                {ROLES_DATA[detailsRoleKey]?.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80">
                    <span className="text-ink/60 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="mb-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2.5">
                What We Look For
              </h4>
              <ul className="space-y-2">
                {ROLES_DATA[detailsRoleKey]?.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80">
                    <span className="text-ink/60 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="mb-7">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink/60 mb-2.5">
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {ROLES_DATA[detailsRoleKey]?.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-cream/70 text-ink text-xs font-medium border border-ink/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-5 border-t border-ink/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDetailsRoleKey(null)}
                className="px-4 py-2.5 rounded-full border border-ink/20 text-ink font-semibold text-xs sm:text-sm hover:bg-cream/40 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => openApplyModal(detailsRoleKey)}
                className="px-6 py-2.5 rounded-full bg-ink hover:bg-black/85 text-white font-semibold text-xs sm:text-sm transition-all text-center cursor-pointer shadow-xs"
              >
                Apply for this Role →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          7. APPLICATION MODAL / FORM
          Clean, mobile-optimized, neutral styling
      -------------------------------------------------------------- */}
      {isApplyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-ink/10 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream text-ink/60 hover:text-ink transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {formStatus === "sent" ? (
              /* Success Confirmation View */
              <div className="py-6 text-center">
                <div className="w-14 h-14 rounded-full bg-cream text-ink mx-auto flex items-center justify-center mb-4 border border-ink/10">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-ink mb-2">
                  Application Submitted
                </h3>

                <p className="text-sm text-ink/80 leading-relaxed max-w-md mx-auto mb-6 bg-cream/40 p-4 rounded-2xl border border-ink/5">
                  “Thank you for applying to GrowOwl. We’ll contact you if your profile is shortlisted.”
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus("idle");
                      setIsApplyModalOpen(false);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-ink text-white font-semibold text-xs sm:text-sm hover:bg-black/85 transition-colors cursor-pointer"
                  >
                    Done
                  </button>

                  <a
                    href="/contact"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-ink/20 text-ink hover:border-ink font-semibold text-xs sm:text-sm transition-colors text-center"
                  >
                    Contact Team
                  </a>
                </div>
              </div>
            ) : (
              /* Application Form View */
              <>
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/60 font-heading block mb-1">
                    Application Form
                  </span>
                  <h3 id="apply-modal-title" className="text-2xl font-bold text-ink mb-1">
                    Apply for Internship
                  </h3>
                  <p className="text-xs sm:text-sm text-ink/70">
                    Fill out the form below. Takes less than 2 minutes.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot Field */}
                  <input
                    type="text"
                    name="website_url_hp"
                    value={formData.website_url_hp}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Applying For */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-2">
                      Applying For *
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleRoleSelectInModal("video-editor")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${
                          formData.role === "Video Editor Intern"
                            ? "bg-ink text-white border-ink shadow-xs"
                            : "bg-cream/40 text-ink/80 border-ink/10 hover:border-ink/30"
                        }`}
                      >
                        Video Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRoleSelectInModal("fullstack-dev")}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${
                          formData.role === "Full-Stack Developer Intern"
                            ? "bg-ink text-white border-ink shadow-xs"
                            : "bg-cream/40 text-ink/80 border-ink/10 hover:border-ink/30"
                        }`}
                      >
                        Full-Stack Developer
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="modal-name"
                      className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl bg-cream/30 border border-ink/15 text-ink placeholder:text-ink/40 text-sm focus:outline-none focus:border-ink focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="modal-email"
                        className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream/30 border border-ink/15 text-ink placeholder:text-ink/40 text-sm focus:outline-none focus:border-ink focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="modal-phone"
                        className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="modal-phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl bg-cream/30 border border-ink/15 text-ink placeholder:text-ink/40 text-sm focus:outline-none focus:border-ink focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Attach Resume Option */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-1.5">
                      Attach Resume <span className="text-ink/40 font-normal">(PDF, DOCX max 5MB)</span>
                    </label>
                    {resumeFile ? (
                      <div className="flex items-center justify-between p-3 rounded-xl bg-cream/50 border border-ink/15 text-xs text-ink font-medium">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-base">📄</span>
                          <span className="truncate font-semibold">{resumeFile.filename}</span>
                          <span className="text-ink/50 text-[11px]">({resumeFile.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="text-ink/60 hover:text-ink font-bold px-2 py-1 rounded hover:bg-black/5 transition-colors cursor-pointer shrink-0"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-ink/25 hover:border-ink bg-cream/20 hover:bg-cream/40 transition-all cursor-pointer text-xs font-semibold text-ink/80">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-ink/60"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>Click to Attach Resume File</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Portfolio / GitHub / Drive Link */}
                  <div>
                    <label
                      htmlFor="modal-portfolio"
                      className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-1"
                    >
                      Portfolio / GitHub / Drive Link{" "}
                      <span className="text-ink/40 font-normal">
                        {resumeFile ? "(Optional)" : "(Or enter URL here)"}
                      </span>
                    </label>
                    <input
                      type="text"
                      id="modal-portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="Google Drive, Dropbox, Portfolio, or GitHub URL"
                      className="w-full px-4 py-2.5 rounded-xl bg-cream/30 border border-ink/15 text-ink placeholder:text-ink/40 text-sm focus:outline-none focus:border-ink focus:bg-white transition-all"
                    />
                  </div>

                  {/* Short Note */}
                  <div>
                    <label
                      htmlFor="modal-message"
                      className="block text-xs font-bold uppercase tracking-wider text-ink/70 mb-1"
                    >
                      Short Note <span className="text-ink/40 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Brief note about your background or why you'd like to join..."
                      className="w-full px-4 py-2.5 rounded-xl bg-cream/30 border border-ink/15 text-ink placeholder:text-ink/40 text-sm focus:outline-none focus:border-ink focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {formStatus === "error" && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  {/* Cloudflare Turnstile Anti-Bot Challenge */}
                  {turnstileSiteKey &&
                    !turnstileSiteKey.includes("your_cloudflare") && (
                      <div className="flex justify-center my-2">
                        <Turnstile
                          ref={turnstileRef}
                          siteKey={turnstileSiteKey}
                          onSuccess={(token) => setTurnstileToken(token)}
                          onError={() => setTurnstileToken("")}
                          onExpire={() => setTurnstileToken("")}
                        />
                      </div>
                    )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full py-3.5 rounded-xl bg-ink hover:bg-black/85 text-white font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <span>Submit Application →</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
