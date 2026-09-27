import { useRef } from "react";
import type { PointerEvent } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const MAX_TILT_DEG = 5;

/**
 * A restrained pointer-tilt + spotlight effect for cards. Only ever touches
 * `transform` and a couple of CSS custom properties (read by an inline
 * radial-gradient) — no layout-affecting properties, so it stays cheap even
 * with several cards on screen. No-ops for touch input and reduced motion.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handlePointerMove = (event: PointerEvent<T>) => {
    if (prefersReducedMotion || event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * MAX_TILT_DEG * 2;
    const rotateX = (0.5 - py) * MAX_TILT_DEG * 2;

    el.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
    el.style.setProperty("--spot-x", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--spot-y", `${(py * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return { ref, handlePointerMove, handlePointerLeave };
}
