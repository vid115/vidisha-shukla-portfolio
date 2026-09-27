import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";
import { ThemeToggle } from "./ThemeToggle";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-border/60 bg-paper/80 backdrop-blur-md dark:border-ink-border dark:bg-ink/75"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="font-display text-lg font-semibold tracking-tight text-ink dark:text-slate-50"
        >
          VIDISHA<span className="text-brass-400">.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  activeId === item.id
                    ? "text-brass-700 dark:text-brass-300"
                    : "text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-slate-100"
                }`}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-brass-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 dark:bg-brass-400 dark:text-ink sm:inline-flex"
          >
            Let&apos;s Talk <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-border/60 text-ink dark:border-ink-border dark:text-slate-100 lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink-border/60 bg-paper dark:border-ink-border dark:bg-ink lg:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium transition-colors ${
                      activeId === item.id
                        ? "bg-brass-400/10 text-brass-600 dark:text-brass-300"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
