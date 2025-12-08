import { useState, useCallback, useEffect } from 'react';
import { studentService, companyService } from '../services/api';
import { useAuth } from './useAuth';

export const useApplications = (autoFetch = true) => {
  const { isStudent, isCompany } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Récupère la liste des candidatures selon le rôle (Student ou Company)
   */
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = [];

      if (isStudent) {
        // Appel via studentService (GET /students/applications)
        data = await studentService.getApplications();
      } else if (isCompany) {
        // Appel via companyService (GET /companies/applications)
        data = await companyService.getApplications();
      }

      setApplications(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Impossible de récupérer les candidatures');
    } finally {
      setLoading(false);
    }
  }, [isStudent, isCompany]);

  /**
   * Action : Postuler à une offre (Pour les étudiants)
   */
  const submitApplication = async (offerId, coverLetter) => {
    if (!isStudent)
      return { success: false, error: 'Action réservée aux étudiants' };

    setLoading(true);
    try {
      await studentService.applyToOffer(offerId, coverLetter);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Erreur lors de la candidature',
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Action : Changer le statut de l'annonce (Pour les entreprises)
   */
  const updateStatus = async (applicationId, newStatus) => {
    if (!isCompany)
      return { success: false, error: 'Action réservée aux entreprises' };

    const previousApplications = [...applications];

    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app,
      ),
    );

    try {
      // 3. Appel API réel
      await companyService.updateApplicationStatus(applicationId, newStatus);
      return { success: true };
    } catch (err) {
    setApplications(previousApplications);
    setError('Impossible de mettre à jour le statut');
    return { success: false, error: err.message };
    }
  };

  // Chargement automatique au montage du composant si autoFetch est true
  useEffect(() => {
    if (autoFetch && (isStudent || isCompany)) {
      fetchApplications();
    }
  }, [fetchApplications, autoFetch, isStudent, isCompany]);

  return {
    applications,
    loading,
    error,
    fetchApplications, // Exposé pour pouvoir rafraîchir manuellement (bouton refresh)
    submitApplication, // Fonction pour l'étudiant
    updateStatus, // Fonction pour l'entreprise
  };
};
