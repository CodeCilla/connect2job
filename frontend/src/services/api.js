import axios from 'axios';
import { API_CONFIG, getApiBaseUrl } from './config';

// Instance axios avec configuration de base
const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erreur de réponse du serveur
      const message = error.response.data?.message || 'Une erreur est survenue';

      // Si token invalide ou expiré, rediriger vers login
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      return Promise.reject({
        status: error.response.status,
        message,
        data: error.response.data,
      });
    } else if (error.request) {
      // Pas de réponse du serveur
      return Promise.reject({
        message: 'Impossible de contacter le serveur',
      });
    } else {
      // Erreur lors de la configuration de la requête
      return Promise.reject({
        message: error.message || 'Une erreur est survenue',
      });
    }
  }
);

// ===== Services d'authentification =====

export const authService = {
  // Connexion
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Inscription
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// ===== Services pour les étudiants =====

export const studentService = {
  // Récupérer le profil de l'étudiant
  getProfile: async () => {
    const response = await api.get('/students/profile');
    return response.data;
  },

  // Mettre à jour le profil de l'étudiant
  updateProfile: async (data) => {
    const response = await api.put('/students/profile', data);
    return response.data;
  },

  // Récupérer la liste des offres avec filtres optionnels
  getOffers: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.contractType) params.append('contractType', filters.contractType);
    if (filters.location) params.append('location', filters.location);

    const response = await api.get(`/students/offers?${params.toString()}`);
    return response.data.offers || [];
  },

  // Récupérer le détail d'une offre
  getOfferDetail: async (offerId) => {
    const response = await api.get(`/students/offers/${offerId}`);
    return response.data.offer || response.data;
  },

  // Postuler à une offre
  applyToOffer: async (offerId, coverLetter) => {
    const response = await api.post('/students/applications', {
      offerId,
      coverLetter,
    });
    return response.data;
  },

  // Récupérer ses candidatures
  getApplications: async () => {
    const response = await api.get('/students/applications');
    return response.data.applications || [];
  },
};

// ===== Services pour les entreprises =====

export const companyService = {
  // Récupérer le profil de l'entreprise
  getProfile: async () => {
    const response = await api.get('/companies/profile');
    return response.data;
  },

  // Mettre à jour le profil de l'entreprise
  updateProfile: async (data) => {
    const response = await api.put('/companies/profile', data);
    return response.data;
  },

  // Créer une offre
  createOffer: async (data) => {
    const response = await api.post('/companies/offers', data);
    return response.data;
  },

  // Récupérer les offres de l'entreprise
  getOffers: async () => {
    const response = await api.get('/companies/offers');
    return response.data.offers || [];
  },

  // Récupérer le détail d'une offre
  getOfferDetail: async (offerId) => {
    const response = await api.get(`/companies/offers/${offerId}`);
    return response.data.offer || response.data;
  },

  // Mettre à jour une offre
  updateOffer: async (offerId, data) => {
    const response = await api.put(`/companies/offers/${offerId}`, data);
    return response.data;
  },

  // Supprimer une offre
  deleteOffer: async (offerId) => {
    const response = await api.delete(`/companies/offers/${offerId}`);
    return response.data;
  },

  // Récupérer les candidatures reçues
  getApplications: async () => {
    const response = await api.get('/companies/applications');
    return response.data.applications || [];
  },

  // Mettre à jour le statut d'une candidature
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/companies/applications/${applicationId}/status`, {
      status,
    });
    return response.data;
  },
};

// ===== Services de messagerie =====

export const messageService = {
  // Récupérer la liste des conversations
  getConversations: async () => {
    const response = await api.get('/messages');
    return response.data;
  },

  // Récupérer une conversation avec un utilisateur
  getConversation: async (recipientId) => {
    const response = await api.get(`/messages/${recipientId}`);
    return response.data;
  },

  // Envoyer un message
  sendMessage: async (recipientId, content) => {
    const response = await api.post(`/messages/${recipientId}`, { content });
    return response.data;
  },
};

export default api;
