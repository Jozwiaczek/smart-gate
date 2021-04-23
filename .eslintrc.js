module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['simple-import-sort', 'import', '@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: ['./packages/*/tsconfig.json', './packages/*/tsconfig.dev.json', 'tsconfig.dev.json'],
    tsconfigRootDir: __dirname,
    EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-void': 0,
    'consistent-return': 0,
    'no-console': 0,
    'operator-linebreak': [2, 'after', { overrides: { '?': 'before', ':': 'before' } }],

    '@typescript-eslint/unbound-method': 0, // TODO: Remove with react-hook-form migration
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/explicit-function-return-type': 0, // Disabled to improve code readability. No needed during writing React components
    '@typescript-eslint/indent': 0, // Disabled because prettier will handle this rule
    '@typescript-eslint/no-unused-expressions': [2, { allowShortCircuit: true }],
    '@typescript-eslint/no-floating-promises': [2, { ignoreIIFE: true, ignoreVoid: true }],
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },
    ],

    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,

    'import/first': 2,
    'import/newline-after-import': 2,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-duplicates': 2,
    'import/extensions': [2, 'never', { json: 'always' }],

    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-boolean-value': [2, 'never'],
    'react/jsx-one-expression-per-line': 0, // Disabled because of prettier rules
    'react/jsx-props-no-spreading': 0,
    'react/jsx-fragments': 0,

    'jsx-a11y/click-events-have-key-events': 0, // Disabled (https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md)

    'prettier/prettier': [
      2,
      {
        endOfLine: 'auto',
      },
    ],
  },
};
