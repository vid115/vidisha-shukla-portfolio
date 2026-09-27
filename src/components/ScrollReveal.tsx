import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
};

/**
 * A single, restrained reveal treatment (fade + slight rise) used for
 * section content as it enters the viewport. Deliberately not used on every
 * individual element — see composition in each section.
 */
export function ScrollReveal({ children, className, delay = 0, as = "div" }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      className={className}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
