import antfu from "@antfu/eslint-config";

export default antfu(
  {
    vue: true,
    formatters: true,
    pnpm: true,
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: "double",
      semi: true,
    },
    ignores: [
      "dist/**/*",
      "cache/**/*",
      "node_modules/**/*",
      "data/**/*",
      "*.html",
    ],
  },
  {
    rules: {
      "curly": ["error", "all"],
      "no-lone-blocks": "off",
      "style/brace-style": ["error", "1tbs"],
      "vue/multi-word-component-names": "off",
    },
  },
);
