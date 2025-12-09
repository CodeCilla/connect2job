import { useState, useCallback, useEffect } from 'react';
import { studentService, companyService } from '../services/api';
import { useAuth } from './useAuth';

export const useOffers = (autoFetch = true) => {
  const { isStudent, isCompany } = useAuth();

  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 1. Récupérer les offres (GET)
   * Gère les filtres pour les étudiants
   */
  const fetchOffers = useCallback(
    async (filters = {}) => {
      setLoading(true);
      setError(null);
      try {
        let data = [];

        if (isStudent) {
          // filtres étudiants dev, stage, alternance, localisation, mots-clés...
          data = await studentService.getOffers(filters);
        } else if (isCompany) {
          data = await companyService.getOffers();
        }

        setOffers(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Impossible de charger les offres');
      } finally {
        setLoading(false);
      }
    },
    [isStudent, isCompany],
  );

  /**
   * 2. Récupérer le détail d'une offre (GET /{id})
   */
  const fetchOfferDetail = useCallback(
    async (offerId) => {
      setLoading(true);
      setError(null);
      try {
        let data = null;
        if (isStudent) {
          data = await studentService.getOfferDetail(offerId);
        } else if (isCompany) {
          data = await companyService.getOfferDetail(offerId);
        }
        setCurrentOffer(data);
        return data;
      } catch (err) {
        setError(err.message || "Impossible de charger l'offre");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [isStudent, isCompany],
  );

  /**
   * 3. Créer une offre (POST - Company only)
   */
  const createOffer = async (offerData) => {
    if (!isCompany)
      return { success: false, error: 'Action réservée aux entreprises' };

    setLoading(true);
    try {
      const newOffer = await companyService.createOffer(offerData);
      setOffers((prev) => [...prev, newOffer]);
      return { success: true, data: newOffer };
    } catch (err) {
      return { success: false, error: err.message || 'Erreur création offre' };
    } finally {
      setLoading(false);
    }
  };

  /**
   * 4. Mettre à jour une offre (PUT - Company only)
   */
  const updateOffer = async (offerId, offerData) => {
    if (!isCompany)
      return { success: false, error: 'Action réservée aux entreprises' };

    setLoading(true);
    try {
      const updatedOffer = await companyService.updateOffer(offerId, offerData);

      setOffers((prev) =>
        prev.map((o) => (o.id === offerId ? updatedOffer : o)),
      );
      if (currentOffer?.id === offerId) {
        setCurrentOffer(updatedOffer);
      }
      return { success: true, data: updatedOffer };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Erreur modification offre',
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * 5. Supprimer une offre (DELETE - Company only)
   */
  const deleteOffer = async (offerId) => {
    if (!isCompany)
      return { success: false, error: 'Action réservée aux entreprises' };

    const previousOffers = [...offers];
    setOffers((prev) => prev.filter((o) => o.id !== offerId));

    try {
      await companyService.deleteOffer(offerId);
      return { success: true };
    } catch (err) {
      setOffers(previousOffers);
      setError("Impossible de supprimer l'offre");
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    if (autoFetch && (isStudent || isCompany)) {
      fetchOffers();
    }
  }, [fetchOffers, autoFetch, isStudent, isCompany]);

  return {
    offers,
    currentOffer,
    loading,
    error,
    fetchOffers,
    fetchOfferDetail,
    createOffer,
    updateOffer,
    deleteOffer,
  };
};
