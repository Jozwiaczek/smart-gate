import Environment from '../constants/enviroment';

const onlyOnDevEnv = (callback: () => void) => {
  const isDev = process.env.NODE_ENV === Environment.dev;
  if (isDev) {
    callback();
  }
};

export default onlyOnDevEnv;
