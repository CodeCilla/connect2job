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
    name: 'Étudiant Test',
  };
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZjU4ZjgzNi1jY2RlLTRjZmEtODgxNS03MzBkMDIyZmQ0MjAiLCJyb2xlIjoiU1RVREVOVCIsImdyb3VwIjoiZ3JvdXAxIiwiaWF0IjoxNzY1NDUxNzM1LCJleHAiOjE3NjYwNTY1MzV9.naODj63q1x3BLwoksOQTkbiYcPOchkuZnyoLpWk8uK4';

  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(studentUser));
});

// Commande pour simuler une connexion en tant qu'entreprise
Cypress.Commands.add('loginAsCompany', () => {
  const companyUser = {
    id: 2,
    email: 'company@test.com',
    role: 'COMPANY',
    name: 'Entreprise Test',
  };
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZWMxNDdiZS1jYWMzLTQ3MTItOTFmMS01NzA5MWJmNDllNTgiLCJyb2xlIjoiQ09NUEFOWSIsImdyb3VwIjoiZ3JvdXAxIiwiaWF0IjoxNzY1NDUxODMwLCJleHAiOjE3NjYwNTY2MzB9.gsTXGYrzNMzMY3x-IWu13uP915WjlvKCnJR2RzFWcFU';

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
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MGIwMDY0Yy1iOGQwLTRlNzItOGE1MS1mOWUzMDJjM2ZhYzMiLCJyb2xlIjoiQ09NUEFOWSIsImdyb3VwIjoiZ3JvdXAxIiwiaWF0IjoxNzY1NDYwMzg5LCJleHAiOjE3NjYwNjUxODl9.HGDdobxQFbtzo6OyR05zsNEZifBJgP0ddPiLEzq0HrM';

  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(companyUser));
});

// Commande pour déconnecter l'utilisateur
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
});

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
      }
    }).then((response) => {
      return response.body.offer || response.body;
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
