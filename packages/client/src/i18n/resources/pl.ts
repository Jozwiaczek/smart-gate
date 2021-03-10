import { TranslationStructure } from './en';

const pl: TranslationStructure = {
  translation: {
    user: {
      firstName: 'Imię',
      lastName: 'Nazwisko',
      password: 'Hasło',
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
        confirmPassword: 'Potwierdź hasło',
        repeatPassword: 'Powtórz hasło',
        repeatPasswordError: 'Podane hasła muszą się zgadzać',
      },
    },
  },
};

export default pl;
