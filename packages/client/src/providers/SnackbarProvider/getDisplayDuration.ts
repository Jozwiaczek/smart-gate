const getDisplayDuration = (message: string): number => {
  const { min, max } = Math;
  const msgLength = message.length;

  return min(max(msgLength * 50, 2000), 7000);
};

export default getDisplayDuration;
