declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.dataTestId('input-email')
     */
    dataTestId(value: string): Chainable<Element>;

    /**
     * Custom command to login as a test user from login page.
     * @example cy.login()
     * @example cy.login('example@mail.com', '@1Asqwe3')
     */
    login(email?: string, password?: string): Chainable<Element>;

    /**
     * Custom command to navigate within main menu.
     * @example cy.mainNavTo('settings')
     */
    mainNavTo(tab: MainNavTab): Chainable<Element>;

    /**
     * Custom command to invoke recurse go to ethereal email.
     * @example cy.recurseGoEmail('getLastWelcomeEmail')
     */
    recurseGoToEmail(emailAction: EmailAction): void;

    /**
     * Custom command to find html a tag, remove target attr and click.
     * @example cy.aNavWithoutTarget('http://localhost:8080/passwordRecovery')
     */
    aNavWithoutTarget(hrefStartsWith: string): Chainable<Element>;

    /**
     * Custom command to switch current theme type.
     * @example cy.switchTheme()
     */
    switchTheme(): Chainable<Element>;
  }
}
