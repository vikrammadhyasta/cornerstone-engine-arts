// @lovable.dev/vite-tanstack-config already includes the required
// TanStack Start, React, Tailwind, tsconfig paths, Nitro, and related plugins.
// Do not add those plugins manually because that can cause duplicate plugins.
// The Nitro preset is explicitly overridden for Netlify deployment.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    plugins: [],
  },

  nitro: {
    preset: "netlify",
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
