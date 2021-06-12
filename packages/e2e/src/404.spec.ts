context('404 Page not found', () => {
  beforeEach(() => {
    cy.visit('/invalid-endpoint');
    cy.clearLocalStorage();
  });

  it('displays proper page', () => {
    cy.contains('Oops, Seems it’s Wrong gate');
    cy.url().should('eq', `${Cypress.config().baseUrl as string}/pageNotFound`);
  });

  it('displays hell animation for dark theme', () => {
    cy.dataTestId('"hell-animation"');
  });

  it('displays heaven animation for light theme', () => {
    cy.visit('/');
    cy.login();
    cy.contains('Dashboard');
    cy.switchTheme();
    cy.visit('/invalid-endpoint');
    cy.dataTestId('"heaven-animation"');
  });

  it('displays navigation to login for not authorized user', () => {
    cy.contains('Go to Login page').click();
    cy.url().should('eq', `${Cypress.config().baseUrl as string}/login`);
  });

  it('displays navigation to dashboard for authorized user', () => {
    cy.visit('/');
    cy.login();
    cy.contains('Dashboard');
    cy.visit('/invalid-endpoint');
    cy.contains('Go to Dashboard').click();
    cy.url().should('eq', `${Cypress.config().baseUrl as string}/`);
  });
});
