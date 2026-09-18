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
      className="py-14 sm:py-16 lg:py-24 bg-cream border-b border-ink/5 relative overflow-hidden"
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
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-ink/5 rounded-full mb-5 sm:mb-6 border border-ink/10"
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
            className="text-[clamp(28px,4.5vw,52px)] font-sans font-bold leading-[1.15] tracking-[-0.03em] text-ink mb-4 sm:mb-5"
          >
            {title}{" "}
            <em className="font-serif italic font-medium">{highlightedTitle}</em>
          </h2>

          {subtitle && (
            <p className="text-[15px] sm:text-[17px] text-ink/75 max-w-[620px] mx-auto leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Centered Video Player Card */}
        <div
          ref={videoCardRef}
          className="max-w-[460px] sm:max-w-[500px] mx-auto bg-card rounded-2xl sm:rounded-3xl border border-ink/10 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-500"
        >
          {/* Top Player Browser/Studio Bar */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 bg-ink/[0.03] border-b border-ink/8 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-ink/60 bg-white px-3 sm:px-4 py-1 rounded-full border border-ink/8 truncate max-w-[220px]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="truncate">{clientName} Reel</span>
            </div>

            <div className="w-12 shrink-0" />
          </div>

          {/* Responsive Media Frame */}
          <div className="p-3 sm:p-4 bg-ink/[0.02] flex items-center justify-center">
            <div className="relative w-full min-h-[480px] sm:min-h-[540px] rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-ink/10 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center">
              <iframe
                src={embedUrl}
                title={`${clientName} Instagram Reel Showcase - GrowOwl`}
                className="w-full h-full min-h-[480px] sm:min-h-[540px] border-0"
                allowTransparency={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                scrolling="no"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
