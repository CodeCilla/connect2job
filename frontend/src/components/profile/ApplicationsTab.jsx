import React from 'react';
import { useApplications } from '../../hooks/useApplications';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Button';
import '../../styles/profile/ApplicationsTab.css';
import { Navigate } from 'react-router';

// --- Configuration des Statuts ---
// Mappe la valeur technique (API) vers le texte affiché (UI)
const STATUS_LABELS = {
  RECEIVED: 'Reçue',
  IN_REVIEW: 'En revue', // Je suppose cette clé pour "En revue", adapte si c'est "IN_REVIEW"
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
  // On gère les clés API (ex: RECEIVED) ou les labels
  const normalized = status?.toLowerCase() || '';
  if (normalized.includes('accept')) return 'status-accepted';
  if (normalized.includes('refus')) return 'status-refused';
  if (normalized.includes('review') || normalized.includes('revue'))
    return 'status-review';
  return 'status-received'; // par défaut (RECEIVED)
};

// --- Vue Étudiant ---
const StudentTable = ({ applications }) => (
  <div className='table-container'>
    <table className='app-table'>
      <thead>
        <tr>
          <th>Offre</th>
          <th>Entreprise</th>
          <th>Localisation</th>
          <th>Date</th>
          <th>Compétences</th>
          <th className='text-center'>Statut</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            {/* Titre de l'offre */}
            <td>{app.offer?.title || 'Titre non disponible'}</td>

            {/* Nom de l'entreprise (imbriqué dans offer.company) */}
            <td>{app.offer?.company?.name || '-'}</td>

            {/* Localisation (priorité à l'offre, sinon celle de l'entreprise) */}
            <td>
              {app.offer?.location || app.offer?.company?.location || '-'}
            </td>

            <td className='date-cell'>{formatDate(app.createdAt)}</td>
            <td className='skills-cell'>
              {/* On vérifie si app.offer.keywords existe et si c'est bien un tableau */}
              {Array.isArray(app.offer?.keywords) &&
              app.offer.keywords.length > 0
                ? app.offer.keywords.join(', ')
                : '-'}
            </td>

            <td>
              <span className={`status-badge ${getStatusClass(app.status)}`}>
                {STATUS_LABELS[app.status] || app.status}
              </span>
            </td>

            <td>
              <Button
                text="Voir l'offre"
                bgColor='var(--color-secondary)'
                textColor='#ffffff'
                to={`/offers/$app.offer.id`}
                fullWidth={false}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Vue Entreprise ---
const CompanyTable = ({ applications, onUpdateStatus }) => (
  <div className='table-container'>
    <table className='app-table'>
      <thead>
        <tr>
          <th>Candidat</th>
          <th>Offre</th>
          <th>Compétences</th>
          <th>Date</th>
          <th className='text-center'>Statut</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td>
              {/* Nom du candidat */}
              <div className='candidate-name'>
                {app.student?.name || 'Inconnu'}
              </div>
              {/* Lien CV */}
              {app.student?.cvLink && (
                <a
                  href={app.student.cvLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='link-cv'
                >
                  Voir CV
                </a>
              )}
            </td>

            <td>{app.offer?.title}</td>

            <td className='skills-cell'>
              {/* Liste des compétences */}
              {Array.isArray(app.student?.skills)
                ? app.student.skills.join(', ')
                : app.student?.skills || '-'}
            </td>

            <td className='date-cell'>{formatDate(app.createdAt)}</td>

            <td className='text-center'>
              <span className={`status-badge ${getStatusClass(app.status)}`}>
                {STATUS_LABELS[app.status] || app.status}
              </span>
            </td>

            <td className='text-center'>
              {/* Select pour changer le statut */}
              <select
                className='status-select'
                value={app.status} // La valeur actuelle (ex: "RECEIVED")
                onChange={(e) => onUpdateStatus(app.id, e.target.value)}
              >
                {/* On utilise les clés API comme value */}
                <option value='RECEIVED'>{STATUS_LABELS.RECEIVED}</option>
                <option value='REVIEWING'>{STATUS_LABELS.REVIEWING}</option>
                <option value='ACCEPTED'>{STATUS_LABELS.ACCEPTED}</option>
                <option value='REFUSED'>{STATUS_LABELS.REFUSED}</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Composant Principal ---
const ApplicationsTab = () => {
  const { isStudent, isCompany } = useAuth();
  const { applications, loading, error, updateStatus } = useApplications(true);

  if (loading) return <div className='loading-state'>Chargement...</div>;
  if (error) return <div className='error-state'>Erreur : {error}</div>;

  return (
    <div className='applications-page'>
      <h1 className='page-title'>
        {isStudent ? 'Mes candidatures' : 'Candidatures reçues'}
      </h1>

      <div className='card'>
        {applications.length === 0 ? (
          <p className='empty-state'>Aucune candidature trouvée.</p>
        ) : (
          <>
            {isStudent && <StudentTable applications={applications} />}
            {isCompany && (
              <CompanyTable
                applications={applications}
                onUpdateStatus={updateStatus}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsTab;
