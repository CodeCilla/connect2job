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

  const updateProfile = async (formData) => {
    try {
      setError(null);

      const service = isStudent ? studentService : companyService;
      const response = await service.updateProfile(formData);
      const profileData = isStudent ? response.student : response.company;

      if (!profileData.skills) {
        profileData.skills = [];
      }

      setProfile(profileData);

      return { success: true, data: profileData };
    } catch (err) {
      console.error('Erreur sauvegarde:', err);
      const errorMessage = err.message || 'Erreur lors de la sauvegarde';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return { profile, loading, error, updateProfile };
};
