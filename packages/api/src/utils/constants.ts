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

const clientEndpoints = {
  passwordMagicLink: '/passwordRecovery/magicLink',
  registrationMagicLink: '/registration',
};

const roles_key = 'roles';

export default { authTokens, clientEndpoints, roles_key };
