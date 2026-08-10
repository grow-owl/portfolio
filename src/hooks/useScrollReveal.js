"use client";

import { useEffect, useRef } from "react";

/**
 * Defers a callback to run AFTER the browser has painted the current frame.
 * This is critical for LCP: React hydration fires all useEffect hooks
 * synchronously, and getBoundingClientRect + classList.add calls during
 * hydration block the main thread, preventing the browser from painting
 * the SSR HTML and recording LCP. By deferring to a new macrotask,
 * we guarantee the browser can paint first.
 */
function afterPaint(fn) {
  // setTimeout(fn, 0) schedules in the next macrotask, after the current
  // paint cycle completes. This is the most reliable cross-browser way
  // to yield to the browser's rendering pipeline.
  return setTimeout(fn, 0);
}

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Defer all DOM reads/writes to after the browser has painted SSR content.
    // This prevents layout thrashing during hydration and allows Lighthouse
    // to measure LCP from the initial paint.
    const timerId = afterPaint(() => {
      if (typeof IntersectionObserver === "undefined") {
        el.classList.add("visible");
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
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

      // Store observer for cleanup
      el._scrollRevealObserver = observer;
    });

    return () => {
      clearTimeout(timerId);
      if (el._scrollRevealObserver) {
        el._scrollRevealObserver.disconnect();
        delete el._scrollRevealObserver;
      }
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

    // Defer all DOM reads/writes to after the browser has painted SSR content.
    const timerId = afterPaint(() => {
      const vh = window.innerHeight;

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

      // Store for cleanup
      refs._observer = observer;
    });

    return () => {
      clearTimeout(timerId);
      if (refs._observer) {
        refs._observer.disconnect();
        delete refs._observer;
      }
    };
  }, [count]);

  return (index) => (el) => {
    refs.current[index] = el;
  };
}

export const useNoReveal = () => useRef(null);
