const defaultValues = {
  invitation: {
    expirationDate: '10 days',
  },

  tokens: {
    accessToken: {
      name: 'access_token',
      expirationTime: '5m',
    },
    logoutToken: {
      name: 'logout_token',
    },
    refreshToken: {
      name: 'refresh_token',
      expirationTimeWithKeepMeLoggedIn: '60d',
      expirationTimeWithoutKeepMeLoggedIn: '12h',
    },
  },
};

export default defaultValues;
