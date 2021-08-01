module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix --cache'],
  '**/*.{js,jsx,ts,tsx,md,json,yml}': ['prettier --write --ignore-path .prettierignore'],
  '**/package.json': 'sort-package-json',
};
