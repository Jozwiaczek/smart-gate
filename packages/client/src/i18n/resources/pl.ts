import { TranslationStructure } from './en';

const pl: TranslationStructure = {
  translation: {
    user: {
      firstName: 'Imię',
      lastName: 'Nazwisko',
      password: 'Hasło',
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
      login: {
        keepMeLoggedIn: 'Nie wylogowuj mnie',
        forgotPassword: 'Zapomniałem hasła',
        register: 'Nie mam konta',
        login: 'Zaloguj',
      },
      registration: {
        title: 'Rejestracja',
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
