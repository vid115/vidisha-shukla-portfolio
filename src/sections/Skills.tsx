import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionHeading } from "../components/SectionHeading";
import { skillCategories } from "../data/skills";
import { getProjectClientsForSkill } from "../lib/skillLinks";

export function Skills() {
  const [activeCategoryId, setActiveCategoryId] = useState(skillCategories[0].id);
  const [inspectedSkill, setInspectedSkill] = useState<string | null>(null);

  const activeCategory = skillCategories.find((category) => category.id === activeCategoryId) ?? skillCategories[0];
  const matchedClients = inspectedSkill ? getProjectClientsForSkill(inspectedSkill) : [];

  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading
            title="Tools of the trade."
            description="Organized by where it sits in the stack — not ranked by arbitrary percentages. Point at a skill to see which client project actually used it."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
            {skillCategories.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategoryId(category.id);
                    setInspectedSkill(null);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-paper dark:border-brass-400 dark:bg-brass-400 dark:text-ink"
                      : "border-ink-border/70 text-slate-600 hover:border-brass-400 hover:text-brass-600 dark:border-ink-border dark:text-slate-400 dark:hover:text-brass-300"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="mt-8 min-h-[3rem] rounded-xl border border-dashed border-ink-border/60 px-4 py-3 text-sm text-slate-500 dark:border-ink-border/80 dark:text-slate-400">
          {inspectedSkill ? (
            matchedClients.length > 0 ? (
              <span>
                <span className="font-medium text-ink dark:text-slate-100">{inspectedSkill}</span> — used on{" "}
                <span className="font-medium text-brass-600 dark:text-brass-300">{matchedClients.join(", ")}</span>
              </span>
            ) : (
              <span>
                <span className="font-medium text-ink dark:text-slate-100">{inspectedSkill}</span> — part of my
                day-to-day toolkit.
              </span>
            )
          ) : (
            <span>Hover or focus a skill below to see where it's been put to use.</span>
          )}
        </div>

        <div className="relative mt-6 min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap gap-2.5 rounded-2xl border border-ink-border/70 bg-paper-surface p-6 dark:border-ink-border dark:bg-ink-surface"
            >
              {activeCategory.items.map((item) => {
                const hasMatch = getProjectClientsForSkill(item).length > 0;
                return (
                  <button
                    key={item}
                    type="button"
                    onMouseEnter={() => setInspectedSkill(item)}
                    onFocus={() => setInspectedSkill(item)}
                    onMouseLeave={() => setInspectedSkill(null)}
                    onBlur={() => setInspectedSkill(null)}
                    className="relative rounded-md border border-ink-border/70 bg-paper px-3 py-1.5 text-xs font-medium text-slate-600 transition-all duration-150 hover:-translate-y-0.5 hover:border-brass-400 hover:text-brass-600 dark:border-ink-border dark:bg-ink dark:text-slate-300 dark:hover:text-brass-300"
                  >
                    {item}
                    {hasMatch && (
                      <span
                        className="absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-signal-400"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
