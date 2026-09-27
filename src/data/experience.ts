export type Role = {
  id: string;
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  technologies: string[];
  points: string[];
  /** ISO "YYYY-MM" — present only on the current, open-ended role. */
  since?: string;
  /** Explicit, resume-stated duration in months — used instead of computed
   *  calendar arithmetic for fixed-length roles, so the displayed length
   *  always matches what was actually written. */
  durationMonths?: number;
  /** Client names from src/data/projects.ts delivered under this role. */
  clients?: string[];
};

export const experience: Role[] = [
  {
    id: "ltts",
    company: "L&T Technology Services (LTTS)",
    title: "Frontend Developer",
    period: "Mar 2023 — Present",
    location: "Bangalore, India",
    since: "2023-03",
    clients: ["Honeywell", "Intel", "Philips"],
    summary:
      "Building frontend features for enterprise clients — Honeywell, Intel, and Philips — spanning React micro-frontend dashboards, Angular applications, and a full-stack React/Node.js platform.",
    technologies: [
      "React.js",
      "Angular",
      "TypeScript",
      "Redux",
      "Node.js",
      "Material UI",
      "Tailwind CSS",
    ],
    points: [
      "Delivered frontend features across three enterprise client engagements within a fast-paced Agile/Scrum environment.",
      "Worked across two frontend ecosystems — React and Angular — depending on the project's existing architecture.",
      "Collaborated closely with backend and DevOps teams to ship reliable, well-tested releases.",
    ],
  },
  {
    id: "intern",
    company: "L&T Technology Services (LTTS)",
    title: "Software Developer Intern",
    period: "Jan 2022 — Jul 2022",
    location: "India",
    durationMonths: 6,
    summary:
      "A 6-month full-stack development internship focused on React.js and component-based UI architecture, with backend exposure to Java and Spring Boot.",
    technologies: ["React.js", "JavaScript ES6+", "HTML5", "CSS3", "Java", "Spring Boot", "Jest"],
    points: [
      "Built responsive, interactive user interfaces using React.js, JavaScript (ES6+), HTML5, and CSS3.",
      "Developed reusable React UI components and integrated them with backend services via RESTful APIs, applying component-based architecture principles.",
      "Contributed to backend development using Java and Spring Boot, supporting full-stack feature delivery.",
      "Ensured application functionality, performance, and cross-browser compatibility through unit testing with Jest and debugging.",
    ],
  },
];
