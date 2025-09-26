import { Config } from "stylelint";

const config: Config = {
  extends: ["stylelint-config-standard", "stylelint-config-recommended-vue"],
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "color-function-alias-notation": null,
    "value-keyword-case": [
      "lower",
      {
        ignoreKeywords: ["optimizeLegibility"],
      },
    ],
    "no-empty-source": null,
    "color-no-invalid-hex": true,
  },
  overrides: [
    {
      files: ["**/*.vue"],
      customSyntax: "postcss-html",
    },
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
};

export default config;
