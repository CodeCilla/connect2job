import React, { useEffect, useState } from 'react';
import { useOffers } from '../hooks/useOffers';
import Card from '../components/Card';
import OffersFilters from '../components/OffersFilters';
import '../styles/OffersList.css';

export default function OffersList() {
  const { offers, loading, error } = useOffers();
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    contractTypes: [],
  });

  // Filtered offers based on the filters state
  const filteredOffers = offers.filter((offer) => {
    const keywordMatch = offer.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
                         offer.description.toLowerCase().includes(filters.keyword.toLowerCase());
    const locationMatch = offer.company?.location.toLowerCase().includes(filters.location.toLowerCase()) ||
                          offer.location.toLowerCase().includes(filters.location.toLowerCase());
    const contractTypeMatch = filters.contractTypes.length === 0 || filters.contractTypes.includes(offer.contractType);

    return keywordMatch && locationMatch && contractTypeMatch;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <p>Loading offers…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!offers.length) return <p>No offers yet.</p>;

  return (
    <div className="OffersPageWrapper">
      <h1>Offres d'emploi</h1>
      <p>Découvrez les opportunités proposées par nos entreprises partenaires</p>

      <div className="OffersLayout">
        <div className="FiltersOffers">
          <OffersFilters onFilter={handleFilterChange} />
        </div>

        <div className="OffersList">
          {filteredOffers.map((offer) => (
            <Card key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
}