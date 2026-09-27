import { projects } from "../data/projects";

/**
 * Cross-references a skill against the technologies actually listed on each
 * project. Deliberately an exact (case-insensitive) match rather than a
 * fuzzy one — a near-miss like "Reusable Components" vs "Reusable UI
 * Components" should surface nothing rather than imply a connection this
 * resume didn't state.
 */
export function getProjectClientsForSkill(skill: string): string[] {
  const normalized = skill.trim().toLowerCase();
  return projects
    .filter((project) => project.technologies.some((tech) => tech.toLowerCase() === normalized))
    .map((project) => project.client);
}
