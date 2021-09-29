import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "treeview",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
