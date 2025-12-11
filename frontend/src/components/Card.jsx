import "../styles/Card.css";
import logo from "../assets/acf-logo.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Card = ({
  offer,
  showKeywords = true,
  showActions = false,
  onEdit,
  onDelete,
  showLocation = false,
}) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    if (!showActions) {
      navigate(`/offers/${offer.id}`);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation(); 
    onEdit(offer);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); 
    onDelete(offer?.id);
  };

  const isClickable = !showActions;
  
  return (
    <div className={`card ${isClickable ? 'card--clickable' : ''}`} onClick={handleCardClick}>
      <div className="card__badge-container">
        <span className="contract-badge">{offer.contractType}</span>
      </div>
      <div className="card__body">
        <div className="card__title">
          <img src={logo} alt="logo" />
          <h2>{offer?.title}</h2>
        </div>
        <div className="card__info">
          {offer?.company?.name && <h3 className="card__company-name">{offer.company.name}</h3>}
          {(offer?.location || offer?.company?.location) && (
            <h3 className="card__location">{offer?.location || offer?.company?.location}</h3>
          )}
        </div>
        {showActions && offer?._count?.applications !== undefined && (
          <div className="card__applications-count">
            <span className="card__applications-label">Candidatures:</span>
            <span className="card__applications-number">
              {offer._count.applications}
            </span>
          </div>
        )}
        <div className="card__content">{offer?.description}</div>
        {showKeywords && offer?.keywords && offer.keywords.length > 0 && (
          <div className="card__badges">
            {offer.keywords.map((keyword, index) => (
              <div key={index}>{keyword}</div>
            ))}
          </div>
        )}
      </div>
      {showActions && (
        <div className="card__actions" onClick={(e) => e.stopPropagation()}>
          {onEdit && (
            <Button
              text="Modifier"
              onClick={handleEditClick}
              bgColor="var(--color-primary)"
              textColor="#fff"
            />
          )}
          {onDelete && (
            <Button
              text="Supprimer"
              onClick={handleDeleteClick}
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