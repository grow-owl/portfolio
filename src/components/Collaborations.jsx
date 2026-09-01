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
  {
    id: "pritix-creative",
    name: "Pritix Creative",
    role: "Content & Marketing Agency",
    image: "/images/logos/pritix-creative.webp",
    imgBg: "#ede9ff",
    imgRadius: "rounded-xl",
    accent: "#7c3aed",
  },
];

export default function Collaborations() {
  return (
    <section
      aria-label="In Collaboration With"
      className="bg-cream-light border-y border-dashed border-ink/12 py-9 sm:py-12 lg:py-14"
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">

          {/* Card 1 — Pixel Karigars */}
          <div className="w-full sm:w-[280px] lg:w-[300px] bg-card rounded-2xl sm:rounded-3xl border border-ink/10 px-5 sm:px-6 py-5 sm:py-6 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.09)] transition-shadow duration-300">
            <div
              className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full overflow-hidden border border-ink/8 shrink-0"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <Image src="/images/logos/pixel-karigars.webp" alt="Pixel Karigars logo" width={64} height={64} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <span className="inline-block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.14em] mb-1 px-1.5 py-0.5 rounded" style={{ color: "#e8481c", backgroundColor: "#e8481c14" }}>
                Partner Agency
              </span>
              <h3 className="text-[15px] sm:text-[16px] font-bold text-ink tracking-[-0.01em] leading-tight">Pixel Karigars</h3>
              <p className="text-[11px] sm:text-xs text-ink/50 font-medium mt-0.5 leading-tight">Creative Design Studio</p>
            </div>
          </div>

          {/* ── × Divider — desktop only, sits between the two cards ── */}
          <div className="hidden sm:flex flex-col items-center gap-1.5 shrink-0 self-center">
            <div className="w-px h-5 bg-ink/12" />
            <span className="text-[12px] font-bold text-ink/25">×</span>
            <div className="w-px h-5 bg-ink/12" />
          </div>

          {/* Mobile × separator */}
          <div className="flex sm:hidden items-center gap-3">
            <div className="w-10 h-px bg-ink/10" />
            <span className="text-[11px] font-bold text-ink/25 tracking-widest">×</span>
            <div className="w-10 h-px bg-ink/10" />
          </div>

          {/* Card 2 — Pritix Creative */}
          <div className="w-full sm:w-[280px] lg:w-[300px] bg-card rounded-2xl sm:rounded-3xl border border-ink/10 px-5 sm:px-6 py-5 sm:py-6 flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.09)] transition-shadow duration-300">
            <div
              className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-xl overflow-hidden border border-ink/8 shrink-0"
              style={{ backgroundColor: "#ede9ff" }}
            >
              <Image src="/images/logos/pritix-creative.webp" alt="Pritix Creative logo" width={64} height={64} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <span className="inline-block text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.14em] mb-1 px-1.5 py-0.5 rounded" style={{ color: "#7c3aed", backgroundColor: "#7c3aed14" }}>
                Partner Agency
              </span>
              <h3 className="text-[15px] sm:text-[16px] font-bold text-ink tracking-[-0.01em] leading-tight">Pritix Creative</h3>
              <p className="text-[11px] sm:text-xs text-ink/50 font-medium mt-0.5 leading-tight">Content & Marketing Agency</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
