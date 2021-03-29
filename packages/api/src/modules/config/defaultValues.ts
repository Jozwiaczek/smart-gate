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

  mailer: {
    from: 'no-reply@sg.com',
    sender: 'Smart Gate',
    replyTo: 'sg@gmail.com',
  },
};

export default defaultValues;
