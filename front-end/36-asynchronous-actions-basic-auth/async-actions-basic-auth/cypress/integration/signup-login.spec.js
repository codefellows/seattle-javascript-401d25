const isStubbed = true;

const backEndApiUrl = 'http://localhost:3000/api'

describe('SIGNUP testing', function() {

  // using this beforeEach to grab fake user data from ./fixtures/example.json
  let currentUser; 
  before(() => {
    cy.fixture('test-user.json')
    .then((response) => {
      currentUser = response;
      console.log(response, 'response')

      // here we are mocking our response to /api/signup
      if (isStubbed) {
        cy.server()
        cy.route({
          method: 'POST',
          url: `${backEndApiUrl}/signup*`,
          response: {
            token: 'fakeToken123',
          },
        })
        cy.route({
          method: 'GET',
          url: `${backEndApiUrl}/login*`,
          response: {
            token: 'fakeToken123',
          },
        })
      }
    })
  })
 
  it('should sign up a new user starting at the homepage', () => {
    cy.visit('/');
    console.log(currentUser, 'currentUser')
    cy.get('a[href="/signup"]').click();
    cy.url().should('include', '/signup');

    cy.get('input[name=username]').type(currentUser.username);
    cy.get('input[name=email]').type(currentUser.email);
    cy.get('input[name=password]').type(currentUser.password);

    cy.get('form.auth-form').submit()
      .then(() => {
        cy.url().should('include', '/dashboard');
        cy.get('h1').should('have.length', 1);

        cy.visit('/login')

        cy.url().should('include', '/login')
        cy.get('h1').should('have.length', 0);

        cy.get('input[name=username]').type(currentUser.username);
        cy.get('input[name=password]').type(currentUser.password);
        cy.get('form.auth-form').submit();
        cy.get('h1').should('have.length', 1);
      })
  });
});


