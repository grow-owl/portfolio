"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const defaultServices = [
  {
    number: "/001/",
    name: "Full Stack Web Development",
    desc: "We engineer robust, custom web applications as a full-stack web development agency. From high-speed static sites to complex React and Node.js applications, custom backend databases, and e-commerce platforms, every line of code is built for peak performance and top search engine rankings.",
    items: [
      "Custom Websites & Web Applications",
      "Node.js & MongoDB Backend Engineering",
      "Custom E-Commerce Website Development",
      "Database Design & REST APIs",
      "Technical Core Web Vitals Optimization",
    ],
  },
  {
    number: "/002/",
    name: "Bespoke Web Design & UI/UX Studio",
    desc: "As a dedicated web design agency, we craft intuitive user interfaces, visual brand identities, and interactive prototypes that captivate visitors. From site wireframing to responsive design systems, we build digital experiences engineered for maximum user conversion.",
    items: [
      "Web & Mobile UI/UX Design",
      "Brand Identity & Visual Systems",
      "Figma Wireframing & Prototyping",
      "Responsive Interactive Design",
      "Design Systems & Component Libraries",
    ],
  },
  {
    number: "/003/",
    name: "SEO Services & Search Marketing",
    desc: "Our SEO marketing agency services ensure your brand dominates search results across Google, Bing, and AI search engines (ChatGPT, Perplexity, Gemini). We implement Schema JSON-LD data, keyword planning, and technical audits to rank you at the top.",
    items: [
      "Technical & On-Page SEO",
      "Schema JSON-LD Structured Data",
      "Keyword Strategy & Intent Planning",
      "Local SEO & Google Business Profile",
      "Competitor Rank Tracking & Audits",
    ],
  },
  {
    number: "/004/",
    name: "Digital Marketing & Performance Ads",
    desc: "We amplify your business growth through targeted digital marketing campaigns, pay-per-click (PPC) ad management, conversion rate optimization (CRO), and lead generation funnels designed to turn clicks into profitable customers.",
    items: [
      "Digital Lead Generation Campaigns",
      "Pay-Per-Click (PPC) & Google Ads",
      "Conversion Rate Optimization (CRO)",
      "Social Media Performance Marketing",
      "Funnel & Analytics Tracking",
    ],
  },
];

const landingServices = [
  {
    number: "/001/",
    name: "Social Media Marketing",
    shortDesc: "High-impact Reels, Shorts, and promotional video ads crafted and published across social media to boost brand reach.",
    tags: ["Reels & Shorts", "Promotional Ads", "Content Creation", "Social Media Growth"],
    link: "/services/digital-marketing",
  },
  {
    number: "/002/",
    name: "Full Stack Website",
    shortDesc: "High-speed custom websites, mobile-first storefronts, and bespoke UI/UX designs.",
    tags: ["Custom Websites", "Bespoke UI/UX", "E-Commerce", "Core Web Vitals"],
    link: "/services/web-development",
  },
  {
    number: "/003/",
    name: "SEO Services",
    shortDesc: "Technical search optimization, Schema JSON-LD data, and Google Maps local ranking.",
    tags: ["Technical SEO", "Schema Data", "Google Maps", "AI Search Ranking"],
    link: "/pricing",
  },
];

export default function Services({ sectionNumber = "/002/", isLanding = false }) {
  const isFirst = sectionNumber === "/001/";
  const [activeIndex, setActiveIndex] = useState(0);
  const [openLandingCard, setOpenLandingCard] = useState(-1);
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? -1 : i));
  const toggleLanding = (i) => setOpenLandingCard((prev) => (prev === i ? -1 : i));

  const list = isLanding ? landingServices : defaultServices;

  if (isLanding) {
    return (
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-12 sm:py-16 lg:py-20 bg-cream border-b border-ink/8 relative overflow-hidden scroll-mt-24"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10">
          {/* Header on top */}
          <div className="text-center max-w-[800px] mx-auto mb-8 sm:mb-10">
            <div
              ref={labelRef}
              className="inline-flex items-center gap-2.5 px-3.5 py-1 bg-ink/5 rounded-full mb-3.5 border border-ink/10"
            >
              <span className="font-serif italic text-sm text-accent font-semibold">
                {sectionNumber}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/80">
                Services
              </span>
            </div>

            <h2
              id="services-heading"
              ref={titleRef}
              className="text-[clamp(28px,4vw,46px)] font-bold leading-[1.18] tracking-[-0.03em] text-ink mb-3 sm:mb-4"
            >
              A quick look at what we{" "}
              <em className="font-serif italic font-medium text-accent">
                do best
              </em>
            </h2>

            <p className="text-sm sm:text-base text-ink/65 max-w-[560px] mx-auto leading-[1.65]">
              Comprehensive digital solutions engineered for growth, high conversion, and real local impact.
            </p>
          </div>

          {/* 3 Services Side-by-side (Compact click-to-expand cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5 items-start">
            {list.map((s, idx) => {
              const isOpen = openLandingCard === idx;
              return (
                <div
                  key={s.number}
                  className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] ${
                    isOpen
                      ? "border-accent/40 shadow-[0_8px_30px_rgba(252,54,55,0.08)] ring-1 ring-accent/20"
                      : "border-ink/10 hover:border-ink/20"
                  }`}
                >
                  {/* Card Header — Always visible, click to expand */}
                  <button
                    type="button"
                    onClick={() => toggleLanding(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-serif italic text-xl sm:text-2xl text-accent font-semibold shrink-0">
                        {s.number}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors truncate">
                        {s.name}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-accent text-white border-accent rotate-45 shadow-sm"
                          : "bg-ink/5 text-ink/70 border-ink/15 group-hover:border-ink/40 group-hover:text-ink"
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 3V13M3 8H13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Concise Expandable Content */}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-[260px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-ink/6">
                      <p className="text-xs sm:text-[13px] text-ink/75 leading-[1.6] mb-3">
                        {s.shortDesc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center text-[10.5px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-ink/[0.04] text-ink/80 border border-ink/8"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a
                        href={s.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-ink transition-colors group/link"
                      >
                        <span>Explore {s.name}</span>
                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={`${
        isFirst ? "pt-28 sm:pt-32 lg:pt-36 pb-14 lg:pb-20" : "py-14 lg:py-20"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/80">
            Services
          </span>
        </div>

        <h2
          id="services-heading"
          ref={titleRef}
          className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink max-w-[800px]"
        >
          A quick look at what we{" "}
          <em className="font-serif italic font-medium">do best</em>
        </h2>

        <div className="mt-14 flex flex-col">
          {list.map((s, i) => {
            const isOpen = activeIndex === i;
            return (
              <div key={i} className="border-t border-ink/10 last:border-b">
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full py-7 cursor-pointer hover:pl-2 transition-all"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-5">
                    <span className="font-serif italic text-xl text-accent min-w-10">
                      {s.number}
                    </span>
                    <h3 className="text-[clamp(22px,2.5vw,32px)] font-semibold tracking-[-0.03em] text-left">
                      {s.name}
                    </h3>
                  </div>
                  <div className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/20 shrink-0 hover:border-ink transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M4 10H16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 4V16"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className={`transition-all duration-300 origin-center ${
                          isOpen ? "scale-y-0 opacity-0" : ""
                        }`}
                      />
                    </svg>
                  </div>
                </button>

                <div className={`accordion-body ${isOpen ? "open" : ""}`}>
                  <div className="pb-8 pl-0 md:pl-[60px]">
                    <p className="text-base text-ink/80 leading-[1.75] mb-6 max-w-[600px]">
                      {s.desc}
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 gap-x-10 mb-7">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-ink font-medium pl-4 relative before:absolute before:left-0 before:top-2 before:w-[5px] before:h-[5px] before:rounded-full before:bg-accent"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      aria-label={`Get started with ${s.name} service`}
                      className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3 bg-transparent text-ink border-[1.5px] border-ink/20 rounded-full hover:border-accent hover:text-accent transition-all min-h-[44px]"
                    >
                      Get Started →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
