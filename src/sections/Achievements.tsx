import { Award, Building2, GraduationCap, Layers, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionHeading } from "../components/SectionHeading";
import { achievements } from "../data/achievements";

const ICONS: Record<string, LucideIcon> = {
  "honeywell-recognition": Award,
  "reusable-components": Layers,
  "enterprise-delivery": Building2,
  "fullstack-internship": GraduationCap,
};

export function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-28">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading title="Worth calling out." align="left" />
        </ScrollReveal>

        {/* An editorial divided list rather than another grid of bordered
            cards — Skills, Education and Projects each already use their own
            distinct shape, and four boxed-card sections in a row is exactly
            the "one component reused everywhere" look this pass is fixing. */}
        <div className="mt-14 border-y border-ink-border/60 dark:border-ink-border">
          {achievements.map((item, index) => {
            const Icon = ICONS[item.id] ?? Award;
            return (
              <ScrollReveal
                key={item.id}
                delay={index * 0.06}
                className={index > 0 ? "border-t border-ink-border/60 dark:border-ink-border" : ""}
              >
                <div className="flex items-start gap-5 py-6 sm:gap-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brass-400/10 text-brass-600 dark:bg-brass-400/15 dark:text-brass-300">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink dark:text-slate-50">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
