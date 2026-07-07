/**
 * Visual regression matrix (F69, Phase 13) — every recipe × 5 themes × 2 modes
 * screenshotted via the /render route and diffed against committed baselines.
 *
 * Run locally:  npx playwright test tests/visual  (dev server must be running)
 * Update baselines:  npx playwright test tests/visual --update-snapshots
 */
import { test, expect } from "@playwright/test";
import { RECIPES, VALID_THEMES } from "../../bin/engine/index.mjs";

const BASE = process.env.RENDER_BASE_URL || "http://localhost:5173";
const b64url = (o: unknown) =>
  Buffer.from(JSON.stringify(o)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

for (const recipe of RECIPES) {
  for (const theme of VALID_THEMES) {
    for (const mode of ["light", "dark"]) {
      test(`${recipe.name} — ${theme}/${mode}`, async ({ page }) => {
        await page.goto(`${BASE}/render?spec=${b64url(recipe.spec)}&theme=${theme}&mode=${mode}`, { waitUntil: "networkidle" });
        await expect(page.locator("[data-render-root]")).toBeVisible();
        // No inline render errors allowed
        expect(await page.locator('[role="alert"]').count()).toBe(0);
        await expect(page).toHaveScreenshot(`${recipe.name}-${theme}-${mode}.png`, { fullPage: true, maxDiffPixelRatio: 0.02 });
      });
    }
  }
}
