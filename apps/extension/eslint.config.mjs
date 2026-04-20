import rootConfig from "../../eslint.config.mjs";

export default [
  ...rootConfig,
  {
    ignores: [".plasmo/", "build/", "node_modules/"],
  },
  {
    files: ["*.js", "*.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
