"use client";

import Link from "next/link";
import { videoCategories } from "../data/videoCategoriesData";
import { CategoryIcon } from "./VideoCategoryIcons";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function VideoSolutions({ sectionNumber = "/002/" }) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  return (
    <section
      id="video-solutions"
      aria-labelledby="video-solutions-heading"
      className="py-10 sm:py-14 lg:py-16 bg-cream border-b border-ink/5 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-10">
        {/* Compact Minimal Header */}
        <div className="text-center max-w-[680px] mx-auto mb-6 sm:mb-8">
          <div
            ref={labelRef}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-ink/5 rounded-full mb-3 border border-ink/10"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="font-serif italic text-xs sm:text-sm text-accent font-semibold">
              {sectionNumber}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.08em] text-ink/80">
              Video Marketing
            </span>
          </div>

          <h2
            id="video-solutions-heading"
            ref={titleRef}
            className="text-[clamp(24px,3.5vw,38px)] font-sans font-bold leading-[1.2] tracking-[-0.03em] text-ink"
          >
            Video Content That Makes{" "}
            <em className="font-serif italic font-medium">Your Business</em>{" "}
            <span className="text-accent">Stand Out</span>
          </h2>

          <p className="text-[13px] sm:text-[14px] text-ink/65 mt-2 max-w-[500px] mx-auto leading-relaxed">
            Select your industry to explore recommended 60-second reel blueprints &amp; script guides.
          </p>
        </div>

        {/* Ultra-Simplified & Centered Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-[820px] mx-auto">
          {videoCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/videos/${cat.categorySlug}`}
              className="group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white border border-ink/10 text-ink shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:bg-accent hover:border-accent hover:text-white hover:shadow-[0_8px_22px_rgba(252,54,55,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer select-none text-xs sm:text-[13.5px] font-bold"
            >
              <CategoryIcon
                name={cat.iconName}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent group-hover:text-white transition-colors shrink-0"
              />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
