const AUTH_TOKENS = {
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

const CLIENT_ENDPOINTS = {
  passwordMagicLink: '/passwordRecovery/magicLink',
  registrationMagicLink: '/registration',
};

const ROLES_KEY = 'roles';

export default { AUTH_TOKENS, CLIENT_ENDPOINTS, ROLES_KEY, DB_CONFIG_KEYS };
