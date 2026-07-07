/**
 * MCP Apps widget build (F71, Phase 14).
 * Build: npm run build:widget → dist-widget/widget.html (assets inlined by
 * scripts/build-widget.mjs — one self-contained template hosts can prefetch
 * and security-review).
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist-widget",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: path.resolve(__dirname, "src/widget/widget.html"),
      output: { inlineDynamicImports: true },
    },
  },
});
