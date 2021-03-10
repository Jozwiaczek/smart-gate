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
    },
  },
};

export default pl;
