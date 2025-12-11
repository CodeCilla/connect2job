// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Commande pour simuler une connexion en tant qu'étudiant
Cypress.Commands.add('loginAsStudent', () => {
  const studentUser = {
    email: 'user@example.com',
    role: 'STUDENT',
    name: 'teste',
    password: 'string'
  };
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhODg2Y2UzMC05ZTY1LTQ3MDUtYjRiYS02ODJhNGEzYjIyYjIiLCJyb2xlIjoiU1RVREVOVCIsImdyb3VwIjoiZ3JvdXAxIiwiaWF0IjoxNzY1NDUwNjkzLCJleHAiOjE3NjYwNTU0OTN9.UlYvnhYqZtI-aWGFm8NpqjyITcVy_CQH8eCqaDIoHDo';
  
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(studentUser));
});

// Commande pour simuler une connexion en tant qu'entreprise
Cypress.Commands.add('loginAsCompany', () => {
  const companyUser = {
    id: 2,
    email: 'company@test.com',
    role: 'COMPANY',
    name: 'Entreprise Test'
  };
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2MwMTYwNS02NjQ1LTQ2MjktODQxNi1jMzRkZDMyM2FhNjQiLCJyb2xlIjoiQ09NUEFOWSIsImdyb3VwIjoiZ3JvdXAxIiwiaWF0IjoxNzY1NDUwOTAzLCJleHAiOjE3NjYwNTU3MDN9.Ulk_WiI141rsuB1xGMqX8WYjAR3ZPIPd7HhezzmnwSc';
  
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(companyUser));
});

// Commande pour simuler une connexion en tant qu'entreprise sans offres
Cypress.Commands.add('loginAsCompanyNoOffers', () => {
  const companyUser = {
    id: 3,
    email: 'companynooffers@test.com',
    role: 'COMPANY',
    name: 'Entreprise Sans Offres'
  };
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MGIwMDY0Yy1iOGQwLTRlNzItOGE1MS1mOWUzMDJjM2ZhYzMiLCJyb2xlIjoiQ09NUEFOWSIsImdyb3VwIjoiZ3JvdXAxIiwiaWF0IjoxNzY1NDYwMzg5LCJleHAiOjE3NjYwNjUxODl9.HGDdobxQFbtzo6OyR05zsNEZifBJgP0ddPiLEzq0HrM'

    window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(companyUser));
});

// Commande pour déconnecter l'utilisateur
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
});

// Commande pour créer une offre (nécessite d'être connecté en tant qu'entreprise)
Cypress.Commands.add('createOffer', (offerData) => {
  const token = window.localStorage.getItem('token');
  const baseUrl = Cypress.env('API_BASE_URL') || 'https://ekod-dev-interface-tp4-backend-production.up.railway.app/api/group1';
  
  return cy.request({
    method: 'POST',
    url: `${baseUrl}/companies/offers`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: offerData || {
      title: 'Offre de test Cypress',
      description: 'Description de test pour les tests Cypress',
      contractType: 'CDI',
      location: 'Paris',
      keywords: ['React', 'Node.js', 'TypeScript']
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 201 || response.status === 200) {
      return response.body.offer || response.body;
    } else {
      throw new Error(`Erreur lors de la création de l'offre: ${response.status}`);
    }
  });
});

// Commande pour supprimer une offre
Cypress.Commands.add('deleteOffer', (offerId) => {
  const token = window.localStorage.getItem('token');
  const baseUrl = Cypress.env('API_BASE_URL') || 'https://ekod-dev-interface-tp4-backend-production.up.railway.app/api/group1';
  
  return cy.request({
    method: 'DELETE',
    url: `${baseUrl}/companies/offers/${offerId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    failOnStatusCode: false
  });
});