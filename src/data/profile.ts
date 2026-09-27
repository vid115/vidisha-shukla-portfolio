export const profile = {
  name: "Vidisha Shukla",
  role: "Frontend Developer",
  location: "Bangalore, Karnataka, India",
  email: "vidisha5820@gmail.com",
  phone: "+91 8595263751",
  linkedin: "https://www.linkedin.com/in/vidisha-shukla-92a66b1b4",
  // No GitHub/portfolio URL was supplied in the source resume — add one here
  // (e.g. "https://github.com/your-handle") to have it appear in the navbar,
  // hero and footer social links automatically.
  github: undefined as string | undefined,
  resumeUrl: "/resume/Vidisha-Shukla-Resume.pdf",
  summary:
    "Frontend Developer specializing in scalable React and Angular applications, reusable component systems, enterprise dashboards, and modern frontend architecture.",
  heroKicker: "FRONTEND DEVELOPER · 4 YEARS",
  heroStack: ["React.js", "JavaScript(ES6+)","Angular", "TypeScript", "Micro-Frontends"],
};

export type Stat = {
  value: string;
  label: string;
  sub?: string;
};

export const stats: Stat[] = [
  { value: "4+", label: "Years Experience" },
  { value: "3", label: "Enterprise Clients" },
  { value: "20+", label: "Reusable Angular Components" },
  { value: "2", label: "Frontend Ecosystems", sub: "React + Angular" },
];
