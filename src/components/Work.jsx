"use client";

import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    id: "ddine-kitchen",
    number: "/001/",
    category: "hospitality",
    categoryLabel: "Restaurant & Dining",
    name: "D Dine Kitchen",
    location: "Salugara, Siliguri",
    image: "/images/work-ddine-kitchen.webp",
    link: "https://ddinekitchen.shop",
  },
  {
    id: "lensaura-photography",
    number: "/002/",
    category: "lifestyle",
    categoryLabel: "Creative Studio",
    name: "LensAura Photography",
    location: "Kolkata & Siliguri",
    image: "/images/work-photographer.webp",
    link: "https://photographer-hazel.vercel.app/",
  },
  {
    id: "car-wash",
    number: "/003/",
    category: "automotive",
    categoryLabel: "Automotive Care",
    name: "Auto Detailing Car Wash",
    location: "Siliguri",
    image: "/images/work-car-wash.webp",
    link: "https://car-washing-website-psi.vercel.app/",
  },
  {
    id: "arhan-fabricators",
    number: "/004/",
    category: "industrial",
    categoryLabel: "B2B & Industrial",
    name: "Arhan Fabricators",
    location: "Lucknow",
    image: "/images/work-arhan-fabricators.webp",
    link: "https://arhan-fabricators.vercel.app/",
  },
  {
    id: "bold-and-beautiful",
    number: "/005/",
    category: "lifestyle",
    categoryLabel: "Salon & Wellness",
    name: "Bold & Beautiful Salon",
    location: "Salugara, Siliguri",
    image: "/images/work-bold-beautiful.webp",
    link: "https://www.boldandbeautiful.co.in/",
  },
  {
    id: "cheesy-classics",
    number: "/006/",
    category: "hospitality",
    categoryLabel: "Cafe & Bistro",
    name: "Cheesy Classics",
    location: "Barasat",
    image: "/images/work-cheesy-classics.webp",
    link: "https://classic-cheesy.vercel.app/",
  },
];

export default function Work({ sectionNumber = "/002/" }) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

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
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-8 sm:mt-10">
          {projects.map((p) => (
            <article
              key={p.id}
              className="bg-card rounded-2xl sm:rounded-3xl border border-ink/10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)] transition-all duration-500 group"
            >
              {/* Browser Mockup */}
              <div className="bg-ink/[0.03] p-2 sm:p-3 lg:p-4 border-b border-ink/8">
                <div className="w-full rounded-lg sm:rounded-xl overflow-hidden border border-ink/10 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.05)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.09)] group-hover:border-ink/20 transition-all duration-500">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 bg-ink/[0.03] border-b border-ink/8 gap-2">
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#ff5f56]" />
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#ffbd2e]" />
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-ink/55 bg-white px-2 sm:px-3 py-0.5 rounded-full border border-ink/8 truncate flex-1 min-w-0 text-center">
                      {p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-green shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                      Live
                    </div>
                  </div>

                  {/* Screenshot */}
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit live website for ${p.name}`}
                    className="block relative aspect-[16/9] sm:aspect-[16/8] overflow-hidden bg-ink/5"
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} website screenshot`}
                      width={1600}
                      height={900}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Tap overlay — visible on touch devices too */}
                    <div className="absolute inset-0 bg-ink/25 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-ink rounded-full shadow-xl">
                        Visit Live Website
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
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

              {/* Card Footer */}
              <div className="px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3">
                {/* Left: meta + name + location */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                    <span className="font-serif italic text-[13px] sm:text-sm text-accent font-semibold shrink-0">
                      {p.number}
                    </span>
                    <span className="text-ink/20 text-xs hidden xs:inline">•</span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-ink/50 truncate">
                      {p.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-ink tracking-[-0.01em] leading-tight mb-0.5">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors line-clamp-1"
                    >
                      {p.name}
                    </a>
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-ink/40 font-medium">
                    {p.location}
                  </span>
                </div>

                {/* Right: actions — stacked, right-aligned */}
                <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Explore ${p.name} live website`}
                    className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-ink hover:text-accent active:text-accent transition-colors group/link min-h-[32px]"
                  >
                    <span>Explore</span>
                    <svg
                      width="11"
                      height="11"
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
                    aria-label="Build a similar website"
                    className="text-[10px] sm:text-[11px] font-semibold text-ink/40 hover:text-ink active:text-ink underline underline-offset-4 transition-colors min-h-[24px] flex items-center"
                  >
                    Build Similar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
