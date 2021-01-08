module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --cache'],
  '*.{js,jsx,ts,tsx,md,json}': ['prettier --write --ignore-path .prettierignore'],
};
