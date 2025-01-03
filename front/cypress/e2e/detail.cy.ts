describe('Session Detail (with real UI login)', () => {
    const mockedSession = {
        id: 1,
        name: 'Morning Yoga',
        description: 'A relaxing yoga session.',
        date: '2023-12-01T00:00:00',
        createdAt: '2023-11-01T00:00:00',
        updatedAt: '2023-11-15T00:00:00',
        users: [1],
        teacher_id: 101,
    };

    const mockedTeacher = {
        id: 101,
        firstName: 'John',
        lastName: 'Doe',
    };

    before(() => {
        cy.intercept('POST', '/api/auth/login').as('loginApi');
        cy.visit('/login');
        cy.get('input[formControlName="email"]').type('yoga@studio.com');
        cy.get('input[formControlName="password"]').type('test!1234');
        cy.get('button[type="submit"]').click();
        cy.wait('@loginApi').its('response.statusCode').should('eq', 200);
        cy.url().should('include', '/sessions');
    });

    beforeEach(() => {
        cy.intercept('GET', '/api/session/1', { body: mockedSession }).as('getSessionDetails');
        cy.intercept('GET', '/api/teacher/101', { body: mockedTeacher }).as('getTeacherDetails');

        // Naviguer vers la page des détails
        cy.visit('/sessions/detail/1');
        cy.wait('@getSessionDetails');
        cy.wait('@getTeacherDetails');
    });

    it('Should display session details correctly', () => {
        cy.contains('Morning Yoga').should('be.visible');
        cy.contains('A relaxing yoga session.').should('be.visible');
        cy.contains('John DOE').should('be.visible');
    });
});
