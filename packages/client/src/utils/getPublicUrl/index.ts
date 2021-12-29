import { environments } from '../../constants';

const getPublicUrl = () => {
  const port = process.env.PORT || 8080;
  const defaultUrl = `http://localhost:${port}`;

  if (process.env.NODE_ENV === environments.DEV) {
    return defaultUrl;
  }

  return process.env.PUBLIC_URL || defaultUrl;
};

export default getPublicUrl;
