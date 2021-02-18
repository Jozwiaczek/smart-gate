module.exports = {
  hooks: {
    'pre-commit': 'yarn type-check && lint-staged',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
