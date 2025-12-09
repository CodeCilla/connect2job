import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import {api} from '../services/api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On récupère le token depuis ton contexte d'auth
  const { token } = useAuth();

  // 1. CHARGEMENT DES DONNÉES (GET)
  useEffect(() => {
    const fetchProfile = async () => {
      // Si pas de token, on attend (ou on redirige selon ta logique auth)
      if (!token) return;

      try {
        setLoading(true);
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();

        // --- POINT CRITIQUE : SÉCURITÉ TABLEAU ---
        // Si le backend renvoie "skills": null, React plantera au .map()
        // On force un tableau vide ici.
        if (!data.skills) {
          data.skills = [];
        }

        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Erreur chargement profil:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]); // Se relance si le token change

  // 2. MISE À JOUR (PUT)
  const updateProfile = async (formData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envoie l'objet avec le tableau skills
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la sauvegarde: ${response.status}`);
      }

      const updatedData = await response.json();

      // Sécurité tableau ici aussi pour la mise à jour locale
      if (!updatedData.skills) updatedData.skills = [];

      // On met à jour l'affichage sans recharger la page
      setProfile(updatedData);

      return { success: true };
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      return { success: false, error: err.message };
    }
  };

  return { profile, loading, error, updateProfile };
};
