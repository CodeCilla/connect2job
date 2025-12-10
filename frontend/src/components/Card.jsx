import "../styles/Card.css";
import logo from "../assets/acf-logo.png";
import Button from "./Button";

const Card = ({
    offer,
    showKeywords = true,
    showActions = false,
    onEdit,
    onDelete,
    showContractType = false,
    showLocation = false,
}) => {
    return (
        <div className="card">
            {showContractType && offer?.contractType && (
                <div className="card__contract-badge">{offer.contractType}</div>
            )}
            <div className="card__body">
                <div className="card__title">
                    <img src={logo} alt="logo" />
                    <h2>{offer?.title}</h2>
                </div>
                <div className="card__info">
                    {offer?.company?.name && <h3>{offer.company.name}</h3>}
                    {offer?.company?.location && (
                        <h3>{offer.company.location}</h3>
                    )}
                    {!offer?.company && showLocation && offer?.location && (
                        <h3>{offer.location}</h3>
                    )}
                </div>
                {showActions && offer?._count?.applications !== undefined && (
                    <div className="card__applications-count">
                        <span className="card__applications-label">
                            Candidatures:
                        </span>
                        <span className="card__applications-number">
                            {offer._count.applications}
                        </span>
                    </div>
                )}
                <div className="card__content">{offer?.description}</div>
                {showKeywords &&
                    offer?.keywords &&
                    offer.keywords.length > 0 && (
                        <div className="card__badges">
                            {offer.keywords.map((keyword, index) => (
                                <div key={index}>{keyword}</div>
                            ))}
                        </div>
                    )}
            </div>
            {showActions && (
                <div className="card__actions">
                    {onEdit && (
                        <Button
                            text="Modifier"
                            onClick={() => onEdit(offer)}
                            bgColor="var(--color-primary)"
                            textColor="#fff"
                        />
                    )}
                    {onDelete && (
                        <Button
                            text="Supprimer"
                            onClick={() => onDelete(offer?.id)}
                            bgColor="#fee2e2"
                            textColor="#dc2626"
                        />
                    )}
                </div>
            )}
        </div>
    );
};
export default Card;
