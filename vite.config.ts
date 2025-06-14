import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/pixi-project/",
  build: {
    outDir: "docs",
  },
  server: {
    port: 8080,
    open: true,
  },
});
