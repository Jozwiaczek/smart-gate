const tokenConfig = {
  refreshToken: {
    name: 'refresh_token',
    keepMeLoggedIn: {
      expiresIn: '60d',
    },
    withOutKeepMeLoggedIn: {
      expiresIn: '12h',
    },
  },
  logoutToken: {
    name: 'logout_token',
    expiresIn: '12h',
  },
  accessToken: {
    name: 'access_token',
    expiresIn: '5m',
  },
};
export default { tokenConfig };
