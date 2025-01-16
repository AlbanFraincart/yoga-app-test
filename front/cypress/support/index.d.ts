/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Simule un utilisateur connecté en modifiant le sessionStorage.
         * @param user - Objet représentant les informations utilisateur (par défaut : { admin: false }).
         */
        loginNoAdmin(email?: string, password?: string): Chainable<void>;
        login(email?: string, password?: string): Chainable<void>;

        // loginAs(user?: { admin: boolean }): Chainable<void>;
        // mockLogin(): Chainable<void>;

        /**
         * Simule une connexion via l'API backend.
         */
        // loginViaApi(): Chainable<void>;
    }
}
