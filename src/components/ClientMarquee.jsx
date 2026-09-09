"use client";

const clientBrands = [
  {
    id: "cheesy-classics",
    name: "Cheesy Classics",
    link: "https://classic-cheesy.vercel.app/",
    bg: "#fbf5eb",
    border: "#eadbc8",
    render: () => (
      <div className="flex items-center gap-3">
        {/* Fork & Knife Icon Box */}
        <div className="w-9 h-9 rounded-xl bg-white border border-[#e8d7c3] flex items-center justify-center shadow-xs shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#ea580c]">
            <path
              d="M6 3v6c0 1.66 1.34 3 3 3v9M9 3v6M6 3H9M18 3v18M18 3c-1.5 0-3 1.5-3 4v3h3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] sm:text-[15px] font-bold leading-none tracking-tight">
            <span className="text-[#1c1917]">Cheesy </span>
            <span className="text-[#ea580c]">Classics</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold text-[#b45309] tracking-[0.14em] uppercase mt-1">
            CAFE &amp; LOUNGE
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "ddine-kitchen",
    name: "D Dine Kitchen",
    link: "https://ddinekitchen.shop",
    bg: "#ce3c43",
    border: "#b52c33",
    render: () => (
      <div className="flex items-center gap-3">
        {/* Chef Badge */}
        <div className="w-9 h-9 rounded-xl bg-[#981e24] border border-[#ff858a]/20 flex items-center justify-center shadow-xs shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
            <path
              d="M6 13.5V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-5.5M4 11a4 4 0 0 1 5.5-3.7A4 4 0 0 1 18.5 11M6 14h12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-[15px] sm:text-[16px] font-extrabold tracking-tight leading-none">
          <span className="text-white">D Dine </span>
          <span className="text-[#ffd043]">Kitchen</span>
        </div>
      </div>
    ),
  },
  {
    id: "gymai",
    name: "GYMAI",
    link: "https://gymai-one.vercel.app/",
    bg: "#0c121e",
    border: "rgba(245, 158, 11, 0.25)",
    render: () => (
      <div className="flex items-center gap-3">
        {/* Modern Amber/Gold Gym Icon */}
        <div className="w-9 h-9 rounded-xl bg-[#1e293b] border border-[#f59e0b]/30 flex items-center justify-center shadow-xs shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#f59e0b]">
            <path
              d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] sm:text-[15px] font-black leading-none tracking-tight">
            <span className="text-white">GYM</span>
            <span className="text-[#f59e0b]">AI</span>
          </div>
          <span className="text-[9px] font-bold text-[#f59e0b]/80 tracking-[0.18em] uppercase mt-1">
            AI FITNESS SAAS
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "car-wash",
    name: "Auto Detailing Car Wash",
    link: "https://car-wash-grow-owl.vercel.app/",
    bg: "#1b2e34",
    border: "#29464e",
    render: () => (
      <div className="flex items-center gap-3">
        {/* Water Drop Icon */}
        <div className="w-9 h-9 rounded-xl bg-[#27424a] border border-[#5eead4]/20 flex items-center justify-center shadow-xs shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#5eead4]">
            <path
              d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
              fill="currentColor"
              fillOpacity="0.25"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] sm:text-[14px] font-bold text-white leading-none tracking-tight">
            Auto Detailing
          </span>
          <span className="text-[10px] font-mono text-[#5eead4] tracking-wider mt-0.5">
            Car Wash
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "arhan-fabricators",
    name: "Arhan Fabricators",
    link: "https://arhan-fabricators.vercel.app/",
    bg: "#ffffff",
    border: "#e2e8f0",
    render: () => (
      <div className="flex items-center gap-3">
        {/* Monogram Circle */}
        <div className="w-9 h-9 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-sans font-black text-[13px] tracking-tighter shadow-xs shrink-0">
          AR
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] sm:text-[15px] font-extrabold text-[#0f172a] leading-none tracking-tight">
            Arhan Fabricators
          </span>
          <span className="text-[10px] text-[#64748b] font-medium tracking-wide mt-0.5">
            Steel &amp; Iron Work, Lucknow
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "aura-gastronomy",
    name: "Aura Gastronomy",
    link: "https://aura-gastronomy-restaurant-six.vercel.app/",
    bg: "#0d0f14",
    border: "rgba(56, 189, 248, 0.25)",
    render: () => (
      <div className="flex items-center gap-3">
        {/* Luxury Dining & POS Glass Icon */}
        <div className="w-9 h-9 rounded-xl bg-[#161a23] border border-[#38bdf8]/25 flex items-center justify-center shadow-xs shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#38bdf8]">
            <path
              d="M8 22h8M12 11v11M5 3h14l-2 8H7L5 3z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-[13px] sm:text-[14px] font-bold text-white leading-none tracking-[0.08em]">
            AURA
          </span>
          <span className="text-[9px] font-bold text-[#38bdf8]/85 tracking-[0.2em] uppercase mt-1">
            FINE DINING &amp; POS
          </span>
        </div>
      </div>
    ),
  },
];

export default function ClientMarquee() {
  // Repeat array for seamless infinite looping
  const marqueeItems = [...clientBrands, ...clientBrands, ...clientBrands, ...clientBrands];

  return (
    <section
      aria-label="Client Brands"
      className="py-8 sm:py-12 lg:py-16 bg-cream border-t border-ink/8 relative overflow-hidden"
    >
      {/* Header Pill */}
      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-5 md:px-10 mb-5 sm:mb-7 text-center z-10">
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 bg-ink/5 rounded-full border border-ink/10 whitespace-nowrap">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse shrink-0" />
          {/* Short label on mobile, full on sm+ */}
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.1em] text-ink/70">
            <span className="sm:hidden">Our Clients &amp; Brands</span>
            <span className="hidden sm:inline">Trusted by Growing Local Businesses &amp; Brands</span>
          </span>
        </div>
      </div>

      {/* Marquee Track with side fade gradients */}
      <div className="relative w-full overflow-hidden z-10 py-2 sm:py-3">
        {/* Left and Right Fade Gradients — narrower on mobile */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-20 z-20 bg-gradient-to-r from-cream via-cream/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-20 z-20 bg-gradient-to-l from-cream via-cream/90 to-transparent" />

        {/* Continuous Infinite Track */}
        <div className="animate-marquee gap-3 sm:gap-4 lg:gap-6 py-1.5 sm:py-2 items-center">
          {marqueeItems.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${item.name}`}
              aria-label={`Visit ${item.name}`}
              className="group relative flex items-center h-[48px] sm:h-[56px] lg:h-[62px] px-4 sm:px-5 lg:px-6 rounded-xl sm:rounded-2xl shadow-[0_6px_18px_rgba(0,0,0,0.1),0_2px_5px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.1)] active:shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 active:-translate-y-0.5 hover:brightness-[1.03] shrink-0 select-none"
              style={{
                backgroundColor: item.bg,
                border: `1px solid ${item.border}`,
              }}
            >
              {item.render()}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
