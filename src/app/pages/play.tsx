/**
 * /play — shareable spec playground (F68, Phase 13).
 * The /render canvas plus chrome: theme/mode switchers, copy-spec and
 * copy-CLI buttons. Agents hand humans a /play link BEFORE scaffolding files.
 */

import React, { useMemo, useState } from "react";
import { ChameleonProvider, type ChameleonBrand } from "../components/chameleon/context";
import { RenderSpec, type ChameleonSpec } from "../components/chameleon/render-spec";
import type { ChameleonTheme, ChameleonMode } from "../components/chameleon/context";
import { decodeSpecParam, encodeSpecParam } from "./render";

const THEMES: ChameleonTheme[] = ["material", "simple", "minimalist", "glassy", "liquid"];

const DEMO_SPEC: ChameleonSpec = {
  version: 1,
  name: "playground-demo",
  blocks: [
    { component: "stat-card", props: { label: "Playground", value: "Hello!", trend: "up", trendValue: "+1" } },
    { component: "badge", props: { children: "Edit ?spec= to render your own" } },
  ],
};

export function PlayView() {
  const params = new URLSearchParams(window.location.search);
  const spec = useMemo<ChameleonSpec>(() => {
    const raw = params.get("spec");
    if (!raw) return DEMO_SPEC;
    try { return decodeSpecParam(raw); } catch { return DEMO_SPEC; }
  }, []);
  const [theme, setTheme] = useState<ChameleonTheme>((params.get("theme") || spec.theme || "simple") as ChameleonTheme);
  const [mode, setMode] = useState<ChameleonMode>((params.get("mode") || spec.mode || "light") as ChameleonMode);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (label: string, text: string) => {
    void navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };
  const specJson = JSON.stringify(spec, null, 2);
  const renderUrl = `${window.location.origin}/render?spec=${encodeSpecParam(spec)}&theme=${theme}&mode=${mode}`;

  const barBtn = (active: boolean): React.CSSProperties => ({
    padding: "4px 10px", borderRadius: 6, fontSize: 12, cursor: "pointer",
    border: "1px solid " + (active ? "#818cf8" : "#e5e7eb"),
    background: active ? "#818cf8" : "transparent", color: active ? "#fff" : "inherit",
  });

  return (
    <ChameleonProvider initialTheme={theme} initialMode={mode} brand={(spec.brand as ChameleonBrand | undefined) ?? null} key={`${theme}-${mode}`}>
      <div style={{ minHeight: "100vh", background: "var(--background)", color: "var(--foreground)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #e5e7eb" }}>
          <strong style={{ fontSize: 13 }}>▧ Chameleon Playground</strong>
          <span style={{ fontSize: 12, opacity: 0.6 }}>{spec.name}</span>
          <span style={{ flex: 1 }} />
          {THEMES.map((t) => (
            <button key={t} style={barBtn(t === theme)} onClick={() => setTheme(t)}>{t}</button>
          ))}
          <button style={barBtn(mode === "dark")} onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            {mode === "dark" ? "☾ dark" : "☀ light"}
          </button>
          <button style={barBtn(false)} onClick={() => copy("spec", specJson)}>{copied === "spec" ? "✓ copied" : "copy spec"}</button>
          <button style={barBtn(false)} onClick={() => copy("cli", "npx chameleon compose spec.json")}>{copied === "cli" ? "✓ copied" : "copy CLI"}</button>
          <a href={renderUrl} style={{ fontSize: 12 }}>/render ↗</a>
        </div>
        <RenderSpec spec={spec} />
      </div>
    </ChameleonProvider>
  );
}
