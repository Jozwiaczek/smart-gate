module.exports = {
  extends: ['stylelint-config-recommended'],
  rules: {
    'no-extra-semicolons': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends'],
      },
    ],
    'block-no-empty': null,
    'no-empty-source': null,
  },
};
