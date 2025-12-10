const ApplicationsTab = ({ isStudent }) => {
  return (
    <div className="tab-content">
      <h3>{isStudent ? 'Mes candidatures' : 'Candidatures reçues'}</h3>
      <p className="empty-state">Aucune candidature pour le moment</p>
    </div>
  );
};

export default ApplicationsTab;

