import dotenv from 'dotenv';

dotenv.config();

// @ts-ignore
export default (on, config) => {
  // eslint-disable-next-line no-param-reassign
  config.env = process.env;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return config;
};
