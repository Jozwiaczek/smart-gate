const en = {
  translation: {
    user: {
      firstName: 'First name',
      lastName: 'Last name',
      password: 'Password',
    },
    form: {
      errors: {
        onSubmitError: 'Oops! Something went wrong. Operation failed.',
      },
      inputs: {
        defaultPlaceholderBase: 'Enter',
        confirmPassword: 'Confirm password',
        repeatPassword: 'Repeat your password',
        newPassword: 'New password',
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
      },
      registration: {
        title: 'Registration',
        createAccount: 'Create my account',
        alreadyHaveAccount: 'Already have an account?',
        login: 'Log in',
      },
      passwordRecovery: {
        intro: {
          title: 'Forgot password?',
          description:
            'Please enter your email address and we will send you instructions on how to reset your password.',
          sendRecoveryEmail: 'Send recovery email',
        },
        sentInfo: {
          title: 'Email has been sent!',
          description:
            'We’ve sent a link to <b>{{email}}</b> for updating your password.<br/>The link expires shortly.',
          resendEmail: 'Resend email',
        },
        updatePassword: {
          title: 'Update password',
          description: 'Update your password for <b>{{email}}</b>.',
          updatePassword: 'Update Password',
        },
        iRememberPassword: 'I remember my password now',
      },
      pageNotFound: {
        title: 'Oops, Seems it’s <b>Wrong gate</b>',
        description: 'We are sorry, but the <b>page</b> you<br/> requested <b>was not found</b>.',
        goTo: 'Go to ',
        dashboard: 'Dashboard',
        loginPage: 'Login page',
      },
    },
  },
};

export type TranslationStructure = typeof en;

export default en;
