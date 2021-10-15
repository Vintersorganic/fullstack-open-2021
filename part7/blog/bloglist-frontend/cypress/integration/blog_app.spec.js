describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Georg',
      username: 'Rick',
      password: 'Morty'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('Rick')
      cy.get('#password')
        .type('Morty')
      cy.get('#login-button')
        .click()
      cy.contains('Georg logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('Rick')
      cy.get('#password')
        .type('asdxasd')
      cy.get('#login-button')
        .click()

      cy.get('#error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Georg logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Rick', password: 'Morty' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog')
        .click()
      cy.get('#title')
        .type('Testing testers')
      cy.get('#author')
        .type('Donald Trump')
      cy.get('#url')
        .type('www.usa.com')
      cy.contains('add')
        .click()

      cy.contains('Testing testers Donald Trump')
    })

    it('User can like a blog', function() {
      cy.contains('create new blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Donald Trump')
      cy.get('#url')
        .type('www.usa.com')
      cy.contains('add')
        .click()

      cy.contains('First class tests Donald Trump')
        .click()
      cy.contains('view')
        .click()
      cy.contains('0')
      cy.get('#like-button')
        .click()
      cy.contains('1')
    })

    it('User who created a blog can delete it', function() {
      cy.contains('create new blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Donald Trump')
      cy.get('#url')
        .type('www.usa.com')
      cy.contains('add')
        .click()

      cy.contains('First class tests Donald Trump')
        .click()
      cy.contains('view')
        .click()
      cy.get('#delete')
        .click()

      cy.get('html').should('not.contain', 'First class tests Donald Trump')
    })
  })
})