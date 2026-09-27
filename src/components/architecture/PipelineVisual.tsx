import { motion } from "framer-motion";
import type { PipelineArchitecture } from "../../data/projects";

/**
 * A left-to-right release pipeline. Numbered steps are earned here — unlike
 * a decorative "01/02/03", this genuinely is a sequence (Intel's IBems
 * project shipped through a real CI/CD pipeline).
 */
export function PipelineVisual({ architecture }: { architecture: PipelineArchitecture }) {
  const { steps } = architecture;

  return (
    <div className="py-2">
      <div className="relative">
        <div className="absolute left-4 right-4 top-4 h-px bg-ink-border/70 dark:bg-ink-border" aria-hidden="true">
          <span
            className="absolute h-1.5 w-1.5 -translate-y-[calc(50%-0.5px)] rounded-full bg-signal-400 motion-reduce:hidden animate-flow-x"
            style={{ animationDuration: "3.2s" }}
          />
        </div>

        <div className="relative flex justify-between gap-3 overflow-x-auto pb-1">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="flex min-w-[5rem] flex-shrink-0 flex-col items-center gap-2 sm:min-w-[5.5rem]"
            >
              <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-signal-400 bg-paper font-mono text-[11px] font-semibold text-signal-600 dark:bg-ink dark:text-signal-300">
                {index + 1}
              </div>
              <span className="max-w-[6rem] text-balance text-center font-mono text-[10px] leading-tight text-slate-600 dark:text-slate-400">
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
