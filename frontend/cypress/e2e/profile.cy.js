describe('Page Login', () => {
    beforeEach(() => {
      // Nettoyer le localStorage avant chaque test
      cy.clearLocalStorage();
    });

    describe('Utilisateur non connecté', () => {
        beforeEach(() => {
          cy.visit('/profile');
        });

        it('devrait rediriger vers la page de connexion', () => {
            cy.url().should('include', '/login');
        });
    });

    describe('Utilisateur connecté en tant qu\'étudiant', () => {
        beforeEach(() => {
          cy.loginAsStudent();
          cy.visit('/profile');
        });

        it('devrait afficher les informations du profil étudiant', () => {
            cy.get('.profile-header').should('be.visible');
            cy.get('h2').should('contain', 'teste');
            cy.get('h4').should('contain', 'Étudiant');
        });

        it('devrait permettre a l\'étudiant de ce deconnecter', () => {
            cy.get('button').contains('Déconnexion').click();
            cy.url().should('include', '/login');
        });

        it('devrait afficher les onglets spécifiques aux étudiants', () => {
            cy.get('.tab-list').should('contain', 'Suivi de candidatures');
            cy.get('.tab-list').should('contain', 'Informations personnelles');
        });

        it('devrait afficher le contenu des candidatures', () => {
            cy.get('.tab-list').contains('Suivi de candidatures').click();
            cy.get('.applications-list').should('be.visible');
        });

        it('devrait afficher le contenu des informations personnelles', () => {
            cy.get('.tab-list').contains('Informations personnelles').click();
            cy.get('.info-form').should('be.visible');
        });
    });

    describe('Utilisateur connecté en tant qu\'entreprise', () => {
        beforeEach(() => {
          cy.loginAsCompany();
          cy.visit('/profile');
        });

        it('devrait afficher les informations du profil entreprise', () => {
            cy.get('.profile-header').should('be.visible');
            cy.get('h2').should('contain', 'Entreprise Test');
            cy.get('h4').should('contain', 'Entreprise');
        });

        it('devrait permettre a l\'entreprise de ce deconnecter', () => {
            cy.get('button').contains('Déconnexion').click();
            cy.url().should('include', '/login');
        });

        it('devrait afficher les onglets spécifiques aux entreprises', () => {
            cy.get('.tab-list').should('contain', 'Candidatures reçues');
            cy.get('.tab-list').should('contain', 'Mes offres');
            cy.get('.tab-list').should('contain', 'Informations de l\'entreprise');
        });

        it('devrait afficher le contenu des candidatures reçues', () => {
            cy.get('.tab-list').contains('Candidatures reçues').click();
            cy.get('.applications-list').should('be.visible');
        });

        it('devrait afficher le contenu des offres de l\'entreprise', () => {
            cy.get('.tab-list').contains('Mes offres').click();
            cy.get('.offers-list').should('be.visible');
        });

        it('devrait afficher le contenu des informations de l\'entreprise', () => {
            cy.get('.tab-list').contains('Informations de l\'entreprise').click();
            cy.get('.info-form').should('be.visible');
        });

        it('devrait permettre a l\'entreprise de créer une nouvelle offre', () => {
            cy.get('.tab-list').contains('Mes offres').click();
            cy.get('button').contains('Créer une offre').click();
            cy.url().should('include', '/create');
        });

        it('devrait permettre a l\'entreprise de gérer ces offres', () => {
            cy.get('.tab-list').contains('Mes offres').click();
            cy.get('.card__actions').first().within(() => {
                cy.get('button').contains('Modifier').click();
            });
            cy.get('.offer-form').should('be.visible');
        });

        it ('devrait permettre a l\'entreprise de supprimer une offre', () => {
            cy.get('.tab-list').contains('Mes offres').click();
            cy.get('.card__actions').first().within(() => {
                cy.get('button').contains('Supprimer').click();
            });
            cy.get('.offers-list').should('be.visible');
        });
    });

    describe('Utilisateur connecté en tant qu\'entreprise sans offres', () => {
        beforeEach(() => {
          cy.loginAsCompanyNoOffers();
          cy.visit('/profile');
        });

        it('devrait afficher un message indiquant qu\'il n\'y a pas d\'offres', () => {
            cy.get('.tab-list').contains('Mes offres').click();
            cy.get('.empty-offers').should('be.visible')
              .and('contain', 'Aucune offre créée pour le moment');
        });

        it('devrait permettre a l\'entreprise de créer une nouvelle offre', () => {
            cy.get('.tab-list').contains('Mes offres').click();
            cy.get('button').contains('Créer une offre').click();
            cy.url().should('include', '/create');
        });

        it('devrait afficher les informations de l\'entreprise même sans offres', () => {
            cy.get('.tab-list').contains('Informations de l\'entreprise').click();
            cy.get('.info-form').should('be.visible');
        });

        it('devrait permettre a l\'entreprise de ce deconnecter', () => {
            cy.get('button').contains('Déconnexion').click();
            cy.url().should('include', '/login');
        });

        it('devrait afficher un message indiquant qu\'il n\'y a pas de candidatures reçues', () => {
            cy.get('.tab-list').contains('Candidatures reçues').click();
            cy.get('.empty-state').should('be.visible')
              .and('contain', 'Aucune candidature trouvée');
        });
    });

  });