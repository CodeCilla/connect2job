# Connect2Job

Connect2Job est une plateforme de mise en relation entre étudiants et entreprises pour des opportunités d'emploi, de stage et d'alternance.

## 📋 Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Tests](#tests)
- [Scripts disponibles](#scripts-disponibles)

## 📖 Description

Connect2Job est une application web moderne permettant aux étudiants de rechercher et postuler à des offres d'emploi, et aux entreprises de publier des offres et de gérer les candidatures reçues.

### Pour les étudiants
- Recherche d'offres d'emploi avec filtres avancés (mots-clés, localisation, type de contrat)
- Consultation détaillée des offres
- Candidature avec lettre de motivation
- Suivi des candidatures
- Gestion du profil avec compétences, CV, portfolio, etc.

### Pour les entreprises
- Création et gestion d'offres d'emploi
- Consultation des candidatures reçues
- Gestion du statut des candidatures (Reçue, En revue, Entretien, Acceptée, Refusée)
- Visualisation des lettres de motivation et CV des candidats
- Gestion du profil entreprise

## ✨ Fonctionnalités

### Authentification
- Inscription et connexion séparées pour étudiants et entreprises
- Gestion des sessions avec JWT
- Protection des routes selon le rôle utilisateur

### Gestion des offres
- Liste des offres avec filtres (mots-clés, localisation, type de contrat)
- Affichage détaillé d'une offre
- Création, modification et suppression d'offres (entreprises)
- Affichage des compétences recherchées

### Candidatures
- Envoi de candidature avec lettre de motivation
- Suivi du statut des candidatures
- Visualisation des lettres de motivation (entreprises)
- Gestion des statuts de candidature

### Profils
- Profil étudiant : nom, email, compétences, liens (CV, GitHub, Portfolio)
- Profil entreprise : nom, description, localisation, site web
- Modification des informations de profil

## 🛠 Technologies utilisées

- **React 19.2.0** - Bibliothèque JavaScript pour l'interface utilisateur
- **React Router 7.10.1** - Routage côté client
- **Vite 7.2.4** - Outil de build et serveur de développement
- **Axios 1.13.2** - Client HTTP pour les appels API
- **Cypress 15.7.1** - Framework de tests end-to-end
- **ESLint** - Linter pour la qualité du code

## 📦 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Accès à l'API backend (configurée dans `src/services/config.js`)

## 🚀 Installation

1. **Cloner le repository**
```bash
git clone <url-du-repo>
cd connect2job
```

2. **Installer les dépendances**
```bash
cd frontend
npm install
```

## ⚙️ Configuration

### Configuration de l'API

Modifiez le fichier `frontend/src/services/config.js` pour configurer l'URL de l'API et votre groupe :

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://ekod-dev-interface-tp4-backend-production.up.railway.app',
  GROUP: 'group1', // Changez selon votre groupe (group1, group2, group3)
  TIMEOUT: 10000,
};
```

## 💻 Utilisation

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

### Prévisualisation du build

```bash
npm run preview
```

### Linter

```bash
npm run lint
```

## 📁 Structure du projet

```
connect2job/
├── frontend/
│   ├── cypress/              # Tests end-to-end
│   │   ├── e2e/              # Tests Cypress
│   │   └── support/           # Commandes personnalisées
│   ├── public/                # Fichiers statiques
│   ├── src/
│   │   ├── assets/            # Images et ressources
│   │   ├── components/        # Composants React
│   │   │   └── profile/       # Composants liés au profil
│   │   ├── hooks/             # Hooks personnalisés
│   │   │   ├── useAuth.jsx    # Gestion de l'authentification
│   │   │   ├── useOffers.js   # Gestion des offres
│   │   │   ├── useApplications.js # Gestion des candidatures
│   │   │   └── useProfile.js  # Gestion du profil
│   │   ├── pages/             # Pages de l'application
│   │   │   ├── Home.jsx       # Page d'accueil
│   │   │   ├── Login.jsx     # Page de connexion
│   │   │   ├── Register.jsx  # Page d'inscription
│   │   │   ├── OffersList.jsx # Liste des offres
│   │   │   ├── Offre.jsx     # Détail d'une offre
│   │   │   ├── Profile.jsx   # Page de profil
│   │   │   └── CreateOffer.jsx # Création d'offre
│   │   ├── services/          # Services API
│   │   │   ├── api.js         # Client API avec Axios
│   │   │   └── config.js     # Configuration API
│   │   └── styles/            # Fichiers CSS
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🧪 Tests

### Tests Cypress

Les tests end-to-end sont disponibles dans le dossier `cypress/e2e/` :

- `home.cy.js` - Tests de la page d'accueil
- `login.cy.js` - Tests de la page de connexion
- `register.cy.js` - Tests de la page d'inscription
- `offerlist.cy.js` - Tests de la liste des offres
- `offre.cy.js` - Tests de la page de détail d'offre
- `profile.cy.js` - Tests de la page de profil
- `createOffer.cy.js` - Tests de création d'offre

### Lancer les tests

```bash
# Ouvrir Cypress en mode interactif
npx cypress open

# Lancer les tests en mode headless
npx cypress run
```

### Commandes Cypress personnalisées

- `cy.loginAsStudent()` - Se connecter en tant qu'étudiant
- `cy.loginAsCompany()` - Se connecter en tant qu'entreprise
- `cy.logout()` - Se déconnecter
- `cy.createOffer(offerData)` - Créer une offre
- `cy.deleteOffer(offerId)` - Supprimer une offre

## 📜 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée un build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint

## 🔐 Routes protégées

L'application utilise un système de routes protégées basé sur les rôles :

- **Routes publiques** : `/`, `/login`, `/register`
- **Routes étudiants** : `/offers`, `/offers/:id`
- **Routes entreprises** : `/offers/create`
- **Routes partagées** : `/profile`, `/applications`

## 🎨 Styles

L'application utilise des variables CSS personnalisées pour la cohérence du design :
- `--color-primary` - Couleur primaire
- `--color-secondary` - Couleur secondaire
- `--color-bg` - Couleur de fond
- `--color-text` - Couleur du texte
- `--space-*` - Espacements
- `--radius-*` - Rayons de bordure

## 📝 Notes

- L'application nécessite une connexion à l'API backend pour fonctionner
- Les tokens JWT sont stockés dans le localStorage
- Les routes sont protégées selon le rôle de l'utilisateur (STUDENT ou COMPANY)

## 👥 Auteurs

Équipe Connect2Job

## 📄 Licence

Ce projet est un projet académique.

