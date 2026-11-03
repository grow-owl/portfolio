import Image from "next/image";

const partners = [
  {
    id: "pixel-karigars",
    name: "Pixel Karigars",
    role: "Creative Design Studio",
    image: "/images/logos/pixel-karigars.webp",
    imgBg: "#0d0d0d",
    imgRadius: "rounded-full",
    accent: "#e8481c",
  },
];

export default function Collaborations() {
  return (
    <section
      aria-label="In Collaboration With"
      className="bg-cream-light border-b border-ink/8 py-9 sm:py-12 lg:py-14"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10">
        {/* ── Decorative heading ── */}
        <div className="flex items-center gap-3 sm:gap-5 mb-7 sm:mb-10 max-w-xl mx-auto">
          <div className="flex-1 h-px bg-ink/12" />
          <p className="font-serif italic text-[11px] sm:text-[12px] text-ink/45 font-medium tracking-[0.08em] whitespace-nowrap">
            In Collaboration With
          </p>
          <div className="flex-1 h-px bg-ink/12" />
        </div>

        {/* ── Partner cards ── */}
        <div className="flex items-center justify-center">
          {/* Card 1 — Pixel Karigars */}
          <a
            href="https://pixelkarigars.in"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Pixel Karigars — Creative Design Studio"
            className="group w-full sm:w-[320px] lg:w-[340px] bg-card rounded-2xl sm:rounded-3xl border border-ink/10 px-5 sm:px-6 py-5 sm:py-6 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full overflow-hidden border border-ink/8 shrink-0 group-hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <Image src="/images/logos/pixel-karigars.webp" alt="Pixel Karigars logo" width={64} height={64} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="inline-block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.14em] mb-1 px-1.5 py-0.5 rounded" style={{ color: "#e8481c", backgroundColor: "#e8481c14" }}>
                  Partner Agency
                </span>
              </div>
              <h3 className="text-[15px] sm:text-[16px] font-bold text-ink tracking-[-0.01em] leading-tight">Pixel Karigars</h3>
              <p className="text-[11px] sm:text-xs text-ink/50 font-medium mt-0.5 leading-tight">Creative Design Studio</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
