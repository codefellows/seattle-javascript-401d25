// This test suite is NOT jest, this is being run by mocha/chai
describe('Testing Section/Cards app', () => {
  it('Should create a new section and create a new card and delete them', () => {
    cy.visit('/');

    const testCategory = 'Test Category 1';
    cy.get('form[data-cy=section-form] input')
      .type(testCategory);
    
    cy.get('form[data-cy=section-form]').submit();
    // using a "then" block to protect against possible async issues where we might not get the section rendered in time for Cypress to know it exists

    cy.get('[data-cy=section]')
      .then((sections) => {
        const testCard = 'test card 1';
        expect(sections).to.have.length(1);

        cy.get('[data-cy=card-form] input').type(testCard);
        cy.get('[data-cy=card-form]').submit();

        cy.get('[data-cy=card]')
          .then((cards) => {
            expect(cards).to.have.length(1);

            // I need this as a then block because we must wait for the click to happen first to make the expect assertions, otherwise they fail because the cards and section did not get deleted fast enough

            // These block lines will not work in the right order
            // cy.get('[data-cy=delete-btn]').click()
            // expect(cards).to.have.length(0);
            // expect(sections).to.have.length(0);
            cy.get('[data-cy=delete-btn]').click()
              .then(() => {
                expect(cards).to.have.length(0);
                expect(sections).to.have.length(0);
              });
          });
      });
  });
});
