const en = {
  translation: {
    user: {
      firstName: 'First name',
      lastName: 'Last name',
      password: 'Password',
    },
    routes: {
      dashboard: {
        logout: 'Logout',
      },
      login: {
        keepMeLoggedIn: 'Keep me logged in',
        forgotPassword: 'Forgot password',
        register: "I don't have an account",
        login: 'Log in',
      },
      registration: {
        title: 'Registration',
        createAccount: 'Create my account',
        alreadyHaveAccount: 'Already have an account?',
        login: 'Log in',
        confirmPassword: 'Confirm password',
        repeatPassword: 'Repeat your password',
        repeatPasswordError: 'The password fields must match.',
      },
    },
  },
};

export type TranslationStructure = typeof en;

export default en;
