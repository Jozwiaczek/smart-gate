context('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('returns error for not existed user', () => {
    cy.login('invalid@gmail.com', '@1Invalid#');
    cy.dataTestId('snackbar-error');
  });

  it('register user', () => {
    cy.recurseGoToEmail('getLastWelcomeEmail');
    cy.aNavWithoutTarget('http://localhost:8080/registration');
    cy.dataTestId('input-firstName').type(Cypress.env('TEST_USER_FIRSTNAME'));
    cy.dataTestId('input-lastName').type(Cypress.env('TEST_USER_LASTNAME'));
    cy.dataTestId('input-password').type(Cypress.env('TEST_USER_PASSWORD'));
    cy.dataTestId('input-confirm-password').type(Cypress.env('TEST_USER_PASSWORD'));
    cy.get('form').submit();
    cy.dataTestId('dashboard-title');
  });

  it('login user', () => {
    cy.login();
    cy.dataTestId('dashboard-title');
  });

  it('logout user', () => {
    cy.login();
    cy.dataTestId('"tab-menu.settings"').click();
    cy.dataTestId('button-logout').click();
    cy.dataTestId('btn-login');
  });
});
