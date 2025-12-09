import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { studentService, companyService } from '../services/api';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const { isStudent, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        setError(null);

        const service = isStudent ? studentService : companyService;

        const data = await service.getProfile();

        if (!data.skills) {
          data.skills = [];
        }

        setProfile(data);
      } catch (err) {
        console.error('Erreur chargement profil:', err);
        setError(err.message || 'Impossible de charger le profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isStudent, isAuthenticated]);

  // Fonction de mise à jour (UPDATE)
  const updateProfile = async (formData) => {
    try {
      setError(null);

      // 1. Choix du service
      const service = isStudent ? studentService : companyService;

      // 2. Appel API (PUT)
      const updatedData = await service.updateProfile(formData);

      // 3. Sécurité tableau ici aussi
      if (!updatedData.skills) {
        updatedData.skills = [];
      }

      // 4. Mise à jour de l'état local
      setProfile(updatedData);

      return { success: true, data: updatedData };
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      const errorMessage = err.message || 'Erreur lors de la sauvegarde';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return { profile, loading, error, updateProfile };
};
