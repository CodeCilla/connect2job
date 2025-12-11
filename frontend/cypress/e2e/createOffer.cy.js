/* eslint-env cypress */
describe('Page Create Offer', () => {
  beforeEach(() => {
    cy.loginAsCompany();
  });

  it("devrait afficher le formulaire de création d'offre", () => {
    cy.visit('/offers/create');
    cy.contains('h3', 'Créer une offre').should('be.visible');
    cy.get('label[for="title"]').should('contain', "Titre de l'offre");
    cy.get('input#title').should('exist');
    cy.get('textarea#description').should('exist');
    cy.get('select#contractType').should('exist');
    cy.get('input#location').should('exist');
    cy.get('.btn-add-keyword').should('exist');
    cy.get('button.btn-submit').should('exist');
  });

  it('devrait permettre de créer une offre et rediriger vers /profile', () => {
    // Stub de la requête de création d'offre
    cy.intercept('POST', '**/companies/offers', {
      statusCode: 201,
      body: {
        id: 101,
        title: 'Développeur Full Stack',
        description: 'Une super offre',
        contractType: 'CDI',
        location: 'Paris',
        keywords: ['React'],
      },
    }).as('createOffer');

    cy.visit('/offers/create');

    // Remplir le formulaire
    cy.get('input#title').type('Développeur Full Stack');
    cy.get('textarea#description').type(
      "Développement d'applications web en React et Node.",
    );
    cy.get('select#contractType').select('CDI');
    cy.get('input#location').type('Paris');

    // Ajouter un mot-clé
    cy.get('.keyword-input-container input').type('React');
    cy.get('.btn-add-keyword').click();
    cy.get('.keyword-tag').should('contain', 'React');

    // Soumettre
    cy.get('button.btn-submit').click();

    // Attendre la requête et vérifier la redirection
    cy.wait('@createOffer');
    cy.url().should('include', '/profile');
  });

  it('devrait annuler la création et revenir au profil', () => {
    cy.visit('/offers/create');
    // Le bouton "Annuler" dans le formulaire
    cy.get('button.btn-cancel').click();
    cy.url().should('include', '/profile');
  });

  it('devrait retourner à la liste via le bouton back en-tête', () => {
    cy.visit('/offers/create');
    cy.get('button.btn-back').click();
    cy.url().should('include', '/profile');
  });
});
