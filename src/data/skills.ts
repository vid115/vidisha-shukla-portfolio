export type SkillCategory = {
  id: string;
  label: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React.js",
      "Angular",
      "JavaScript ES6+",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "React Micro-Frontend Architecture",
    ],
  },
  {
    id: "ui",
    label: "UI & Libraries",
    items: ["React Hooks", "Redux", "Material UI", "Tailwind CSS", "Reusable UI Components", "Dynamic Forms"],
  },
  {
    id: "backend",
    label: "Backend Integration",
    items: ["Node.js", "Python", "REST APIs", "API Integration", "JSON"],
  },
  {
    id: "testing",
    label: "Testing",
    items: ["Jest", "Karma", "Jasmine"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Chrome DevTools"],
  },
  {
    id: "methodologies",
    label: "Methodologies",
    items: ["Agile", "Scrum", "SDLC", "CI/CD"],
  },
  {
    id: "ai",
    label: "AI Development Tools",
    items: ["Cursor", "GitHub Copilot", "Claude"],
  },
];
