/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Simule un utilisateur connecté en modifiant le sessionStorage.
         * @param user - Objet représentant les informations utilisateur (par défaut : { admin: false }).
         */
        loginAs(user?: { admin: boolean }): Chainable<void>;

        /**
         * Simule une connexion via l'API backend.
         */
        loginViaApi(): Chainable<void>;
    }
}
