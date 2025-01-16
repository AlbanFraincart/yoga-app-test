describe('Register spec', () => {
    it('Register successfull', () => {
        cy.visit('/register')

        // Mock de l'API pour enregistrer un utilisateur
        cy.intercept('POST', '/api/auth/register', {
            statusCode: 200,
        })

        // Simuler la saisie dans le formulaire
        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=firstName]').type("Yoga")
        cy.get('input[formControlName=lastName]').type("Studio")
        cy.get('input[formControlName=password]').type("test!1234")

        // Soumettre le formulaire
        cy.get('button[type=submit]').click()

        // Vérifier la redirection
        cy.url().should('include', '/login')
    })

    it('Should disable submit button if form is invalid', () => {
        cy.visit('/register')

        // Vérifier que le bouton est désactivé initialement
        cy.get('button[type=submit]').should('be.disabled')

        // Remplir un champ
        cy.get('input[formControlName=email]').type("invalid-email")

        // Vérifier que le bouton est toujours désactivé
        cy.get('button[type=submit]').should('be.disabled')
    })

    // it('Should display validation errors', () => {
    //     cy.visit('/register')

    //     // // Tester un champ vide
    //     // cy.get('input[formControlName=firstName]').focus().blur()
    //     // cy.contains('First name is required').should('be.visible')

    //     // Tester un champ avec des valeurs invalides
    //     cy.get('input[formControlName=firstName]').type('Yo')
    //     cy.contains('First name must be at least 3 characters').should('be.visible')

    //     cy.get('input[formControlName=firstName]').clear().type('A very long name that exceeds 20 characters')
    //     cy.contains('First name must be at most 20 characters').should('be.visible')
    // })

})
