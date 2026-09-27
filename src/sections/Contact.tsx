import { motion } from "framer-motion";
import { CheckCircle2, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CodeFrame } from "../components/CodeFrame";
import { ScrollReveal } from "../components/ScrollReveal";
import { profile } from "../data/profile";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Frontend-only for now. To wire this up for real:
    //   • Formspree — POST `form` to `https://formspree.io/f/<your-id>`
    //   • EmailJS   — call `emailjs.send(serviceId, templateId, form)`
    //   • Custom API — POST `form` as JSON to your own endpoint
    // then swap this block for the actual request + error handling.
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ScrollReveal>
            <h2 className="text-balance font-display text-display-lg font-semibold text-ink dark:text-slate-50">
              Let&apos;s build something meaningful.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Looking for opportunities to build scalable frontend experiences, solve complex UI problems and work
              with modern web technologies.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 dark:bg-brass-400 dark:text-ink"
            >
              Get In Touch <span aria-hidden="true">→</span>
            </a>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Mail size={16} strokeWidth={1.75} className="text-brass-600 dark:text-brass-300" />
                <a href={`mailto:${profile.email}`} className="hover:text-brass-600 dark:hover:text-brass-300">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Phone size={16} strokeWidth={1.75} className="text-brass-600 dark:text-brass-300" />
                <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="hover:text-brass-600 dark:hover:text-brass-300">
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <MapPin size={16} strokeWidth={1.75} className="text-brass-600 dark:text-brass-300" />
                {profile.location}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Linkedin size={16} strokeWidth={1.75} className="text-brass-600 dark:text-brass-300" />
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brass-600 dark:hover:text-brass-300"
                >
                  linkedin.com/in/vidisha-shukla
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CodeFrame label="contact-form.tsx">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 text-center"
                >
                  <CheckCircle2 size={32} strokeWidth={1.5} className="text-brass-600 dark:text-brass-300" />
                  <p className="font-display text-lg font-semibold text-ink dark:text-slate-50">Message noted.</p>
                  <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">
                    This form isn&apos;t connected to an inbox yet — reach out directly at{" "}
                    <a href={`mailto:${profile.email}`} className="text-brass-600 underline dark:text-brass-300">
                      {profile.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-sm font-medium text-signal-600 hover:underline dark:text-signal-300"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full rounded-lg border border-ink-border/70 bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brass-400 dark:border-ink-border dark:bg-ink dark:text-slate-100"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full rounded-lg border border-ink-border/70 bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brass-400 dark:border-ink-border dark:bg-ink dark:text-slate-100"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full resize-none rounded-lg border border-ink-border/70 bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brass-400 dark:border-ink-border dark:bg-ink dark:text-slate-100"
                      placeholder="What are you looking to build?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5 dark:bg-brass-400 dark:text-ink"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </CodeFrame>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
