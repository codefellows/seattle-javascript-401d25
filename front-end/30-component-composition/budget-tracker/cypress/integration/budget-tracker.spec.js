// THIS IS NOT JEST, THIS TEST SUITE IS RUN ON MOCHA/CHAI WHICH IS JEST-LIKE

describe('Testing budget tracker app with full-CRUD operations', () => {
  it('should run through an end-to-end crud operation on the app', () => {
    // we have access to a global cy variable
    // I can just do "/" here because in my cypress.json, I've set basetUrl to locahost:8080
    cy.visit('/');
    cy.get('a').contains('Dashboard').click();
    // "should" and "and" are considered implicit assertions in Cypress
    cy.url().should('include', '/dashboard');

    cy.get('input[data-cy=title]')
      .clear()
      .type('apples');
    
    cy.get('input[data-cy=price]')
      .clear()
      .type(10);
    
    cy.get('form[data-cy=expense-form]').submit();

    cy.get('button[data-cy=expense-item-btn]').contains('Update').click();

    cy.get('[data-cy=modal] input[data-cy=title]')
      .clear()
      .type('updated apples');

    cy.get('[data-cy=modal] input[data-cy=price]')
      .clear()
      .type('updated apples')
      .should('have.value', '');
    
    cy.get('[data-cy=modal] input[data-cy=price]')
      .clear()
      .type(20)
      .should('have.value', '20');

    cy.get('[data-cy=modal] form[data-cy=expense-form]').submit();

  });
});
