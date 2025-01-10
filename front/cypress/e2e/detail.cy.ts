// describe('Session Detail (with real UI login)', () => {
//     const mockedSession = {
//         id: 1,
//         name: 'Morning Yoga',
//         description: 'A relaxing yoga session.',
//         date: '2023-12-01T00:00:00',
//         createdAt: '2023-11-01T00:00:00',
//         updatedAt: '2023-11-15T00:00:00',
//         users: [1],
//         teacher_id: 101,
//     };

//     const mockedTeacher = {
//         id: 101,
//         firstName: 'John',
//         lastName: 'Doe',
//     };

//     before(() => {
//         cy.intercept('POST', '/api/auth/login').as('loginApi');
//         cy.visit('/login');
//         cy.get('input[formControlName="email"]').type('yoga@studio.com');
//         cy.get('input[formControlName="password"]').type('test!1234');
//         cy.get('button[type="submit"]').click();
//         cy.wait('@loginApi').its('response.statusCode').should('eq', 200);
//         cy.url().should('include', '/sessions');
//     });

//     beforeEach(() => {
//         cy.intercept('GET', '/api/session/1', { body: mockedSession }).as('getSessionDetails');
//         cy.intercept('GET', '/api/teacher/101', { body: mockedTeacher }).as('getTeacherDetails');

//         // Naviguer vers la page des détails
//         cy.visit('/sessions/detail/1');
//         cy.wait('@getSessionDetails');
//         cy.wait('@getTeacherDetails');
//     });

//     it('Should display session details correctly', () => {
//         cy.contains('Morning Yoga').should('be.visible');
//         cy.contains('A relaxing yoga session.').should('be.visible');
//         cy.contains('John DOE').should('be.visible');
//     });
// });
describe('Session Detail (simplified flow)', () => {
    before(() => {
        // Simuler la connexion et le mock des sessions via `cy.login()`
        cy.login();

        // Mock des détails d'une session spécifique
        cy.intercept('GET', '/api/session/1', {
            statusCode: 200,
            body: {
                id: 1,
                name: 'Morning Yoga',
                description: 'A relaxing yoga session.',
                date: '2023-12-01',
                teacher_id: 1,
                users: [1, 2],
                createdAt: '2023-01-01',
                updatedAt: '2023-11-01',
            },
        }).as('getSessionDetail');

        // Mock des détails du professeur associé à la session
        cy.intercept('GET', '/api/teacher/1', {
            statusCode: 200,
            body: {
                id: 1,
                firstName: 'Margot',
                lastName: 'DELAHAYE',
                createdAt: '2023-01-01',
                updatedAt: '2023-11-01',
            },
        }).as('getTeacherDetail');



    });

    it('Should display the list of sessions and navigate to session detail', () => {
        // Vérifier que les sessions sont affichées
        cy.contains('Morning Yoga').should('be.visible');
        cy.contains('Evening Meditation').should('be.visible');

        // Cliquer sur "Detail" pour la session "Morning Yoga"
        cy.contains('Morning Yoga')
            .closest('mat-card')
            .within(() => {
                cy.contains('Detail').click();
            });

        // Attendre que les détails de la session soient chargés
        cy.wait('@getSessionDetail');
        cy.wait('@getTeacherDetail');

        // Vérifier que les détails de la session sont affichés
        cy.contains('Morning Yoga').should('be.visible');
        cy.contains('A relaxing yoga session.').should('be.visible');
        cy.contains('Margot DELAHAYE').should('be.visible');
        cy.contains('December 1, 2023').should('be.visible');
        cy.contains('2 attendees').should('be.visible');
    });
    // -- Nouveau test pour la fonctionnalité "Delete" --
    it('Should delete the session and redirect to /sessions', () => {
        // Intercepter la requête DELETE
        cy.intercept('DELETE', '/api/session/1', {
            statusCode: 200,
            body: {}, // ou n’importe quel objet vide pour signifier un succès
        }).as('deleteSession');

        // Comme on est déjà sur la page de détail (test précédent),
        // on vérifie la présence du bouton "Delete". Si besoin, vous pouvez
        // vous assurer d'être sur la page de détail en refaisant un cy.visit('/sessions/1') etc.
        cy.contains('Delete').should('be.visible').click();

        // Attendre que la requête DELETE simulée soit déclenchée
        cy.wait('@deleteSession');

        // Vérifier qu’un message de succès apparaît (SnackBar, toast, etc.)
        cy.contains('Session deleted !').should('be.visible');

        // Vérifier qu'on est bien redirigé vers la page /sessions
        cy.url().should('include', '/sessions');
    });


});
