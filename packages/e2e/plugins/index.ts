import dotenv from 'dotenv';

import makeEmailAccount from './email-account';

dotenv.config();

// @ts-ignore
export default (on, config) => {
  // eslint-disable-next-line no-param-reassign
  config.env = process.env;

  const { getLastEmail, getLastEmailBySubject } = makeEmailAccount();

  on('task', {
    getLastEmail,
    getLastWelcomeEmail: () => getLastEmailBySubject('Smart Gate - Invitation'),
    getLastRecoveryEmail: () => getLastEmailBySubject('Smart Gate - Password recovery'),
  });

  return config;
};
