"use client";

import Image from "next/image";

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "auto" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer
      id="footer"
      aria-label="Footer"
      className="w-full pt-14 sm:pt-20 pb-10 bg-dark text-white border-t border-white/10"
    >
      <div className="w-full max-w-[1500px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-16">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-12 sm:pb-14 border-b border-white/8">
          {/* Brand Column (Col 1-4) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col justify-between mb-2 lg:mb-0">
            <div>
              <a
                href="/"
                aria-label="GrowOwl Home"
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.location.pathname === "/") {
                    e.preventDefault();
                    scrollTo("home");
                  }
                }}
                className="inline-block mb-3 sm:mb-4"
              >
                <Image
                  src="/images/growowl-logo-white.webp"
                  alt="GrowOwl logo"
                  width={495}
                  height={172}
                  loading="lazy"
                  className="h-7 sm:h-9 w-auto hover:opacity-85 transition-opacity"
                />
              </a>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-sm mb-5 sm:mb-6">
                We help local businesses grow online through Google, social media, and smarter software.
              </p>
            </div>

            {/* Social Media Links (Instagram, LinkedIn, Facebook) */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/growowl.online/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GrowOwl on Instagram"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all text-xs font-medium"
              >
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white/70 group-hover:text-white transition-all"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/company/growowl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GrowOwl on LinkedIn"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all text-xs font-medium"
              >
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white/70 group-hover:text-white transition-all"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61594825007663"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GrowOwl on Facebook"
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white/80 hover:text-white transition-all text-xs font-medium"
              >
                <svg
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-white/70 group-hover:text-white transition-all"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Pages Column (Col 5-6) */}
          <div className="col-span-1 lg:col-span-2">
            <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-3.5 sm:mb-5">
              Pages
            </p>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Process", href: "/process" },
                { label: "Work Portfolio", href: "/work" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore Column (Col 7-8) */}
          <div className="col-span-1 lg:col-span-2">
            <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-3.5 sm:mb-5">
              Explore
            </p>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {[
                { label: "Pricing Plans", href: "/pricing" },
                { label: "FAQ", href: "/faq" },
                { label: "Internships", href: "/internship" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column (Col 9-10) */}
          <div className="col-span-1 lg:col-span-2">
            <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-3.5 sm:mb-5">
              Services
            </p>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {[
                { label: "Web Development", href: "/services/web-development" },
                { label: "Web Design (UI/UX)", href: "/services/web-design" },
                { label: "SEO Services", href: "/services/seo-services" },
                { label: "Digital Marketing", href: "/services/digital-marketing" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column (Col 11-12) */}
          <div
            className="col-span-1 lg:col-span-2"
            itemScope
            itemType="https://schema.org/LocalBusiness"
          >
            <meta itemProp="name" content="GrowOwl Studio" />
            <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-3.5 sm:mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <a
                href="tel:+918609504186"
                itemProp="telephone"
                className="text-xs sm:text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all"
              >
                +91 86095 04186
              </a>
              <a
                href="tel:+918944800564"
                itemProp="telephone"
                className="text-xs sm:text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all"
              >
                +91 89448 00564
              </a>
              <span
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                className="text-xs sm:text-sm text-white/60"
              >
                <span itemProp="addressCountry">India</span> (Remote)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 text-center sm:text-left">
          <p className="text-xs sm:text-[13px] text-white/60">
            © 2026 GrowOwl Studio. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6 pb-4 sm:pb-0">
            <a
              href="/privacy"
              className="text-xs sm:text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs sm:text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
