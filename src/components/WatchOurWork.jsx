"use client";

import { useState, useRef, useEffect } from "react";
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
    id: "pvr-inox",
    videoUrl: "https://www.instagram.com/reel/DeExBwcR77V/?stkn=MWoydDUybzR0YmkwcQ==",
    clientName: "PVR INOX Siliguri",
    clientCategory: "Entertainment & Cinema",
    clientLink: "https://www.instagram.com/reel/DeExBwcR77V/",
    description: "Cinematic commercial reel and audience engagement video created for PVR INOX at Vega Circle, Siliguri.",
  },
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
    id: "chai-addaa",
    videoUrl: "https://www.instagram.com/reel/DeMiDn0ThiV/?stkn=aHMybGltMnQwZ2I1",
    clientName: "Siliguri's Chai Addaa",
    clientCategory: "Rooftop Cafe & Food",
    clientLink: "https://www.instagram.com/reel/DeMiDn0ThiV/",
    description: "Viral ambience and menu showcase reel created for Siliguri's Chai Addaa rooftop cafeteria.",
  },
  {
    id: "alyona-stay",
    videoUrl: "https://www.instagram.com/reel/Dedp6gevyoY/?exln=MTJ5YW5mbWp1N2Zueg==",
    localVideo: "/videos/alyona-stay.mp4",
    thumbnail: "/images/reels/alyona-stay-thumb.jpg",
    clientName: "Alyona Stay",
    clientCategory: "Homestay & Retreat",
    clientLink: "https://www.instagram.com/reel/Dedp6gevyoY/",
    description: "Serene mountain homestay visual tour and ambience reel produced for Alyona Stay.",
  },
  {
    id: "pvr-inox-pov",
    videoUrl: "https://www.instagram.com/reel/DemSJIBhkX1/?srtk=MWp4M2VlbWdqN3Vi",
    clientName: "PVR INOX Siliguri",
    clientCategory: "Entertainment & Cinema",
    clientLink: "https://www.instagram.com/reel/DemSJIBhkX1/",
    description: "Viral POV audience engagement reel created for PVR INOX at Vega Circle, Siliguri.",
  },
  {
    id: "pvr-inox-tuesday",
    videoUrl: "https://www.instagram.com/reel/DeWxsdiS9ii/?exln=MXVxeTFwNXVvbWpoZg==",
    clientName: "PVR INOX Siliguri",
    clientCategory: "Entertainment & Cinema",
    clientLink: "https://www.instagram.com/reel/DeWxsdiS9ii/",
    description: "Special Tuesday cinema offer and theatrical commercial reel produced for INOX Vega Circle, Siliguri.",
  },
];

export default function WatchOurWork({
  sectionNumber = "/003/",
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
  const isFirst = sectionNumber === "/001/";
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [resetCounters, setResetCounters] = useState({});
  const [localPlayingStates, setLocalPlayingStates] = useState({});

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

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cards = el.querySelectorAll(".reel-card");
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
  }, [displayVideos.length]);

  // Auto-pause: When user plays a different video, reset the previously playing video's iframe so audio & playback stop immediately
  useEffect(() => {
    let lastActiveVideoId = null;

    const handleFocusCheck = () => {
      const activeEl = document.activeElement;
      if (activeEl && activeEl.tagName === "IFRAME") {
        const videoId = activeEl.getAttribute("data-video-id");
        if (videoId && videoId !== lastActiveVideoId) {
          const previousId = lastActiveVideoId;
          lastActiveVideoId = videoId;
          if (previousId) {
            setResetCounters((prev) => ({
              ...prev,
              [previousId]: (prev[previousId] || 0) + 1,
            }));
          }
          setPlayingVideoId(videoId);
        }
      }
    };

    const interval = setInterval(handleFocusCheck, 150);
    window.addEventListener("blur", handleFocusCheck);

    return () => {
      clearInterval(interval);
      window.removeEventListener("blur", handleFocusCheck);
    };
  }, []);

  // Pause native video if user switches to an iframe
  useEffect(() => {
    if (playingVideoId && playingVideoId !== "alyona-stay") {
      const vid = document.querySelector('video[data-video-id="alyona-stay"]');
      if (vid && !vid.paused) {
        vid.pause();
      }
      setLocalPlayingStates((prev) => ({ ...prev, "alyona-stay": false }));
    }
  }, [playingVideoId]);

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll(".reel-card"));
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
    const cards = Array.from(el.querySelectorAll(".reel-card"));
    if (!cards.length) return;

    let targetIndex = activeIndex;
    if (direction === "next") {
      targetIndex = Math.min(cards.length - 1, activeIndex + 1);
    } else {
      targetIndex = Math.max(0, activeIndex - 1);
    }
    scrollToIndex(targetIndex);
  };

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
      className={`${
        isFirst
          ? "pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-18 lg:pb-24"
          : "py-14 sm:py-18 lg:py-24"
      } bg-cream border-b border-ink/5 relative overflow-hidden scroll-mt-24`}
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

        {/* Side Scroll Track for Work Reels */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-5 sm:py-6 -mx-4 sm:-mx-5 md:-mx-8 px-6 sm:px-7 md:px-8 scroll-pl-6 sm:scroll-pl-7 md:scroll-pl-8"
          >
            {displayVideos.map((item, index) => {
              const embedUrl = getMediaEmbedUrl(item.videoUrl);
              const videoId = item.id || String(index);
              const isActive = activeIndex === index;
              return (
                <div
                  key={videoId}
                  onClick={() => {
                    if (playingVideoId && playingVideoId !== videoId) {
                      setResetCounters((prev) => ({
                        ...prev,
                        [playingVideoId]: (prev[playingVideoId] || 0) + 1,
                      }));
                      setPlayingVideoId(videoId);
                    }
                  }}
                  className={`reel-card shrink-0 snap-start w-[70vw] max-w-[250px] sm:max-w-none sm:w-[290px] lg:w-[320px] bg-card rounded-2xl sm:rounded-3xl border overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] transition-shadow duration-300 flex flex-col group cursor-pointer ${
                    isActive
                      ? "border-accent/50 ring-1 ring-accent/30"
                      : "border-ink/10 hover:border-ink/20"
                  }`}
                >
                  {/* Top Browser Header Bar */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-ink/[0.03] border-b border-ink/8 gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#27c93f]" />
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-full border truncate max-w-[120px] sm:max-w-[180px] text-center bg-white text-ink/75 border-ink/8">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                      <span className="truncate">{item.clientName}</span>
                    </div>

                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${item.clientName} on Instagram`}
                      className="inline-flex items-center gap-1 text-[8.5px] sm:text-[10px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-full shrink-0 border border-accent/20 bg-accent/10 hover:bg-accent text-accent hover:text-white transition-colors duration-200"
                    >
                      <span>View Reel</span>
                      <svg width="7" height="7" viewBox="0 0 16 16" fill="none">
                        <path d="M3 13L13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>

                  {/* Fully Responsive Video Viewport with Edge-to-Edge Crop */}
                  <div className="relative w-full h-[405px] sm:h-[480px] lg:h-[530px] overflow-hidden bg-black flex items-center justify-center">
                    {item.localVideo || videoId === "alyona-stay" ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          const vid = e.currentTarget.querySelector("video");
                          if (!vid) return;
                          if (vid.paused) {
                            if (playingVideoId && playingVideoId !== videoId) {
                              setResetCounters((prev) => ({
                                ...prev,
                                [playingVideoId]: (prev[playingVideoId] || 0) + 1,
                              }));
                            }
                            vid.play();
                            setPlayingVideoId(videoId);
                            setLocalPlayingStates((prev) => ({ ...prev, [videoId]: true }));
                          } else {
                            vid.pause();
                            setLocalPlayingStates((prev) => ({ ...prev, [videoId]: false }));
                          }
                        }}
                        className="relative w-full h-full flex items-center justify-center bg-black cursor-pointer select-none group/video"
                      >
                        <video
                          data-video-id={videoId}
                          src={item.localVideo || "/videos/alyona-stay.mp4"}
                          poster={item.thumbnail || "/images/reels/alyona-stay-thumb.jpg"}
                          playsInline
                          loop
                          preload="metadata"
                          className="w-full h-full object-contain bg-black pointer-events-none"
                          onPlay={() => {
                            setLocalPlayingStates((prev) => ({ ...prev, [videoId]: true }));
                            if (playingVideoId && playingVideoId !== videoId) {
                              setResetCounters((prev) => ({
                                ...prev,
                                [playingVideoId]: (prev[playingVideoId] || 0) + 1,
                              }));
                            }
                            setPlayingVideoId(videoId);
                          }}
                          onPause={() => {
                            setLocalPlayingStates((prev) => ({ ...prev, [videoId]: false }));
                          }}
                        />

                        {/* Center Play Button Overlay (Instagram Reels style - exact match with other reels) */}
                        <div
                          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
                            localPlayingStates[videoId]
                              ? "opacity-0 scale-90"
                              : "opacity-100 scale-100"
                          }`}
                        >
                          <svg
                            width="54"
                            height="60"
                            viewBox="0 0 54 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[46px] h-[52px] sm:w-[54px] sm:h-[60px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] transition-transform duration-200 group-hover/video:scale-105"
                          >
                            <path
                              d="M48.8 26.54c2.93 1.7 2.93 5.92 0 7.62L10.3 56.5c-2.93 1.7-6.6-.42-6.6-3.81V7.31c0-3.39 3.67-5.51 6.6-3.81l38.5 22.34z"
                              fill="white"
                              fillOpacity="0.9"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <>
                        <iframe
                          key={`${videoId}-${resetCounters[videoId] || 0}`}
                          data-video-id={videoId}
                          src={embedUrl}
                          title={`${item.clientName} Instagram Showcase - GrowOwl`}
                          className="absolute w-[138%] -left-[19%] h-[calc(100%+160px)] -top-[48px] sm:-top-[52px] border-0 block bg-black"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          scrolling="no"
                          loading="lazy"
                        />
                        {/* Bottom gradient mask: guarantees that the white 'View more on Instagram' footer is 100% hidden */}
                        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10" />
                      </>
                    )}
                  </div>
                </div>
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
            aria-label="Previous reel"
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
            {displayVideos.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Jump to reel ${item.clientName}`}
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
            aria-label="Next reel"
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
