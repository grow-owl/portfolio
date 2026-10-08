"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getVideoTypeExamples } from "../data/videoDeepDiveData";

// Extract embed URL for Instagram Reels and YouTube videos (matches landing page WatchOurWork)
export function getMediaEmbedUrl(url) {
  if (!url) return null;

  // Instagram Reel or Post
  const igMatch = url.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  if (igMatch && igMatch[1]) {
    return `https://www.instagram.com/reel/${igMatch[1]}/embed`;
  }

  // YouTube embed
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  return url;
}

// Compact Expandable Description component
function ExpandableDescription({ text }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const truncateLimit = 115;
  const needsTruncate = text.length > truncateLimit;

  return (
    <div className="text-[12px] sm:text-[13px] text-ink/75 leading-relaxed mt-2.5">
      <span>
        {needsTruncate && !expanded ? `${text.slice(0, truncateLimit)}...` : text}
      </span>
      {needsTruncate && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="ml-1.5 font-bold text-accent hover:underline text-xs cursor-pointer inline-flex items-center"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function CategoryVideoList({ category }) {
  return (
    <div className="space-y-12 sm:space-y-16 mb-14 sm:mb-20">
      {category.videoTypes.map((video, vIdx) => {
        const examples = getVideoTypeExamples(category.categorySlug, video.id, video);

        // Build cards to render based on real reference reels
        const cardsToRender =
          video.referenceReels && video.referenceReels.length > 0
            ? video.referenceReels.map((reel, rIdx) => {
                const fallbackEx = (examples && examples[rIdx]) || {};
                const paddedNum = String(rIdx + 1).padStart(2, "0");
                const cleanTitle =
                  reel.title && !reel.title.toLowerCase().startsWith("reference reel")
                    ? reel.title
                    : `Creative Inspiration ${paddedNum}`;
                const cleanLabel = `Example ${paddedNum}`;

                return {
                  id: `ref-${video.id}-${rIdx}`,
                  title: cleanTitle,
                  label: cleanLabel,
                  url: reel.url,
                  embedUrl: getMediaEmbedUrl(reel.url),
                  image: fallbackEx.image || video.image,
                  duration: video.duration || "45-60s",
                };
              })
            : (examples || []).map((ex, eIdx) => {
                const paddedNum = String(eIdx + 1).padStart(2, "0");
                return {
                  ...ex,
                  title: ex.title || `Creative Inspiration ${paddedNum}`,
                  label: `Example ${paddedNum}`,
                  embedUrl: getMediaEmbedUrl(ex.url),
                };
              });

        return (
          <section
            key={video.id}
            id={video.id}
            className="bg-card rounded-3xl sm:rounded-[36px] border border-ink/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-5 sm:p-7 lg:p-8 max-w-[980px] mx-auto"
          >
            {/* Clean Section Header - Left Aligned with Right-Aligned Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 sm:mb-7 border-b border-ink/8">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-ink/80 font-mono text-[11px] font-bold">
                    ⏱️ {video.duration}
                  </span>
                  {video.tag && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-mono text-[11px] font-bold">
                      {video.tag}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                  {vIdx + 1}. {video.title}
                </h2>
              </div>

              {/* View Full 60s Script & Blueprint Button */}
              <Link
                href={`/videos/${category.categorySlug}/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-ink text-white hover:bg-accent font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 self-start sm:self-center cursor-pointer"
              >
                <span>View Full 60s Script &amp; Blueprint</span>
                <span>→</span>
              </Link>
            </div>

            {/* Video Cards Grid */}
            <div>
              <div
                className={`grid grid-cols-1 ${
                  cardsToRender.length === 1
                    ? "max-w-[285px]"
                    : cardsToRender.length === 2
                    ? "sm:grid-cols-2 max-w-[590px]"
                    : "sm:grid-cols-2 lg:grid-cols-3 max-w-[900px]"
                } gap-4 sm:gap-5`}
              >
                {cardsToRender.map((card, cIdx) => (
                  <div
                    key={card.id || cIdx}
                    className="group relative bg-cream/35 rounded-2xl sm:rounded-3xl border border-ink/8 overflow-hidden hover:border-accent/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between w-full max-w-[285px] mx-auto sm:mx-0"
                  >
                    <div>
                      {/* Top Browser / Studio Header Bar */}
                      <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 sm:py-2 bg-ink/[0.03] border-b border-ink/8 gap-2">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        </div>

                        {card.url ? (
                          <a
                            href={card.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${card.title} on Instagram`}
                            className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-accent hover:text-white bg-accent/10 hover:bg-accent px-2 sm:px-2.5 py-0.5 rounded-full transition-all shrink-0 border border-accent/20"
                          >
                            <span>View Reel</span>
                            <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
                              <path d="M3 13L13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                        ) : (
                          <span className="text-[9px] text-ink/40 font-mono">Sample</span>
                        )}
                      </div>

                      {/* Video Player Viewport - Edge-to-Edge Reel (No side black bars) */}
                      <div className="relative w-full h-[290px] sm:h-[310px] overflow-hidden bg-black flex items-start justify-center">
                        {card.embedUrl ? (
                          <iframe
                            src={card.embedUrl}
                            title={`${video.title} - ${card.title}`}
                            className="absolute block border-0 bg-black w-[136%] -left-[18%] h-[calc(100%+145px)] -top-[42px]"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            scrolling="no"
                            loading="lazy"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <Image
                              src={card.image || video.image}
                              alt={card.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                              <span className="text-white text-xs bg-black/60 px-3 py-1.5 rounded-full">
                                Preview Available Soon
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Card Details: Clean Title and Expandable Format Description */}
                      <div className="p-3 sm:p-3.5">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-0.5">
                          Live Creative Example {cIdx + 1}
                        </span>
                        <h3 className="font-bold text-ink leading-snug mb-1 text-[13px] sm:text-[14px]">
                          {card.title}
                        </h3>

                        {/* Format Description with Read More / Read Less Toggle */}
                        <ExpandableDescription text={video.description} />
                      </div>
                    </div>

                    {/* Footer Action: View Script Blueprint in New Tab */}
                    <Link
                      href={`/videos/${category.categorySlug}/${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 sm:px-4 py-2.5 border-t border-ink/8 flex items-center justify-between text-[11px] sm:text-xs font-bold text-ink hover:text-accent transition-colors bg-white/40 cursor-pointer"
                    >
                      <span>View Script Blueprint</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
          })}
    </div>
  );
}
