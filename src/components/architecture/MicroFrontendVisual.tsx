import { motion } from "framer-motion";
import type { MicroFrontendArchitecture } from "../../data/projects";

const nodeBase =
  "rounded-lg border px-3 py-2 text-center font-mono text-[11px] leading-tight shadow-soft dark:shadow-soft-dark";

/**
 * Makes "micro-frontend architecture" legible at a glance: one host shell
 * composes several independently built modules, which share one state layer
 * backed by one API. The composition itself — not just the label — is what
 * this renders.
 */
export function MicroFrontendVisual({ architecture }: { architecture: MicroFrontendArchitecture }) {
  const { shell, modules, shared, api } = architecture;

  return (
    <div className="flex flex-col items-center py-2">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`${nodeBase} border-brass-400/70 bg-brass-50 text-brass-700 dark:bg-brass-400/[0.08] dark:text-brass-200`}
      >
        {shell}
      </motion.div>

      {/* CSS-only org-chart connector: one stem down from the shell, a bus
          line spanning the modules, then one stem into each module. */}
      <div className="relative flex justify-center gap-4 pt-6 before:absolute before:left-1/2 before:top-0 before:h-6 before:w-px before:-translate-x-1/2 before:bg-signal-400/50 sm:gap-6">
        {modules.map((mod, index) => (
          <motion.div
            key={mod}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
            className="relative pt-6 before:absolute before:left-1/2 before:top-0 before:h-6 before:w-px before:-translate-x-1/2 before:bg-signal-400/50 after:absolute after:top-0 after:h-px after:bg-signal-400/50 first:after:left-1/2 first:after:right-0 last:after:left-0 last:after:right-1/2 only:after:hidden [&:not(:first-child):not(:last-child)]:after:left-0 [&:not(:first-child):not(:last-child)]:after:right-0"
          >
            <div className={`${nodeBase} min-w-[6.5rem] border-ink-border/70 bg-paper-surface text-slate-600 dark:bg-ink-surface dark:text-slate-300`}>
              {mod}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-6 w-px bg-signal-400/50" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className={`${nodeBase} border-signal-400/60 bg-signal-50 text-signal-700 dark:bg-signal-400/10 dark:text-signal-200`}
      >
        {shared}
      </motion.div>
      <div className="h-6 w-px bg-signal-400/50" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className={`${nodeBase} border-signal-400/60 bg-signal-50 text-signal-700 dark:bg-signal-400/10 dark:text-signal-200`}
      >
        {api}
      </motion.div>

      <p className="mt-5 max-w-[15rem] text-center text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
        Independent modules composed at runtime by one host shell, sharing a single state and data layer.
      </p>
    </div>
  );
}
