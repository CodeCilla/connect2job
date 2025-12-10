import Button from '../Button';

const SkillsInput = ({ skills, newSkill, onSkillChange, onAddSkill, onRemoveSkill, isEditing }) => {
  if (!isEditing) {
    return (
      <div className="skills-display">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))
        ) : (
          <span className="no-skills">Aucune compétence renseignée</span>
        )}
      </div>
    );
  }

  return (
    <div className="skills-input-container">
      <div className="skills-tags">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag-editable">
            {skill}
            <button
              type="button"
              className="skill-remove"
              onClick={() => onRemoveSkill(index)}
              aria-label="Supprimer"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="skill-add-container">
        <input
          type="text"
          id="newSkill"
          value={newSkill}
          onChange={(e) => onSkillChange(e.target.value)}
          placeholder="Compétences..."
        />
        <Button
          text="Ajouter"
          bgColor="#F56C59"
          textColor="white"
          type="button"
          className="skill-add-button"
          onClick={onAddSkill}
        />
      </div>
    </div>
  );
};

export default SkillsInput;

