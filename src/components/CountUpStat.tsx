import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

/**
 * Animates a numeric stat counting up once it scrolls into view. Values
 * that aren't purely numeric-with-suffix (shouldn't happen here, but data
 * can change) fall back to rendering as plain text.
 */
export function CountUpStat({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number.parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";
  const prefersReducedMotion = usePrefersReducedMotion();

  const [display, setDisplay] = useState(target === null || prefersReducedMotion ? target ?? 0 : 0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (target === null || prefersReducedMotion) return;
    const el = spanRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefersReducedMotion]);

  if (target === null) return <span ref={spanRef}>{value}</span>;
  return (
    <span ref={spanRef}>
      {display}
      {suffix}
    </span>
  );
}
