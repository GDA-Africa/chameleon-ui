/**
 * RenderSpec runtime tests (Phase 11) — the live half of ChameleonSpec v1.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ChameleonProvider } from "../context";
import { RenderSpec, SPEC_COMPONENTS, SPEC_TEMPLATES, type ChameleonSpec } from "../render-spec";
// eslint-disable-next-line import/no-relative-packages
import { COMPONENTS, TEMPLATES } from "../../../../../bin/engine/registry.mjs";

const wrap = (spec: ChameleonSpec) =>
  render(
    <ChameleonProvider initialTheme="simple" initialMode="light">
      <RenderSpec spec={spec} />
    </ChameleonProvider>,
  );

describe("RenderSpec", () => {
  it("runtime maps mirror the engine registry exactly", () => {
    expect(Object.keys(SPEC_COMPONENTS).sort()).toEqual(Object.keys(COMPONENTS).sort());
    expect(Object.keys(SPEC_TEMPLATES).sort()).toEqual(Object.keys(TEMPLATES).sort());
  });

  it("renders a blocks spec live", () => {
    wrap({
      version: 1,
      name: "kpis",
      blocks: [
        { component: "stat-card", props: { label: "Users", value: "1,204" } },
        { component: "badge", props: { children: "Live" } },
      ],
    });
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("1,204")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
  });

  it("renders inline errors instead of throwing", () => {
    wrap({ version: 1, name: "bad", blocks: [{ component: "nope" }] });
    expect(screen.getByRole("alert")).toHaveTextContent("unknown component: 'nope'");
    wrap({ version: 1, name: "both", template: "auth", blocks: [] });
    expect(screen.getAllByRole("alert").at(-1)).toHaveTextContent("exactly one of");
  });

  it("rejects unsupported versions", () => {
    wrap({ version: 2 as unknown as 1, name: "x", template: "auth" });
    expect(screen.getAllByRole("alert").at(-1)).toHaveTextContent("unsupported spec version");
  });
});
