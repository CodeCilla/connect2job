describe('Page Offre', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
    });

    describe('Utilisateur non connecté', () => {
        it('devrait rediriger vers la page de login', () => {
            cy.visit('/offers/1');
            cy.url().should('include', '/login');
        });
    });

    describe('Utilisateur connecté (étudiant)', () => {
        beforeEach(() => {
            cy.loginAsStudent();
        });

        describe('Chargement de l\'offre', () => {
            it('devrait afficher le spinner de chargement', () => {
                cy.visit('/offers/1');
                cy.contains('Chargement de l\'offre...').should('be.visible');
            });
        });

        describe('Affichage de l\'offre', () => {
            beforeEach(() => {
                // Intercepter la requête API pour simuler une réponse
                cy.intercept('GET', '**/offers/**', {
                    statusCode: 200,
                    body: {
                        id: '1',
                        title: 'Développeur Full Stack',
                        description: 'Description du poste de développeur',
                        contractType: 'CDI',
                        location: 'Paris',
                        keywords: ['React', 'Node.js', 'TypeScript'],
                        company: {
                            name: 'Tech Corp',
                            description: 'Une entreprise innovante'
                        }
                    }
                }).as('getOffer');
                
                cy.visit('/offers/1');
                cy.wait('@getOffer');
            });

            it('devrait afficher le bouton Retour', () => {
                cy.contains('button', 'Retour').should('be.visible');
            });

            it('devrait afficher le titre de l\'offre', () => {
                cy.contains('h2', 'Développeur Full Stack').should('be.visible');
            });

            it('devrait afficher le type de contrat', () => {
                cy.contains('CDI').should('be.visible');
            });

            it('devrait afficher le nom de l\'entreprise', () => {
                cy.contains('h3', 'Tech Corp').should('be.visible');
            });

            it('devrait afficher la localisation', () => {
                cy.contains('Paris').should('be.visible');
            });

            it('devrait afficher la description de l\'entreprise', () => {
                cy.contains('Une entreprise innovante').should('be.visible');
            });

            it('devrait afficher la description du poste', () => {
                cy.contains('h2', 'Description du poste').should('be.visible');
                cy.contains('Description du poste de développeur').should('be.visible');
            });

            it('devrait afficher les compétences recherchées', () => {
                cy.contains('h3', 'Compétences recherchées').should('be.visible');
                cy.contains('React').should('be.visible');
                cy.contains('Node.js').should('be.visible');
                cy.contains('TypeScript').should('be.visible');
            });

            it('devrait afficher le bouton Postuler', () => {
                cy.contains('button', 'Postuler').should('be.visible');
            });

            it('devrait naviguer en arrière quand on clique sur Retour', () => {
                cy.contains('button', 'Retour').click();
                cy.go('back');
            });
        });

        describe('Modal de candidature', () => {
            beforeEach(() => {
                cy.intercept('GET', '**/offers/**', {
                    statusCode: 200,
                    body: {
                        id: '1',
                        title: 'Développeur Full Stack',
                        description: 'Description du poste',
                        contractType: 'CDI',
                        location: 'Paris',
                        keywords: ['React'],
                        company: {
                            name: 'Tech Corp',
                            description: 'Description entreprise'
                        }
                    }
                }).as('getOffer');
                
                cy.visit('/offers/1');
                cy.wait('@getOffer');
            });

            it('devrait ouvrir la modal quand on clique sur Postuler', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('.modal-overlay').should('be.visible');
                cy.contains('h2', 'Postuler à l\'offre').should('be.visible');
            });

            it('devrait afficher le titre de l\'offre dans la modal', () => {
                cy.contains('button', 'Postuler').click();
                cy.contains('strong', 'Développeur Full Stack').should('be.visible');
            });

            it('devrait afficher le champ de lettre de motivation', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').should('be.visible');
                cy.get('label[for="coverLetter"]').should('contain', 'Lettre de motivation');
            });

            it('devrait afficher le compteur de caractères', () => {
                cy.contains('button', 'Postuler').click();
                cy.contains('0 caractères').should('be.visible');
            });

            it('devrait mettre à jour le compteur de caractères', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').type('Ma lettre de motivation');
                cy.contains('22 caractères').should('be.visible');
            });

            it('devrait afficher les boutons Annuler et Envoyer', () => {
                cy.contains('button', 'Postuler').click();
                cy.contains('button', 'Annuler').should('be.visible');
                cy.contains('button', 'Envoyer ma candidature').should('be.visible');
            });

            it('devrait fermer la modal quand on clique sur Annuler', () => {
                cy.contains('button', 'Postuler').click();
                cy.contains('button', 'Annuler').click();
                cy.get('.modal-overlay').should('not.exist');
            });

            it('devrait fermer la modal quand on clique sur le X', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('.modal-close').click();
                cy.get('.modal-overlay').should('not.exist');
            });

            it('devrait fermer la modal quand on clique en dehors', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('.modal-overlay').click({ force: true });
                cy.get('.modal-overlay').should('not.exist');
            });

            it('devrait empêcher la soumission si la lettre est vide (attribut required)', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').should('have.attr', 'required');
                cy.contains('button', 'Envoyer ma candidature').click();
                // Le formulaire ne devrait pas être soumis
                cy.get('.modal-content').should('be.visible');
            });

            it('devrait afficher une erreur si on soumet avec une lettre vide (validation JS)', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').type('   '); // Espaces seulement
                cy.intercept('POST', '**/applications', {
                    statusCode: 400,
                    body: { error: 'Veuillez rédiger une lettre de motivation' }
                }).as('submitApplication');
                cy.contains('button', 'Envoyer ma candidature').click();
                cy.contains('Veuillez rédiger une lettre de motivation').should('be.visible');
            });

            it('devrait soumettre la candidature avec succès', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').type('Ma lettre de motivation complète');
                cy.intercept('POST', '**/applications', {
                    statusCode: 201,
                    body: { success: true }
                }).as('submitApplication');
                cy.contains('button', 'Envoyer ma candidature').click();
                cy.wait('@submitApplication');
                cy.contains('Votre candidature a été envoyée avec succès !').should('be.visible');
            });

            it('devrait afficher "Envoi en cours..." pendant le chargement', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').type('Ma lettre de motivation');
                cy.intercept('POST', '**/applications', {
                    statusCode: 201,
                    delay: 1000,
                    body: { success: true }
                }).as('submitApplication');
                cy.contains('button', 'Envoyer ma candidature').click();
                cy.contains('Envoi en cours...').should('be.visible');
                cy.wait('@submitApplication');
            });

            it('devrait désactiver les boutons pendant le chargement', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').type('Ma lettre de motivation');
                cy.intercept('POST', '**/applications', {
                    statusCode: 201,
                    delay: 1000,
                    body: { success: true }
                }).as('submitApplication');
                cy.contains('button', 'Envoyer ma candidature').click();
                cy.contains('button', 'Annuler').should('be.disabled');
                cy.contains('button', 'Envoi en cours...').should('be.disabled');
            });
        });

        describe('Gestion des erreurs', () => {
            it('devrait afficher une erreur si l\'offre n\'existe pas', () => {
                cy.intercept('GET', '**/offers/999', {
                    statusCode: 404,
                    body: { error: 'Offre introuvable' }
                }).as('getOfferError');
                
                cy.visit('/offers/999');
                cy.wait('@getOfferError');
                cy.contains('Offre introuvable').should('be.visible');
                cy.contains('button', 'Retour').should('be.visible');
            });

            it('devrait afficher une erreur en cas d\'échec de chargement', () => {
                cy.intercept('GET', '**/offers/**', {
                    statusCode: 500,
                    body: { error: 'Erreur serveur' }
                }).as('getOfferError');
                
                cy.visit('/offers/1');
                cy.wait('@getOfferError');
                cy.get('.error-message').should('be.visible');
                cy.contains('button', 'Retour').should('be.visible');
            });

            it('devrait afficher une erreur si la candidature échoue', () => {
                cy.intercept('GET', '**/offers/**', {
                    statusCode: 200,
                    body: {
                        id: '1',
                        title: 'Développeur',
                        description: 'Description',
                        contractType: 'CDI',
                        location: 'Paris',
                        keywords: [],
                        company: { name: 'Tech Corp', description: 'Desc' }
                    }
                }).as('getOffer');
                
                cy.visit('/offers/1');
                cy.wait('@getOffer');
                cy.contains('button', 'Postuler').click();
                cy.get('textarea#coverLetter').type('Ma lettre');
                cy.intercept('POST', '**/applications', {
                    statusCode: 400,
                    body: { error: 'Erreur lors de l\'envoi de la candidature' }
                }).as('submitError');
                cy.contains('button', 'Envoyer ma candidature').click();
                cy.wait('@submitError');
                cy.get('.error-message').should('be.visible');
            });
        });

        describe('Offre sans compétences', () => {
            it('ne devrait pas afficher la section compétences si aucune compétence', () => {
                cy.intercept('GET', '**/offers/**', {
                    statusCode: 200,
                    body: {
                        id: '1',
                        title: 'Développeur',
                        description: 'Description',
                        contractType: 'CDI',
                        location: 'Paris',
                        keywords: [],
                        company: { name: 'Tech Corp', description: 'Desc' }
                    }
                }).as('getOffer');
                
                cy.visit('/offers/1');
                cy.wait('@getOffer');
                cy.contains('Compétences recherchées').should('not.exist');
            });
        });
    });
});

