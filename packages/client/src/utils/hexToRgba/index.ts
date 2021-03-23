const hexToRgba = (hex: string, opacity = 1): string => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const shorthandHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(shorthandHex);
  if (!result) {
    throw Error('Invalid hex color');
  }

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default hexToRgba;
