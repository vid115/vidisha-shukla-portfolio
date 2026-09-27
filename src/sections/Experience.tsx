import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionHeading } from "../components/SectionHeading";
import { experience } from "../data/experience";
import { formatDuration, monthsSince } from "../lib/duration";

function resolveMonths(role: (typeof experience)[number]): number {
  if (typeof role.durationMonths === "number") return role.durationMonths;
  if (role.since) return monthsSince(role.since);
  return 0;
}

const durations = experience.map(resolveMonths);
const maxMonths = Math.max(...durations);

export function Experience() {
  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="experience" className="py-24 sm:py-28">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            title="Where I've built."
            description="Four years, two frontend ecosystems, and enterprise products that needed to hold up under real usage."
          />
        </ScrollReveal>

        <div className="relative mt-14">
          <div
            className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-ink-border/70 dark:bg-ink-border sm:block"
            aria-hidden="true"
          />

          <ol className="space-y-12">
            {experience.map((role, index) => {
              const months = durations[index];
              const isCurrent = Boolean(role.since);
              const widthPct = maxMonths > 0 ? Math.max(10, Math.round((months / maxMonths) * 100)) : 0;

              return (
                <ScrollReveal as="li" key={role.id} delay={index * 0.08} className="relative sm:pl-10">
                  <span className="absolute left-0 top-2 hidden h-3.5 w-3.5 sm:block">
                    {isCurrent && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass-400/60 motion-reduce:hidden" />
                    )}
                    <span className="relative block h-3.5 w-3.5 rounded-full border-2 border-brass-400 bg-paper dark:bg-ink" />
                  </span>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-xl font-semibold text-ink dark:text-slate-50">{role.title}</h3>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{role.period}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-brass-600 dark:text-brass-300">{role.company}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} strokeWidth={1.75} />
                      {role.location}
                    </span>
                  </div>

                  {/* Duration bar, sized relative to the longest role — makes
                      "3.5 years here, 6 months there" visible, not just stated. */}
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="h-1.5 w-32 max-w-[40vw] overflow-hidden rounded-full bg-ink-border/30 dark:bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${widthPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${isCurrent ? "bg-brass-400" : "bg-signal-400"}`}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      {formatDuration(months)}
                      {isCurrent ? " so far" : ""}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {role.summary}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-signal-400" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {role.clients && role.clients.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500">Clients:</span>
                      {role.clients.map((client) => (
                        <button
                          key={client}
                          type="button"
                          onClick={scrollToProjects}
                          className="rounded-full border border-signal-400/50 bg-signal-50 px-2.5 py-1 text-xs font-medium text-signal-700 transition-colors hover:border-signal-400 hover:bg-signal-100 dark:border-signal-400/40 dark:bg-signal-400/10 dark:text-signal-200 dark:hover:bg-signal-400/20"
                        >
                          {client}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-ink-border/70 px-2.5 py-1 font-mono text-[11px] text-slate-600 dark:border-ink-border dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
