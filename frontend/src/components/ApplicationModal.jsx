import { useState } from "react";
import { useApplications } from "../hooks/useApplications";
import LoadingSpinner from "./LoadingSpinner";
import "../styles/ApplicationModal.css";

const ApplicationModal = ({ isOpen, onClose, offerId, offerTitle }) => {
    const { submitApplication, loading } = useApplications(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!coverLetter.trim()) {
            setError("Veuillez rédiger une lettre de motivation");
            return;
        }

        const result = await submitApplication(offerId, coverLetter);
        if (result.success) {
            setSuccess(true);
        } else {
            setError(
                result.error || "Erreur lors de l'envoi de la candidature"
            );
        }
    };

    const handleClose = () => {
        setCoverLetter("");
        setError(null);
        setSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>
                        Postuler à l'offre : <strong>{offerTitle}</strong>
                    </h2>
                    <button className="modal-close" onClick={handleClose}>
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    {success ? (
                        <div className="success-message">
                            <p>Votre candidature a été envoyée avec succès !</p>
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit}>
                                <div className="form-field">
                                    <label htmlFor="coverLetter">
                                        Lettre de motivation *
                                    </label>
                                    <textarea
                                        id="coverLetter"
                                        value={coverLetter}
                                        onChange={(e) =>
                                            setCoverLetter(e.target.value)
                                        }
                                        placeholder="Rédigez votre lettre de motivation ici..."
                                        rows="10"
                                        required
                                    />
                                    <span className="char-count">
                                        {coverLetter.length} caractères
                                    </span>
                                </div>
                                {error && (
                                    <div className="error-message">{error}</div>
                                )}
                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={handleClose}
                                        disabled={loading}
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Envoi en cours..."
                                            : "Envoyer ma candidature"}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal;
