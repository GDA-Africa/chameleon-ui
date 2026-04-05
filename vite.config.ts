/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["src/app/components/chameleon/**/*.{ts,tsx}"],
      exclude: ["src/app/components/chameleon/**/*.test.{ts,tsx}", "src/app/components/chameleon/showcase*.tsx", "src/app/components/chameleon/comprehensive*.tsx", "src/app/components/chameleon/cli.tsx", "src/app/components/chameleon/ai*.ts", "src/app/components/chameleon/ai*.tsx"]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/app/components/chameleon/index.ts"),
      name: "ChameleonUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "motion/react",
        "motion",
        "lucide-react",
        "clsx",
        "tailwind-merge",
        /^@radix-ui\/.*/
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },

  assetsInclude: ["**/*.svg", "**/*.csv"],
});
