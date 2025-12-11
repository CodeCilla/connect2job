import ProfilePicture from '/images/profile.jpg';
import Button from '../Button';

const ProfileHeader = ({ profile, isStudent, onLogout }) => {
  return (
    <div className="profile-header">
      <img className="profile-picture" src={ProfilePicture} alt="Photo de profil" />
      <h2>{profile?.name || 'Nom non renseigné'}</h2>
      <h4>{isStudent ? 'Étudiant' : 'Entreprise'}</h4>
      {profile?.skills && profile.skills.length > 0 && (
        <div className="skills-list">
          {profile.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}
      <Button
        text="Déconnexion"
        bgColor="#dc2626"
        textColor="white"
        onClick={onLogout}
      />
    </div>
  );
};

export default ProfileHeader;

