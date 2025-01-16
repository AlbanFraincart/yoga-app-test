describe('NotFound Component', () => {
    it('Should display the 404 page when navigating to an unknown route', () => {
        // Naviguer vers une route inexistante
        cy.visit('/non-existent-route', { failOnStatusCode: false });

        // Vérifier que le message "Page not found !" est affiché
        cy.contains('Page not found !').should('be.visible');
    });
});
