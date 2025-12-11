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

        it('devrait afficher les champs email et password', () => {
            cy.get('input[name="email"]').should('be.visible');
            cy.get('input[name="password"]').should('be.visible');
            cy.get('label[for="email"]').should('contain', 'Adresse e-mail');
            cy.get('label[for="password"]').should('contain', 'Mot de passe');
        });

        it('devrait empêcher la soumission si les champs sont vides (attribut required)', () => {
            cy.get('input[name="email"]').should('have.attr', 'required');
            cy.get('input[name="password"]').should('have.attr', 'required');
            cy.get('button.login-button').click();
            cy.url().should('include', '/login');
        });

        it('devrait empêcher la soumission si seulement l\'email est rempli', () => {
            cy.get('input[name="email"]').type('test@test.com');
            cy.get('input[name="password"]').should('have.attr', 'required');
            cy.get('button.login-button').click();
            cy.url().should('include', '/login');
        });

        it('devrait empêcher la soumission si seulement le mot de passe est rempli', () => {
            cy.get('input[name="password"]').type('password123');
            cy.get('input[name="email"]').should('have.attr', 'required');
            cy.get('button.login-button').click();
            cy.url().should('include', '/login');
        });

        it('devrait pouvoir remplir le formulaire', () => {
            cy.get('input[name="email"]').type('test@test.com');
            cy.get('input[name="password"]').type('test');
            cy.get('input[name="email"]').should('have.value', 'test@test.com');
            cy.get('input[name="password"]').should('have.value', 'test');
        });

        it('devrait pouvoir envoyer le formulaire', () => {
            cy.get('input[name="email"]').type('test@test.com');
            cy.get('input[name="password"]').type('test');
            cy.contains('button.login-button', 'Se connecter').click();
        });

        it('devrait afficher le texte "Connexion..." pendant le chargement', () => {
            cy.get('input[name="email"]').type('test@test.com');
            cy.get('input[name="password"]').type('test');
            cy.get('button.login-button').click();
            cy.get('button.login-button').should('be.disabled');
        });

        it("devrait rediriger vers l'inscription", () => {
            cy.contains('button.register-button', "S'inscrire").click();
            cy.url().should('include', '/register');
        });

        it('devrait désactiver les champs pendant le chargement', () => {
            cy.get('input[name="email"]').type('test@test.com');
            cy.get('input[name="password"]').type('test');
            cy.get('button.login-button').click();
            cy.get('input[name="email"]').should('be.disabled');
            cy.get('input[name="password"]').should('be.disabled');
        });
    });

    describe('Utilisateur déjà connecté', () => {
        beforeEach(() => {
            cy.loginAsStudent();
            cy.visit('/login');
        });

        it('devrait rediriger vers la page d\'accueil', () => {
            cy.url().should('not.include', '/login');
            cy.url().should('eq', Cypress.config().baseUrl + '/');
        });
    });

  });