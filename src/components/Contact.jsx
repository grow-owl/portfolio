"use client";

import { useState, useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact({ sectionNumber = "/009/" }) {
  const isFirst = sectionNumber === "/001/";
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const formRef = useScrollReveal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Website Development",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-detect service from URL query params (e.g. from Pricing cards)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get("plan");

      if (plan) {
        if (
          plan === "search-profiles" ||
          plan === "food-delivery" ||
          plan === "social-profiles"
        ) {
          setFormData((prev) => ({ ...prev, service: "Profile & Maps Listing" }));
        } else if (plan.startsWith("seo")) {
          setFormData((prev) => ({ ...prev, service: "SEO & Growth" }));
        } else {
          setFormData((prev) => ({ ...prev, service: "Website Development" }));
        }
      }
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          service: formData.service || "Website Development",
          message: formData.message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success !== false) {
        setStatus("sent");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Website Development",
          message: "",
        });
        setTimeout(() => {
          setStatus("idle");
        }, 4000);
      } else {
        throw new Error(
          result.message || "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage(
        err.message ||
          "Could not send message. Please reach us via WhatsApp or Phone."
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={`${
        isFirst
          ? "pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20 bg-dark text-white"
          : "py-16 lg:py-20 bg-dark text-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* --- Left --- */}
          <div ref={leftRef}>
            <div ref={labelRef} className="flex items-center gap-3 mb-10">
              <span className="font-serif italic text-lg text-accent font-medium">
                {sectionNumber}
              </span>
              <span className="text-lg font-medium uppercase tracking-[0.08em] text-white/60">
                Get in Touch
              </span>
            </div>

            <h2
              id="contact-heading"
              ref={titleRef}
              className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-white max-w-[800px]"
            >
              Let's build something{" "}
              <em className="font-serif italic font-medium text-accent">
                extraordinary
              </em>{" "}
              together
            </h2>

            <p className="text-base text-white/60 leading-[1.7] mt-5 mb-8 max-w-110">
              Have a project or business to grow? From high-converting websites
              (₹6,000 to ₹60,000) to business listings across Google, Apple,
              Swiggy, Zomato & Social profiles (@ ₹2,000 each), we're ready to
              bring results. Drop us a line and we'll reply within half an hour.
            </p>

            {/* Quick WhatsApp Action Card */}
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-green">
                  <span className="w-2 h-2 rounded-full bg-green animate-ping" />
                  Quick Response Guaranteed
                </span>
                <p className="text-sm text-white/80 font-medium mt-1">
                  Need immediate discussion or instant quote?
                </p>
              </div>
              <a
                href="https://wa.me/918609504186?text=Hi%20GrowOwl%2C%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold transition-all hover:shadow-[0_4px_16px_rgba(37,211,102,0.35)] shrink-0"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.581 1.884.879 2.796.879 3.182 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c0 5.514-4.486 10-10 10-1.801 0-3.487-.478-4.954-1.312l-5.046 1.374 1.398-5.006c-.928-1.528-1.458-3.32-1.458-5.056 0-5.514 4.486-10 10-10s10 4.486 10 10z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.1em] text-white/60 mb-1">
                  Primary Phone / WhatsApp
                </span>
                <a
                  href="tel:+918609504186"
                  className="text-base font-medium text-white hover:text-accent transition-colors"
                >
                  +91 86095 04186
                </a>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.1em] text-white/60 mb-1">
                  Alternate Phone
                </span>
                <a
                  href="tel:+918944800564"
                  className="text-base font-medium text-white hover:text-accent transition-colors"
                >
                  +91 89448 00564
                </a>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.1em] text-white/60 mb-1">
                  Turnaround
                </span>
                <span className="text-base font-medium text-white">
                  Within 30 Minutes
                </span>
              </div>
              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.1em] text-white/60 mb-1">
                  Location
                </span>
                <span className="text-base font-medium text-white">
                  India (Pan-India Remote)
                </span>
              </div>
            </div>
          </div>

          {/* --- Form --- */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
            id="contact-form"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[13px] font-medium text-white/70 mb-2"
                >
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] placeholder:text-white/25 outline-none focus:border-accent focus:bg-white/10 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[13px] font-medium text-white/70 mb-2"
                >
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@company.com"
                  required
                  className="w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] placeholder:text-white/25 outline-none focus:border-accent focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-[13px] font-medium text-white/70 mb-2"
              >
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 86095 04186"
                className="w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] placeholder:text-white/25 outline-none focus:border-accent focus:bg-white/10 transition-all"
              />
            </div>

            {/* --- Clean Service Selection Pills --- */}
            <div>
              <label className="block text-[13px] font-medium text-white/70 mb-2.5">
                I'm interested in <span className="text-accent">*</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Website Development",
                  "Profile & Maps Listing",
                  "SEO & Growth",
                  "General Consultation",
                ].map((serviceName) => {
                  const isSelected = formData.service === serviceName;
                  return (
                    <button
                      key={serviceName}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, service: serviceName })
                      }
                      className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer border ${
                        isSelected
                          ? "bg-accent border-accent text-white shadow-[0_4px_16px_rgba(252,54,55,0.35)]"
                          : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {serviceName}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[13px] font-medium text-white/70 mb-2"
              >
                Tell us about your project <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your business, website goals, or the profiles you want us to set up..."
                rows="4"
                required
                className="w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] placeholder:text-white/25 outline-none focus:border-accent focus:bg-white/10 transition-all resize-y min-h-30"
              />
            </div>

            {status === "error" && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm flex items-start gap-3">
                <span className="text-base text-red-400">⚠️</span>
                <div className="flex-1">
                  <p className="font-medium text-red-200">{errorMessage}</p>
                  <a
                    href="https://wa.me/918609504186?text=Hi%20GrowOwl%2C%20I%20want%20to%20discuss%20a%20project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent hover:underline text-xs mt-1.5 font-medium"
                  >
                    Direct WhatsApp par baat karein →
                  </a>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                id="form-submit"
                className={`inline-flex items-center justify-center gap-2 text-sm font-semibold px-8 py-4 rounded-full transition-all ${
                  status === "sent"
                    ? "bg-green text-white"
                    : "bg-ink text-white hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(252,54,55,0.25)]"
                } disabled:opacity-70`}
              >
                {status === "sending" && (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="animate-spin"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="40"
                        strokeDashoffset="10"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sending Message...
                  </>
                )}
                {status === "sent" && (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8L6.5 11.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Message Sent Successfully!
                  </>
                )}
                {status === "error" && (
                  <>
                    Retry Sending
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 13L13 3M13 3H5M13 3V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
                {status === "idle" && (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 13L13 3M13 3H5M13 3V11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              <span className="text-xs text-white/40 flex items-center gap-1.5">
                100% confidential & spam-free
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

