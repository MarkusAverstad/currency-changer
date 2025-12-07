import { defineConfig } from "vitest/config";
import { aliasConfig } from "./vite.config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    alias: aliasConfig,
  },
});
