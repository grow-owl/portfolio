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

    let observer;
    const rafId = requestAnimationFrame(() => {
      if (!el) return;
      el.classList.add("reveal-init");

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.05, rootMargin: "50px 0px 0px 0px", ...options }
      );

      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
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

    let observer;
    const rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "50px 0px 0px 0px", ...options }
      );

      refs.current.forEach((el) => {
        if (el) {
          el.classList.add("reveal-init");
          observer.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, [count]);

  return (index) => (el) => {
    refs.current[index] = el;
  };
}
