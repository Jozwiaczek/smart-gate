const getPlaceholderFromSource = (source: string): string => {
  return source
    .split(/(?=[A-Z])/)
    .map((str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`)
    .join(' ');
};

export default getPlaceholderFromSource;
