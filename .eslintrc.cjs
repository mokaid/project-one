module.exports = {
  root: true,
  settings: {
    react: {
      version: "detect",
    },
  },
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "@typescript-eslint",
    "dirnames",
    "import",
    "prettier",
    "react-refresh",
    "simple-import-sort",
    "unicorn",
  ],
  rules: {
    "dirnames/match-kebab-case": "error",
    "import/prefer-default-export": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-param-reassign": "off",
    "prettier/prettier": "error",
    "padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "always", prev: "*", next: "return" },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "react/display-name": "off",
    "react/jsx-boolean-value": ["error", "always"],
    "react/function-component-definition": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
          ],
          // Packages. `react` related packages come first.
          ["^react", "^redux", "^@?\\w"],
          // Root path for project
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.?(css)$"],
        ],
      },
    ],
    "no-plusplus": "off",
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],
  },
};
