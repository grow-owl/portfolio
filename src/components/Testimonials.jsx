"use client";

import { useScrollReveal, useMultiReveal } from "../hooks/useScrollReveal";

const cards = [
  {
    text: '"We wanted people to see our work and message us on WhatsApp. GrowOwl built exactly that, and we\'ve been getting real enquiries every week."',
    name: "Rajesh K.",
    role: "Owner, Arhan Fabricators, Lucknow",
    location: "Lucknow",
  },
  {
    text: '"Customers can now see our services and just tap to book instead of me explaining everything over the phone every time. Simple, and it actually works."',
    name: "Amit V.",
    role: "Owner, Auto Detailing Car Wash, Siliguri",
    location: "Siliguri",
  },
  {
    text: '"Our regulars check the menu on the site before they even walk in now. It finally feels like a proper restaurant online, not something copy-pasted."',
    name: "Rohit S.",
    role: "Owner, Cheesy Classics, Barasat",
    location: "Barasat",
  },
  {
    text: '"Table bookings used to be all phone calls and back-and-forth. Now a good chunk of our reservations come straight from the website itself."',
    name: "Deepak M.",
    role: "Owner, D Dine Kitchen, Salugara",
    location: "Salugara",
  },
];

export default function Testimonials({ sectionNumber = "/003/" }) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const setCardRef = useMultiReveal(cards.length);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-16 lg:py-24 bg-cream"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center max-w-[880px] mx-auto mb-14">
          <div
            ref={labelRef}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-ink/5 rounded-full mb-6 border border-ink/10"
          >
            <span className="font-serif italic text-sm text-accent font-semibold">
              {sectionNumber}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/80">
              Client Feedback
            </span>
          </div>

          <h2
            id="testimonials-heading"
            ref={titleRef}
            className="text-[clamp(26px,3.8vw,48px)] font-sans font-bold leading-[1.2] tracking-[-0.03em] text-ink mb-4 md:whitespace-nowrap"
          >
            Trusted by businesses that{" "}
            <em className="font-serif italic font-medium">grow online</em>
          </h2>

          <p className="text-[17px] text-ink/80 leading-[1.7] max-w-[580px] mx-auto">
            Direct feedback from owners who saw measurable increases in customer inquiries, bookings, and local brand credibility.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <div
              key={i}
              ref={setCardRef(i)}
              className="p-5 sm:p-8 lg:p-9 bg-card border border-ink/10 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-amber text-sm tracking-[3px]">
                    ★★★★★
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink/40 bg-ink/4 px-2.5 py-0.5 rounded-full">
                    Verified Client
                  </span>
                </div>

                <p className="text-[16px] leading-[1.7] text-ink/85 font-normal mb-8 italic">
                  {c.text}
                </p>
              </div>

              <div className="pt-5 border-t border-ink/8 flex items-center justify-between">
                <div>
                  <span className="block text-base font-bold text-ink">
                    {c.name}
                  </span>
                  <span className="text-[13px] text-ink/60 font-medium">
                    {c.role}
                  </span>
                </div>

                <div className="w-9 h-9 rounded-full bg-accent/8 border border-accent/15 flex items-center justify-center text-accent font-serif font-bold text-sm shrink-0">
                  {c.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
