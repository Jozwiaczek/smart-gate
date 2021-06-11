module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix --cache'],
  '**/*.{js,jsx,ts,tsx,md,json,yml}': ['prettier --write --ignore-path .prettierignore'],
  '**/*.{styled.ts,tsx}': ['stylelint'],
  '**/package.json': 'sort-package-json',
};
