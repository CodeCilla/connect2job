import { useState, useEffect } from "react";
import { useOffers } from "../../hooks/useOffers";
import LoadingSpinner from "../LoadingSpinner";
import "../../styles/OfferForm.css";

const OfferForm = ({ offer, isCreating, onCancel, onSuccess }) => {
    const { createOffer, updateOffer, loading } = useOffers(false);
    const [formData, setFormData] = useState(() => ({
        title: offer?.title || "",
        description: offer?.description || "",
        contractType: offer?.contractType || "",
        location: offer?.location || "",
        keywords: offer?.keywords || [],
    }));
    const [newKeyword, setNewKeyword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (offer) {
            setFormData({
                title: offer.title || "",
                description: offer.description || "",
                contractType: offer.contractType || "",
                location: offer.location || "",
                keywords: offer.keywords || [],
            });
        } else if (isCreating) {
            setFormData({
                title: "",
                description: "",
                contractType: "",
                location: "",
                keywords: [],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offer?.id, isCreating]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddKeyword = () => {
        if (
            newKeyword.trim() &&
            !formData.keywords.includes(newKeyword.trim())
        ) {
            setFormData((prev) => ({
                ...prev,
                keywords: [...prev.keywords, newKeyword.trim()],
            }));
            setNewKeyword("");
        }
    };

    const handleRemoveKeyword = (index) => {
        setFormData((prev) => ({
            ...prev,
            keywords: prev.keywords.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            let result;
            if (isCreating) {
                result = await createOffer(formData);
            } else {
                result = await updateOffer(offer.id, formData);
            }

            if (result.success) {
                onSuccess();
            } else {
                setError(result.error || "Une erreur est survenue");
            }
        } catch (err) {
            setError(err.message || "Une erreur est survenue");
        }
    };

    if (loading && !formData.title) {
        return <LoadingSpinner message="Chargement..." />;
    }

    return (
        <div className="tab-content">
            <div className="offer-form-header">
                <h3>{isCreating ? "Créer une offre" : "Modifier l'offre"}</h3>
                <button className="btn-back" onClick={onCancel}>
                    ← Retour à la liste
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}

            <form className="offer-form" onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="title">Titre de l'offre *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Ex: Développeur Full Stack"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Décrivez l'offre d'emploi..."
                        rows="6"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="contractType">Type de contrat</label>
                        <select
                            id="contractType"
                            name="contractType"
                            value={formData.contractType}
                            onChange={handleInputChange}
                        >
                            <option value="">Sélectionner un type</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="STAGE">Stage</option>
                            <option value="ALTERNANCE">Alternance</option>
                        </select>
                    </div>

                    <div className="form-field">
                        <label htmlFor="location">Localisation</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Ex: Paris, Remote, Lyon..."
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label>Mots-clés</label>
                    <div className="keywords-container">
                        <div className="keywords-tags">
                            {formData.keywords.map((keyword, index) => (
                                <span key={index} className="keyword-tag">
                                    {keyword}
                                    <button
                                        type="button"
                                        className="keyword-remove"
                                        onClick={() =>
                                            handleRemoveKeyword(index)
                                        }
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="keyword-input-container">
                            <input
                                type="text"
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddKeyword();
                                    }
                                }}
                                placeholder="Ajouter un mot-clé"
                            />
                            <button
                                type="button"
                                className="btn-add-keyword"
                                onClick={handleAddKeyword}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={onCancel}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Enregistrement..."
                            : isCreating
                            ? "Créer l'offre"
                            : "Enregistrer les modifications"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OfferForm;
