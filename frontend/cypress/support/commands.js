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
    id: 1,
    email: 'student@test.com',
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

// Commande pour déconnecter l'utilisateur
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
});
