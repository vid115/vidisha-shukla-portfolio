import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import { CodeFrame } from "../components/CodeFrame";
import { ProjectArchitectureVisual } from "../components/architecture/ProjectArchitectureVisual";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionHeading } from "../components/SectionHeading";
import { TiltCard } from "../components/TiltCard";
import { projects } from "../data/projects";
import { ProjectModal } from "./ProjectModal";

const FRAME_LABELS: Record<string, string> = {
  honeywell: "honeywell/Dashboard.tsx",
  intel: "ibems/pipeline.yml",
  philips: "softops/api.ts",
};

export function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = projects.find((project) => project.id === activeId) ?? null;
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openProject = (id: string) => (event: MouseEvent<HTMLButtonElement>) => {
    lastTriggerRef.current = event.currentTarget;
    setActiveId(id);
  };

  const closeProject = () => {
    setActiveId(null);
    // Return focus to whichever card opened the modal, rather than letting
    // it silently fall back to <body> — the standard a11y expectation for
    // any dialog that can be opened by keyboard.
    lastTriggerRef.current?.focus();
  };

  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            title="Enterprise work, in detail."
            description="Three client engagements, three different frontend architectures. Each diagram below is the actual shape of that project — open one for the full case study."
          />
        </ScrollReveal>

        {/* Honeywell is the deepest engagement (recognition + a real
            micro-frontend composition worth seeing at size), so it leads,
            full-width, before the two supporting engagements below. Priority
            is shown through space, not a "featured" label. */}
        <div className="mt-14 grid grid-cols-1 gap-6">
          {/* Exactly one project is ever `featured`, so this is a plain
              full-width block rather than a grid — a 2-column grid with a
              single child would leave a dead gap beside it. */}
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openProject(project.id)}
                delay={index * 0.08}
                featured
              />
            ))}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <ProjectCard key={project.id} project={project} onOpen={openProject(project.id)} delay={0.1 + index * 0.08} />
              ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{activeProject && <ProjectModal project={activeProject} onClose={closeProject} />}</AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  onOpen,
  delay = 0,
  featured = false,
}: {
  project: (typeof projects)[number];
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  delay?: number;
  featured?: boolean;
}) {
  const header = (
    <div>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs font-medium tracking-wide text-signal-600 dark:text-signal-300">
          {project.client}
        </span>
        <ArrowUpRight
          size={17}
          strokeWidth={1.75}
          className="flex-shrink-0 text-slate-400 transition-transform duration-200 group-hover/tilt:translate-x-0.5 group-hover/tilt:-translate-y-0.5 group-hover/tilt:text-brass-600"
        />
      </div>
      <h3
        className={`mt-2.5 font-display font-semibold leading-snug text-ink dark:text-slate-50 ${
          featured ? "text-xl" : "text-base"
        }`}
      >
        {project.name}
      </h3>
      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{project.role}</p>
    </div>
  );

  const closingNote = project.achievement ? (
    <p
      className={`text-xs leading-relaxed text-brass-700 dark:text-brass-200 ${featured ? "max-w-sm" : "line-clamp-2"}`}
    >
      ✦ {project.achievement}
    </p>
  ) : (
    <p
      className={`text-xs leading-relaxed text-slate-500 dark:text-slate-400 ${featured ? "max-w-sm" : "line-clamp-2"}`}
    >
      {project.domain}
    </p>
  );

  const diagram = (
    <motion.div
      layoutId={`project-arch-${project.id}`}
      className={`rounded-xl bg-ink-border/[0.04] dark:bg-white/[0.02] ${featured ? "flex-1 p-4" : "my-5 flex-1 px-1"}`}
    >
      <ProjectArchitectureVisual architecture={project.architecture} />
    </motion.div>
  );

  return (
    <ScrollReveal className="h-full" delay={delay}>
      <TiltCard
        onClick={onOpen}
        ariaLabel={`View case study: ${project.name} for ${project.client}`}
        className="flex h-full w-full flex-col rounded-2xl"
      >
        <CodeFrame label={FRAME_LABELS[project.id] ?? `${project.id}.tsx`} className="flex h-full flex-col">
          {featured ? (
            <div className="flex flex-1 flex-col gap-6 lg:flex-row lg:items-center">
              <div className="flex flex-col gap-4 lg:w-[15rem] lg:flex-shrink-0">
                {header}
                {closingNote}
              </div>
              {diagram}
            </div>
          ) : (
            <div className="flex h-full flex-col">
              {header}
              {diagram}
              {closingNote}
            </div>
          )}
        </CodeFrame>
      </TiltCard>
    </ScrollReveal>
  );
}
