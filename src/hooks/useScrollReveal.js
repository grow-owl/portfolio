"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("visible");
      return;
    }

    const rect = el.getBoundingClientRect();
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const isInViewport = rect.top < vh + 100 && rect.bottom > 0;

    if (isInViewport) {
      el.classList.add("visible");
      return;
    }

    el.classList.add("reveal-init");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px 0px 0px", ...options }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}

export function useMultiReveal(count, options = {}) {
  const refs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      refs.current.forEach((el) => el?.classList.add("visible"));
      return;
    }

    const vh = typeof window !== "undefined" ? window.innerHeight : 900;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "100px 0px 0px 0px", ...options }
    );

    refs.current.forEach((el) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < vh + 100 && rect.bottom > 0;
        if (isInViewport) {
          el.classList.add("visible");
        } else {
          el.classList.add("reveal-init");
          observer.observe(el);
        }
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [count]);

  return (index) => (el) => {
    refs.current[index] = el;
  };
}
