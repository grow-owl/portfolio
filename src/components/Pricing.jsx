"use client";

import { useState } from "react";
import { useScrollReveal, useMultiReveal } from "../hooks/useScrollReveal";

const Check = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="text-accent shrink-0"
  >
    <path
      d="M3 8L6.5 11.5L13 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Clock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M7 4V7L9 9"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const websitePlans = [
  {
    id: "quick-launch",
    label: "Quick Launch",
    tagline: "A single, polished landing page to get you online fast.",
    original: "₹5,999",
    current: "₹2,999",
    period: "one-time",
    timeline: "2-3 days delivery",
    features: [
      "1 page (landing page)",
      "Mobile responsive design",
      "WhatsApp / call-to-action button",
      "Basic on-page SEO",
      "Contact form or WhatsApp integration",
    ],
    cta: "Get Quick Launch →",
    btnStyle:
      "border-[1.5px] border-ink/20 text-ink hover:border-accent hover:text-accent",
  },
  {
    id: "essentials",
    label: "Essentials",
    tagline:
      "Perfect for startups and small businesses getting started online.",
    original: "₹13,499",
    current: "₹7,499",
    period: "one-time",
    timeline: "5-7 days delivery",
    features: [
      "3-5 pages",
      "Basic branding setup",
      "Mobile responsive design",
      "Simple animations",
      "Contact form integration",
      "Basic SEO setup",
    ],
    cta: "Get Essentials →",
    btnStyle:
      "border-[1.5px] border-ink/20 text-ink hover:border-accent hover:text-accent",
  },
  {
    id: "standard",
    label: "Standard",
    tagline: "For growing businesses ready to make a serious impact online.",
    original: "₹34,999",
    current: "₹19,999",
    period: "one-time",
    timeline: "2-3 weeks delivery",
    popular: true,
    features: [
      "6-10 pages",
      "Full responsive design",
      "CMS integration",
      "Custom animations",
      "Advanced on-page SEO",
      "Analytics dashboard",
      "1 month post-launch support",
    ],
    cta: "Get Standard →",
    btnStyle:
      "bg-ink text-white hover:bg-accent hover:shadow-[0_8px_24px_rgba(252,54,55,0.25)]",
  },
  {
    id: "advanced",
    label: "Advanced",
    tagline: "Enterprise-grade solutions for brands that demand excellence.",
    original: "₹67,999",
    current: "₹37,999",
    period: "one-time",
    timeline: "4-6 weeks delivery",
    features: [
      "10+ pages",
      "Advanced CMS architecture",
      "Custom components & interactions",
      "Multilingual support (optional)",
      "Strategy sessions included",
      "Complete design system",
      "3 months post-launch support",
      "Priority communication",
    ],
    cta: "Get Advanced →",
    btnStyle:
      "border-[1.5px] border-ink/20 text-ink hover:border-accent hover:text-accent",
  },
];

const seoPlans = [
  {
    id: "seo-starter",
    label: "SEO Starter",
    tagline:
      "Ongoing on-page optimization to start ranking for the terms that matter.",
    original: "₹7,999",
    current: "₹4,499",
    period: "/month",
    timeline: "Monthly retainer, cancel anytime",
    features: [
      "On-page SEO optimization",
      "5 target keywords tracked",
      "Monthly performance report",
      "Technical SEO health checks",
      "Google Search Console monitoring",
    ],
    cta: "Get SEO Starter →",
    btnStyle:
      "border-[1.5px] border-ink/20 text-ink hover:border-accent hover:text-accent",
  },
  {
    id: "seo-growth",
    label: "SEO Growth",
    tagline:
      "A more hands-on approach for businesses ready to compete for rankings.",
    original: "₹15,999",
    current: "₹8,999",
    period: "/month",
    timeline: "Monthly retainer, cancel anytime",
    popular: true,
    features: [
      "Everything in SEO Starter",
      "15 target keywords tracked",
      "Content optimization (2 pages/month)",
      "Backlink outreach & building",
      "Competitor rank tracking",
      "Priority support",
    ],
    cta: "Get SEO Growth →",
    btnStyle:
      "bg-ink text-white hover:bg-accent hover:shadow-[0_8px_24px_rgba(252,54,55,0.25)]",
  },
];

export default function Pricing({ sectionNumber = "/007/" }) {
  const [activeTab, setActiveTab] = useState("website");
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const activePlans = activeTab === "website" ? websitePlans : seoPlans;
  const setCardRef = useMultiReveal(activePlans.length);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-14 lg:py-20 bg-cream-light"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/60">
            Pricing
          </span>
        </div>

        <h2
          id="pricing-heading"
          ref={titleRef}
          className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink max-w-[800px] text-center mx-auto"
        >
          Transparent <em className="font-serif italic font-medium">pricing</em>{" "}
          for every stage
        </h2>
        <p className="text-[17px] text-ink/60 max-w-[650px] mt-4 leading-[1.7] text-center mx-auto">
          One-time pricing for website builds, flexible monthly plans for
          ongoing SEO — no hidden fees, no long-term lock-in.
        </p>

        {/* Tab Toggle */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => setActiveTab("website")}
            className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 ${
              activeTab === "website"
                ? "bg-ink text-white shadow-sm"
                : "bg-transparent border-[1.5px] border-ink/20 text-ink hover:border-ink"
            }`}
          >
            Website Plans
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 ${
              activeTab === "seo"
                ? "bg-ink text-white shadow-sm"
                : "bg-transparent border-[1.5px] border-ink/20 text-ink hover:border-ink"
            }`}
          >
            SEO Plans
          </button>
        </div>

        {/* Plans Grid */}
        <div
          className={
            activeTab === "website"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
              : "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto mt-12"
          }
        >
          {activePlans.map((p, i) => (
            <div
              key={p.id}
              ref={setCardRef(i)}
              className={`bg-card rounded-2xl p-6 sm:p-7 lg:p-8 border relative flex flex-col hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all ${
                p.popular
                  ? "border-accent shadow-[0_8px_32px_rgba(252,54,55,0.1)]"
                  : "border-ink/10"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.06em] px-5 py-1.5 bg-accent text-white rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold tracking-[-0.02em] block mb-2">
                  {p.label}
                </h3>
                <p className="text-sm text-ink/60 leading-[1.5]">{p.tagline}</p>
              </div>

              <div className="mb-5">
                {p.original && (
                  <span className="text-xs sm:text-sm font-medium text-ink/40 line-through block mb-1">
                    {p.original}
                  </span>
                )}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl lg:text-[28px] xl:text-[36px] font-bold tracking-[-0.04em] text-ink leading-none">
                    {p.current}
                  </span>
                  <span className="text-xs sm:text-[13px] text-ink/40 font-medium whitespace-nowrap">
                    {p.period}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[13px] text-ink/60 font-medium mb-7 pb-7 border-b border-ink/10">
                <Clock />
                <span>{p.timeline}</span>
              </div>

              <ul className="flex flex-col gap-3.5 mb-8 grow">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-ink font-[450]"
                  >
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full text-center inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full transition-all mt-auto ${p.btnStyle}`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
