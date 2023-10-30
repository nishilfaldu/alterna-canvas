module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', "import"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Import Rules
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/first": ["error"],
    "import/newline-after-import": ["warn", { count: 3 }],
    "import/no-absolute-path": ["error"],
    "import/no-mutable-exports": ["error"],
    // "import/no-relative-parent-imports": ["error"],
    "import/no-useless-path-segments": ["error"],
    "import/no-unresolved": ["error"],
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external"],
        "newlines-between": "always",
        "alphabetize": {
          order: "asc",
          orderImportKind: "asc",
          caseInsensitive: true,
        },
      },
    ],

    // "jest/no-mocks-import": "warn",

    // "unicorn/empty-brace-spaces": "off",
    // "unicorn/filename-case": [
    //     "error",
    //     {
    //         cases: {
    //             camelCase: true,
    //             kebabCase: true,
    //             pascalCase: true,
    //         },
    //     },
    // ],
    // "unicorn/prefer-number-properties": "off",

    // Default auto-fix rules
    "arrow-parens": ["warn", "as-needed"],
    "block-spacing": ["warn", "always"],
    "comma-dangle": ["warn", "always-multiline"],
    "curly": ["warn", "all"],
    "jsx-quotes": ["warn", "prefer-double"],
    "no-multi-spaces": ["off"],
    "object-curly-spacing": [
      "warn",
      "always",
      { objectsInObjects: true, arraysInObjects: true },
    ],
    "padded-blocks": ["warn", "never"],
    "padding-line-between-statements": [
      "warn",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "function", next: "*" },
    ],
    "quote-props": ["warn", "consistent-as-needed"],
    "quotes": ["warn", "double"],
    "space-before-blocks": ["warn", "always"],
    "semi": ["warn", "always"],

    // Default non-auto-fix rules
    "max-len": [
      "error",
      {
        code: 120,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "no-tabs": "error",
  },
}
