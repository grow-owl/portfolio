"use client";

import { useScrollReveal, useMultiReveal } from "../hooks/useScrollReveal";

// NEEDS OWNER INPUT: confirm real client names
const cards = [
  {
    text: '"We wanted people to see our work and message us on WhatsApp. GrowOwl built exactly that, and we\'ve been getting real enquiries every week."',
    name: "Rajesh K.",
    role: "Owner, Arhan Fabricators — Lucknow",
  },
  {
    text: '"Customers can now see our services and just tap to book instead of me explaining everything over the phone every time. Simple, and it actually works."',
    name: "Amit V.",
    role: "Owner, Auto Detailing Car Wash — Siliguri",
  },
  {
    text: '"Our regulars check the menu on the site before they even walk in now. It finally feels like a proper restaurant online, not something copy-pasted."',
    name: "Rohit S.",
    role: "Owner, Cheesy Classics — Barasat",
  },
  {
    text: '"Table bookings used to be all phone calls and back-and-forth. Now a good chunk of our reservations come straight from the website itself."',
    name: "Deepak M.",
    role: "Owner, D Dine Kitchen — Salugara",
  },
];

export default function Testimonials({ sectionNumber = "/005/" }) {
  const labelRef = useScrollReveal();
  const setCardRef = useMultiReveal(cards.length);

  return (
    <section id="testimonials" aria-label="Testimonials" className="py-14 lg:py-20 bg-dark text-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-white/60">
            Testimonials
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {cards.map((c, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              className="p-8 bg-white/5 border border-white/8 rounded-2xl hover:bg-white/8 hover:border-white/15 hover:-translate-y-1 transition-all"
            >
              <div className="text-amber text-sm tracking-[3px] mb-4">
                ★★★★★
              </div>
              <p className="text-[15px] leading-[1.7] text-white/80 mb-6">
                {c.text}
              </p>
              <div>
                <span className="block text-sm font-semibold text-white mb-1">
                  {c.name}
                </span>
                <span className="text-[13px] text-white/60">{c.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
