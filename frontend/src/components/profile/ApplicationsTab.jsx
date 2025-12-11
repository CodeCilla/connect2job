import React from 'react';
import { useApplications } from '../../hooks/useApplications';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button'; // Plus besoin du bouton ici, on fait un lien propre
import '../../styles/profile/ApplicationsTab.css';

const STATUS_LABELS = {
  RECEIVED: 'Reçue',
  IN_REVIEW: 'En revue',
  INTERVIEW: 'Entretien',
  ACCEPTED: 'Acceptée',
  REJECTED: 'Refusée',
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const getStatusClass = (status) => {
  const normalized = status?.toLowerCase() || '';
  if (normalized.includes('accept')) return 'status-accepted';
  if (normalized.includes('refus') || normalized.includes('reject'))
    return 'status-refused';
  if (normalized.includes('review') || normalized.includes('revue'))
    return 'status-review';
  return 'status-received';
};

const ApplicationCard = ({
  application,
  isStudent,
  isCompany,
  onUpdateStatus,
}) => {
  const { offer, student, status, createdAt, coverLetter } = application;

  // --- LOGIQUE D'AFFICHAGE --- //

  // 1. Le Titre Principal
  const displayTitle = isCompany
    ? student?.name || 'Candidat Inconnu' // Recruteur voit le nom du candidat
    : offer?.title || 'Titre non disponible'; // Étudiant voit le titre du poste

  // 2. Le Sous-titre (Contexte)
  let displaySubtitle;
  if (isStudent) {
    displaySubtitle = (
      <span className='app-card__company-name'>{offer?.company?.name}</span>
    );
  } else {
    // Vue Entreprise : On affiche pour quelle offre il postule
    displaySubtitle = (
      <span className='app-card__offer-context'>
        Candidature pour : <strong>{offer?.title}</strong>
      </span>
    );
  }

  // 3. Compétences à afficher
  const skills = isStudent ? offer?.keywords || [] : student?.skills || [];

  // 4. Localisation (Uniquement pertinent pour l'étudiant qui cherche un poste)
  const location = isStudent
    ? offer?.location || offer?.company?.location
    : null;

  return (
    <article className='app-card'>
      <div className='app-card__content'>
        {/* EN-TÊTE : PROFIL / OFFRE */}
        <header className='app-card__header'>
          <div className='app-card__title-row'>
            <h4 className='app-card__title'>{displayTitle}</h4>
          </div>

          <div className='app-card__subtitle-wrapper'>{displaySubtitle}</div>

          {isStudent && (
            <span className='app-card__date'>
              <i className='fa-regular fa-calendar'></i> {formatDate(createdAt)}
            </span>
          )}
        </header>

        {/* DETAILS : Localisation (Etudiant) ou Type contrat */}
        <div className='app-card__meta'>
          {location && (
            <div className='app-card__meta--item'>
              <i className='fa-solid fa-location-dot'></i>{' '}
              <span>{location}</span>
            </div>
          )}
          {/* On peut afficher le contrat pour les deux */}
          <div className='app-card__meta--item'>
            <i className='fa-solid fa-briefcase'></i>
            <span>{offer?.contractType || 'Contrat'}</span>
          </div>
        </div>

        {/* COMPÉTENCES / TAGS */}
        {skills.length > 0 && (
          <div className='app-card__tags'>
            {skills.map((skill, idx) => (
              <span key={idx} className='app-card__tags--pill'>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ACTIONS / STATUT */}
      <div className='app-card__actions'>
        {isStudent && (
          <span className={`status-badge-pill ${getStatusClass(status)}`}>
            {STATUS_LABELS[status] || status}
          </span>
        )}

        {isCompany && (
          <div>
            {/* Badge visuel coloré */}
            <div className={`status-dot ${getStatusClass(status)}`}></div>

            <select
              className='status-select-card'
              value={status}
              onChange={(e) => onUpdateStatus(application.id, e.target.value)}
            >
              <option value='RECEIVED'>{STATUS_LABELS.RECEIVED}</option>
              <option value='IN_REVIEW'>{STATUS_LABELS.IN_REVIEW}</option>
              <option value='INTERVIEW'>{STATUS_LABELS.INTERVIEW}</option>
              <option value='ACCEPTED'>{STATUS_LABELS.ACCEPTED}</option>
              <option value='REJECTED'>{STATUS_LABELS.REJECTED}</option>
            </select>
          </div>
        )}
        <div className='app-card__buttons'>
          {(() => {
            const targetLink = isCompany
              ? student?.cvLink
              : `/offers/${offer?.id}`;
            const buttonText = isCompany ? 'Voir le CV' : "Voir l'annonce";

            // Si aucun lien n'existe pour le cas donné, on n'affiche rien
            if (!targetLink) return null;

            return (
              <Button
                onClick={() =>
                  window.open(targetLink, '_blank', 'noopener,noreferrer')
                }
                text={buttonText}
                bgColor='var( --color-bg-alt)'
                textColor='var(--color-primary)'
              />
            );
          })()}
          {isCompany && coverLetter && (
            <Button
              onClick={() =>
                window.open(coverLetter, '_blank', 'noopener,noreferrer')
              }
              text='Lettre de motivation'
              bgColor='var( --color-bg-alt)' /* Fond blanc pour différencier */
              textColor='var(--color-primary)' /* Texte couleur primaire */
              style={{
                border: '1px solid var(--color-primary)',
              }} /* Bordure optionnelle */
            />
          )}
        </div>
      </div>
    </article>
  );
};

const ApplicationsTab = () => {
  const { isStudent, isCompany } = useAuth();
  const { applications, loading, error, updateStatus } = useApplications();

  if (loading) return <div className='loading-state'>Chargement...</div>;
  if (error) return <div className='error-state'>Erreur : {error}</div>;

  return (
    <div className='tab-content'>
      <h3>{isStudent ? 'Mes candidatures' : 'Gestion des candidatures'}</h3>
      <div className='applications-list'>
        {applications.length === 0 ? (
          <p className='empty-state'>Aucune candidature trouvée.</p>
        ) : (
          applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              isStudent={isStudent}
              isCompany={isCompany}
              onUpdateStatus={updateStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationsTab;
