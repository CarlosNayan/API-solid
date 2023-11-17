import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    threads: false,
    // setupFiles: ["tests/setup.ts"],
    
  },
});
