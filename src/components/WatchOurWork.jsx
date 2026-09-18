"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

// Helper function to extract embed URL for Instagram Reels and YouTube videos
export function getMediaEmbedUrl(url) {
  if (!url) return "https://www.instagram.com/reel/DdGCfd2zeQk/embed";

  // Check for Instagram Reel or Post
  const igMatch = url.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  if (igMatch && igMatch[1]) {
    return `https://www.instagram.com/reel/${igMatch[1]}/embed`;
  }

  // Check for YouTube embed
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  return url;
}

export default function WatchOurWork({
  sectionNumber = "/003/",
  videoUrl = "https://www.instagram.com/reel/DdGCfd2zeQk/?stkn=ajliemY5emIwb3Rt",
  clientName = "The Mountain Soul Bistro",
  clientCategory = "Hospitality & Restaurant",
  clientLink = "https://ddinekitchen.shop",
  title = "Watch our work in",
  highlightedTitle = "action",
  subtitle = "A curated overview of our design, engineering, and digital solutions.",
  videoDescription = "A detailed case study walkthrough of the restaurant website and digital experience built for The Mountain Soul Bistro.",
}) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const videoCardRef = useScrollReveal();

  const embedUrl = getMediaEmbedUrl(videoUrl);

  // Structured Video Schema for Google SEO Rich Snippets
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${clientName} Case Study - Web Design & Development Walkthrough | GrowOwl`,
    description: videoDescription,
    thumbnailUrl: "https://www.growowl.online/images/work-ddine-kitchen.webp",
    uploadDate: "2025-01-01T08:00:00+05:30",
    embedUrl: embedUrl,
    publisher: {
      "@type": "Organization",
      name: "GrowOwl",
      logo: {
        "@type": "ImageObject",
        url: "https://www.growowl.online/images/growowl-logo.webp",
      },
    },
  };

  return (
    <section
      id="watch-our-work"
      aria-labelledby="watch-our-work-heading"
      className="py-16 sm:py-20 lg:py-24 bg-cream border-b border-ink/5 relative overflow-hidden scroll-mt-24"
    >
      {/* Video SEO Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-5 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto mb-8 sm:mb-12">
          <div
            ref={labelRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-ink/5 rounded-full mb-4 sm:mb-6 border border-ink/10"
          >
            <span className="font-serif italic text-sm text-accent font-semibold">
              {sectionNumber}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/80">
              Watch Our Work
            </span>
          </div>

          <h2
            id="watch-our-work-heading"
            ref={titleRef}
            className="text-[clamp(28px,4.5vw,52px)] font-sans font-bold leading-[1.15] tracking-[-0.03em] text-ink mb-3 sm:mb-5"
          >
            {title}{" "}
            <em className="font-serif italic font-medium">{highlightedTitle}</em>
          </h2>

          {subtitle && (
            <p className="text-[14px] sm:text-[17px] text-ink/75 max-w-[620px] mx-auto leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Centered Mobile-Optimized Video Reel Card */}
        <div
          ref={videoCardRef}
          className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] mx-auto bg-card rounded-2xl sm:rounded-3xl border border-ink/10 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all duration-500"
        >
          {/* Top Browser / Studio Header Bar with Compact View Profile Button */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-ink/[0.03] border-b border-ink/8 gap-2">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-ink/70 bg-white px-2.5 sm:px-3 py-0.5 rounded-full border border-ink/8 truncate max-w-[180px] text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="truncate">{clientName}</span>
            </div>

            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${clientName} on Instagram`}
              className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-accent hover:text-white bg-accent/10 hover:bg-accent px-2 sm:px-2.5 py-0.5 rounded-full transition-all shrink-0 border border-accent/20"
            >
              <span>View Profile</span>
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Fully Responsive Video Viewport - Zero white footer across all mobile screens */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] max-h-[480px] overflow-hidden bg-black flex items-start justify-center">
            <iframe
              src={embedUrl}
              title={`${clientName} Instagram Reel Showcase - GrowOwl`}
              className="absolute inset-x-0 w-full h-[calc(100%+190px)] -top-[54px] border-0 block bg-black"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              scrolling="no"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
