// describe('Session Detail (with real UI login)', () => {
//     before(() => {
//         // 1) Intercepter la requête de login
//         cy.intercept('POST', '/api/auth/login').as('loginApi');

//         // 2) Aller sur la page de login
//         cy.visit('/login');

//         // 3) Saisir email et password
//         cy.get('input[formControlName="email"]').type('yoga@studio.com');
//         cy.get('input[formControlName="password"]').type('test!1234');

//         // 4) Soumettre
//         cy.get('button[type="submit"]').click();

//         // 5) Attendre la requête
//         cy.wait('@loginApi').its('response.statusCode').should('eq', 200);

//         // 6) Vérifier qu’on est redirigé sur /sessions (ou autre)
//         cy.url().should('include', '/sessions');
//     });

//     beforeEach(() => {
//         // Intercepter l'appel POST pour créer une session
//         cy.intercept('POST', '/api/session', (req) => {
//             expect(req.body).to.include({
//                 name: 'Morning Yoga',
//                 date: '2023-12-01',
//                 description: 'A relaxing yoga session.',
//             });
//             req.reply({
//                 statusCode: 201,
//                 body: { id: 1, ...req.body },
//             });
//         }).as('createSession');
//     });

//     it('Should allow an admin to create a new session', () => {
//         // Aller à la page de création
//         cy.contains('Create').click();

//         // Vérifier qu'on est sur la page de création
//         cy.url().should('include', '/sessions/create');

//         // Remplir le formulaire
//         cy.get('input[formControlName="name"]').type('Morning Yoga');
//         cy.get('input[formControlName="date"]').type('2023-12-01');
//         cy.get('mat-select[formControlName="teacher_id"]').click();
//         cy.contains('Margot DELAHAYE').click();
//         cy.get('textarea[formControlName="description"]').type('A relaxing yoga session.');

//         // Soumettre le formulaire
//         cy.contains('Save').click();

//         // Vérifier que l'API POST a été appelée
//         cy.wait('@createSession');

//         // Vérifier la redirection vers la liste des sessions
//         cy.url().should('include', '/sessions');

//         // Vérifier qu'un message de confirmation est affiché
//         cy.contains('Session created !').should('be.visible');
//     });
// });

describe('Session Detail (with mocked data)', () => {
    before(() => {
        // Utiliser la commande personnalisée pour se connecter (inclut la simulation de connexion)
        cy.login();

        // Mock des enseignants (utilisé dans le formulaire)
        cy.intercept('GET', '/api/teacher', {
            statusCode: 200,
            body: [
                { id: 1, firstName: 'Margot', lastName: 'DELAHAYE' },
                { id: 2, firstName: 'John', lastName: 'DOE' },
            ],
        }).as('getTeachers');

        // Visiter la page de création de session
        // cy.visit('/sessions/create');
        cy.contains('Create').click();

    });

    beforeEach(() => {
        // Intercepter l'appel POST pour créer une session
        cy.intercept('POST', '/api/session', (req) => {
            expect(req.body).to.include({
                name: 'Morning Yoga',
                date: '2023-12-01',
                description: 'A relaxing yoga session.',
                teacher_id: 1,
            });

            req.reply({
                statusCode: 201,
                body: { id: 1, ...req.body },
            });
        }).as('createSession');
    });

    it('Should allow an admin to create a new session', () => {
        // Vérifier que les enseignants sont chargés correctement
        cy.wait('@getTeachers');

        // Vérifier qu'on est sur la page de création
        cy.url().should('include', '/sessions/create');

        // Remplir le formulaire
        cy.get('input[formControlName="name"]').type('Morning Yoga');
        cy.get('input[formControlName="date"]').type('2023-12-01');
        cy.get('mat-select[formControlName="teacher_id"]').click();
        cy.contains('Margot DELAHAYE').click();
        cy.get('textarea[formControlName="description"]').type('A relaxing yoga session.');

        // Soumettre le formulaire
        cy.contains('Save').click();

        // Vérifier que l'API POST a été appelée
        cy.wait('@createSession');

        // Vérifier la redirection vers la liste des sessions
        cy.url().should('include', '/sessions');

        // Vérifier qu'un message de confirmation est affiché
        cy.contains('Session created !').should('be.visible');
    });
});
