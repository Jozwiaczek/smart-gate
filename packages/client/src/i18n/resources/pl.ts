import { TranslationStructure } from './en';

const pl: TranslationStructure = {
  translation: {
    baseApiFields: {
      id: 'Id',
      email: 'Email',
      createdAt: 'Data utworzenia',
      updatedAt: 'Data aktualizacji',
      firstName: 'Imię',
      lastName: 'Nazwisko',
    },
    user: {
      name: 'Użytkownik',
      firstName: 'Imię',
      lastName: 'Nazwisko',
      password: 'Hasło',
    },
    invitation: {
      name: 'Zaproszenie',
      inviter: 'Zapraszający',
      sendDate: 'Data wysłania',
    },
    actions: {
      back: 'Wróć',
      delete: 'Usuń',
    },
    menu: {
      history: 'Historia',
      dashboard: 'Pulpit',
      settings: 'Ustawienia',
      admin: 'Admin',
    },
    lists: {
      detailedList: {
        items: 'wierszy',
        item: 'wiersz',
        perPage: 'Wierszy na stronę',
        ofTotal: 'z',
        next: 'następny',
        prev: 'poprzedni',
        removeManyError: 'Coś poszło nie tak podczas operacji usuwania!',
      },
    },
    form: {
      errors: {
        onSubmitError: 'Oops! Coś poszło nie tak.',
      },
      inputs: {
        defaultPlaceholderBase: 'Wpisz',
        confirmPassword: 'Potwierdź hasło',
        repeatPassword: 'Powtórz hasło',
        newPassword: 'Nowe hasło',
      },
      validation: {
        required: 'Pole wymagane',
        invalidEmail: 'Nieprawidłowy adres email',
        basePassword: 'Hasło musi zawierać przynajmniej',
        characters: 'znaków',
        letter: 'litere',
        lowercaseLetter: 'małą litere',
        uppercaseLetter: 'dużą litere',
        number: 'liczbe',
        specialCharacter: 'znak specjalny',
        repeatPasswordError: 'Podane hasła muszą się zgadzać',
      },
    },
    routes: {
      dashboard: {
        logout: 'Wyloguj się',
        logoutFromAllDevices: 'Wyloguj ze wszystkich urządzeń',
      },
      admin: {
        title: 'Admin panel',
        items: {
          device: 'Urządzenie',
          users: 'Użytkownicy',
          invitations: 'Zaproszenia',
          privileges: 'Grupy dostępu',
          statistics: 'Statystyki',
        },
      },
      invitations: {
        sendInvitation: 'Nowe zaproszenie',
      },
      login: {
        keepMeLoggedIn: 'Nie wylogowuj mnie',
        forgotPassword: 'Zapomniałem hasła',
        register: 'Nie mam konta',
        login: 'Zaloguj',
      },
      registration: {
        title: 'Rejestracja',
        description: 'Utwórz konto dla tego adresu<br/>email <b>{{email}}</b>.',
        createAccount: 'Utwórz konto',
        alreadyHaveAccount: 'Masz już konto?',
        login: 'Zaloguj',
      },
      passwordRecovery: {
        intro: {
          title: 'Zapomniałeś hasła?',
          description:
            'Wpisz swój email na który zostanie wysłany link z instrukcją resetowania hasła.',
          sendRecoveryEmail: 'Wyślij email z linkiem',
        },
        sentInfo: {
          title: 'Email został wysłany!',
          description:
            'Wysłaliśmy Ci link na adres <b>{{email}}</b> w celu aktualizacji twojego hasła.<br/> Sprawdź swoje konto mailowe.',
          resendEmail: 'Wyślij email ponownie',
        },
        updatePassword: {
          title: 'Zaktualizuj hasło',
          description: 'Zaktualizuj swoje hasło dla <b>{{email}}</b>.',
          updatePassword: 'Zaktualizuj hasło',
        },
        updatePasswordConfirmation: {
          title: 'Hasło zaktualizowane',
          back: 'Wróc do strony logowania',
        },
        iRememberPassword: 'Przypomniałem sobie hasło',
      },
      pageNotFound: {
        title: 'Upss, trafiłeś do <br/><b>Złej bramy</b>',
        description: 'Przepraszamy, ale żądana <br/><b>strona nie została znaleziona</b>.',
        goTo: 'Wróć do ',
        dashboard: 'ekranu głównego',
        loginPage: 'strony logowania',
      },
    },
  },
};

export default pl;
