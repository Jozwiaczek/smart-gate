// TODO: move secret into .env
export const jwtConstants = {
  secret: 'secretKey',
};

export const TokenConfig = {
  refreshToken: {
    name: 'refresh_token',
    keepMe: {
      expiresIn: '60d',
    },
    withOutKeepMe: {
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
