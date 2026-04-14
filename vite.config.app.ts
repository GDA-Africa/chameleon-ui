/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

/**
 * App build config — produces the Workshop UI as a static site in dist-app/
 * Use this for cPanel / static hosting deployments.
 *
 * Run:  npm run build:app
 * Output: dist-app/   ← upload the contents of this folder to your cPanel public_html
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-app",
    emptyOutDir: true,
  },
});
