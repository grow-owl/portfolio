"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const projects = [
  {
    id: "gymai",
    number: "/001/",
    category: "saas",
    name: "GYMAI Application",
    location: "SaaS Platform",
    image: "/images/work-gymai.webp",
    link: "https://gymai-one.vercel.app/",
  },
  {
    id: "chai-addaa",
    number: "/002/",
    category: "hospitality",
    name: "Digital Menu Card",
    location: "SaaS Product",
    image: "/images/work-chai-addaa.webp",
    link: "https://digital-menu-beta-one.vercel.app/",
  },
  {
    id: "ddine-kitchen",
    number: "/003/",
    category: "hospitality",
    name: "Cloud Kitchen",
    location: "SaaS Product",
    image: "/images/work-ddine-kitchen.webp",
    link: "https://ddinekitchen.shop",
  },
  {
    id: "car-wash",
    number: "/004/",
    category: "automotive",
    name: "Auto Detailing Car Wash",
    location: "SaaS Platform",
    image: "/images/work-car-wash-grow-owl.webp",
    link: "https://car-wash-grow-owl.vercel.app/",
  },
];

export default function Work({ sectionNumber = "/002/", initialProjects = null }) {
  const displayProjects = initialProjects && initialProjects.length > 0 ? initialProjects : projects;
  const isFirst = sectionNumber === "/001/";
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cards = el.querySelectorAll("article");
    if (!cards.length) return;

    if (scrollLeft <= 15) {
      setActiveIndex(0);
      return;
    }

    if (scrollLeft >= scrollWidth - clientWidth - 15) {
      setActiveIndex(cards.length - 1);
      return;
    }

    const containerRect = el.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((child, idx) => {
      const cardRect = child.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const diff = Math.abs(cardCenter - containerCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [displayProjects.length]);

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("article"));
    if (cards[index]) {
      const containerRect = el.getBoundingClientRect();
      const cardRect = cards[index].getBoundingClientRect();
      const currentScroll = el.scrollLeft;
      const targetScroll = currentScroll + (cardRect.left - containerRect.left) - (containerRect.width - cardRect.width) / 2;

      el.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  };

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll("article"));
    if (!cards.length) return;

    let targetIndex = activeIndex;
    if (direction === "next") {
      targetIndex = Math.min(cards.length - 1, activeIndex + 1);
    } else {
      targetIndex = Math.max(0, activeIndex - 1);
    }
    scrollToIndex(targetIndex);
  };

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className={`${
        isFirst
          ? "pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-cream-light border-b border-ink/8 relative overflow-hidden"
          : "py-16 sm:py-20 lg:py-24 bg-cream-light border-b border-ink/8 relative overflow-hidden"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-5 md:px-10">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-[840px] mx-auto mb-8 sm:mb-12">
          <div
            ref={labelRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-ink/5 rounded-full mb-3.5 sm:mb-4 border border-ink/10"
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
            className="text-[clamp(28px,4.5vw,52px)] font-sans font-bold leading-[1.15] tracking-[-0.03em] text-ink mb-2.5 sm:mb-3.5"
          >
            Projects that{" "}
            <em className="font-serif italic font-medium text-accent">
              speak
            </em>{" "}
            for themselves
          </h2>

          <p className="text-[13px] sm:text-[15px] text-ink/65 max-w-xl mx-auto leading-[1.6]">
            Explore our live client websites built for speed, high conversions,
            and seamless responsiveness.
          </p>
        </div>

        {/* Side Scroll Track */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-5 sm:py-6 -mx-4 sm:-mx-5 md:-mx-10 px-6 sm:px-7 md:px-10 scroll-pl-6 sm:scroll-pl-7 md:scroll-pl-10"
          >
            {displayProjects.map((p, idx) => {
              const isActive = activeIndex === idx;
              return (
                <article
                  key={p.id}
                  className={`shrink-0 snap-start w-[80vw] max-w-[295px] sm:max-w-none sm:w-[340px] md:w-[380px] lg:w-[410px] bg-card rounded-xl sm:rounded-2xl border overflow-hidden shadow-[0_3px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.09)] transition-shadow duration-300 group flex flex-col ${
                    isActive
                      ? "border-accent/40"
                      : "border-ink/10 hover:border-ink/20"
                  }`}
                >
                {/* Browser Mockup */}
                <div className="bg-ink/[0.03] p-2 sm:p-2.5 lg:p-3 border-b border-ink/8">
                  <div className="w-full rounded-md sm:rounded-lg overflow-hidden border border-ink/10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] group-hover:border-ink/20 transition-all duration-500">
                    {/* Browser Bar */}
                    <div className="flex items-center justify-between px-2 sm:px-2.5 py-1 sm:py-1.5 bg-ink/[0.03] border-b border-ink/8 gap-1.5">
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="text-[8.5px] sm:text-[9.5px] font-mono text-ink/55 bg-white px-2 py-0.5 rounded-full border border-ink/8 truncate flex-1 min-w-0 text-center">
                        {p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </div>
                      <div className="flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-semibold text-green shrink-0">
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
                      className="block relative aspect-[16/9] overflow-hidden bg-ink/5"
                    >
                      <Image
                        src={p.image}
                        alt={`${p.name} website screenshot`}
                        width={1600}
                        height={900}
                        loading="lazy"
                        sizes="(max-width: 640px) 76vw, (max-width: 1024px) 380px, 410px"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {/* Tap overlay */}
                      <div className="absolute inset-0 bg-ink/25 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="inline-flex items-center gap-1 text-[10.5px] sm:text-xs font-semibold px-3 py-1.5 bg-white text-ink rounded-full shadow-xl">
                          Visit Live Website
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
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
                <div className="px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 mt-auto">
                  {/* Left: meta + name + location */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
                      <span className="font-serif italic text-[13px] sm:text-sm text-accent font-semibold shrink-0">
                        {p.number}
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
            );
          })}
            {/* Trailing spacer to preserve right margin on mobile */}
            <div className="shrink-0 w-3 sm:w-4" aria-hidden="true" />
          </div>
        </div>

        {/* Bottom Bar: Indicators & Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          {/* Prev Button */}
          <button
            type="button"
            onClick={() => scroll("prev")}
            disabled={!canScrollLeft}
            aria-label="Previous project"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-ink/15 bg-white flex items-center justify-center transition-all shadow-sm ${
              canScrollLeft
                ? "text-ink hover:bg-ink hover:text-white hover:border-ink active:scale-95 cursor-pointer"
                : "text-ink/25 bg-white/50 border-ink/10 cursor-not-allowed"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            {displayProjects.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Jump to project ${p.name}`}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 bg-accent shadow-sm"
                    : "w-2 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => scroll("next")}
            disabled={!canScrollRight}
            aria-label="Next project"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-ink/15 bg-white flex items-center justify-center transition-all shadow-sm ${
              canScrollRight
                ? "text-ink hover:bg-ink hover:text-white hover:border-ink active:scale-95 cursor-pointer"
                : "text-ink/25 bg-white/50 border-ink/10 cursor-not-allowed"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
