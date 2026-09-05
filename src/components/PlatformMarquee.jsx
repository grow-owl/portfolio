"use client";

const platforms = [
  {
    id: "google-business",
    name: "Google Business Profile",
    bg: "#ffffff",
    border: "#e2e8f0",
    render: () => (
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0" style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-[#1e1e1e] leading-none tracking-tight">Google Business Profile</span>
          <span className="text-[10px] text-[#64748b] leading-none">Boost your Google visibility.</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#4285F4]/10 text-[#4285F4]">Manage &amp; Optimize</span>
        </div>
      </div>
    ),
  },
  {
    id: "apple-business",
    name: "Apple Business Profile",
    bg: "#f8f8f8",
    border: "#e2e8f0",
    render: () => (
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0" style={{ background: "#f1f5f9", border: "1px solid #cbd5e1" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1e1e1e">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-[#1e1e1e] leading-none tracking-tight">Apple Business Profile</span>
          <span className="text-[10px] text-[#64748b] leading-none">Improve your Apple presence.</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#1e1e1e]/10 text-[#1e1e1e]">Manage &amp; Optimize</span>
        </div>
      </div>
    ),
  },
  {
    id: "bing-business",
    name: "Bing Business Profile",
    bg: "#ffffff",
    border: "#bae6fd",
    render: () => (
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 bg-[#f0f9ff] border border-[#bae6fd] p-1.5">
          <img
            src="/images/platforms/bing.png"
            alt="Bing"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-[#1e1e1e] leading-none tracking-tight">Bing Business Profile</span>
          <span className="text-[10px] text-[#64748b] leading-none">Grow your Bing visibility.</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#0284c7]/10 text-[#0284c7]">Manage &amp; Optimize</span>
        </div>
      </div>
    ),
  },
  {
    id: "zomato",
    name: "Zomato",
    bg: "#fff5f5",
    border: "#fecaca",
    render: () => (
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 overflow-hidden bg-[#E23744]">
          <img
            src="/images/platforms/zomato.png"
            alt="Zomato"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-[#1e1e1e] leading-none tracking-tight">Zomato</span>
          <span className="text-[10px] text-[#64748b] leading-none">Get listed on Zomato.</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#E23744]/10 text-[#E23744]">Help With Listing</span>
        </div>
      </div>
    ),
  },
  {
    id: "swiggy",
    name: "Swiggy",
    bg: "#fff8f0",
    border: "#fed7aa",
    render: () => (
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0 overflow-hidden bg-[#FC8019]">
          <img
            src="/images/platforms/swiggy.png"
            alt="Swiggy"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-[#1e1e1e] leading-none tracking-tight">Swiggy</span>
          <span className="text-[10px] text-[#64748b] leading-none">Get listed on Swiggy.</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#FC8019]/10 text-[#FC8019]">Help With Listing</span>
        </div>
      </div>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    bg: "#fdf4ff",
    border: "#e9d5ff",
    render: () => (
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0" style={{ background: "linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-[#1e1e1e] leading-none tracking-tight">Instagram</span>
          <span className="text-[10px] text-[#64748b] leading-none">Social media marketing.</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#dc2743]/10 text-[#cc2366]">Social Media Marketing</span>
        </div>
      </div>
    ),
  },
  {
    id: "facebook",
    name: "Facebook",
    bg: "#f0f4ff",
    border: "#bfcfff",
    render: () => (
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0" style={{ background: "#1877F2" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-bold text-[#1e1e1e] leading-none tracking-tight">Facebook</span>
          <span className="text-[10px] text-[#64748b] leading-none">Social media management.</span>
          <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#1877F2]/10 text-[#1877F2]">Social Media Mgmt</span>
        </div>
      </div>
    ),
  },
];

export default function PlatformMarquee() {
  const marqueeItems = [...platforms, ...platforms, ...platforms, ...platforms];

  return (
    <section
      aria-label="Improve Your Online Presence"
      className="py-10 sm:py-14 lg:py-16 bg-cream-light border-y border-ink/8 relative overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-5 md:px-10 mb-6 sm:mb-8 text-center z-10">
        <h2 className="font-sans text-[clamp(22px,3vw,36px)] font-bold tracking-[-0.02em] text-ink leading-tight">
          Improve Your{" "}
          <em className="font-serif italic font-normal text-accent">
            Online Presence
          </em>
        </h2>
        <p className="mt-2 sm:mt-3 text-[13px] sm:text-[14px] text-ink/60 max-w-md mx-auto">
          We manage &amp; optimise your profiles across every major platform so
          customers always find you first.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-ink/5 hover:bg-accent hover:text-white border border-ink/10 transition-all text-ink/80 group"
          >
            <span>Platform Listing &amp; Optimization Plans @ ₹2,000</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden z-10 py-2 sm:py-3">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-20 z-20 bg-gradient-to-r from-cream-light via-cream-light/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-20 z-20 bg-gradient-to-l from-cream-light via-cream-light/90 to-transparent" />

        <div className="animate-marquee gap-3 sm:gap-4 lg:gap-5 py-1.5 sm:py-2 items-center">
          {marqueeItems.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href="/pricing"
              title={`${item.name} — Setup & Optimization @ ₹2,000`}
              className="relative flex items-center h-[72px] sm:h-[80px] px-4 sm:px-5 lg:px-6 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.13),0_3px_8px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-1 shrink-0 select-none cursor-pointer"
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
