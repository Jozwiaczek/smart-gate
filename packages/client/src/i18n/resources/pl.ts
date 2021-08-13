import { TranslationStructure } from './en';

const pl: TranslationStructure = {
  translation: {
    baseApiFields: {
      id: 'Id',
      email: 'Email',
      createdAt: 'Data utworzenia',
      updatedAt: 'Data aktualizacji',
    },
    user: {
      name: 'Użytkownik',
      firstName: 'Imię',
      lastName: 'Nazwisko',
      password: 'Hasło',
      role: 'Rola',
    },
    invitation: {
      name: 'Zaproszenie',
      inviter: 'Zapraszający',
      sendDate: 'Data wysłania',
    },
    actions: {
      back: 'Wróć',
      delete: 'Usuń',
      save: 'Zapisz',
      cancel: 'Anuluj',
      regenerate: 'Odnów',
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
      success: {
        update: 'Aktualizacja zakończona',
      },
      inputs: {
        defaultPlaceholderBase: 'Wpisz',
        confirmPassword: 'Potwierdź hasło',
        repeatPassword: 'Powtórz hasło',
        newPassword: 'Nowe hasło',
        repeatNewPassword: 'Powtórz nowe hasło',
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
      general: {
        sectionInConstruction: 'Ta sekcja jest w budowie',
      },
      dashboard: {
        title: 'Pulpit',
        swipeUpToToggle: 'Przesuń w górę aby aktywować bramę',
        toggleSuccess: 'Aktywowano bramę',
      },
      history: {
        title: 'Historia',
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
      settings: {
        title: 'Ustawienia',
        theme: {
          title: 'Motyw',
          light: 'Jasny',
          dark: 'Ciemny',
          system: 'Systemowy',
        },
        language: {
          title: 'Język',
          en: 'Angielski',
          pl: 'Polski',
        },
        logout: {
          title: 'Wyloguj się',
          logout: 'Wyloguj się',
          logoutFromAllDevices: 'Wyloguj ze wszystkich urządzeń',
        },
        account: {
          title: 'Konto',
          basics: {
            title: 'Dane',
          },
          actions: {
            title: 'Akcje',
            changePassword: 'Zmień hasło',
            deleteAccount: 'Usuń konto',
            passwordChanged: 'Hasło zmienione poprawnie',
            deleteAccountInfo:
              'Czy na pewno chcesz usunąć swoje konto? Spowoduje to trwałe usunięcie Twojego konta.',
            accountDeleted: 'Konto zostało usunięte',
          },
          integrations: {
            title: 'Integracje',
            extendedTitle: 'Zewnętrzne integracje',
            description:
              'Stwórz swoje integracje z zewnętrznymi serwisami. Umożliwia to przykładowo na otworzenie bramy z wykorzystaniem <strong>asystenta głosowego</strong>.',
            generateApiKey: 'Wygeneruj klucz',
            regenerate: 'Wygeneruj ponownie',
            tokenCopied: 'Klucz skopiowany do schowka',
            tokenDeleted: 'Klucz poprawnie usunięty',
            tokenManagement: 'Zarządzanie kluczem',
            externalIntegrationsToken: 'Klucz integracji zewnętrznych',
            integrationsTemplates: 'Szablony integracji',
            deleteToken: 'Usuń klucz integracji zewnętrznych',
            deleteTokenInfo:
              'Czy na pewno chcesz usunąć swój token? Spowoduje to trwałe usunięcie oraz utratę połączenia ze stworzonymi integracjami.',
            regenerateTokenConfirmation: 'Odnów klucz integracji zewnętrznych',
            regenerateTokenConfirmationInfo:
              'Czy na pewno chcesz odnowić swój token? Spowoduje to utratę połączenia ze stworzonymi integracjami.',
            templatesDescription:
              'Szablony to przygotowane z myślą o szybkim dodawaniu integracji zewnętrznych predefiniowane akcje. Są w pełni konfigurowalne i do działania wymagają tylko <strong>e-maila</strong> przypisanego do konta Smart Gate i wygenerowanego <strong>klucza</strong>.',
            pickToStart: 'Wybierz jeden z poniższych linków, aby szybko rozpocząć:',
            templatesNote:
              '<strong>Uwaga:</strong> aby dodać gotowe szablony integracji, w większości przypadków musisz <strong>zezwolić na niezaufane szablony/skróty</strong> w ustawieniach twojego urządzenia.',
            shortcutsTemplate: 'Szablon Apple Shortcuts',
            generateTokenToIntegrate:
              'W celu integracji z zewnętrznymi serwisami, wygeneruj swój prywatny klucz.',
            sharingTokenWarning:
              '<strong>Ostrzeżenie:</strong><br />Nikomu nie udostępniaj swojego klucza.<br />Każdy użytkownik powinien używać swojego unikalnego klucza.',
          },
        },
        privileges: {
          title: 'Uprawnienia',
        },
      },
      invitations: {
        sendInvitation: 'Nowe zaproszenie',
        createDialog: {
          title: 'Nowe zaproszenie',
          description:
            'Zaproś nowego użytkownika poprzez email aby dodać go do systemu Smart Gate. Po wysłaniu nadal możesz anulować zaproszenie',
          addAsAdmin: 'Dodaj jako administrator',
          send: 'Wyślij zaproszenie',
          invitationsSentSuccessfully: 'Zaproszenie wysłane',
        },
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
