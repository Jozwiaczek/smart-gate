/// <reference types="cypress" />

const loginUser = () => {
  cy.dataTestId('input-email').type(Cypress.env('EXISTED_USER_EMAIL'));
  cy.dataTestId('input-password').type(Cypress.env('EXISTED_USER_PASSWORD'));
  cy.get('form').submit();
};

context('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('returns error for unregister user', () => {
    cy.dataTestId('input-email').type('mock@gmail.com');
    cy.dataTestId('input-password').type('@12Mock#');
    cy.get('form').submit();
    cy.dataTestId('snackbar').contains('Oops! Something went wrong. Operation failed.');
  });

  it('login user', () => {
    loginUser();
    cy.get('body').contains('Dashboard');
  });

  it('logout user', () => {
    loginUser();
    cy.dataTestId('"tab-menu.settings"').click();
    cy.dataTestId('button-logout').click();
    cy.get('body').contains('Log in');
  });

  it('logout user', () => {
    loginUser();
    cy.dataTestId('"tab-menu.settings"').click();
    cy.dataTestId('button-logout').click();
    cy.get('body').contains('Log in');
  });

  it('send recovery email', () => {
    cy.dataTestId('link-forgotPassword').click();
    cy.dataTestId('input-email').type(Cypress.env('EXISTED_USER_EMAIL'));
    cy.get('form').submit();
    cy.get('body').contains('Email has been sent');
  });
});
