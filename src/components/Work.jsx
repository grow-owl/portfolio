"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const categories = [
  { id: "all", label: "All Projects", count: 6 },
  { id: "hospitality", label: "Food & Dining", count: 2 },
  { id: "automotive", label: "Automotive", count: 1 },
  { id: "industrial", label: "B2B & Industrial", count: 1 },
  { id: "lifestyle", label: "Creative & Lifestyle", count: 2 },
];

const projects = [
  {
    id: "ddine-kitchen",
    number: "/001/",
    year: "2026",
    category: "hospitality",
    categoryLabel: "Restaurant & Dining",
    tag: "Featured Case Study",
    name: "D Dine Kitchen",
    location: "Salugara, Siliguri",
    headline: "Full-scale digital dining hub with table bookings & instant WhatsApp orders",
    desc: "Engineered a high-performance, mobile-first website for D Dine Kitchen. Features a responsive digital menu, one-tap WhatsApp order routing, table reservations, and optimized local Google Map SEO to capture local footfall.",
    results: [
      { label: "Online Orders", value: "+160%" },
      { label: "Load Speed", value: "< 0.8s" },
      { label: "Local SEO", value: "Top 3" },
    ],
    features: ["Online Ordering", "Table Booking", "Local SEO", "Next.js", "Instant WhatsApp CRM"],
    image: "/images/work-ddine-kitchen.webp",
    link: "https://ddinekitchen.shop",
  },
  {
    id: "lensaura-photography",
    number: "/002/",
    year: "2026",
    category: "lifestyle",
    categoryLabel: "Creative Studio",
    tag: "High Performance",
    name: "LensAura Photography",
    location: "Kolkata & Siliguri",
    headline: "Cinematic booking portfolio designed to turn gallery visitors into paying clients",
    desc: "Built a high-fidelity visual experience for an award-winning wedding and portrait studio. Utilizes adaptive WebP image streaming for zero lag while showcasing ultra-high-resolution photo sessions and automated inquiry intake.",
    results: [
      { label: "Speed Score", value: "98/100" },
      { label: "Inquiries", value: "+45%" },
      { label: "Image CDN", value: "Instant" },
    ],
    features: ["Visual Portfolio", "Session Booking", "Next-Gen Image CDN", "React", "Mobile First"],
    image: "/images/work-photographer.webp",
    link: "https://photographer-hazel.vercel.app/",
  },
  {
    id: "car-wash",
    number: "/003/",
    year: "2026",
    category: "automotive",
    categoryLabel: "Automotive Care",
    tag: "Conversion Focus",
    name: "Auto Detailing Car Wash",
    location: "Siliguri",
    headline: "Service menu & one-tap slot booking system that replaces phone call bottlenecks",
    desc: "Created a modern detailing studio platform that eliminates repetitive phone calls. Customers can explore detailing packages, see transparent pricing, and tap once to book slots directly on WhatsApp.",
    results: [
      { label: "Slot Bookings", value: "60+/wk" },
      { label: "Local Search", value: "#1 Rank" },
      { label: "Call Load", value: "-70%" },
    ],
    features: ["Package Calculator", "1-Tap Slot Booking", "Local Business SEO", "Service Showcase"],
    image: "/images/work-car-wash.webp",
    link: "https://car-washing-website-psi.vercel.app/",
  },
  {
    id: "arhan-fabricators",
    number: "/004/",
    year: "2026",
    category: "industrial",
    categoryLabel: "B2B & Industrial",
    tag: "B2B Engine",
    name: "Arhan Fabricators",
    location: "Lucknow",
    headline: "High-trust digital catalog & quotation pipeline for fabrication manufacturing",
    desc: "Designed an authoritative online presence for a custom steel and iron fabrication workshop in Lucknow. Built to establish immediate B2B trust with structural engineers, builders, and direct commercial clients.",
    results: [
      { label: "Quote Leads", value: "15+/wk" },
      { label: "Client Trust", value: "100%" },
      { label: "SEO Rank", value: "Top Tier" },
    ],
    features: ["Product Catalog", "Direct Quote Pipeline", "WhatsApp Gateway", "Technical SEO"],
    image: "/images/work-arhan-fabricators.webp",
    link: "https://arhan-fabricators.vercel.app/",
  },
  {
    id: "bold-and-beautiful",
    number: "/005/",
    year: "2026",
    category: "lifestyle",
    categoryLabel: "Salon & Wellness",
    tag: "Luxury Aesthetic",
    name: "Bold & Beautiful Salon",
    location: "Salugara, Siliguri",
    headline: "Sophisticated beauty experience with categorized pricing & stylist schedules",
    desc: "Crafted a luxury editorial salon web experience highlighting premium beauty treatments, bridal packages, and stylist expertise with direct appointment booking integrations.",
    results: [
      { label: "Web Bookings", value: "80%" },
      { label: "Avg. Session", value: "2.4 min" },
      { label: "Mobile Users", value: "92%" },
    ],
    features: ["Interactive Price Menu", "Bridal Packages", "WhatsApp Appointments", "Instagram Integration"],
    image: "/images/work-bold-beautiful.webp",
    link: "https://www.boldandbeautiful.co.in/",
  },
  {
    id: "cheesy-classics",
    number: "/006/",
    year: "2026",
    category: "hospitality",
    categoryLabel: "Cafe & Bistro",
    tag: "Appetite Driving",
    name: "Cheesy Classics",
    location: "Barasat",
    headline: "Appetite-stirring cafe portal highlighting signature dishes & one-touch maps",
    desc: "Warm, mouth-watering landing page engineered for a trending cafe. Drives repeat local foot traffic through appetizing dish showcases, customer review integration, and Google Maps directions.",
    results: [
      { label: "Map Routes", value: "+210%" },
      { label: "Pre-Orders", value: "Active" },
      { label: "Rating", value: "4.9 ★" },
    ],
    features: ["Visual Menu", "One-Tap Directions", "Social Reviews", "Special Offer Highlights"],
    image: "/images/work-cheesy-classics.webp",
    link: "https://classic-cheesy.vercel.app/",
  },
];

export default function Work({ sectionNumber = "/002/" }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="py-14 sm:py-16 lg:py-24 bg-cream-light border-y border-ink/5"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-5 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto mb-8 sm:mb-12">
          <div
            ref={labelRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-ink/5 rounded-full mb-5 sm:mb-6 border border-ink/10"
          >
            <span className="font-serif italic text-sm text-accent font-semibold">
              {sectionNumber}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/80">
              Client Case Studies
            </span>
          </div>

          <h2
            id="work-heading"
            ref={titleRef}
            className="text-[clamp(28px,4.5vw,52px)] font-sans font-bold leading-[1.15] tracking-[-0.03em] text-ink mb-4 sm:mb-5"
          >
            Projects that <em className="font-serif italic font-medium">speak</em>{" "}
            for themselves
          </h2>

          <p className="text-[15px] sm:text-[17px] text-ink/80 leading-[1.65] sm:leading-[1.7] max-w-[620px] mx-auto">
            From local restaurants and service clinics to manufacturing workshops, here is how we help businesses win more customers, automate bookings, and dominate online.
          </p>

          {/* Interactive Category Filter - Pixel-Perfect 2x2 Grid on Mobile */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 mt-7 sm:mt-9 max-w-sm sm:max-w-none mx-auto">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cursor-pointer h-[44px] flex items-center justify-between sm:justify-center gap-2 text-[12px] sm:text-[13px] font-semibold px-3.5 sm:px-5 rounded-xl sm:rounded-full transition-all duration-300 ${
                    idx === categories.length - 1 ? "col-span-2 sm:col-span-1" : ""
                  } ${
                    isActive
                      ? "bg-ink text-white shadow-[0_4px_14px_rgba(0,0,0,0.15)] scale-[1.01] sm:scale-[1.02]"
                      : "bg-white text-ink/75 border border-ink/10 hover:border-ink/30 hover:text-ink shadow-2xs"
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span
                    className={`w-5 h-5 flex items-center justify-center text-[11px] font-bold rounded-full shrink-0 ml-1.5 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-ink/6 text-ink/60"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Projects List */}
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14 mt-8 sm:mt-12">
          {filteredProjects.map((p, idx) => (
            <article
              key={p.id}
              className="bg-card rounded-2xl sm:rounded-3xl border border-ink/10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Visual Framed Mockup Column */}
                <div
                  className={`lg:col-span-7 bg-ink/[0.03] p-3 sm:p-6 lg:p-7 flex flex-col justify-center border-b lg:border-b-0 ${
                    idx % 2 === 1
                      ? "lg:order-2 lg:border-l lg:border-ink/8"
                      : "lg:order-1 lg:border-r lg:border-ink/8"
                  }`}
                >
                  <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-ink/10 bg-white group-hover:border-ink/20 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-500">
                    {/* Browser Header Bar */}
                    <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-ink/[0.03] border-b border-ink/8">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-ink/60 bg-white px-2.5 sm:px-4 py-0.5 rounded-full border border-ink/8 truncate max-w-[140px] sm:max-w-[240px]">
                        {p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[11px] font-semibold text-green shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                        Live
                      </div>
                    </div>

                    {/* Uncropped, Sharp Image Canvas */}
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit live website for ${p.name}`}
                      className="block relative aspect-[1600/730] overflow-hidden bg-ink/5"
                    >
                      <Image
                        src={p.image}
                        alt={`${p.name} website preview: ${p.headline}`}
                        width={1600}
                        height={730}
                        loading="lazy"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-ink rounded-full shadow-xl">
                          Visit Live Website
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 13L13 3H5M13 3V11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Content & Case Study Details Column */}
                <div
                  className={`lg:col-span-5 p-4 sm:p-7 lg:p-9 flex flex-col justify-between ${
                    idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    {/* Fixed Top Meta Header */}
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif italic text-sm sm:text-base text-accent font-semibold">
                          {p.number}
                        </span>
                        <span className="text-xs text-ink/30 font-bold">•</span>
                        <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-ink/70">
                          {p.categoryLabel}
                        </span>
                      </div>
                      {p.tag && (
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.06em] text-accent bg-accent/8 border border-accent/20 px-2 sm:px-2.5 py-0.5 rounded-full shrink-0">
                          {p.tag}
                        </span>
                      )}
                    </div>

                    {/* Title & Location */}
                    <div className="mb-2">
                      <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold tracking-[-0.02em] text-ink">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent transition-colors inline-flex items-center gap-2"
                        >
                          {p.name}
                        </a>
                      </h3>
                      <span className="text-xs text-ink/50 font-medium">{p.location}</span>
                    </div>

                    {/* Headline */}
                    <p className="text-sm sm:text-[15px] font-semibold text-ink/90 leading-snug mb-2.5 sm:mb-3">
                      {p.headline}
                    </p>

                    {/* Description */}
                    <p className="text-[13px] sm:text-sm text-ink/75 leading-[1.6] sm:leading-[1.65] mb-4 sm:mb-5">
                      {p.desc}
                    </p>

                    {/* Metrics / Key Impact Grid - High-End 3-Tile Design */}
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 bg-ink/[0.03] rounded-2xl border border-ink/8 mb-4 sm:mb-5">
                      {p.results.map((r, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-xl py-2 sm:py-2.5 px-1 sm:px-2 text-center flex flex-col justify-center items-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-ink/5"
                        >
                          <span className="block text-[13px] xs:text-[14px] sm:text-base font-bold text-accent tracking-tight leading-none mb-1 whitespace-nowrap">
                            {r.value}
                          </span>
                          <span className="block text-[10px] sm:text-[11px] text-ink/70 font-medium leading-tight text-center">
                            {r.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Key Capabilities Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                      {p.features.map((f, i) => (
                        <span
                          key={i}
                          className="text-[10px] sm:text-[11px] font-medium text-ink/80 bg-white border border-ink/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-2xs"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3.5 sm:pt-4 border-t border-ink/8 flex items-center justify-between gap-3 flex-wrap">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-ink hover:text-accent transition-colors group/link"
                    >
                      <span>Explore Live Website</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 shrink-0"
                      >
                        <path
                          d="M3 13L13 3H5M13 3V11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>

                    <a
                      href="/contact"
                      className="text-xs font-semibold text-ink/60 hover:text-ink underline underline-offset-4 transition-colors shrink-0"
                    >
                      Build Similar
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
