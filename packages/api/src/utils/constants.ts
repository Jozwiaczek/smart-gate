// TODO: move secret into .env
export const jwtConstants = {
  secret: 'secretKey',
};

export const TokenConfig = {
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
