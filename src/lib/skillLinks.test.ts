import { describe, expect, it } from "vitest";
import { getProjectClientsForSkill } from "./skillLinks";

describe("getProjectClientsForSkill", () => {
  it("finds the client project whose technologies list includes the skill", () => {
    expect(getProjectClientsForSkill("Redux")).toEqual(["Honeywell"]);
  });

  it("matches case-insensitively", () => {
    expect(getProjectClientsForSkill("redux")).toEqual(["Honeywell"]);
  });

  it("finds every client for a technology used across multiple projects", () => {
    expect(getProjectClientsForSkill("REST APIs").sort()).toEqual(["Honeywell", "Philips"]);
  });

  it("does not fuzzy-match a similarly-named but distinct skill", () => {
    // "Reusable UI Components" (a listed skill) is not the same string as
    // "Reusable Components" (Intel's listed technology) — an exact match is
    // the point: implying a connection the resume never stated would be
    // worse than surfacing nothing.
    expect(getProjectClientsForSkill("Reusable UI Components")).toEqual([]);
  });

  it("returns an empty array for a skill no project lists", () => {
    expect(getProjectClientsForSkill("Photoshop")).toEqual([]);
  });
});
