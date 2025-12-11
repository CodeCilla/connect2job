describe("OffersList Page", () => {
  beforeEach(() => {
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
      cy.get('input[placeholder="Poste, mot-clé"]').type("Développeur");

      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/Développeur/i);
      });
    });

    it("devrait permettre de filtrer les offres par ville", () => {
      cy.get('input[placeholder="Ville"]').type("Paris");

      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/Paris/i);
      });
    });

it("devrait permettre de filtrer les offres par type de contrat", () => {
      cy.get('input[type="checkbox"][value="CDI"]').check();

      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/CDI/i);
      });
    });
    
it("devrait permettre de combiner plusieurs filtres", () => {
      cy.get('input[placeholder="Poste, mot-clé"]').type("Développeur");
      cy.get('input[placeholder="Ville"]').type("Paris");
      cy.get('input[type="checkbox"][value="CDI"]').check();

      cy.get(".card").each(($el) => {
        cy.wrap($el).contains(/Développeur/i);
        cy.wrap($el).contains(/Paris/i);
        cy.wrap($el).contains(/CDI/i);
      });
    });

    it("devrait afficher un message si aucune offre ne correspond aux filtres", () => {
      cy.get('input[placeholder="Poste, mot-clé"]').type("OffreInexistante");
      cy.get('input[placeholder="Ville"]').type("VilleInexistante");
      cy.get('input[type="checkbox"][value="CDI"]').check();

      cy.contains("Aucune offres trouvées.").should("be.visible");
    });

    it("devrait rediriger vers la page de détail de l'offre au clic sur une offre", () => {
      cy.get(".card").first().click();

      cy.url().should("include", "/offers/");
    });

  });
});
