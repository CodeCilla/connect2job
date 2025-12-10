import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import ProfilePicture from "../assets/profile.jpg";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";

const Profile = () => {
    const { profile, loading, error, updateProfile } = useProfile();
    const { isStudent, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("applications");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        cvLink: "",
        githubLink: "",
        portfolioLink: "",
        skills: [],
        description: "",
        website: "",
        location: "",
    });
    const [newSkill, setNewSkill] = useState("");

    const handleRemoveSkill = (index) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((skill, i) => i !== index),
        });
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill.trim()],
            });
            setNewSkill("");
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const updateData = {
            name: formData.name,
        };

        if (isStudent) {
            updateData.email = formData.email;
            updateData.cvLink = formData.cvLink;
            updateData.githubLink = formData.githubLink;
            updateData.portfolioLink = formData.portfolioLink;
            updateData.skills = formData.skills;
        } else {
            updateData.description = formData.description;
            updateData.website = formData.website;
            updateData.location = formData.location;
        }

        const result = await updateProfile(updateData);
        if (result.success) {
            if (isStudent) {
                setFormData({
                    name: result.data.name || "",
                    email: result.data.email || "",
                    cvLink: result.data.cvLink || "",
                    githubLink: result.data.githubLink || "",
                    portfolioLink: result.data.portfolioLink || "",
                    skills: result.data.skills || [],
                    description: "",
                    website: "",
                    location: "",
                });
            } else {
                setFormData({
                    name: result.data.name || "",
                    description: result.data.description || "",
                    website: result.data.website || "",
                    location: result.data.location || "",
                    email: "",
                    cvLink: "",
                    githubLink: "",
                    portfolioLink: "",
                    skills: [],
                });
            }
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        if (isStudent) {
            setFormData({
                name: profile?.name || "",
                email: profile?.email || "",
                cvLink: profile?.cvLink || "",
                githubLink: profile?.githubLink || "",
                portfolioLink: profile?.portfolioLink || "",
                skills: profile?.skills || [],
                description: "",
                website: "",
                location: "",
            });
            setNewSkill("");
        } else {
            setFormData({
                name: profile?.name || "",
                description: profile?.description || "",
                website: profile?.website || "",
                location: profile?.location || "",
                email: "",
                cvLink: "",
                githubLink: "",
                portfolioLink: "",
                skills: [],
            });
        }
        setIsEditing(false);
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        if (profile) {
            if (isStudent) {
                setFormData({
                    name: profile.name || "",
                    email: profile.email || "",
                    cvLink: profile.cvLink || "",
                    githubLink: profile.githubLink || "",
                    portfolioLink: profile.portfolioLink || "",
                    skills: profile.skills || [],
                    description: "",
                    website: "",
                    location: "",
                });
            } else {
                setFormData({
                    name: profile.name || "",
                    description: profile.description || "",
                    website: profile.website || "",
                    location: profile.location || "",
                    email: "",
                    cvLink: "",
                    githubLink: "",
                    portfolioLink: "",
                    skills: [],
                });
            }
        }
    }, [profile, isStudent]);

    if (loading) {
        return <LoadingSpinner message="Chargement du profil..." />;
    }

    const tabs = isStudent
        ? [
              { id: "applications", label: "Suivi de candidatures" },
              { id: "personal", label: "Informations personnelles" },
          ]
        : [
              { id: "applications", label: "Candidatures reçues" },
              { id: "offers", label: "Mes offres" },
              { id: "personal", label: "Informations de l'entreprise" },
          ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "applications":
                return (
                    <div className="tab-content">
                        <h3>
                            {isStudent
                                ? "Mes candidatures"
                                : "Candidatures reçues"}
                        </h3>
                        <p className="empty-state">
                            Aucune candidature pour le moment
                        </p>
                    </div>
                );
            case "personal":
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
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
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
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value,
                                                })
                                            }
                                            disabled
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="cvLink">Lien CV</label>
                                        <input
                                            type="url"
                                            id="cvLink"
                                            value={formData.cvLink}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    cvLink: e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="githubLink">
                                            Lien GitHub
                                        </label>
                                        <input
                                            type="url"
                                            id="githubLink"
                                            value={formData.githubLink}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    githubLink: e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="portfolioLink">
                                            Lien Portfolio
                                        </label>
                                        <input
                                            type="url"
                                            id="portfolioLink"
                                            value={formData.portfolioLink}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    portfolioLink:
                                                        e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="skills">
                                            Compétences
                                        </label>
                                        {isEditing ? (
                                            <div className="skills-input-container">
                                                <div className="skills-tags">
                                                    {formData.skills.map(
                                                        (skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="skill-tag-editable"
                                                            >
                                                                {skill}
                                                                <button
                                                                    type="button"
                                                                    className="skill-remove"
                                                                    onClick={() =>
                                                                        handleRemoveSkill(
                                                                            index
                                                                        )
                                                                    }
                                                                    aria-label="Supprimer"
                                                                >
                                                                    ×
                                                                </button>
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                                <div className="skill-add-container">
                                                    <input
                                                        type="text"
                                                        id="newSkill"
                                                        value={newSkill}
                                                        onChange={(e) =>
                                                            setNewSkill(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Compétences..."
                                                    />
                                                    <Button
                                                        text="Ajouter"
                                                        bgColor="#F56C59"
                                                        textColor="white"
                                                        type="button"
                                                        className="skill-add-button"
                                                        onClick={handleAddSkill}
                                                    ></Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="skills-display">
                                                {formData.skills.length > 0 ? (
                                                    formData.skills.map(
                                                        (skill, index) => (
                                                            <span
                                                                key={index}
                                                                className="skill-tag"
                                                            >
                                                                {skill}
                                                            </span>
                                                        )
                                                    )
                                                ) : (
                                                    <span className="no-skills">
                                                        Aucune compétence
                                                        renseignée
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="form-field">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            rows="4"
                                            placeholder="Décrivez votre entreprise..."
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="website">
                                            Site web
                                        </label>
                                        <input
                                            type="url"
                                            id="website"
                                            value={formData.website}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    website: e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="location">
                                            Localisation
                                        </label>
                                        <input
                                            type="text"
                                            id="location"
                                            value={formData.location}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: e.target.value,
                                                })
                                            }
                                            disabled={!isEditing}
                                            placeholder="Localisation"
                                        />
                                    </div>
                                </>
                            )}
                            {!isEditing && (
                                <Button
                                    text="Modifier"
                                    bgColor="var(--color-primary)"
                                    textColor="white"
                                    onClick={handleEdit}
                                ></Button>
                            )}
                            {isEditing && (
                                <div className="form-actions">
                                    <Button
                                        text="Enregistrer"
                                        bgColor="var(--color-primary)"
                                        textColor="white"
                                        onClick={handleSave}
                                    ></Button>
                                    <Button
                                        text="Annuler"
                                        bgColor="#FBF3EA"
                                        textColor="#662222"
                                        onClick={handleCancel}
                                    >
                                        Annuler
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "offers":
                return (
                    <div className="tab-content">
                        <h3>Mes offres d'emploi</h3>
                        <p className="empty-state">
                            Aucune offre créée pour le moment
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="profile-container">
            {error && <div className="error-message">{error}</div>}
            <div className="profile-main">
                <div className="profile-header">
                    <img
                        className="profile-picture"
                        src={ProfilePicture}
                        alt="Photo de profil"
                    />
                    <h2>{profile?.name || "Nom non renseigné"}</h2>
                    <h4>{isStudent ? "Étudiant" : "Entreprise"}</h4>
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
                        onClick={handleLogout}
                    ></Button>
                </div>
                <div className="profile-content">
                    <div className="tab-section">
                        <ul className="tab-list">
                            {tabs.map((tab) => (
                                <li
                                    key={tab.id}
                                    className={
                                        activeTab === tab.id ? "active" : ""
                                    }
                                    onClick={() => handleTabChange(tab.id)}
                                >
                                    {tab.label}
                                </li>
                            ))}
                        </ul>
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
