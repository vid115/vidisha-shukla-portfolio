import { motion, useReducedMotion } from "framer-motion";
import { Download, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { CodeFrame } from "../components/CodeFrame";
import { FlowDiagram } from "../components/FlowDiagram";
import { useTilt } from "../hooks/useTilt";
import { profile } from "../data/profile";

const HEADLINE_LINES = ["Building scalable interfaces", "that turn complex problems", "into simple experiences."];

const ARCHITECTURE_FLOW = ["React", "Components", "State", "APIs", "UI"];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const { ref: tiltRef, handlePointerMove, handlePointerLeave } = useTilt<HTMLDivElement>();

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    setIsDesktop(query.matches);
    const listener = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  const animateOrbs = !shouldReduceMotion && isDesktop;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
      {/* Layered depth: schematic grid -> grain texture -> two soft gradient fields.
          Orb drift only runs on sm+ viewports, where the extra paint cost is
          affordable; mobile gets the same look, just static. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-schematic absolute inset-0 text-ink-border/50 opacity-40 dark:text-white/10" />
        <div className="bg-grain absolute inset-0 opacity-[0.03] animate-grain motion-reduce:animate-none dark:opacity-[0.05]" />
        <motion.div
          className="absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-brass-300/25 blur-[90px] dark:bg-brass-500/20"
          animate={animateOrbs ? { x: [0, 30, 0], y: [0, 18, 0] } : undefined}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 top-20 h-[22rem] w-[22rem] rounded-full bg-signal-300/20 blur-[80px] dark:bg-signal-500/20"
          animate={animateOrbs ? { x: [0, -24, 0], y: [0, -14, 0] } : undefined}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Text column */}
        <div>
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs font-medium tracking-wider text-signal-600 dark:text-signal-300"
          >
            {profile.heroKicker}
          </motion.p>

          <h1 className="mt-5 text-balance font-display text-display-xl font-semibold text-ink dark:text-slate-50">
            {HEADLINE_LINES.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-6 font-mono text-sm text-slate-500 dark:text-slate-400"
          >
            {profile.heroStack.join(" \u2022 ")}
          </motion.p>

          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-5 max-w-lg text-balance text-base leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 dark:bg-brass-400 dark:text-ink"
            >
              View My Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="rounded-full border border-ink-border px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-brass-400 hover:text-brass-600 dark:border-ink-border dark:text-slate-100 dark:hover:text-brass-300"
            >
              Let&apos;s Connect
            </button>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 underline decoration-ink-border decoration-2 underline-offset-4 transition-colors hover:text-brass-600 hover:decoration-brass-400 dark:text-slate-300 dark:hover:text-brass-300"
            >
              <Download size={15} strokeWidth={1.75} />
              Download Resume
            </a>

            <div className="flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border/60 text-slate-600 transition-colors hover:border-brass-400 hover:text-brass-600 dark:border-ink-border dark:text-slate-300"
              >
                <Linkedin size={15} strokeWidth={1.75} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border/60 text-slate-600 transition-colors hover:border-brass-400 hover:text-brass-600 dark:border-ink-border dark:text-slate-300"
              >
                <Mail size={15} strokeWidth={1.75} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Visual column: a real "editor panel" -- not a floating abstract
            shape -- showing how a screen actually gets composed. Tilts
            gently toward the pointer on desktop. */}
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm lg:mx-0"
        >
          {/* Plain (non-Framer) element for the pointer tilt: Framer Motion
              manages its own `transform` for the entrance animation above,
              so the CSS-variable-driven tilt lives on a separate node to
              avoid the two fighting over the same style property. */}
          <div
            ref={tiltRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="transition-transform duration-150 ease-out"
            style={{
              transform: "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
              transformStyle: "preserve-3d",
            }}
          >
            <CodeFrame label="Screen.tsx">
              <p className="mb-5 text-xs font-medium text-slate-400 dark:text-slate-500">
                How a screen comes together
              </p>
              <FlowDiagram nodes={ARCHITECTURE_FLOW} orientation="vertical" trigger="mount" size="sm" />
            </CodeFrame>
          </div>

          <div
            className="absolute -left-6 -top-5 hidden animate-soft-float rounded-xl border border-ink-border/70 bg-paper-surface px-3.5 py-2 text-xs font-medium text-slate-600 shadow-soft motion-reduce:animate-none dark:border-ink-border dark:bg-ink-surface dark:text-slate-300 dark:shadow-soft-dark sm:block"
            style={{ animationDelay: "0.2s" }}
          >
            4+ years experience
          </div>
          <div
            className="absolute -bottom-5 -right-4 hidden animate-soft-float rounded-xl border border-ink-border/70 bg-paper-surface px-3.5 py-2 text-xs font-medium text-slate-600 shadow-soft motion-reduce:animate-none dark:border-ink-border dark:bg-ink-surface dark:text-slate-300 dark:shadow-soft-dark sm:block"
            style={{ animationDelay: "1.1s" }}
          >
            Micro-frontend ready
          </div>
        </motion.div>
      </div>
    </section>
  );
}
