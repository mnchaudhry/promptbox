const sharedConfig = require("../../packages/ui/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    "./**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}"
  ],
}
