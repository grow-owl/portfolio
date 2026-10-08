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

const DEFAULT_VIDEOS = [
  {
    id: "ddine-bistro",
    videoUrl: "https://www.instagram.com/reel/DdGCfd2zeQk/?stkn=ajliemY5emIwb3Rt",
    clientName: "The Mountain Soul Bistro",
    clientCategory: "Hospitality & Restaurant",
    clientLink: "https://ddinekitchen.shop",
    description: "A detailed case study walkthrough of the restaurant website and digital experience built for The Mountain Soul Bistro.",
  },
  {
    id: "burl-india",
    videoUrl: "https://www.instagram.com/reel/DeMiGCKS2yY/?stkn=MXYyZWN3bWp3Z2J0cA==",
    clientName: "Burl India",
    clientCategory: "Wood Craft & Design",
    clientLink: "https://www.instagram.com/reel/DeMiGCKS2yY/",
    description: "High-impact visual reel and creative brand production designed for Burl India.",
  },
  {
    id: "pvr-inox",
    videoUrl: "https://www.instagram.com/reel/DeExBwcR77V/?stkn=MWoydDUybzR0YmkwcQ==",
    clientName: "PVR INOX Siliguri",
    clientCategory: "Entertainment & Cinema",
    clientLink: "https://www.instagram.com/reel/DeExBwcR77V/",
    description: "Cinematic commercial reel and audience engagement video created for PVR INOX at Vega Circle, Siliguri.",
  },
  {
    id: "chai-addaa",
    videoUrl: "https://www.instagram.com/reel/DeMiDn0ThiV/?stkn=aHMybGltMnQwZ2I1",
    clientName: "Siliguri's Chai Addaa",
    clientCategory: "Rooftop Cafe & Food",
    clientLink: "https://www.instagram.com/reel/DeMiDn0ThiV/",
    description: "Viral ambience and menu showcase reel created for Siliguri's Chai Addaa rooftop cafeteria.",
  },
  {
    id: "alyona-stay",
    videoUrl: "https://www.instagram.com/reel/DeJr-D9vbTw/?stkn=a2IzZXlibnN0amo3",
    clientName: "Alyona Stay",
    clientCategory: "Homestay & Retreat",
    clientLink: "https://www.instagram.com/reel/DeJr-D9vbTw/",
    description: "Serene mountain homestay visual tour and ambience reel produced for Alyona Stay.",
  },
];

export default function WatchOurWork({
  sectionNumber = "/004/",
  videos = DEFAULT_VIDEOS,
  videoUrl,
  clientName,
  clientCategory,
  clientLink,
  title = "Watch our work in",
  highlightedTitle = "action",
  subtitle = "A curated overview of our design, engineering, and digital solutions.",
  videoDescription,
}) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const videoCardRef = useScrollReveal();

  // If a single videoUrl was passed directly, adapt it to the array
  const displayVideos = videoUrl
    ? [
        {
          id: "custom-video",
          videoUrl,
          clientName: clientName || "Featured Client",
          clientCategory: clientCategory || "Digital Showcase",
          clientLink: clientLink || videoUrl,
          description: videoDescription || subtitle,
        },
      ]
    : videos;

  // Structured Video Schema for Google SEO Rich Snippets
  const videoSchemas = displayVideos.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${v.clientName} Showcase - Web Design & Creative Media | GrowOwl`,
    description: v.description,
    thumbnailUrl: "https://www.growowl.online/images/growowl-og.webp",
    uploadDate: "2025-01-01T08:00:00+05:30",
    embedUrl: getMediaEmbedUrl(v.videoUrl),
    publisher: {
      "@type": "Organization",
      name: "GrowOwl",
      logo: {
        "@type": "ImageObject",
        url: "https://www.growowl.online/images/growowl-logo.webp",
      },
    },
  }));

  return (
    <section
      id="watch-our-work"
      aria-labelledby="watch-our-work-heading"
      className="py-14 sm:py-18 lg:py-24 bg-cream border-b border-ink/5 relative overflow-hidden scroll-mt-24"
    >
      {/* Video SEO Structured Data (JSON-LD) */}
      {videoSchemas.map((schema, sIdx) => (
        <script
          key={`schema-${sIdx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 md:px-8">
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
            <em className="font-serif italic font-medium text-accent">{highlightedTitle}</em>
          </h2>

          {subtitle && (
            <p className="text-[14px] sm:text-[17px] text-ink/75 max-w-[620px] mx-auto leading-[1.6]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Responsive Grid for Work Videos */}
        <div
          ref={videoCardRef}
          className={`w-full mx-auto grid gap-5 sm:gap-6 justify-center ${
            displayVideos.length === 1
              ? "max-w-[360px] sm:max-w-[400px]"
              : displayVideos.length === 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-[760px] lg:max-w-[840px]"
              : displayVideos.length === 4
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1280px]"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px]"
          }`}
        >
          {displayVideos.map((item, index) => {
            const embedUrl = getMediaEmbedUrl(item.videoUrl);
            return (
              <div
                key={item.id || index}
                className="w-full max-w-[380px] mx-auto bg-card rounded-2xl sm:rounded-3xl border border-ink/10 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
              >
                {/* Top Browser Header Bar */}
                <div className="flex items-center justify-between px-3 sm:px-3.5 py-2 sm:py-2.5 bg-ink/[0.03] border-b border-ink/8 gap-2">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-ink/70 bg-white px-2.5 sm:px-3 py-0.5 rounded-full border border-ink/8 truncate max-w-[150px] sm:max-w-[180px] text-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                    <span className="truncate">{item.clientName}</span>
                  </div>

                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${item.clientName} on Instagram`}
                    className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-accent hover:text-white bg-accent/10 hover:bg-accent px-2 sm:px-2.5 py-0.5 rounded-full transition-all shrink-0 border border-accent/20"
                  >
                    <span>View Reel</span>
                    <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                      <path d="M3 13L13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>

                {/* Fully Responsive Video Viewport with Edge-to-Edge Crop and Taller Height */}
                <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[520px] overflow-hidden bg-black flex items-start justify-center">
                  <iframe
                    src={embedUrl}
                    title={`${item.clientName} Instagram Showcase - GrowOwl`}
                    className="absolute w-[136%] -left-[18%] h-[calc(100%+160px)] -top-[46px] border-0 block bg-black"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    scrolling="no"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
