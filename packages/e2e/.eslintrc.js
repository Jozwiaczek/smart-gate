module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-argument': 0,

    'jest/require-top-level-describe': 0,
    'jest/consistent-test-it': [2, { fn: 'it', withinDescribe: 'it' }],
    'jest/expect-expect': 0,
  },
};
