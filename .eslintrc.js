module.exports = {
  // "extends": ["next/core-web-vitals"]
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  rules: {
    "import/extensions": [
      "error",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": ["off"],
    "import/named": "error",
    "no-console": "off",
    "react/jsx-props-no-spreading": ["off"],
    "react/require-default-props": ["off"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: ["function", "variable"],
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
      },
    ],
    "no-underscore-dangle": "off",
  },
};
