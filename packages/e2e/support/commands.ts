import { recurse } from 'cypress-recurse';

Cypress.Commands.add('dataTestId', (value: string) => cy.get(`[data-testid=${value}]`));

Cypress.Commands.add('login', (email?: string, password?: string) => {
  cy.dataTestId('input-email').type(email ?? Cypress.env('TEST_USER_EMAIL'));
  cy.dataTestId('input-password').type(password ?? Cypress.env('TEST_USER_PASSWORD'));
  return cy.get('form').submit();
});

Cypress.Commands.add('mainNavTo', (tab: MainNavTab) => cy.dataTestId(`"tab-menu.${tab}"`).click());

Cypress.Commands.add('recurseGoToEmail', (emailAction: EmailAction) =>
  recurse(() => cy.task(emailAction), Cypress._.isObject, {
    timeout: 15000, // retry up to 15 sec
    delay: 5000, // wait 5 seconds between attempts
  })
    .its('html')
    .then((html: string) => {
      cy.document({ log: false }).invoke({ log: false }, 'write', html);
    }),
);

Cypress.Commands.add('aNavWithoutTarget', (hrefStartsWith: string) => {
  cy.get(`a[href^="${hrefStartsWith}"]`).invoke('removeAttr', 'target');
  return cy.get(`a[href^="${hrefStartsWith}"]`).click();
});

Cypress.Commands.add('changeTheme', (theme: Theme) => {
  cy.mainNavTo('settings');
  return cy.dataTestId(`${theme}-theme-button`).click();
});
