/**
 * Chameleon MCP Apps widget (F70/F71, Phase 14) — EXPERIMENTAL.
 *
 * One audited, self-contained HTML template through which all Chameleon UI
 * renders inside MCP Apps hosts (SEP-1865: sandboxed iframe, JSON-RPC over
 * postMessage). The host delivers a tool result whose structuredContent
 * carries a ChameleonSpec; we render it live with RenderSpec.
 *
 * Also runs standalone for testing: /widget.html#<base64url-spec>
 *
 * NOTE: SEP-1865 finalizes 2026-07-28. The bridge adapter below is tolerant
 * of the RC message shapes and isolated in one place — revisit after final.
 */

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChameleonProvider, type ChameleonBrand } from "../app/components/chameleon/context";
import { RenderSpec, type ChameleonSpec } from "../app/components/chameleon/render-spec";
import type { ChameleonTheme, ChameleonMode } from "../app/components/chameleon/context";
import "../styles/index.css";

type BridgeAction = { tool: string; args?: Record<string, unknown> };

/** Forward a spec `actions` intent to the host as a tool call request. */
function dispatchAction(action: BridgeAction) {
  window.parent?.postMessage(
    { jsonrpc: "2.0", id: `ui-action-${Date.now()}`, method: "tools/call", params: { name: action.tool, arguments: action.args ?? {} } },
    "*",
  );
}

declare global {
  interface Window { __chameleonDispatchAction?: (action: BridgeAction) => void; }
}
window.__chameleonDispatchAction = dispatchAction;

/** Pull a ChameleonSpec out of the various RC-era bridge message shapes. */
function specFromMessage(data: unknown): ChameleonSpec | null {
  if (typeof data !== "object" || data === null) return null;
  const msg = data as Record<string, unknown>;
  const candidates: unknown[] = [
    (msg.params as Record<string, unknown>)?.structuredContent,
    (msg.params as Record<string, unknown>)?.toolResult,
    (msg.result as Record<string, unknown>)?.structuredContent,
    msg.structuredContent,
    msg.spec,
  ];
  for (const c of candidates) {
    const obj = c as Record<string, unknown> | undefined;
    const spec = (obj?.spec ?? obj) as ChameleonSpec | undefined;
    if (spec && spec.version === 1 && (spec.template !== undefined || Array.isArray(spec.blocks))) return spec;
  }
  return null;
}

function specFromFragment(): ChameleonSpec | null {
  const frag = window.location.hash.slice(1);
  if (!frag) return null;
  try {
    const b64 = frag.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(b64)) as ChameleonSpec;
  } catch { return null; }
}

function Widget() {
  const [spec, setSpec] = useState<ChameleonSpec | null>(specFromFragment());
  const [hostMode, setHostMode] = useState<ChameleonMode | null>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const next = specFromMessage(e.data);
      if (next) setSpec(next);
      // Host theming signal (displayMode/theme in bridge context messages)
      const m = e.data as Record<string, unknown> | null;
      const themeHint = (m?.params as Record<string, unknown>)?.theme ?? m?.theme;
      if (themeHint === "dark" || themeHint === "light") setHostMode(themeHint as ChameleonMode);
    };
    window.addEventListener("message", onMessage);
    // Announce readiness to the host (tolerated by hosts that don't expect it)
    window.parent?.postMessage({ jsonrpc: "2.0", method: "notifications/ui/ready" }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!spec) {
    return (
      <div style={{ padding: 24, fontFamily: "system-ui", color: "#6b7280", fontSize: 14 }}>
        ▧ Chameleon widget waiting for a spec… (host bridge or #base64url fragment)
      </div>
    );
  }

  const theme = (spec.theme || "simple") as ChameleonTheme;
  const mode = hostMode ?? ((spec.mode || "light") as ChameleonMode);
  return (
    <ChameleonProvider initialTheme={theme} initialMode={mode} brand={(spec.brand as ChameleonBrand | undefined) ?? null} key={`${theme}-${mode}`}>
      <div data-render-root style={{ minHeight: "100%", background: "var(--background)" }}>
        <RenderSpec spec={spec} />
      </div>
    </ChameleonProvider>
  );
}

createRoot(document.getElementById("root")!).render(<Widget />);
