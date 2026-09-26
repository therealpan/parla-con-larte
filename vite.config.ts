import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// The React voice demo is served under /demo/ (the landing owns the root).
export default defineConfig({
  base: "/demo/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/demo"),
    emptyOutDir: true,
  },
});
