import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "../data/profile";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the role and copyright line", () => {
    render(<Footer />);
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText(/© 2026 Vidisha Shukla/)).toBeInTheDocument();
  });

  it("links Email and LinkedIn to the real values from profile data", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute("href", profile.linkedin);
  });

  it("does not render a GitHub link when no URL is configured in profile data", () => {
    render(<Footer />);
    expect(screen.queryByLabelText("GitHub")).not.toBeInTheDocument();
  });
});
