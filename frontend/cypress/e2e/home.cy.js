describe('Page Home', () => {
  beforeEach(() => {
    // Nettoyer le localStorage avant chaque test
    cy.clearLocalStorage();
  });

  describe('Utilisateur non connecté', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('devrait afficher le titre et les boutons pour utilisateur non connecté', () => {
      cy.get('h1.home__title').should('be.visible');
      cy.get('h1.home__title').should('contain', 'Trouvez votre');
      cy.get('h1.home__title').should('contain', 'opportunité');
      
      cy.get('.home__cta').should('be.visible');
      cy.contains('button', "Trouvez votre entreprise").should('be.visible');
      cy.contains('button', "Trouvez votre alternant").should('be.visible');
    });

    it('devrait afficher la section partenaires', () => {
      cy.get('.home__partners').should('be.visible');
      cy.contains('h2', 'Elles nous ont fait confiance').should('be.visible');
      cy.get('.slider-container').should('be.visible');
      cy.get('.partner').should('have.length.at.least', 1);
    });

    it('devrait afficher les témoignages', () => {
      cy.get('.home__testimonials').should('have.length.at.least', 1);
      cy.contains('h2', 'ont trouvé leur emploi de rêve').should('be.visible');
      cy.contains('.name', 'Quentin Jacque').should('be.visible');
      cy.contains('.name', 'Marie Dubois').should('be.visible');
    });

    it('devrait rediriger vers la page d\'inscription au clic sur "Trouvez votre entreprise"', () => {
      cy.contains('button', "Trouvez votre entreprise").click();
      cy.url().should('include', '/register');
    });

    it('devrait rediriger vers la page d\'inscription au clic sur "Trouvez votre alternant"', () => {
      cy.contains('button', "Trouvez votre alternant").click();
      cy.url().should('include', '/register');
    });
  });

  describe('Utilisateur connecté en tant qu\'étudiant', () => {
    beforeEach(() => {
      cy.loginAsStudent();
      cy.visit('/');
    });

    it('devrait afficher le titre et les boutons pour étudiant', () => {
      cy.get('h1.home__title').should('be.visible');
      cy.get('h1.home__title').should('contain', 'Trouvez votre');
      cy.get('h1.home__title').should('contain', 'alternance');
      
      cy.get('.home__cta').should('be.visible');
      cy.contains('button', "Voir les offres d'emploi").should('be.visible');
      cy.contains('button', 'Mon profil').should('be.visible');
    });

    it('devrait rediriger vers la page des offres au clic sur "Voir les offres d\'emploi"', () => {
      cy.contains('button', "Voir les offres d'emploi").click();
      cy.url().should('include', '/offers');
    });

    it('devrait rediriger vers le profil au clic sur "Mon profil"', () => {
      cy.contains('button', 'Mon profil').click();
      cy.url().should('include', '/profile');
    });

    it('devrait toujours afficher les sections communes (stats, partenaires, témoignages)', () => {
      cy.get('.home__stats').should('be.visible');
      cy.get('.home__partners').should('be.visible');
      cy.get('.home__testimonials').should('have.length.at.least', 1);
    });
  });

  describe('Utilisateur connecté en tant qu\'entreprise', () => {
    beforeEach(() => {
      cy.loginAsCompany();
      cy.visit('/');
    });

    it('devrait afficher le titre et les boutons pour entreprise', () => {
      cy.get('h1.home__title').should('be.visible');
      cy.get('h1.home__title').should('contain', 'Trouvez votre');
      cy.get('h1.home__title').should('contain', 'alternant');
      
      cy.get('.home__cta').should('be.visible');
      cy.contains('button', "Publier une offre").should('be.visible');
      cy.contains('button', 'Mes offres').should('be.visible');
    });

    it('devrait rediriger vers la page de création d\'offre au clic sur "Publier une offre"', () => {
      cy.contains('button', "Publier une offre").click();
      cy.url().should('include', '/offers/create');
    });

    it('devrait rediriger vers les offres au clic sur "Mes offres"', () => {
      cy.contains('button', 'Mes offres').click();
      cy.url().should('include', '/profile');
    });

    it('devrait toujours afficher les sections communes (stats, partenaires, témoignages)', () => {
      cy.get('.home__stats').should('be.visible');
      cy.get('.home__partners').should('be.visible');
      cy.get('.home__testimonials').should('have.length.at.least', 1);
    });
  });

  describe('Navigation et éléments communs', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('devrait afficher le header avec le logo', () => {
      cy.get('header.header').should('be.visible');
      cy.contains('.logo', 'Connect2Job').should('be.visible');
    });

    it('devrait afficher le footer', () => {
      cy.get('footer.footer').should('be.visible');
      cy.contains('.brand__title', 'Connect2Job').should('be.visible');
    });

    it('devrait avoir une structure responsive', () => {
      cy.viewport(375, 667); // Mobile
      cy.get('.home').should('be.visible');
      
      cy.viewport(1280, 720); // Desktop
      cy.get('.home').should('be.visible');
    });
  });
});