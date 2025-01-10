// describe('Session list with mocked login', () => {
//     beforeEach(() => {
//         // Mock la connexion utilisateur
//         cy.mockLogin();

//         // Mock l'API pour récupérer les sessions
//         cy.intercept('GET', '/api/session', {
//             statusCode: 200,
//             body: [
//                 {
//                     id: 1,
//                     name: 'Morning Yoga',
//                     description: 'A relaxing yoga session',
//                     date: '2023-12-01',
//                     teacher_id: 1,
//                     users: [1],
//                 },
//                 {
//                     id: 2,
//                     name: 'Evening Meditation',
//                     description: 'A calming meditation session',
//                     date: '2023-12-02',
//                     teacher_id: 1,
//                     users: [1, 2],
//                 },
//             ],
//         }).as('getSessions');

//         // Aller à la page des sessions
//         cy.visit('/sessions');
//     });

//     it('Should display the list of sessions', () => {
//         // Attendre que les sessions soient chargées
//         cy.wait('@getSessions');

//         // Vérifier que les sessions sont affichées
//         cy.contains('Morning Yoga').should('be.visible');
//         cy.contains('Evening Meditation').should('be.visible');
//     });
// });

// describe('Session list with mocked login', () => {
//     beforeEach(() => {
//         // Mock la connexion via cookies
//         cy.setCookie('JSESSIONID', 'F72191C232419B035C9E2AF04A533242');
//         cy.setCookie('isLogged', 'true');

//         // Vérifier les cookies
//         cy.getCookies().then((cookies) => {
//             cy.log('Cookies after mockLogin:', cookies);
//         });

//         // Mock l'API pour récupérer les sessions
//         cy.intercept('GET', '/api/session', {
//             statusCode: 200,
//             body: [
//                 {
//                     id: 1,
//                     name: 'Morning Yoga',
//                     description: 'A relaxing yoga session',
//                     date: '2023-12-01',
//                     teacher_id: 1,
//                     users: [1],
//                 },
//                 {
//                     id: 2,
//                     name: 'Evening Meditation',
//                     description: 'A calming meditation session',
//                     date: '2023-12-02',
//                     teacher_id: 1,
//                     users: [1, 2],
//                 },
//             ],
//         }).as('getSessions');

//         // Aller à la page des sessions
//         cy.visit('/sessions');
//     });

//     it('Should display the list of sessions', () => {
//         // Attendre la requête
//         cy.wait('@getSessions');

//         // Vérifier que les sessions sont affichées
//         cy.contains('Morning Yoga').should('be.visible');
//         cy.contains('Evening Meditation').should('be.visible');
//     });
// });

// describe('Session list (with real UI login)', () => {
//     before(() => {
//         // // 1) Intercepter la requête de login
//         // cy.intercept('POST', '/api/auth/login').as('loginApi');

//         // // 2) Aller sur la page de login
//         // cy.visit('/login');

//         // // 3) Saisir email et password
//         // cy.get('input[formControlName="email"]').type('yoga@studio.com');
//         // cy.get('input[formControlName="password"]').type('test!1234');

//         // // 4) Soumettre
//         // cy.get('button[type="submit"]').click();

//         // // 5) Attendre la requête
//         // cy.wait('@loginApi').its('response.statusCode').should('eq', 200);

//         // // 6) Vérifier qu’on est redirigé sur /sessions
//         // cy.url().should('include', '/sessions');
//     });

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
// beforeEach(() => {
// 7) Mock de l'API pour récupérer les sessions


// 8) Visiter la page des sessions après le mock
// cy.reload(); // Recharge la page pour relancer les requêtes réseau
// });
// it('Should display the list of sessions', () => {
//     // Vérifier le titre de la liste
//     cy.contains('session 1').should('be.visible');

//     // Vérifier que les sessions sont affichées
//     cy.contains('Morning Yoga').should('be.visible');
//     cy.contains('yoga 4').should('be.visible');
// });

// it('Should display the "Create" button for admin users', () => {
//     // Vérifier que le bouton "Create" est visible
//     cy.contains('Create').should('be.visible');
// });

// it('Should display action buttons for each session', () => {
//     // Vérifier les boutons "Detail" et "Edit" pour la première session
//     cy.contains('Morning Yoga')
//         .closest('mat-card') // Sélectionne le conteneur mat-card le plus proche
//         .within(() => {
//             cy.contains('Detail').should('be.visible');
//             cy.contains('Edit').should('be.visible');
//         });

//     // Vérifier les boutons "Detail" et "Edit" pour la deuxième session
//     cy.contains('yoga 4') // Assurez-vous que ce nom correspond à vos données réelles
//         .closest('mat-card')
//         .within(() => {
//             cy.contains('Detail').should('be.visible');
//             cy.contains('Edit').should('be.visible');
//         });
// });


// it('Should navigate to session detail page when clicking "Detail"', () => {
//     // Cliquer sur le bouton "Detail" pour la première session
//     cy.contains('Morning Yoga')
//         .closest('mat-card')
//         .within(() => {
//             cy.contains('Detail').click();
//         });

//     // Vérifier la redirection vers la page de détails
//     cy.url().should('include', '/sessions/detail/2');
// });



// describe('Session list (with real UI login)', () => {
//     before(() => {
//         cy.visit('/login')

//         cy.intercept('POST', '/api/auth/login', {
//             body: {
//                 id: 1,
//                 username: 'userName',
//                 firstName: 'firstName',
//                 lastName: 'lastName',
//                 admin: true
//             },
//         })

//         // Intercepter la requête de sessions avant de visiter /sessions
//         cy.intercept('GET', '/api/session', {
//             statusCode: 200,
//             body: [
//                 {
//                     id: 1,
//                     name: 'Morning Yoga',
//                     date: '2023-12-01',
//                     description: 'A relaxing yoga session',
//                 },
//                 {
//                     id: 2,
//                     name: 'Evening Meditation',
//                     date: '2023-12-02',
//                     description: 'A calming meditation session',
//                 },
//             ],
//         }).as('getSessions');

//         cy.get('input[formControlName=email]').type("yoga@studio.com")
//         cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

//         cy.url().should('include', '/sessions')
//     });

//     it('Should display the list of sessions', () => {

//         cy.contains('Morning Yoga').should('be.visible');
//         cy.contains('Evening Meditation').should('be.visible');
//     });
// });




// describe('Session list (with real UI login)', () => {
//     before(() => {
//         cy.login();


//     });

//     it('Should display the list of sessions', () => {
//         // Vérifier que les sessions sont affichées
//         cy.contains('Morning Yoga').should('be.visible');
//         cy.contains('Evening Meditation').should('be.visible');
//     });
// });




describe('Session list (with mocked data)', () => {
    before(() => {
        // Utiliser la commande personnalisée pour se connecter
        cy.login(); // La commande gère la connexion et le mock des sessions
    });

    it('Should display the list of sessions', () => {
        // Vérifier que les sessions sont affichées
        cy.contains('Morning Yoga').should('be.visible');
        cy.contains('Evening Meditation').should('be.visible');
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
        cy.contains('Evening Meditation')
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
        cy.url().should('include', '/sessions/detail/1');
    });
});
