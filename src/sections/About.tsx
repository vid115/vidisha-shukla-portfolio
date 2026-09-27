import { Check } from "lucide-react";
import { CountUpStat } from "../components/CountUpStat";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionHeading } from "../components/SectionHeading";
import { stats } from "../data/profile";

const HIGHLIGHTS = [
  "4+ years of professional frontend experience",
  "Enterprise applications for global clients",
  "React and Angular ecosystems",
  "Micro-frontend architecture",
  "Reusable component systems",
  "REST API integration",
  "Unit & end-to-end testing",
  "Agile/Scrum delivery",
];

export function About() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <ScrollReveal>
            <SectionHeading
              title="Engineering with purpose."
              description="I specialize in creating scalable, reusable and maintainable frontend applications — the kind that hold up as enterprise products grow past their first release."
            />
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <Check size={16} strokeWidth={2} className="mt-0.5 flex-shrink-0 text-brass-600 dark:text-brass-300" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-2xl border border-ink-border/70 bg-paper-surface p-8 shadow-soft dark:border-ink-border dark:bg-ink-surface dark:shadow-soft-dark">
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-brass-400/70 pl-4">
                    <p className="font-display text-3xl font-semibold text-ink dark:text-slate-50 sm:text-4xl">
                      <CountUpStat value={stat.value} />
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                    {stat.sub && (
                      <p className="mt-0.5 font-mono text-xs text-signal-600 dark:text-signal-300">{stat.sub}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
