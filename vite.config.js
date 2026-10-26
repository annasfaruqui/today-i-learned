import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { factsApiPlugin } from "./plugins/vite-facts-api-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), factsApiPlugin()],
  server: {
    watch: {
      ignored: ["**/src/data/facts.json"],
    },
  },
});
