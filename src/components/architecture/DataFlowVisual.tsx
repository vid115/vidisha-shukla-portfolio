import { motion } from "framer-motion";
import type { DataFlowArchitecture } from "../../data/projects";

/**
 * Two services, talking both ways. Left/right instead of a vertical stack —
 * a full-stack request/response pair reads more naturally as a
 * conversation than as a pipeline.
 */
export function DataFlowVisual({ architecture }: { architecture: DataFlowArchitecture }) {
  const { left, right, exchanges } = architecture;
  const [outbound, inbound] = exchanges;

  return (
    <div className="flex items-center justify-center gap-3 py-4 sm:gap-6">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex-shrink-0 rounded-lg border border-signal-400/60 bg-signal-50 px-3.5 py-3 text-center font-mono text-[11px] font-medium text-signal-700 shadow-soft dark:bg-signal-400/10 dark:text-signal-200 dark:shadow-soft-dark"
      >
        {left}
      </motion.div>

      <div className="flex w-20 flex-shrink-0 flex-col items-center gap-2.5 sm:w-28">
        {outbound && (
          <div className="relative h-px w-full bg-ink-border/70 dark:bg-ink-border">
            <span
              className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-signal-400 motion-reduce:hidden animate-flow-x"
              style={{ animationDuration: "2.6s" }}
            />
            <span className="absolute -top-4 left-1/2 w-max max-w-[5.5rem] -translate-x-1/2 text-center font-mono text-[9px] leading-tight text-slate-400 dark:text-slate-500">
              {outbound}
            </span>
          </div>
        )}
        {inbound && (
          <div className="relative h-px w-full bg-ink-border/70 dark:bg-ink-border">
            <span
              className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-moss-500 motion-reduce:hidden animate-flow-x-reverse"
              style={{ animationDuration: "2.6s" }}
            />
            <span className="absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] text-slate-400 dark:text-slate-500">
              {inbound}
            </span>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-shrink-0 rounded-lg border border-moss-500/50 bg-moss-100 px-3.5 py-3 text-center font-mono text-[11px] font-medium text-moss-600 shadow-soft dark:border-moss-400/40 dark:bg-moss-500/10 dark:text-moss-300 dark:shadow-soft-dark"
      >
        {right}
      </motion.div>
    </div>
  );
}
