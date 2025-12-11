describe('Page Login', () => {
    beforeEach(() => {
      // Nettoyer le localStorage avant chaque test
      cy.clearLocalStorage();
    });

    describe('Utilisateur non connecté', () => {
        beforeEach(() => {
          cy.visit('/login');
        });

        it('devrait afficher le titre et les boutons', () => {
            cy.get('h2.login-title').should('contain', 'Connectez-vous à votre compte').should('be.visible');
            cy.get('button.login-button').should('contain', 'Se connecter').should('be.visible');
            cy.get('button.register-button').should('contain', "S'inscrire").should('be.visible');
        });

        it('devrait pouvoir envoyer le formulaire', () => {
            cy.get('input[name="email"]').type('test@test.com');
            cy.get('input[name="password"]').type('test');
            cy.contains('button.login-button', 'Se connecter').click();
        });

        it("devrait rediriger vers l'inscription", () => {
            cy.contains('button.register-button', "S'inscrire").click();
            cy.url().should('include', '/register');
        });
    });

  });