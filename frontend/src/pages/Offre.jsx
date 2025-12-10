import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOffers } from "../hooks/useOffers";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import ApplicationModal from "../components/ApplicationModal";
import logo from "../assets/acf-logo.png";
import "../styles/Offre.css";

const Offre = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentOffer, loading, error, fetchOfferDetail } = useOffers(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            fetchOfferDetail(id);
        }
    }, [id, fetchOfferDetail]);

    if (loading) {
        return (
            <div className="offre-page">
                <LoadingSpinner message="Chargement de l'offre..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="offre-page">
                <div className="error-message">{error}</div>
                <Button
                    text="Retour"
                    onClick={() => navigate(-1)}
                    bgColor="var(--color-secondary)"
                    textColor="#fff"
                />
            </div>
        );
    }

    if (!currentOffer) {
        return (
            <div className="offre-page">
                <div className="error-message">Offre introuvable</div>
                <Button
                    text="Retour"
                    onClick={() => navigate(-1)}
                    bgColor="var(--color-secondary)"
                    textColor="#fff"
                />
            </div>
        );
    }

    const handleApply = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="offre-page">
            <div className="button__offre">
                <Button
                    text="Retour"
                    onClick={() => navigate(-1)}
                    bgColor="var(--color-secondary)"
                    textColor="#fff"
                />
            </div>
            <div className="company">
                <div className="company__statut">
                    <span className="contract-badge">
                        {currentOffer.contractType}
                    </span>
                </div>
                <div className="company__title">
                    <img src={logo} alt="logo" />
                    <h2>{currentOffer.title}</h2>
                </div>
                <div className="company__description">
                    {currentOffer?.company?.description}
                </div>
                <div className="company__location">
                    <div>
                        <h3>{currentOffer.company?.name}</h3>
                        <span className="company__location-location">
                            {currentOffer?.location}
                        </span>
                    </div>
                    <div>
                        <Button
                            text="Postuler"
                            onClick={handleApply}
                            bgColor="var(--color-secondary)"
                            textColor="#fff"
                        />
                    </div>
                </div>
            </div>
            <div className="offre">
                <h2>Description du poste</h2>
                <p>{currentOffer.description}</p>
            </div>
            {currentOffer.keywords && currentOffer.keywords.length > 0 && (
                <div className="offre__keywords">
                    <h3>Compétences recherchées</h3>
                    <div className="keywords-list">
                        {currentOffer.keywords.map((keyword, index) => (
                            <span key={index} className="keyword-tag">
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <ApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                offerId={currentOffer.id}
                offerTitle={currentOffer.title}
            />
        </div>
    );
};

export default Offre;
