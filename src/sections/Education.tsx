import { GraduationCap } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionHeading } from "../components/SectionHeading";
import { education } from "../data/education";

export function Education() {
  return (
    <section id="education" className="py-24 sm:py-28">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading title="Education." align="left" />
        </ScrollReveal>

        {/* Deliberately the lightest-weight section on the page — a
            left-rule credential list rather than a card grid. With 4+ years
            of enterprise delivery already shown above, education supports
            the story here; it shouldn't visually compete with it. */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {education.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <div className="border-l-2 border-signal-400/60 pl-5 dark:border-signal-400/50">
                <div className="flex items-center gap-2 text-signal-600 dark:text-signal-300">
                  <GraduationCap size={15} strokeWidth={1.75} />
                  <span className="font-mono text-xs">{item.period}</span>
                </div>
                <h3 className="mt-2 font-display text-base font-semibold text-ink dark:text-slate-50">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.institution}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
