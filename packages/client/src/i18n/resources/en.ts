const en = {
  translation: {
    user: {
      firstName: 'First name',
      lastName: 'Last name',
      password: 'Password',
    },
    form: {
      inputs: {
        defaultPlaceholderBase: 'Wpisz',
        confirmPassword: 'Confirm password',
        repeatPassword: 'Repeat your password',
      },
      validation: {
        required: 'Required',
        invalidEmail: 'Invalid email address',
        basePassword: 'Password must contain at least',
        characters: 'characters',
        letter: 'letter',
        lowercaseLetter: 'lowercase letter',
        uppercaseLetter: 'uppercase letter',
        number: 'number',
        specialCharacter: 'special character',
        repeatPasswordError: 'The password fields must match',
      },
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
        onSubmitError: 'Login error',
      },
      registration: {
        title: 'Registration',
        createAccount: 'Create my account',
        alreadyHaveAccount: 'Already have an account?',
        login: 'Log in',
        onSubmitError: 'Registration error',
      },
    },
  },
};

export type TranslationStructure = typeof en;

export default en;
