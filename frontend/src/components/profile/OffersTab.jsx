import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOffers } from "../../hooks/useOffers";
import LoadingSpinner from "../LoadingSpinner";
import OfferForm from "./OfferForm";
import Card from "../Card";
import "../../styles/OffersTab.css";

const OffersTab = () => {
    const { offers, loading, error, fetchOffers, deleteOffer } =
        useOffers(true);
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState("list");
    const [selectedOffer, setSelectedOffer] = useState(null);

    const handleEdit = (offer) => {
        setSelectedOffer(offer);
        setViewMode("form");
    };

    const handleCreate = () => {
        navigate("/offers/create");
    };

    const handleBackToList = () => {
        setViewMode("list");
        setSelectedOffer(null);
        fetchOffers();
    };

    const handleDelete = async (offerId) => {
        if (
            window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?")
        ) {
            const result = await deleteOffer(offerId);
            if (!result.success) {
                alert(result.error || "Erreur lors de la suppression");
            }
        }
    };

    if (viewMode === "form") {
        return (
            <OfferForm
                offer={selectedOffer}
                isCreating={false}
                onCancel={handleBackToList}
                onSuccess={handleBackToList}
            />
        );
    }

    if (loading) {
        return (
            <div className="tab-content">
                <h3>Mes offres d'emploi</h3>
                <LoadingSpinner message="Chargement des offres..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="tab-content">
                <h3>Mes offres d'emploi</h3>
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="tab-content">
            <div className="offers-header">
                <h3>Mes offres d'emploi</h3>
                <button className="btn-create-offer" onClick={handleCreate}>
                    + Créer une offre
                </button>
            </div>
            {offers && offers.length > 0 ? (
                <div className="offers-list">
                    {offers.map((offer) => (
                        <Card
                            key={offer.id}
                            offer={offer}
                            showKeywords={false}
                            showActions={true}
                            showLocation={true}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-offers">
                    <p className="empty-state">
                        Aucune offre créée pour le moment
                    </p>
                    <button className="btn-create-offer" onClick={handleCreate}>
                        + Créer ma première offre
                    </button>
                </div>
            )}
        </div>
    );
};

export default OffersTab;
