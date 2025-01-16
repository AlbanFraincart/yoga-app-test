// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// Cypress.Commands.add('loginAs', (user = { admin: false }) => {
//     // Simule un utilisateur connecté en modifiant le sessionStorage
//     cy.window().then((win) => {
//         win.sessionStorage.setItem(
//             'sessionInformation',
//             JSON.stringify({
//                 token: 'fake-token',
//                 type: 'Bearer',
//                 id: 1,
//                 username: 'testUser',
//                 firstName: 'Test',
//                 lastName: 'User',
//                 admin: user.admin,
//             })
//         );
//     });

//     // Simule la configuration d'un cookie de session
//     cy.setCookie('JSESSIONID', 'fake-session-id');
// });

// // cypress/support/commands.ts
// Cypress.Commands.add('loginViaApi', () => {
//     cy.request('POST', '/api/auth/login', {
//         email: 'yoga@studio.com',
//         password: 'test!1234',
//     }).then((response) => {
//         // Simuler le stockage de session côté frontend
//         cy.window().then((win) => {
//             win.sessionStorage.setItem('sessionInformation', JSON.stringify(response.body));
//         });
//     });
// });



// // cypress/support/commands.ts
// Cypress.Commands.add('mockLogin', () => {
//     cy.window().then((win) => {
//         // Mock les données utilisateur dans SessionService
//         const userMock = {
//             token: 'mocked-jwt-token',
//             type: 'Bearer',
//             id: 1,
//             username: 'mockUser',
//             firstName: 'Mock',
//             lastName: 'User',
//             admin: true,
//         };

//         win.sessionStorage.setItem('sessionInformation', JSON.stringify(userMock));
//         win.sessionStorage.setItem('isLogged', 'true');
//     });
// });
// Cypress.Commands.add('mockLogin', () => {
//     cy.setCookie('JSESSIONID', 'F72191C232419B035C9E2AF04A533242');
//     cy.setCookie('isLogged', 'true');

//     cy.getCookies().then((cookies) => {
//         cy.log('Mocked Cookies:', cookies);
//     });
// });

Cypress.Commands.add('login', (email = 'yoga@studio.com', password = 'test!1234') => {
    cy.visit('/login');

    // Intercepter la requête de connexion
    cy.intercept('POST', '/api/auth/login', {
        body: {
            id: 1,
            username: 'userName',
            firstName: 'firstName',
            lastName: 'lastName',
            admin: true,
        },
    }).as('loginRequest');

    // Intercepter la requête de sessions
    cy.intercept('GET', '/api/session', {
        statusCode: 200,
        body: [
            {
                id: 1,
                name: 'Morning Yoga',
                date: '2023-12-01',
                description: 'A relaxing yoga session',
            },
            {
                id: 2,
                name: 'Evening Meditation',
                date: '2023-12-02',
                description: 'A calming meditation session',
            },
        ],
    }).as('getSessions');

    // Remplir les champs du formulaire de connexion
    cy.get('input[formControlName=email]').type(email);
    cy.get('input[formControlName=password]').type(`${password}{enter}{enter}`);

    // Vérifier que la redirection est correcte
    cy.url().should('include', '/sessions');
});


Cypress.Commands.add('loginNoAdmin', (email = 'yoga@studio.com', password = 'test!1234') => {
    cy.visit('/login');

    // Intercepter la requête de connexion
    cy.intercept('POST', '/api/auth/login', {
        body: {
            id: 1,
            username: 'userName',
            firstName: 'firstName',
            lastName: 'lastName',
            admin: false,
        },
    }).as('loginRequest');

    // Intercepter la requête de sessions
    cy.intercept('GET', '/api/session', {
        statusCode: 200,
        body: [
            {
                id: 1,
                name: 'Morning Yoga',
                date: '2023-12-01',
                description: 'A relaxing yoga session',
            },
            {
                id: 2,
                name: 'Evening Meditation',
                date: '2023-12-02',
                description: 'A calming meditation session',
            },
        ],
    }).as('getSessions');

    // Remplir les champs du formulaire de connexion
    cy.get('input[formControlName=email]').type(email);
    cy.get('input[formControlName=password]').type(`${password}{enter}{enter}`);

    // Vérifier que la redirection est correcte
    cy.url().should('include', '/sessions');
});

