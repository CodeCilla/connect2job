import React from 'react';
import { useOffers } from '../hooks/useOffers';
//import Card from '../components/Card';

export default function OffersList() {
  const { offers, loading, error } = useOffers();

  if (loading) return <p>Loading offers…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!offers.length) return <p>No offers yet.</p>;

  return (
    <div>
      {offers.map((offer) => (
        //<Card key={offer.id} offer={offer} />
        <div key={offer.id} className="offer-item">
          <p>{offer.title}</p>
        </div>
      ))}
    </div>
  );
}