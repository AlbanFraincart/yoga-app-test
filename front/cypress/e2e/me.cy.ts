describe('Me Component (User Information)', () => {
    before(() => {
        // Simuler la connexion et le mock des sessions via `cy.login()`
        cy.loginNoAdmin();

        // Mock pour récupérer les détails de l'utilisateur
        cy.intercept('GET', '/api/user/1', {
            statusCode: 200,
            body: {
                id: 1,
                firstName: 'John',
                lastName: 'DOE',
                email: 'john.doe@example.com',
                admin: false,
                createdAt: '2023-01-01',
                updatedAt: '2023-11-01',
            },
        }).as('getUser');
    });

    it('Should display user information', () => {
        // Naviguer vers la page "Me"
        cy.contains('Account').click();

        // Attendre que les détails de l'utilisateur soient chargés
        cy.wait('@getUser');

        // Vérifier que les informations de l'utilisateur sont affichées
        cy.contains('User information').should('be.visible');
        cy.contains('Name: John DOE').should('be.visible');
        cy.contains('Email: john.doe@example.com').should('be.visible');
        cy.contains('Create at: January 1, 2023').should('be.visible');
        cy.contains('Last update: November 1, 2023').should('be.visible');

        // Vérifier que le bouton de suppression est visible pour un utilisateur non admin
        cy.contains('Delete my account:').should('be.visible');
        cy.contains('Delete').should('be.visible');
    });

    it('Should delete the user account and redirect to home', () => {


        // Mock pour la suppression de compte
        cy.intercept('DELETE', '/api/user/1', {
            statusCode: 200,
        }).as('deleteUser');

        // Naviguer vers la page "Me"
        cy.contains('Account').click();
        cy.contains('Detail').click();

        // Attendre que la requête DELETE soit interceptée
        cy.wait('@deleteUser');

        // Vérifier qu'un message de confirmation est affiché
        cy.contains('Your account has been deleted !').should('be.visible');

        // Vérifier que l'utilisateur est redirigé vers la page d'accueil
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });

    it('should test to login as an admin', () => {
        cy.login()
        // Mock pour récupérer les détails de l'utilisateur
        cy.intercept('GET', '/api/user/1', {
            statusCode: 200,
            body: {
                id: 1,
                firstName: 'John',
                lastName: 'DOE',
                email: 'john.doe@example.com',
                admin: false,
                createdAt: '2023-01-01',
                updatedAt: '2023-11-01',
            },
        }).as('getUser');
        // Naviguer vers la page "Me"
        cy.contains('Account').click();

        // Attendre que les détails de l'utilisateur soient chargés
        cy.wait('@getUser');

        // Vérifier que les informations de l'utilisateur sont affichées
        cy.contains('User information').should('be.visible');
        cy.contains('Name: John DOE').should('be.visible');
        cy.contains('Email: john.doe@example.com').should('be.visible');
        cy.contains('Create at: January 1, 2023').should('be.visible');
        cy.contains('Last update: November 1, 2023').should('be.visible');

    });


    it('Should navigate back to the previous page when clicking "Back"', () => {

        cy.get('button[mat-icon-button]').click();


    });



});
