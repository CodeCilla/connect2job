describe('Page Register', () => {
    beforeEach(() => {
      // Nettoyer le localStorage avant chaque test
    cy.clearLocalStorage();
    });

    describe('Utilisateur non connecté', () => {
        beforeEach(() => {
        cy.visit('/register');
        });

        it('Devrait afficher le titre et les boutons', () => {
            cy.get('h2.register-title').should('contain', 'Créer votre compte').should('be.visible');
            cy.get('button.register-button-register').should('contain', 'Créer un compte').should('be.visible');
            cy.get('button.login-link-button').should('contain', "Déjà un compte ? Se connecter").should('be.visible');
        });

        it('Devrait rediriger vers la page de connexion', () => {
            cy.contains('button.login-link-button', 'Déjà un compte ? Se connecter').click();
            cy.url().should('include', '/login');
        });

        it("devrait pouvoir envoyer le formulaire en tant qu'entreprise", () => {
            cy.get('input[name="name"]').type('testcompany');
            cy.get('input[name="email"]').type('companytest@test.com');
            cy.get('input[name="password"]').type('testpassword123');
            cy.get('select[name="role"]').select('COMPANY');
            cy.contains('button.register-button-register', 'Créer un compte').click();
        });

        it("devrait pouvoir envoyer le formulaire en tant qu'étudiant", () => {
            cy.get('input[name="name"]').type('teststudent');
            cy.get('input[name="email"]').type('student@test.com');
            cy.get('input[name="password"]').type('testpassword123');
            cy.get('select[name="role"]').select('STUDENT');
            cy.contains('button.register-button-register', 'Créer un compte').click();
        });

        it("Devrait ne pas envoyer le formulaire si les champs sont vides", () => {
            // Remplir avec des champs vides
            cy.get('input[name="name"]').clear();
            cy.get('input[name="email"]').clear();
            cy.get('input[name="password"]').clear();
            cy.get('select[name="role"]').select('STUDENT');
            cy.contains('button.register-button-register', 'Créer un compte').click();    
            cy.url().should('include', '/register');
        });

        it("Devrait afficher une erreur si l'email est invalide", () => {
            cy.get('input[name="name"]').type('testuser');
            cy.get('input[name="email"]').type('email-invalide');
            cy.get('input[name="password"]').type('password123');
            cy.get('select[name="role"]').select('STUDENT');
            cy.contains('button.register-button-register', 'Créer un compte').click();
            cy.url().should('include', '/register');
        });
    });

});