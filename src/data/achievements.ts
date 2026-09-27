export type Achievement = {
  id: string;
  title: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    id: "honeywell-recognition",
    title: "Honeywell Recognition",
    description:
      "Recognised by the Honeywell Tooling Health Management team for developing a dynamic, React-based map feature that improved data visualisation for stakeholders.",
  },
  {
    id: "reusable-components",
    title: "40% Faster Feature Delivery",
    description:
      "Reduced feature development effort by 40% on Intel's IBems project by building 20+ reusable Angular components and standardising UI patterns.",
  },
  {
    id: "enterprise-delivery",
    title: "Enterprise Delivery",
    description:
      "Delivered frontend features across multiple enterprise client engagements — Honeywell, Intel, and Philips — within a fast-paced Agile/Scrum environment.",
  },
  {
    id: "fullstack-internship",
    title: "Full-Stack Internship",
    description: "Completed a 6-month Java full-stack internship with a strong focus on React.js and component-based UI architecture.",
  },
];
