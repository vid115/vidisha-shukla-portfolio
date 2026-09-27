export type MicroFrontendArchitecture = {
  type: "microfrontend";
  shell: string;
  modules: string[];
  shared: string;
  api: string;
};

export type PipelineArchitecture = {
  type: "pipeline";
  steps: string[];
};

export type DataFlowArchitecture = {
  type: "dataflow";
  left: string;
  right: string;
  exchanges: string[];
};

export type ProjectArchitecture = MicroFrontendArchitecture | PipelineArchitecture | DataFlowArchitecture;

export type Project = {
  id: string;
  name: string;
  client: string;
  domain: string;
  role: string;
  technologies: string[];
  contributions: string[];
  achievement?: string;
  architecture: ProjectArchitecture;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "honeywell",
    name: "Predictive Analytics Dashboard",
    client: "Honeywell",
    domain: "Predictive maintenance & tool-health analytics for an enterprise operations dashboard.",
    role: "Frontend Developer — React micro-frontend screens & data visualization",
    featured: true,
    technologies: [
      "React.js",
      "TypeScript",
      "React Micro-Frontend Architecture",
      "Redux",
      "Material UI",
      "Tailwind CSS",
      "REST APIs",
      "Jest",
      "Git/GitHub",
    ],
    contributions: [
      "Engineered new screens for a predictive analytics dashboard using React.js and TypeScript within a React Micro-Frontend architecture, strengthening modularity and scalability across the enterprise application.",
      "Built an interactive, React-based map component to visualize dynamic tool-health data by country and region, enabling stakeholders to access operational insights faster.",
      "Developed reusable, component-based UI elements with Material UI and Tailwind CSS, proving consistent design patterns that accelerated feature delivery.",
      "Integrated REST APIs and managed application state with Redux to fetch and render real-time data within dashboard and map components.",
      "Strengthened application reliability through unit testing and debugging with Jest, code reviews, and Git/GitHub version control.",
    ],
    achievement:
      "Recognised by the Honeywell Tooling Health Management team for developing the dynamic React-based map feature.",
    architecture: {
      type: "microfrontend",
      shell: "Host Shell (React)",
      modules: ["Dashboard Screens", "Interactive Map"],
      shared: "Redux Store",
      api: "REST APIs",
    },
  },
  {
    id: "intel",
    name: "Integrated Building Energy Management System (IBems)",
    client: "Intel",
    domain: "Enterprise application for building energy management, built on dynamic Angular forms and reusable UI modules.",
    role: "Frontend Developer — Angular application screens & component library",
    technologies: ["Angular", "TypeScript", "Reusable Components", "Dynamic Forms", "Karma", "Jasmine", "CI/CD"],
    contributions: [
      "Delivered new application screens and dynamic, reusable forms using Angular, earning recognition from the project team for quality and efficiency.",
      "Translated requirement analysis and UI design sessions into functional, responsive frontend components that met client specifications.",
      "Built 20+ reusable Angular components and modules, reducing feature development effort by 40% through standardised, reusable UI patterns.",
      "Maintained code quality and reduced defect leakage through end-to-end and unit testing with Karma and Jasmine.",
      "Supported application deployment through CI/CD pipelines, collaborating with backend and DevOps teams to streamline releases.",
    ],
    achievement: "Reduced feature development effort by 40% through 20+ reusable Angular components built for the platform.",
    architecture: {
      type: "pipeline",
      steps: ["Angular App", "Reusable Components", "Dynamic Forms", "Karma & Jasmine Tests", "CI/CD", "Production"],
    },
  },
  {
    id: "philips",
    name: "SoftOps — Licence Management",
    client: "Philips",
    domain: "Full-stack licence management platform pairing a React frontend with Node.js backend services.",
    role: "Frontend Developer — React UI & REST API integration",
    technologies: ["React.js", "Node.js", "REST APIs", "Jest"],
    contributions: [
      "Developed and maintained a full-stack web application for the SoftOps platform using React.js for the frontend and Node.js for backend services.",
      "Built reusable, responsive UI components in React.js to support core application workflows and improve development efficiency.",
      "Designed and integrated REST APIs using Node.js to enable reliable data flow between frontend and backend services.",
      "Validated functionality and maintained code quality across frontend and backend components through unit testing with Jest.",
    ],
    architecture: {
      type: "dataflow",
      left: "React UI",
      right: "Node.js API",
      exchanges: ["Requests", "JSON Responses"],
    },
  },
];
