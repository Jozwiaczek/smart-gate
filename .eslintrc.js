module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb-typescript', // Uses the recommended rules from @airbnb-typescript
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Align prettier settings with eslint
  ],
  plugins: ['react-hooks', 'simple-import-sort', 'import'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
      },
    ],
    'react/require-default-props': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'consistent-return': 0,
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-implied-eval': 0,
    'import/no-extraneous-dependencies': 0,
    'react/no-unused-prop-types': 0,
    'no-console': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-throw-literal': 0,
    'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'import/extensions': [2, 'never', { json: 'always' }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],
    '@typescript-eslint/no-unused-expressions': [2, { allowShortCircuit: true }],
    '@typescript-eslint/explicit-function-return-type': [0], // Disabled to improve code readability. No needed during writing React components
    '@typescript-eslint/indent': [0], // Disabled because prettier will handle this rule
    'react/state-in-constructor': [0], // Disabled because we want to allow to write components with and without constructor
    'react/button-has-type': [0], // Disabled because it not work well with TypeScript
    'react/jsx-boolean-value': [2, 'never'],
    'react/jsx-one-expression-per-line': [0], // Disabled because of prettier rules
    'react/jsx-props-no-spreading': [0],
    'react/jsx-fragments': [0], // Disabled for better code readability
    'jsx-a11y/click-events-have-key-events': [0], // Disabled (https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md)
    'jsx-a11y/no-static-element-interactions': [1], // As a warning (https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md)
    'jsx-a11y/label-has-associated-control': [0],
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        paths: ['src'], // Resolve absolute path to modules
      },
    },
  },
  overrides: [
    {
      files: ['src/**/*.{js,ts,tsx}'],
      excludedFiles: ['src/**/*.test.{ts,tsx,js}'],
    },
  ],
};
