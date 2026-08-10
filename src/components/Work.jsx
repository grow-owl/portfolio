"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal, useMultiReveal } from "../hooks/useScrollReveal";

const openingProject = {
  id: "ddine-kitchen",
  image: "/images/work-ddine-kitchen.webp",
  number: "/001/",
  year: "2026",
  tag: "Featured",
  name: "D Dine Kitchen",
  desc: "Bold restaurant website with online ordering, table reservations, and a punchy brand look for D Dine Kitchen Salugara.",
  link: "https://ddinekitchen.shop",
};

const carouselProjects = [
  {
    id: "lensaura-photography",
    image: "/images/work-photographer.webp",
    number: "/002/",
    year: "2026",
    name: "LensAura Photography",
    desc: "Cinematic booking site for an award-winning wedding & event photography studio, designed to turn visitors into session bookings.",
    link: "https://photographer-hazel.vercel.app/",
  },
  {
    id: "car-wash",
    image: "/images/work-car-wash.webp",
    number: "/003/",
    year: "2026",
    name: "Auto Detailing Car Wash",
    desc: "Booking-focused site for a car detailing studio in Siliguri, showcasing services and one-tap slot booking.",
    link: "https://car-washing-website-psi.vercel.app/",
  },
  {
    id: "arhan-fabricators",
    image: "/images/work-arhan-fabricators.webp",
    number: "/004/",
    year: "2026",
    name: "Arhan Fabricators",
    desc: "Business website for a steel & iron fabrication workshop in Lucknow, built to drive WhatsApp and call enquiries.",
    link: "https://arhan-fabricators.vercel.app/",
  },
  {
    id: "bold-and-beautiful",
    image: "/images/work-bold-beautiful.webp",
    number: "/005/",
    year: "2026",
    name: "Bold & Beautiful Salon",
    desc: "Elegant salon website for a top-tier beauty parlour in Salugara, Siliguri, built to showcase services and drive WhatsApp bookings.",
    link: "https://www.boldandbeautiful.co.in/",
  },
];

const closingProject = {
  id: "cheesy-classics",
  image: "/images/work-cheesy-classics.webp",
  number: "/006/",
  year: "2026",
  tag: "Featured",
  name: "Cheesy Classics",
  desc: "Warm, appetite-driving landing page for a cosy cafe in Barasat, built around its signature dishes and menu.",
  link: "https://classic-cheesy.vercel.app/",
};

function ProjectCard({ p }) {
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-card rounded-2xl border border-ink/10 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.1)] group h-full"
    >
      <div className="relative bg-ink/5 overflow-hidden">
        <Image
          src={p.image}
          alt={`${p.name} — ${p.desc}`}
          width={1200}
          height={675}
          loading="lazy"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 600px"
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold text-white">
          Visit Website →
        </div>
      </div>
      <div className="p-5 md:p-7">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-serif italic text-base text-accent">
            {p.number}
          </span>
          <span className="text-xs text-ink/40 font-medium">{p.year}</span>
          {p.tag && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent bg-accent/8 px-3 py-1 rounded-full">
              {p.tag}
            </span>
          )}
        </div>
        <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-2">
          {p.name}
        </h3>
        <p className="text-sm text-ink/60 leading-[1.6]">{p.desc}</p>
      </div>
    </a>
  );
}

export default function Work({ sectionNumber = "/003/" }) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const setCardRef = useMultiReveal(3);
  const scrollerRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.offsetWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="work" aria-labelledby="work-heading" className="py-14 lg:py-20 bg-cream-light">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/60">
            Featured Work
          </span>
        </div>

        <h2
          id="work-heading"
          ref={titleRef}
          className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink max-w-[800px] text-center mx-auto"
        >
          Projects that <em className="font-serif italic font-medium">speak</em>{" "}
          for themselves
        </h2>
        <p className="text-[17px] text-ink/60 max-w-[600px] mt-4 leading-[1.7] text-center mx-auto">
          A selection of our most impactful work across web design, branding,
          and digital strategy.
        </p>

        {/* Opening banner */}
        <div ref={setCardRef(0)} className="mt-14">
          <ProjectCard p={openingProject} />
        </div>

        {/* Middle carousel */}
        <div ref={setCardRef(1)} className="mt-8">
          <div
            ref={scrollerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-3 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {carouselProjects.map((p) => (
              <div
                key={p.id}
                data-card
                className="snap-start shrink-0 w-[85%] sm:w-[62%] md:w-[46%] lg:w-[38%]"
              >
                <ProjectCard p={p} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Previous project"
              type="button"
              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink hover:text-white hover:border-ink transition-colors duration-300"
            >
              ←
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Next project"
              type="button"
              className="w-11 h-11 rounded-full border border-ink/15 flex items-center justify-center text-ink/70 hover:bg-ink hover:text-white hover:border-ink transition-colors duration-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Closing banner */}
        <div ref={setCardRef(2)} className="mt-8">
          <ProjectCard p={closingProject} />
        </div>
      </div>
    </section>
  );
}
