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
        title1: 'Zapomniałeś hasła?',
        title2: 'Zaktualizuj hasło',
        description1:
          'Wpisz swój email na który zostanie wysłany email z instrukcją resetowania hasła.',
        description2:
          'We’ve sent a 6-character code to <b>{{email}}</b>.<br/>The code expires shortly, so please enter it soon.',
        description3: 'Update your password for <b>{{email}}</b>.',
        sendRecoveryEmail: 'Wyślij email z linkiem',
        iRememberPassword: 'Przypomniałem sobie hasło',
        resendEmail: 'Wyślij ponownie email',
        updatePassword: 'Zaktualizuj hasło',
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
