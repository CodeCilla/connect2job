describe('Page Offre', () => {
    let createdOfferId = null;

    beforeEach(() => {
        cy.clearLocalStorage();
    });

    afterEach(() => {
        // Supprimer l'offre créée après chaque test
        if (createdOfferId) {
            cy.loginAsCompany();
            cy.deleteOffer(createdOfferId).then(() => {
                createdOfferId = null;
            });
        }
    });

    describe('Utilisateur non connecté', () => {
        it('devrait rediriger vers la page de login', () => {
            cy.visit('/offers/1');
            cy.url().should('include', '/login');
        });
    });

    describe('Utilisateur connecté (étudiant)', () => {
        beforeEach(() => {
            // Créer une offre avant les tests
            cy.loginAsCompany();
            cy.createOffer({
                title: 'Développeur Full Stack',
                description: 'Description du poste de développeur',
                contractType: 'CDI',
                location: 'Paris',
                keywords: ['React', 'Node.js', 'TypeScript']
            }).then((offer) => {
                createdOfferId = offer.id || offer.offer?.id || offer.offerId;
                cy.logout();
                cy.loginAsStudent();
            });
        });

        describe('Chargement de l\'offre', () => {
            it('devrait afficher le spinner de chargement', () => {
                cy.then(() => {
                    expect(createdOfferId).to.not.be.null;
                    cy.visit(`/offers/${createdOfferId}`);
                    cy.contains('Chargement de l\'offre...').should('be.visible');
                });
            });
        });

        describe('Affichage de l\'offre', () => {
            beforeEach(() => {
                cy.then(() => {
                    expect(createdOfferId).to.not.be.null;
                    cy.visit(`/offers/${createdOfferId}`);
                    // Attendre que l'offre soit chargée
                    cy.contains('Développeur Full Stack', { timeout: 10000 }).should('be.visible');
                });
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

            it('devrait afficher la localisation', () => {
                cy.contains('Paris').should('be.visible');
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
                cy.then(() => {
                    expect(createdOfferId).to.not.be.null;
                    cy.visit(`/offers/${createdOfferId}`);
                    // Attendre que l'offre soit chargée
                    cy.contains('Développeur Full Stack', { timeout: 10000 }).should('be.visible');
                });
            });

            it('devrait ouvrir la modal quand on clique sur Postuler', () => {
                cy.contains('button', 'Postuler').click();
                cy.get('.modal-overlay').should('be.visible');
                cy.contains('h2', 'Postuler à l\'offre').should('be.visible');
            });

            it('devrait afficher le titre de l\'offre dans la modal', () => {
                cy.contains('button', 'Postuler').click();
                cy.contains('Développeur Full Stack').should('be.visible');
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
            it('devrait afficher une erreur si la candidature échoue', () => {
                cy.then(() => {
                    expect(createdOfferId).to.not.be.null;
                    cy.visit(`/offers/${createdOfferId}`);
                    cy.contains('Développeur Full Stack', { timeout: 10000 }).should('be.visible');
                    cy.contains('button', 'Postuler').click();
                    cy.get('textarea#coverLetter').type('Ma lettre');
                    // Intercepter pour forcer une erreur
                    cy.intercept('POST', '**/applications', {
                        statusCode: 400,
                        body: { error: 'Erreur lors de l\'envoi de la candidature' }
                    }).as('submitError');
                    cy.contains('button', 'Envoyer ma candidature').click();
                    cy.wait('@submitError');
                    cy.get('.error-message').should('be.visible');
                });
            });
        });

        describe('Offre sans compétences', () => {
            let offerWithoutKeywordsId = null;

            beforeEach(() => {
                // Créer une offre sans compétences
                cy.loginAsCompany();
                cy.createOffer({
                    title: 'Offre sans compétences',
                    description: 'Description',
                    contractType: 'CDI',
                    location: 'Paris',
                    keywords: []
                }).then((offer) => {
                    offerWithoutKeywordsId = offer.id || offer.offer?.id || offer.offerId;
                    cy.logout();
                    cy.loginAsStudent();
                });
            });

            afterEach(() => {
                if (offerWithoutKeywordsId) {
                    cy.loginAsCompany();
                    cy.deleteOffer(offerWithoutKeywordsId);
                    offerWithoutKeywordsId = null;
                }
            });

        });
    });
});

