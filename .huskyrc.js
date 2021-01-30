module.exports = {
  hooks: {
    'pre-commit': 'yarn type-check && lint-staged && echo pre',
    'pre-push': 'yarn test && yarn test:e2e && echo prepush',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
