import eslintPluginReact from "eslint-plugin-react";

export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      "react/prop-types": "off",
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
