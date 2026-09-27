import { CodeFrame } from "../components/CodeFrame";
import { FlowDiagram } from "../components/FlowDiagram";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionHeading } from "../components/SectionHeading";

const BUILD_FLOW = [
  "User",
  "React / Angular",
  "Reusable Components",
  "State Management",
  "REST APIs",
  "Backend Services",
  "Testing",
  "CI/CD",
];

export function Architecture() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="bg-schematic pointer-events-none absolute inset-0 text-ink-border/40 opacity-30 dark:text-white/10" />

      <div className="container-page relative">
        <ScrollReveal>
          <SectionHeading
            align="center"
            title="How I build."
            description="The same shape shows up on every project — a user-facing interface, backed by reusable components, predictable state, and a pipeline that ships it safely."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-14 flex justify-center">
          <CodeFrame label="architecture.ts" className="w-full max-w-3xl">
            <FlowDiagram nodes={BUILD_FLOW} orientation="horizontal" trigger="inView" size="md" />
          </CodeFrame>
        </ScrollReveal>
      </div>
    </section>
  );
}
