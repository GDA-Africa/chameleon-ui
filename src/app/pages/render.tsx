/**
 * /render — bare spec canvas (F66, Phase 13).
 *
 * Renders a ChameleonSpec v1 from the URL with no workshop chrome. Shared
 * infrastructure for preview screenshots (F67), playground links (F68),
 * visual-regression CI (F69), and the MCP Apps widget (F70/71).
 *
 * Query params:
 *   spec  — the spec, URI-encoded JSON or base64url(JSON)
 *   theme — chameleon theme override (default: spec.theme or "simple")
 *   mode  — "light" | "dark"    (default: spec.mode or "light")
 */

import React from "react";
import { ChameleonProvider, type ChameleonBrand } from "../components/chameleon/context";
import { RenderSpec, type ChameleonSpec } from "../components/chameleon/render-spec";
import type { ChameleonTheme, ChameleonMode } from "../components/chameleon/context";

export function decodeSpecParam(raw: string): ChameleonSpec {
  // Accept URI-encoded JSON first, then base64url(JSON).
  try { return JSON.parse(decodeURIComponent(raw)) as ChameleonSpec; } catch { /* try base64url */ }
  const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(b64)) as ChameleonSpec;
}

export function encodeSpecParam(spec: ChameleonSpec): string {
  return btoa(JSON.stringify(spec)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function ParamError({ message }: { message: string }) {
  return (
    <div role="alert" style={{ margin: 24, padding: 16, border: "1px solid #f87171", borderRadius: 8, color: "#b91c1c", fontFamily: "monospace" }}>
      /render: {message}
      <div style={{ marginTop: 8, color: "#6b7280", fontSize: 12 }}>
        Usage: /render?spec=&lt;base64url-or-encoded-JSON ChameleonSpec v1&gt;&amp;theme=glassy&amp;mode=dark
      </div>
    </div>
  );
}

export function RenderView() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("spec");
  if (!raw) return <ParamError message="missing ?spec= parameter" />;

  let spec: ChameleonSpec;
  try { spec = decodeSpecParam(raw); } catch { return <ParamError message="spec parameter is not valid JSON / base64url(JSON)" />; }

  const theme = (params.get("theme") || spec.theme || "simple") as ChameleonTheme;
  const mode = (params.get("mode") || spec.mode || "light") as ChameleonMode;
  const brand = (spec.brand as ChameleonBrand | undefined) ?? null;

  return (
    <ChameleonProvider initialTheme={theme} initialMode={mode} brand={brand}>
      <div data-render-root style={{ minHeight: "100vh", background: "var(--background)" }}>
        <RenderSpec spec={spec} />
      </div>
    </ChameleonProvider>
  );
}
