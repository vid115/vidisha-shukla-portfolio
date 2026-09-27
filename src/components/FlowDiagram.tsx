import { motion, useReducedMotion } from "framer-motion";

type FlowDiagramProps = {
  nodes: string[];
  orientation?: "vertical" | "horizontal";
  trigger?: "mount" | "inView";
  size?: "sm" | "md";
};

/**
 * The portfolio's recurring visual motif: a connected node → node flow,
 * standing in for the shape of this developer's actual work (component
 * trees, state flowing into APIs, build pipelines). Reused in the Hero,
 * the "How I Build" section, and each project's architecture modal so the
 * idea reads as one deliberate device rather than decoration repeated
 * per-section.
 */
export function FlowDiagram({ nodes, orientation = "vertical", trigger = "inView", size = "md" }: FlowDiagramProps) {
  const shouldReduceMotion = useReducedMotion();
  const isHorizontal = orientation === "horizontal";
  const isSmall = size === "sm";

  const viewportProps = trigger === "inView" ? { whileInView: "visible", viewport: { once: true, margin: "-60px" } } : { animate: "visible" };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.16 },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, ...(isHorizontal ? { x: -12 } : { y: -12 }) },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  const connectorVariants = {
    hidden: { scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0, opacity: 0 },
    visible: { scaleX: 1, scaleY: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      initial="hidden"
      {...viewportProps}
      variants={containerVariants}
      className={isHorizontal ? "flex flex-wrap items-center gap-x-2 gap-y-3" : "flex flex-col"}
    >
      {nodes.map((node, index) => (
        <div key={node} className={isHorizontal ? "flex items-center" : "flex flex-col"}>
          <motion.div
            variants={nodeVariants}
            className={`rounded-lg border border-ink-border/70 bg-paper-surface font-mono text-slate-700 shadow-soft dark:border-ink-border dark:bg-ink-surface dark:text-slate-200 dark:shadow-soft-dark ${
              isSmall ? "px-3 py-1.5 text-[11px]" : "px-4 py-2.5 text-xs sm:text-sm"
            }`}
          >
            {node}
          </motion.div>

          {index < nodes.length - 1 && (
            <motion.div
              variants={connectorVariants}
              className={
                isHorizontal
                  ? "relative mx-2 h-px w-6 origin-left bg-signal-400/50 sm:w-10"
                  : "relative my-1.5 ml-[22px] h-6 w-px origin-top bg-signal-400/50"
              }
            >
              {/* Ambient "data is flowing" pulse — a plain CSS animation (not
                  Framer Motion) since it loops forever and gains nothing from
                  a JS-driven engine; Tailwind's motion-reduce: variant turns
                  it off for free. */}
              <span
                className={`absolute rounded-full bg-signal-400 motion-reduce:hidden ${
                  isHorizontal ? "top-1/2 h-1.5 w-1.5 -translate-y-1/2 animate-flow-x" : "left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-flow-y"
                }`}
                style={{ animationDelay: `${index * 0.25}s` }}
              />
            </motion.div>
          )}
        </div>
      ))}
    </motion.div>
  );
}
