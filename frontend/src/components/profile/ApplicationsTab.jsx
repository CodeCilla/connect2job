import React from 'react';
import { useApplications } from '../../hooks/useApplications';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button'; // Assure-toi que ce chemin est bon
import { Navigate } from 'react-router';
import '../../styles/profile/ApplicationsTab.css'; // On pointe vers le nouveau CSS

// --- Configuration des Statuts ---
const STATUS_LABELS = {
  RECEIVED: 'Reçue',
  IN_REVIEW: 'En revue', // Alias au cas où
  ACCEPTED: 'Acceptée',
  REJECTED: 'Refusée',
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  // Optionnel : tu pourrais utiliser une lib comme 'date-fns' pour "il y a 2 jours"
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
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

// --- Composant Carte Unique (Reusable) ---
const ApplicationCard = ({
  application,
  isStudent,
  isCompany,
  onUpdateStatus,
}) => {
  const { offer, student, status, createdAt } = application;

  // Données dynamiques selon le rôle
  const title = isStudent
    ? offer?.title
    : `${offer?.title} (Candidat: ${student?.name || 'Inconnu'})`;
  const subtitle = isStudent ? (
    offer?.company?.name
  ) : (
    <a
      href={student?.cvLink}
      target='_blank'
      rel='noreferrer'
      style={{ textDecoration: 'underline' }}
    >
      Voir le CV
    </a>
  );
  const location =
    offer?.location || offer?.company?.location || 'Localisation inconnue';
  const skills = isStudent ? offer?.keywords : student?.skills;
  const contractType = offer?.contractType || 'Type de contrat inconnu';
  const description =
    offer?.description ||
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus ante, ullamcorper quis porta nec, accumsan at leo.'; // Placeholder si pas de desc dans l'API

  return (
    <article className='app-card'>
      {/* 1. Logo (Placeholder ou Image réelle si dispo) */}

      {/* 2. Contenu Central */}
      <div className='app-card-content'>
        <header className='app-card-header'>
          <h3 className='app-card-title'>{title}</h3>
          <span className='app-card-company'>{subtitle}</span>
          <span className='app-card-date'>• {formatDate(createdAt)}</span>
        </header>

        <div className='app-card-meta'>
          <div className='meta-item'>
            <i className='fa-solid fa-location-dot'></i> <span>{location}</span>
          </div>
          <div className='meta-item'>
            <i className='fa-solid fa-briefcase'></i>
            <span>{contractType}</span>{' '}
            {/* Valeur en dur ou app.offer.contractType */}
          </div>
        </div>

        <p className='app-card-description'>{description}</p>

        <div className='app-card-tags'>
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill, idx) => (
              <span key={idx} className='tag-pill'>
                {skill}
              </span>
            ))
          ) : (
            <span className='tag-pill'>Général</span>
          )}
        </div>
      </div>

      {/* 3. Actions / Statut (Droite ou Bas) */}
      <div className='app-card-actions'>
        {isStudent && (
          <span className={`status-badge-pill ${getStatusClass(status)}`}>
            {STATUS_LABELS[status] || status}
          </span>
        )}

        {isCompany && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'flex-end',
            }}
          >
            <select
              className='status-select-card'
              value={status}
              onChange={(e) => onUpdateStatus(application.id, e.target.value)}
            >
              <option value='RECEIVED'>{STATUS_LABELS.RECEIVED}</option>
              <option value='REVIEWING'>{STATUS_LABELS.IN_REVIEW}</option>
              <option value='ACCEPTED'>{STATUS_LABELS.ACCEPTED}</option>
              <option value='REFUSED'>{STATUS_LABELS.REJECTED}</option>
            </select>
          </div>
        )}
      </div>
    </article>
  );
};

// --- Composant Principal ---
const ApplicationsTab = () => {
  const { isStudent, isCompany } = useAuth();
  // J'ai enlevé le paramètre `true` de useApplications si ce n'est pas nécessaire, à vérifier selon ton hook
  const { applications, loading, error, updateStatus } = useApplications();

  if (loading) return <div className='loading-state'>Chargement...</div>;
  if (error) return <div className='error-state'>Erreur : {error}</div>;

  return (
    <div className='applications-page'>
      <h1 className='page-title' style={{ marginBottom: '1.5rem' }}>
        {isStudent ? 'Mes candidatures' : 'Candidatures reçues'}
      </h1>

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
