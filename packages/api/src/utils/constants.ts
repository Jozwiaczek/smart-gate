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

const CLIENT_ENDPOINTS = {
  passwordMagicLink: '/passwordRecovery/magicLink',
  registrationMagicLink: '/registration',
};

const ROLES_KEY = 'roles';

export default { AUTH_TOKENS, CLIENT_ENDPOINTS, ROLES_KEY };
