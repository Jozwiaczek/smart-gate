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
      cancel: 'Cancel',
      save: 'Save',
      regenerate: 'Regenerate',
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
      success: {
        update: 'Update successful',
      },
      inputs: {
        defaultPlaceholderBase: 'Enter',
        confirmPassword: 'Confirm password',
        repeatPassword: 'Repeat your password',
        newPassword: 'New password',
        repeatNewPassword: 'Confirm new password',
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
        theme: {
          title: 'Theme',
          light: 'Light',
          dark: 'Dark',
          system: 'Sync with system',
        },
        language: {
          title: 'Language',
          en: 'English',
          pl: 'Polish',
        },
        logout: {
          title: 'Logout',
          logout: 'Logout',
          logoutFromAllDevices: 'Logout from all devices',
        },
        account: {
          title: 'Account',
          basics: {
            title: 'Basics',
          },
          actions: {
            title: 'Actions',
            changePassword: 'Change password',
            deleteAccount: 'Delete account',
            passwordChanged: 'Password changed successfully',
            deleteAccountInfo:
              'Are you sure you want to delete your account? This will permanently erase your account.',
            accountDeleted: 'Account deleted successfully',
          },
          integrations: {
            title: 'Integrations',
            extendedTitle: 'External integrations',
            description:
              'Here you can integrate with external services. Thanks to that you will be able for example to open doors with <strong>voice assistant</strong>.',
            generateApiKey: 'Generate token',
            regenerate: 'Regenerate',
            tokenCopied: 'Token copied to clipboard',
            tokenDeleted: 'Token deleted successfully',
            tokenManagement: 'Token management',
            externalIntegrationsToken: 'External integrations token',
            integrationsTemplates: 'Integrations templates',
            deleteToken: 'Delete external integrations token',
            deleteTokenInfo:
              'Are you sure you want to delete your token? This will permanently erase it and all created integrations will lose connection.',
            templatesDescription:
              'Integrations templates are actions prepared with a view to quickly adding external integrations. They are fully customizable and only require the <strong>e-mail</strong> assigned to the Smart Gate account and the generated <strong>token</strong>.',
            regenerateTokenConfirmation: 'Regenerate external integrations token',
            regenerateTokenConfirmationInfo:
              'Are you sure you want to regenerate your token? All created integrations will lose connection.',
            pickToStart: 'Pick one of the links below to get started quickly:',
            templatesNote:
              '<strong>Note:</strong> In order to add prepared integrations templates in most cases you will have to <strong>allow for untrusted templates/shortcuts</strong> in your device settings.',
            shortcutsTemplate: 'Apple Shortcuts template',
            generateTokenToIntegrate:
              'In order to integrate with external services, you have to generate your private token key.',
            sharingTokenWarning:
              '<strong>Warning:</strong> Don’t share your token to anyone. Every user should have his own unique token.',
          },
        },
        privileges: {
          title: 'Privileges',
        },
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
