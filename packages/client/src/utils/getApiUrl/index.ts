const getApiUrl = (): string => {
  const { REACT_APP_API_URL } = process.env;

  if (!REACT_APP_API_URL) {
    throw new Error('Missing "REACT_APP_API_URL" env variable');
  }

  return REACT_APP_API_URL;
};

export default getApiUrl;
