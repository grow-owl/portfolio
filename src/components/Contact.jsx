"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact({ sectionNumber = "/009/" }) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const formRef = useScrollReveal();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", budget: "", message: "" });
      }, 2500);
    }, 1500);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-16 lg:py-20 bg-dark text-white">
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

            <p className="text-base text-white/60 leading-[1.7] mt-5 mb-10 max-w-110">
              Have a project in mind? We'd love to hear about it. Drop us a line
              and we'll get back to you within half an hour.
            </p>

            <div className="flex flex-col gap-6">
              <div>
                <span className="block text-xs font-medium uppercase tracking-[0.1em] text-white/60 mb-1">
                  Phone
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
                  Location
                </span>
                <span className="text-base font-medium text-white">
                  India (Remote)
                </span>
              </div>
            </div>
          </div>

          {/* --- Form --- */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            id="contact-form"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-[13px] font-medium text-white/60 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="GrowOwl Studio"
                required
                className="w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] placeholder:text-white/25 outline-none focus:border-accent focus:bg-white/10 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium text-white/60 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="growowl@company.com"
                required
                className="w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] placeholder:text-white/25 outline-none focus:border-accent focus:bg-white/10 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="budget"
                className="block text-[13px] font-medium text-white/60 mb-2"
              >
                Project / Monthly Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="form-select-arrow w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] outline-none focus:border-accent focus:bg-white/10 transition-all cursor-pointer"
              >
                <option value="" disabled className="bg-[#0a0a0a]">
                  Select a range
                </option>
                <option value="under-5k" className="bg-[#0a0a0a]">
                  Under ₹5,000
                </option>
                <option value="5k-15k" className="bg-[#0a0a0a]">
                  ₹5,000 - ₹15,000
                </option>
                <option value="15k-30k" className="bg-[#0a0a0a]">
                  ₹15,000 - ₹30,000
                </option>
                <option value="30k-plus" className="bg-[#0a0a0a]">
                  ₹30,000+
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-[13px] font-medium text-white/60 mb-2"
              >
                Tell us about your project
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="I need a website for..."
                rows="4"
                required
                className="w-full px-[18px] py-3.5 bg-white/6 border border-white/10 rounded-xl text-white text-[15px] placeholder:text-white/25 outline-none focus:border-accent focus:bg-white/10 transition-all resize-y min-h-30"
              />
            </div>
            <button
              type="submit"
              disabled={status !== "idle"}
              id="form-submit"
              className={`self-start inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all mt-2 ${
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
                  Sending...
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
                  Message Sent!
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
          </form>
        </div>
      </div>
    </section>
  );
}
