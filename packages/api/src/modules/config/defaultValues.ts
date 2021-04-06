const defaultValues = {
  invitation: {
    expirationDate: '10 days',
  },

  authTokens: {
    accessToken: {
      expirationTime: '5m',
    },
    refreshToken: {
      expirationTimeWithKeepMeLoggedIn: '60d',
      expirationTimeWithoutKeepMeLoggedIn: '12h',
    },
  },

  sentry: {
    isEnable: false,
    environment: 'development',
    tracesSampleRate: 1.0,
  },
};

export default defaultValues;
