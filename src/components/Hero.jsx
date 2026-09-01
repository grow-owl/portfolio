import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="pt-[110px] sm:pt-[130px] lg:pt-[140px] pb-12 sm:pb-16 lg:pb-20 flex items-center"
    >
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content (Col 1-7) */}
          <div className="lg:col-span-7 max-w-[680px]">
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-1.5 sm:py-2 pl-3 sm:pl-3.5 bg-ink/5 rounded-full mb-5 sm:mb-6 border border-ink/10">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot" />
              <span className="text-[12px] sm:text-[13px] font-medium text-ink/80">
                Available for new project
              </span>
            </div>

            <h1 className="font-sans text-[clamp(32px,4vw,56px)] font-bold leading-[1.14] tracking-[-0.03em] text-ink mb-7 sm:mb-9">
              We Help Local Businesses{" "}
              <em className="font-serif italic font-normal text-[1.05em]">Grow Online</em>{" "}
              Through Google, Social &amp;{" "}
              <span className="text-accent">Smarter Software</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-7 sm:mb-9">
              <a
                href="/contact"
                aria-label="Start a project with GrowOwl Studio"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 sm:px-8 py-3.5 bg-ink text-white rounded-full hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(252,54,55,0.25)] transition-all min-h-[48px] shadow-sm"
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
                aria-label="See GrowOwl featured work and web design portfolio"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 sm:px-8 py-3.5 bg-transparent text-ink border-[1.5px] border-ink/20 rounded-full hover:border-ink hover:bg-ink hover:text-white hover:-translate-y-0.5 transition-all min-h-[48px]"
              >
                See Our Work
              </a>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <div className="flex text-accent text-sm tracking-tight">
                ★★★★★
              </div>
              <span className="text-xs sm:text-sm font-medium text-ink">
                5.0/5 rating
              </span>
              <span className="text-xs sm:text-sm text-ink/40">•</span>
              <span className="text-xs sm:text-sm text-ink/80">
                100% client satisfaction
              </span>
            </div>
          </div>

          {/* Right Image (Col 8-12) */}
          <div className="lg:col-span-5 relative w-full max-w-[400px] sm:max-w-[440px] lg:max-w-[390px] xl:max-w-[420px] mx-auto lg:ml-auto mt-2 lg:mt-0">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[4/3] sm:aspect-[4/4.5] lg:aspect-[4/4.8] shadow-[0_16px_40px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.06)] group">
              <Image
                src="/images/hero.webp"
                alt="GrowOwl web design and development studio workspace"
                width={800}
                height={1000}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 420px"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15 pointer-events-none" />
            </div>
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-3 bg-white/95 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] border border-ink/5">
              <span className="font-serif italic text-xs sm:text-[13px] text-accent font-semibold">
                /001/
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-ink">
                Creative Studio
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
