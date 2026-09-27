import type { ReactNode } from "react";

type CodeFrameProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Frames a diagram as if it were a real editor/inspector panel — a small
 * bit of UI chrome that signals "this is how software actually gets built,"
 * rather than a generic floating abstract shape.
 */
export function CodeFrame({ label, children, className = "" }: CodeFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-ink-border/70 bg-paper-surface shadow-soft dark:border-ink-border dark:bg-ink-surface dark:shadow-soft-dark ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-ink-border/60 bg-ink-border/5 px-4 py-2.5 dark:border-ink-border dark:bg-white/[0.02]">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="ml-2 truncate font-mono text-[11px] text-slate-400 dark:text-slate-500">{label}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">{children}</div>
    </div>
  );
}
