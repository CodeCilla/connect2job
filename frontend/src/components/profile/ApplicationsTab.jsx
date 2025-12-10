import React from 'react';
import { useApplications } from '../../hooks/useApplications';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button'; // Pas utilisé ici
// import { Navigate } from 'react-router'; // Pas utilisé ici
import '../../styles/profile/ApplicationsTab.css';

// --- Configuration des Statuts ---
// Assure-toi que ces clés correspondent exactement à ce qu'il y a dans ta base de données (ex: "IN_REVIEW" et non "REVIEWING")
const STATUS_LABELS = {
  RECEIVED: 'Reçue',
  IN_REVIEW: 'En revue',
  ACCEPTED: 'Acceptée',
  REJECTED: 'Refusée',
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  });
};

const getStatusClass = (status) => {
  const normalized = status?.toLowerCase() || '';
  if (normalized.includes('accept')) return 'status-accepted';
  if (normalized.includes('refus') || normalized.includes('reject')) return 'status-refused';
  if (normalized.includes('review') || normalized.includes('revue')) return 'status-review';
  return 'status-received';
};

// --- Composant Carte Unique ---
const ApplicationCard = ({ application, isStudent, isCompany, onUpdateStatus }) => {
  const { offer, student, status, createdAt } = application;

  const title = isStudent
    ? offer?.title
    : `${offer?.title} (Candidat: ${student?.name || 'Inconnu'})`;

  const subtitle = isStudent ? (
    offer?.company?.name
  ) : (


                  <Button
                onClick={student?.cvLink}
                text="Voir le CV"
                bgColor="var(--color-secondary)"
                textColor="#fff"
              />
  );

  const location = offer?.location || offer?.company?.location || 'Localisation inconnue';
  // Correction: on utilise offer.keywords pour les étudiants, student.skills pour les entreprises
  const skills = isStudent ? (offer?.keywords || []) : (student?.skills || []);
  const contractType = offer?.contractType || 'Type de contrat inconnu';
  const description = offer?.description || 'Description non disponible.';

  return (
    <article className='app-card'>
      {/* Contenu Central */}
      <div className='app-card__content'>
        <header className='app-card__header'>
          <h3 className='app-card__title'>{title}</h3>
          <span className='app-card__company'>{subtitle}</span>
          <span className='app-card__date'>• {formatDate(createdAt)}</span>
        </header>

        <div className='app-card__meta'>
          <div className='app-card__meta--item'>
            <i className='fa-solid fa-location-dot'></i> <span>{location}</span>
          </div>
          <div className='app-card__meta--item'>
            <i className='fa-solid fa-briefcase'></i>
            <span>{contractType}</span>
          </div>
        </div>

        <p className='app-card__description'>{description}</p>

        {/* Tags de compétences (Code simplifié comme demandé précédemment) */}
        <div className='app-card__tags'>
          {skills.map((skill, idx) => (
            <span key={idx} className='app-card__tags--pill'>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Actions / Statut */}
      <div className='app-card__actions'>
        {/* Vue Étudiant : Badge simple */}
        {isStudent && (
          <span className={`status-badge-pill ${getStatusClass(status)}`}>
            {STATUS_LABELS[status] || status}
          </span>
        )}

        {/* Vue Entreprise : Badge + Selecteur */}
        {isCompany && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              alignItems: 'flex-end',
            }}
          >
            {/* 1. Badge visuel du statut actuel */}
            <span className={`status-badge-pill ${getStatusClass(status)}`}>
              {STATUS_LABELS[status] || status}
            </span>

            {/* 2. Selecteur pour changer le statut */}
            {/* La prop 'value={status}' force le select à afficher le statut actuel */}
            <select
              className='status-select-card'
              value={status} 
              onChange={(e) => onUpdateStatus(application.id, e.target.value)}
            >
              {/* Note: Les valeurs 'value' doivent correspondre aux clés de STATUS_LABELS */}
              <option value='RECEIVED'>{STATUS_LABELS.RECEIVED}</option>
              <option value='IN_REVIEW'>{STATUS_LABELS.IN_REVIEW}</option>
              <option value='ACCEPTED'>{STATUS_LABELS.ACCEPTED}</option>
              <option value='REJECTED'>{STATUS_LABELS.REJECTED}</option>
            </select>
          </div>
        )}
      </div>
    </article>
  );
};

// --- Composant Principal (inchangé sauf import) ---
const ApplicationsTab = () => {
  const { isStudent, isCompany } = useAuth();
  const { applications, loading, error, updateStatus } = useApplications();

  if (loading) return <div className='loading-state'>Chargement...</div>;
  if (error) return <div className='error-state'>Erreur : {error}</div>;

  return (
    <div className='applications-page'>
      <h3 className='page-title' style={{ marginBottom: '1.5rem' }}>
        {isStudent ? 'Mes candidatures' : 'Candidatures reçues'}
      </h3>

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