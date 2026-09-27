import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor-hover]';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const shouldEnable = isFinePointer && !prefersReducedMotion;
    setEnabled(shouldEnable);
    document.documentElement.classList.toggle("has-custom-cursor", shouldEnable);
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden sm:block" aria-hidden="true">
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-brass-400"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full border border-brass-400/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 44 : 26,
          height: hovering ? 44 : 26,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}
