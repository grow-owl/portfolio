"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="pt-[140px] pb-14 lg:pb-20 lg:min-h-[85vh] flex items-center"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="max-w-[560px]">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 pl-3.5 bg-ink/5 rounded-full mb-8 border border-ink/10">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot" />
              <span className="text-[13px] font-medium text-ink/60">
                Available for new project
              </span>
            </div>

            <h1 className="font-sans text-[clamp(36px,4.5vw,52px)] font-bold leading-[1.15] tracking-[-0.04em] text-ink mb-6">
              Full stack{" "}
              <em className="font-serif italic font-medium">web development</em> &amp;
              bespoke <span className="text-accent">web design agency</span> crafting sites that actually move the needle.
            </h1>

            <p className="text-[17px] text-ink/60 leading-[1.7] mb-9 max-w-[460px]">
              From custom React &amp; Next.js web development to technical SEO marketing and local search optimization, we engineer high-speed digital experiences that dominate rankings and drive revenue.
            </p>

            <div className="flex gap-3.5 flex-wrap mb-10">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 bg-ink text-white rounded-full hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(252,54,55,0.25)] transition-all"
              >
                Start a Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 13L13 3M13 3H5M13 3V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 bg-transparent text-ink border-[1.5px] border-ink/20 rounded-full hover:border-ink hover:bg-ink hover:text-white hover:-translate-y-0.5 transition-all"
              >
                See Our Work
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex text-accent text-sm tracking-tight">
                ★★★★★
              </div>
              <span className="text-sm font-medium text-ink">
                5.0/5 rating
              </span>
              <span className="text-sm text-ink/40">•</span>
              <span className="text-sm text-ink/60">
                100% client satisfaction
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden relative aspect-[4/5] shadow-[0_24px_60px_rgba(0,0,0,0.12)] group">
              <Image
                src="/images/hero.webp"
                alt="GrowOwl web design and development studio workspace"
                width={1024}
                height={1024}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 560px"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15 pointer-events-none" />
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-3 px-5 py-3 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              <span className="font-serif italic text-[13px] text-accent">
                /001/
              </span>
              <span className="text-[13px] font-semibold text-ink">
                Creative Studio
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
