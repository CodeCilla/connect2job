import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import PersonalInfoForm from "../components/profile/PersonalInfoForm";
import ApplicationsTab from "../components/profile/ApplicationsTab";
import OffersTab from "../components/profile/OffersTab";

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

            console.log(profile);
        }
    }, [profile, isStudent]);

    if (loading) {
        return <LoadingSpinner message="Chargement du profil..." fullScreen />;
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
                return <ApplicationsTab isStudent={isStudent} />;
            case "personal":
                return (
                    <PersonalInfoForm
                        formData={formData}
                        isStudent={isStudent}
                        isEditing={isEditing}
                        newSkill={newSkill}
                        onFormDataChange={setFormData}
                        onSkillChange={setNewSkill}
                        onAddSkill={handleAddSkill}
                        onRemoveSkill={handleRemoveSkill}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );
            case "offers":
                return <OffersTab />;
            default:
                return null;
        }
    };

    return (
        <div className="profile-container">
            {error && <div className="error-message">{error}</div>}
            <div className="profile-main">
                <ProfileHeader
                    profile={profile}
                    isStudent={isStudent}
                    onLogout={handleLogout}
                />
                <div className="profile-content">
                    <div className="tab-section">
                        <ProfileTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
