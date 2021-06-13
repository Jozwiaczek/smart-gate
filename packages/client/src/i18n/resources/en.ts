const en = {
  translation: {
    baseApiFields: {
      id: 'Id',
      email: 'Email',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },
    user: {
      name: 'User',
      firstName: 'First name',
      lastName: 'Last name',
      password: 'Password',
      role: 'Role',
    },
    invitation: {
      name: 'Invitation',
      inviter: 'Inviter',
      sendDate: 'Send date',
    },
    actions: {
      back: 'Back',
      delete: 'Delete',
    },
    menu: {
      history: 'History',
      dashboard: 'Dashboard',
      settings: 'Settings',
      admin: 'Admin',
    },
    lists: {
      detailedList: {
        items: 'items',
        item: 'item',
        perPage: 'Rows per page',
        ofTotal: 'of',
        next: 'next',
        prev: 'prev',
        removeManyError: 'Something went wrong during the delete operation!',
      },
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
      general: {
        sectionInConstruction: 'This section is under construction',
      },
      dashboard: {
        title: 'Dashboard',
        toggleGate: 'Toggle gate',
        toggleSuccess: 'Gate successfully toggled',
      },
      history: {
        title: 'History',
      },
      admin: {
        title: 'Admin panel',
        items: {
          device: 'Device configuration',
          users: 'Users management',
          invitations: 'Invitations',
          privileges: 'Privileges groups',
          statistics: 'Statistics',
        },
      },
      settings: {
        title: 'Settings',
        logout: 'Logout',
        logoutFromAllDevices: 'Logout from all devices',
      },
      invitations: {
        sendInvitation: 'Send Invitation',
        createDialog: {
          title: 'Invite New Member',
          description:
            'Invite new members by email to join your Smart Gate. After sent, you will still be able to cancel invitation.',
          addAsAdmin: 'Add as admin',
          send: 'Send invite',
          invitationsSentSuccessfully: 'Invitation sent successfully',
        },
      },
      login: {
        keepMeLoggedIn: 'Keep me logged in',
        forgotPassword: 'Forgot password',
        register: "I don't have an account",
        login: 'Log in',
      },
      registration: {
        title: 'Registration',
        description: 'Create your account for<br/> <b>{{email}}</b> email.',
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
        updatePasswordConfirmation: {
          title: 'Password updated',
          back: 'Back to login',
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
