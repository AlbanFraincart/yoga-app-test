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
Cypress.Commands.add('loginAs', (user = { admin: false }) => {
    // Simule un utilisateur connecté en modifiant le sessionStorage
    cy.window().then((win) => {
        win.sessionStorage.setItem(
            'sessionInformation',
            JSON.stringify({
                token: 'fake-token',
                type: 'Bearer',
                id: 1,
                username: 'testUser',
                firstName: 'Test',
                lastName: 'User',
                admin: user.admin,
            })
        );
    });

    // Simule la configuration d'un cookie de session
    cy.setCookie('JSESSIONID', 'fake-session-id');
});

// cypress/support/commands.ts
Cypress.Commands.add('loginViaApi', () => {
    cy.request('POST', '/api/auth/login', {
        email: 'yoga@studio.com',
        password: 'test!1234',
    }).then((response) => {
        // Simuler le stockage de session côté frontend
        cy.window().then((win) => {
            win.sessionStorage.setItem('sessionInformation', JSON.stringify(response.body));
        });
    });
});


