import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ["**/**"],
    threads: false,
    setupFiles: ["tests/setup.ts"],
    
  },
});
