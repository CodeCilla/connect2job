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
    name: 'Étudiant Test'
  };
  const token = 'mock-student-token';
  
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
  const token = 'mock-company-token';
  
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(companyUser));
});

// Commande pour déconnecter l'utilisateur
Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
});