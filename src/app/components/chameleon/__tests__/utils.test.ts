import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("p-4", "m-4")).toBe("p-4 m-4");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    expect(cn("p-4", isActive && "bg-blue-500")).toBe("p-4 bg-blue-500");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });
});
