import { motion } from "framer-motion";
import { Award, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ProjectArchitectureVisual } from "../components/architecture/ProjectArchitectureVisual";
import type { Project } from "../data/projects";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Minimal focus trap: keep Tab cycling inside the dialog.
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm dark:bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-ink-border/70 bg-paper p-6 shadow-soft-dark dark:border-ink-border dark:bg-ink sm:rounded-2xl sm:p-8"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-ink-border/70 text-slate-500 transition-colors hover:border-brass-400 hover:text-brass-600 dark:border-ink-border dark:text-slate-300"
        >
          <X size={16} />
        </button>

        <span className="font-mono text-xs font-medium tracking-wide text-signal-600 dark:text-signal-300">
          {project.client}
        </span>
        <h3
          id="project-modal-title"
          className="mt-2 max-w-lg font-display text-2xl font-semibold text-ink dark:text-slate-50"
        >
          {project.name}
        </h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-400">{project.domain}</p>
        <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">{project.role}</p>

        {/* Shared-element continuity: this is the same diagram the card
            showed, morphing into its larger, fully-labelled form. */}
        <motion.div
          layoutId={`project-arch-${project.id}`}
          className="mt-6 rounded-xl border border-ink-border/70 bg-paper-surface p-5 dark:border-ink-border dark:bg-ink-surface"
        >
          <ProjectArchitectureVisual architecture={project.architecture} />
        </motion.div>

        <div className="mt-6">
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Key contributions</p>
          <ul className="mt-3 space-y-2.5">
            {project.contributions.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-signal-400" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {project.achievement && (
          <div className="mt-6 flex gap-3 rounded-xl border border-brass-400/30 bg-brass-50 p-4 dark:border-brass-400/25 dark:bg-brass-400/[0.08]">
            <Award size={18} strokeWidth={1.75} className="mt-0.5 flex-shrink-0 text-brass-600 dark:text-brass-300" />
            <p className="text-sm leading-relaxed text-brass-700 dark:text-brass-200">{project.achievement}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-ink-border/70 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-ink-border dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
