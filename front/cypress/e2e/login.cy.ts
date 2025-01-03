describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })

  it('Login failed', () => {
    cy.visit('/login')

    // Mock d'une erreur API
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    })

    // Simuler la saisie
    cy.get('input[formControlName=email]').type("wrong@studio.com")
    cy.get('input[formControlName=password]').type("wrongpassword{enter}")

    // Vérifier que l'URL ne change pas
    cy.url().should('include', '/login')

    // Vérifier l'affichage d'un message d'erreur
    cy.contains('Invalid credentials').should('be.visible')
  })



});