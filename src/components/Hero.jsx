import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="pt-[130px] sm:pt-[140px] pb-16 lg:pb-24 lg:min-h-[88vh] flex items-center"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content (Col 1-7) */}
          <div className="lg:col-span-7 max-w-[680px]">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 pl-3.5 bg-ink/5 rounded-full mb-7 border border-ink/10">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot" />
              <span className="text-[13px] font-medium text-ink/80">
                Available for new project
              </span>
            </div>

            <h1 className="font-sans text-[clamp(34px,3.8vw,54px)] font-bold leading-[1.18] tracking-[-0.03em] text-ink mb-6">
              We Help Local Businesses{" "}
              <em className="font-serif italic font-normal text-[1.05em]">Grow Online</em>{" "}
              Through Google, Social &amp;{" "}
              <span className="text-accent">Smarter Software</span>
            </h1>

            <p className="text-[17px] sm:text-[18px] text-ink/80 leading-[1.75] mb-9 max-w-[580px]">
              From improving your Google presence and growing your social media to deploying software that increases sales and helps you upsell services, we give local businesses everything they need to grow online.
            </p>

            <div className="flex gap-4 flex-wrap mb-10">
              <a
                href="/contact"
                aria-label="Start a project with GrowOwl Studio"
                className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3.5 bg-ink text-white rounded-full hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(252,54,55,0.25)] transition-all min-h-[46px]"
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
                className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-3.5 bg-transparent text-ink border-[1.5px] border-ink/20 rounded-full hover:border-ink hover:bg-ink hover:text-white hover:-translate-y-0.5 transition-all min-h-[46px]"
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
              <span className="text-sm text-ink/80">
                100% client satisfaction
              </span>
            </div>
          </div>

          {/* Right Image (Col 8-12) */}
          <div className="lg:col-span-5 relative w-full max-w-[500px] lg:max-w-none mx-auto lg:ml-auto">
            <div className="rounded-3xl overflow-hidden relative aspect-[4/5] shadow-[0_24px_60px_rgba(0,0,0,0.12)] group">
              <Image
                src="/images/hero.webp"
                alt="GrowOwl web design and development studio workspace"
                width={800}
                height={1000}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 600px"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15 pointer-events-none" />
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-3 px-5 py-3 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
              <span className="font-serif italic text-[13px] text-accent font-semibold">
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
