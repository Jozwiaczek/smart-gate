import environments from '../constants/enviroments';

const onlyOnDevEnv = (callback: () => void) => {
  const isDev = process.env.NODE_ENV === environments.DEV;
  if (isDev) {
    callback();
  }
};

export default onlyOnDevEnv;
