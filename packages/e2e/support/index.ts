/// <reference types="cypress" />

Cypress.Commands.add('dataTestId', (value: string) => cy.get(`[data-testid=${value}]`));
