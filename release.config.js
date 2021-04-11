module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        // eslint-disable-next-line no-template-curly-in-string
        message: 'chore: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
  parserOpts: {
    mergePatterns: "Merge branch 'dev' into main",
  },
};
