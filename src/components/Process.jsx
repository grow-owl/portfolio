"use client";

import { useScrollReveal, useMultiReveal } from "../hooks/useScrollReveal";

const steps = [
  {
    number: "/001/",
    title: "Discovery & Strategy",
    desc: "We uncover your business goals, audience, and market through deep research, mapping out a data-backed digital roadmap before writing code.",
  },
  {
    number: "/002/",
    title: "Design & Build",
    desc: "We bring your brand to life with pixel-perfect UI/UX design, custom full-stack React and Node.js development, and a polished deployment.",
  },
  {
    number: "/003/",
    title: "Growth",
    desc: "We continuously optimize performance post-launch — tracking search metrics, refining conversion pathways, and scaling your digital presence.",
  },
];

export default function Process({ sectionNumber = "/006/" }) {
  const labelRef = useScrollReveal();
  const titleRef = useScrollReveal();
  const setStepRef = useMultiReveal(steps.length);

  return (
    <section id="process" aria-labelledby="process-heading" className="py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div ref={labelRef} className="flex items-center gap-3 mb-10">
          <span className="font-serif italic text-lg text-accent font-medium">
            {sectionNumber}
          </span>
          <span className="text-lg font-medium uppercase tracking-[0.08em] text-ink/80">
            The Process
          </span>
        </div>

        <h2
          id="process-heading"
          ref={titleRef}
          className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.2] tracking-[-0.03em] text-ink max-w-[800px] text-center mx-auto"
        >
          How we guide every project to the{" "}
          <em className="font-serif italic font-medium">finish line</em>
        </h2>
        <p className="text-[17px] text-ink/80 max-w-[600px] mt-4 leading-[1.7] text-center mx-auto">
          Each phase is handled by specialists who obsess over the details so
          you don't have to.
        </p>

        <div className="mt-14 flex flex-col">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={setStepRef(i)}
              className="grid grid-cols-[60px_1fr] lg:grid-cols-[120px_1fr] gap-5 lg:gap-10 py-7 lg:py-10 border-t border-ink/10 last:border-b items-start hover:pl-2 transition-all"
            >
              <span className="font-serif italic text-base text-accent font-medium pt-0.5">
                {s.number}
              </span>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.02em] mb-3">
                  {s.title}
                </h3>
                <p className="text-[15px] text-ink/80 leading-[1.7] max-w-[600px]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
