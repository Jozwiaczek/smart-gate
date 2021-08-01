const authTokens = {
  accessToken: {
    name: 'access_token',
  },
  refreshToken: {
    name: 'refresh_token',
  },
  logoutToken: {
    name: 'logout_token',
  },
};

const DB_CONFIG_KEYS = {
  DEVICE_ACTION_CONFIG: 'DEVICE_ACTION_CONFIG',
};

const clientEndpoints = {
  passwordMagicLink: '/passwordRecovery/magicLink',
  registrationMagicLink: '/registration',
};
export default { authTokens, clientEndpoints, DB_CONFIG_KEYS };
