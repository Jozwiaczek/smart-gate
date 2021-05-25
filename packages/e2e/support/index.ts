/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.dataTestId('input-email')
     */
    dataTestId(value: string): Chainable<Element>;
  }
}

Cypress.Commands.add('dataTestId', (value: string) => cy.get(`[data-testid=${value}]`));
