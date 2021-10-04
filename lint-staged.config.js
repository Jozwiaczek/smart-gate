module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix --cache'],
  '**/*.{js,jsx,ts,tsx,md,mdx,json,yml,css}': ['prettier --write --ignore-path .prettierignore'],
  '**/package.json': 'sort-package-json',
};
