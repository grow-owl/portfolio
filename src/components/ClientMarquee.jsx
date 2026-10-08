"use client";

import Image from "next/image";

const clientBrands = [
  {
    id: "pvr-inox",
    name: "PVR INOX Siliguri",
    link: "https://www.inoxmovies.com/",
    bg: "#ffffff",
    border: "#e5e7eb",
    render: () => (
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* PVR INOX Logo */}
        <div className="h-8 sm:h-9 px-2 rounded-xl bg-[#fafafa] border border-ink/10 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
          <Image
            src="/images/logos/pvr-inox-logo.png"
            alt="PVR INOX Vega Circle"
            width={85}
            height={32}
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[13px] sm:text-[14px] font-black leading-none tracking-tight text-ink">
            <span>PVR </span>
            <span className="text-[#eab308]">✦</span>
            <span> INOX</span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-bold text-ink/70 tracking-[0.14em] uppercase mt-1">
            VEGA CIRCLE, SILIGURI
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "chai-addaa",
    name: "Siliguri's Chai Addaa",
    link: "https://digital-menu-beta-one.vercel.app/",
    bg: "#fdfbf7",
    border: "#ebdccf",
    render: () => (
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Chai Addaa Logo */}
        <div className="h-8 sm:h-9 px-2 rounded-xl bg-white border border-[#8c6239]/20 flex items-center justify-center shadow-xs shrink-0">
          <Image
            src="/images/logos/chai-addaa-logo.webp"
            alt="Siliguri's Chai Addaa"
            width={85}
            height={32}
            className="h-5 sm:h-6 w-auto object-contain"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] sm:text-[15px] font-bold leading-none tracking-tight">
            <span className="text-[#3d2714]">Chai </span>
            <span className="text-[#8c6239]">Addaa</span>
          </div>
          <span className="text-[9px] font-bold text-[#8c6239] tracking-[0.14em] uppercase mt-1">
            ROOFTOP CAFETERIA
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
    id: "burl-india",
    name: "Burl India",
    link: "#",
    bg: "#181410",
    border: "rgba(217, 119, 6, 0.28)",
    render: () => (
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Burl India Logo */}
        <div className="h-8 sm:h-9 w-8 sm:w-9 rounded-xl bg-[#26201a] border border-[#d97706]/35 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
          <Image
            src="/images/logos/burl-india-logo.png"
            alt="Burl India"
            width={48}
            height={48}
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] sm:text-[15px] font-black leading-none tracking-tight">
            <span className="text-white">BURL </span>
            <span className="text-[#eab308]">INDIA</span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-bold text-[#d97706] tracking-[0.14em] uppercase mt-1">
            WOOD CRAFT &amp; CNC
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "alyona-stay",
    name: "Alyona Stay",
    link: "https://www.instagram.com/reel/DeJr-D9vbTw/",
    bg: "#fffbf5",
    border: "#fed7aa",
    render: () => (
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Alyona Stay Sun Logo */}
        <div className="h-8 sm:h-9 w-8 sm:w-9 rounded-xl bg-white border border-[#f97316]/25 flex items-center justify-center shadow-xs shrink-0 overflow-hidden p-0.5">
          <Image
            src="/images/logos/alyona-stay-logo.png"
            alt="Alyona Stay"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-[14px] sm:text-[15px] font-bold leading-none tracking-tight">
            <span className="text-[#9a3412]">Alyona </span>
            <span className="text-[#ea580c]">Stay</span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-bold text-[#ea580c] tracking-[0.14em] uppercase mt-1">
            HOMESTAY &amp; RETREAT
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
