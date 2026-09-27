import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders the title as a heading", () => {
    render(<SectionHeading title="Test Title" />);
    expect(screen.getByRole("heading", { name: "Test Title" })).toBeInTheDocument();
  });

  it("renders the optional description when provided", () => {
    render(<SectionHeading title="Test" description="Extra context." />);
    expect(screen.getByText("Extra context.")).toBeInTheDocument();
  });

  it("omits the description paragraph when none is given", () => {
    render(<SectionHeading title="Test" />);
    expect(screen.queryByText("Extra context.")).not.toBeInTheDocument();
  });
});
