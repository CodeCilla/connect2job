describe("OffersList Page", () => {
  beforeEach(() => {
    // Nettoyer le localStorage avant chaque test
    cy.clearLocalStorage();
  });

  describe("Utilisateur non connecté", () => {
    beforeEach(() => {
      cy.visit("/offers");
    });

    it("devrait rediriger vers la page de connexion", () => {
      cy.url().should("include", "/login");
    });
  });

  describe("Utilisateur connecté en tant qu'étudiant", () => {
    beforeEach(() => {
      cy.loginAsStudent();
      cy.visit("/offers");
    });

    it("devrait afficher la liste des offres", () => {
      cy.get(".OffersPageWrapper").should("be.visible");
      cy.get(".OffersList").should("be.visible");
      cy.get(".card").should("have.length.at.least", 1);
    });

    it("devrait afficher les filtres", () => {
      cy.get(".FiltersOffers").should("be.visible");
    });

    it("devrait permettre de filtrer les offres par mot-clé", () => {
      // Saisir un mot-clé dans le filtre
      cy.get('input[placeholder="Poste, mot-clé"]').type("Développeur");

      // Vérifier que les offres affichées correspondent au filtre
      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/Développeur/i);
      });
    });

    it("devrait permettre de filtrer les offres par ville", () => {
      // Saisir une ville dans le filtre
      cy.get('input[placeholder="Ville"]').type("Paris");

      // Vérifier que les offres affichées correspondent au filtre
      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/Paris/i);
      });
    });

it("devrait permettre de filtrer les offres par type de contrat", () => {
      // Sélectionner un type de contrat dans le filtre
      cy.get('input[type="checkbox"][value="CDI"]').check();

      // Vérifier que les offres affichées correspondent au filtre
      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/CDI/i);
      });
    });
    
it("devrait permettre de combiner plusieurs filtres", () => {
      // Saisir un mot-clé et une ville, et sélectionner un type de contrat
      cy.get('input[placeholder="Poste, mot-clé"]').type("Développeur");
      cy.get('input[placeholder="Ville"]').type("Paris");
      cy.get('input[type="checkbox"][value="CDI"]').check();

      // Vérifier que les offres affichées correspondent à tous les filtres
      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/Développeur/i);
        cy.wrap($el).contains(/Paris/i);
        cy.wrap($el).contains(/CDI/i);
      });
    });

    it("devrait afficher un message si aucune offre ne correspond aux filtres", () => {
      // Saisir des filtres qui ne correspondent à aucune offre
      cy.get('input[placeholder="Poste, mot-clé"]').type("OffreInexistante");
      cy.get('input[placeholder="Ville"]').type("VilleInexistante");
      cy.get('input[type="checkbox"][value="CDI"]').check();

      // Vérifier que le message d'aucune offre trouvée est affiché
      cy.contains("Aucune offres trouvées.").should("be.visible");
    });

    it("devrait rediriger vers la page de détail de l'offre au clic sur une offre", () => {
      // Cliquer sur la première offre de la liste
      cy.get(".card").first().click();

      // Vérifier que l'URL a changé pour inclure l'ID de l'offre
      cy.url().should("include", "/offers/");
    });

  });
});
