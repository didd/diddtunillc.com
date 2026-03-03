"use client";

import { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeUp({ children, className = "", delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.visible = "true";
      return;
    }

    let frameId = 0;
    const reveal = () => {
      el.dataset.visible = "true";
    };

    const revealOnNextFrame = () => {
      frameId = window.requestAnimationFrame(reveal);
    };

    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 40 && rect.bottom >= 0) {
      revealOnNextFrame();
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealOnNextFrame();
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);

  const style = {
    "--fade-up-delay": `${delay}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-visible="false"
      className={`transform-gpu translate-y-8 opacity-0 [transition-property:opacity,transform] duration-700 ease-out delay-(--fade-up-delay) will-change-[opacity,transform] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
