const getPlaceholderFromSource = (source: string): string =>
  source
    .split(/(?=[A-Z])/)
    .map((str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`)
    .join(' ');

export default getPlaceholderFromSource;
