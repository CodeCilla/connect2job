import Button from '../Button';
import SkillsInput from './SkillsInput';

const PersonalInfoForm = ({
  formData,
  isStudent,
  isEditing,
  newSkill,
  onFormDataChange,
  onSkillChange,
  onAddSkill,
  onRemoveSkill,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <div className="tab-content">
      <h3>Informations de base</h3>
      <div className="info-form">
        <div className="form-field">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        {isStudent ? (
          <>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
                disabled
              />
            </div>
            <div className="form-field">
              <label htmlFor="cvLink">Lien CV</label>
              <input
                type="url"
                id="cvLink"
                value={formData.cvLink}
                onChange={(e) => onFormDataChange({ ...formData, cvLink: e.target.value })}
                disabled={!isEditing}
                placeholder="https://..."
              />
            </div>
            <div className="form-field">
              <label htmlFor="githubLink">Lien GitHub</label>
              <input
                type="url"
                id="githubLink"
                value={formData.githubLink}
                onChange={(e) => onFormDataChange({ ...formData, githubLink: e.target.value })}
                disabled={!isEditing}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="form-field">
              <label htmlFor="portfolioLink">Lien Portfolio</label>
              <input
                type="url"
                id="portfolioLink"
                value={formData.portfolioLink}
                onChange={(e) => onFormDataChange({ ...formData, portfolioLink: e.target.value })}
                disabled={!isEditing}
                placeholder="https://..."
              />
            </div>
            <div className="form-field">
              <label htmlFor="skills">Compétences</label>
              <SkillsInput
                skills={formData.skills}
                newSkill={newSkill}
                onSkillChange={onSkillChange}
                onAddSkill={onAddSkill}
                onRemoveSkill={onRemoveSkill}
                isEditing={isEditing}
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
                disabled={!isEditing}
                rows="4"
                placeholder="Décrivez votre entreprise..."
              />
            </div>
            <div className="form-field">
              <label htmlFor="website">Site web</label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) => onFormDataChange({ ...formData, website: e.target.value })}
                disabled={!isEditing}
                placeholder="https://..."
              />
            </div>
            <div className="form-field">
              <label htmlFor="location">Localisation</label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => onFormDataChange({ ...formData, location: e.target.value })}
                disabled={!isEditing}
                placeholder="Localisation"
              />
            </div>
          </>
        )}
        {!isEditing && (
          <Button text="Modifier" bgColor="var(--color-primary)" textColor="white" onClick={onEdit} />
        )}
        {isEditing && (
          <div className="form-actions">
            <Button
              text="Enregistrer"
              bgColor="var(--color-primary)"
              textColor="white"
              onClick={onSave}
            />
            <Button
              text="Annuler"
              bgColor="#FBF3EA"
              textColor="#662222"
              onClick={onCancel}
            >
              Annuler
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;

