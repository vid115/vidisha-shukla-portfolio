import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/profile";

export function Footer() {
  const socials = [
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    ...(profile.github ? [{ icon: Github, href: profile.github, label: "GitHub" }] : []),
  ];

  return (
    <footer className="border-t border-ink-border/60 dark:border-ink-border">
      <div className="container-page flex flex-col items-center gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold text-ink dark:text-slate-50">
            VIDISHA<span className="text-brass-400">.</span>
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Frontend Developer</p>
          <p className="mt-0.5 font-mono text-xs tracking-wide text-slate-400 dark:text-slate-500">
            React • Angular • TypeScript• JavaScript
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border/60 text-slate-600 transition-colors duration-200 hover:border-brass-400 hover:text-brass-600 dark:border-ink-border dark:text-slate-400 dark:hover:text-brass-300"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">© 2026 Vidisha Shukla</p>
      </div>
    </footer>
  );
}
