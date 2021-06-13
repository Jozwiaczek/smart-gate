context('404 Page not found', () => {
  beforeEach(() => {
    cy.visit('/invalid-endpoint');
    cy.clearLocalStorage();
  });

  it('displays proper page', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl as string}/pageNotFound`);
  });

  it('displays hell animation for dark theme', () => {
    cy.dataTestId('"hell-animation"');
  });

  it('displays heaven animation for light theme', () => {
    cy.visit('/');
    cy.login();
    cy.switchTheme();
    cy.visit('/invalid-endpoint');
    cy.url().should('eq', `${Cypress.config().baseUrl as string}/pageNotFound`);
    cy.dataTestId('heaven-animation');
  });

  it('displays navigation to login for not authorized user', () => {
    cy.dataTestId('btn-404-nav').click();
    cy.url().should('eq', `${Cypress.config().baseUrl as string}/login`);
  });

  it('displays navigation to dashboard for authorized user', () => {
    cy.visit('/');
    cy.login();
    cy.dataTestId('dashboard-title');
    cy.visit('/invalid-endpoint');
    cy.dataTestId('btn-404-nav').click();
    cy.url().should('eq', `${Cypress.config().baseUrl as string}/`);
  });
});
