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
      className="pt-20 pb-10 bg-dark text-white border-t border-white/6"
    >
      <div className="max-w-300 mx-auto px-5 md:px-10">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-15 pb-15 border-b border-white/8">
          {/* Brand */}
          <div>
            <a
              href="#home"
              aria-label="GrowOwl Home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("home");
              }}
              className="block mb-4"
            >
              <Image
                src="/images/growowl-logo-white.webp"
                alt="GrowOwl logo"
                width={495}
                height={172}
                loading="lazy"
                className="h-8 w-auto"
              />
            </a>
            <p className="text-sm text-white/60 leading-[1.6] max-w-70 mb-5">
              We build digital experiences that drive real results.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/growowl_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrowOwl Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/growowl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrowOwl LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://x.com/growowl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrowOwl X Twitter"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@growowl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrowOwl YouTube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/growowl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrowOwl Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-5">
                Pages
              </p>
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Work Portfolio", href: "/work" },
                { label: "Pricing Plans", href: "/pricing" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-5">
                Services
              </p>
              {[
                { label: "Web Development", href: "/services/web-development" },
                { label: "Web Design (UI/UX)", href: "/services/web-design" },
                { label: "SEO Services", href: "/services/seo-services" },
                { label: "Digital Marketing", href: "/services/digital-marketing" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div itemScope itemType="https://schema.org/LocalBusiness">
              <meta itemProp="name" content="GrowOwl Studio" />
              <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white mb-5">
                Contact
              </p>
              <a
                href="tel:+918609504186"
                itemProp="telephone"
                className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
              >
                +91 86095 04186
              </a>
              <a
                href="tel:+918944800564"
                itemProp="telephone"
                className="block text-sm text-white/60 mb-3 hover:text-white hover:translate-x-1 transition-all"
              >
                +91 89448 00564
              </a>
              <span
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
                className="block text-sm text-white/60 mb-3"
              >
                <span itemProp="addressCountry">India</span> (Remote)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-[13px] text-white/60">
            © 2026 GrowOwl Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-[13px] text-white/60 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
