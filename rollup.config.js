import vue from "rollup-plugin-vue";
import css from "rollup-plugin-css-only";
import NodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  inlineDynamicImports: true,
  output: [
    {
      format: "umd",
      file: pkg.main,
      name: "vue3-treeview",
      sourcemap: true,
    },
    {
      format: "es",
      file: pkg.module,
      sourcemap: true,
    },
  ],
  plugins: [
    NodeResolve(),
    vue({
      css: false,
      compileTemplate: true,
      defaultLang: { script: "ts" },
    }),
    css({ output: "vue3-treeview.css" }),
    typescript()
  ],
};
