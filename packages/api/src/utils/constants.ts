const tokenConfig = {
  refreshToken: {
    name: 'refresh_token',
    keepMeLogin: {
      expiresIn: '60d',
    },
    withOutKeepMeLogin: {
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
