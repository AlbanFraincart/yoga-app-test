describe('Session list (with real UI login)', () => {
    before(() => {
        // 1) Intercepter la requête de login
        cy.intercept('POST', '/api/auth/login').as('loginApi');

        // 2) Aller sur la page de login
        cy.visit('/login');

        // 3) Saisir email et password
        cy.get('input[formControlName="email"]').type('yoga@studio.com');
        cy.get('input[formControlName="password"]').type('test!1234');

        // 4) Soumettre
        cy.get('button[type="submit"]').click();

        // 5) Attendre la requête
        cy.wait('@loginApi').its('response.statusCode').should('eq', 200);

        // 6) Vérifier qu’on est redirigé sur /sessions
        cy.url().should('include', '/sessions');
    });

    // beforeEach(() => {
    //     // Mock de l'API pour récupérer les sessions
    //     cy.intercept('GET', '/api/session', {
    //         body: [
    //             {
    //                 id: 1,
    //                 name: 'Morning Yoga',
    //                 date: '2023-12-01',
    //                 description: 'A relaxing yoga session',
    //             },
    //             {
    //                 id: 2,
    //                 name: 'Evening Meditation',
    //                 date: '2023-12-02',
    //                 description: 'A calming meditation session',
    //             },
    //         ],
    //     }).as('getSessions');

    //     // Aller sur la page des sessions
    //     // cy.visit('/sessions');
    //     cy.wait('@getSessions'); // Attendre la fin du chargement
    // });

    it('Should display the list of sessions', () => {
        // Vérifier le titre de la liste
        cy.contains('session 1').should('be.visible');

        // Vérifier que les sessions sont affichées
        cy.contains('Morning Yoga').should('be.visible');
        cy.contains('yoga 4').should('be.visible');
    });

    it('Should display the "Create" button for admin users', () => {
        // Vérifier que le bouton "Create" est visible
        cy.contains('Create').should('be.visible');
    });

    it('Should display action buttons for each session', () => {
        // Vérifier les boutons "Detail" et "Edit" pour la première session
        cy.contains('Morning Yoga')
            .closest('mat-card') // Sélectionne le conteneur mat-card le plus proche
            .within(() => {
                cy.contains('Detail').should('be.visible');
                cy.contains('Edit').should('be.visible');
            });

        // Vérifier les boutons "Detail" et "Edit" pour la deuxième session
        cy.contains('yoga 4') // Assurez-vous que ce nom correspond à vos données réelles
            .closest('mat-card')
            .within(() => {
                cy.contains('Detail').should('be.visible');
                cy.contains('Edit').should('be.visible');
            });
    });


    it('Should navigate to session detail page when clicking "Detail"', () => {
        // Cliquer sur le bouton "Detail" pour la première session
        cy.contains('Morning Yoga')
            .closest('mat-card')
            .within(() => {
                cy.contains('Detail').click();
            });

        // Vérifier la redirection vers la page de détails
        cy.url().should('include', '/sessions/detail/2');
    });


});
