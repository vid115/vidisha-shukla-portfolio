import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` OS setting so components can
 * skip or shorten non-essential animation (Framer Motion transitions still
 * respect this explicitly rather than relying on CSS alone).
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);

    const listener = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return prefersReduced;
}
