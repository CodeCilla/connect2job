import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import "../styles/Header.css";
import { useAuth } from "../hooks/useAuth.jsx";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const { isAuthenticated, isStudent, isCompany } = useAuth();

  return (
    <header className="header">
      <div className="left-side">
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <button
          className="button-header logo-button"
          onClick={() => handleNavigate("/")}
        >
          <div className="logo">Connect2Job</div>
        </button>
      </div>

      <nav className="desktop-nav">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <button
              className={`button-header ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={() => handleNavigate("/")}
            >
              Accueil
            </button>
          </li>

          {isStudent && (
            <li>
              <button
                className={`button-header ${
                  location.pathname.includes("/offers") ? "active" : ""
                }`}
                onClick={() => handleNavigate("/offers")}
              >
                Offres d'emploi
              </button>
            </li>
          )}

          {isCompany && (
            <>
              <li>
                <button
                  className={`button-header ${
                    location.pathname.includes("/profile") ? "active" : ""
                  }`}
                  onClick={() => handleNavigate("/profile")}
                >
                  Mes offres
                </button>
              </li>
              <li>
                <button
                  className={`button-header ${
                    location.pathname.includes("/offers/create") ? "active" : ""
                  }`}
                  onClick={() => handleNavigate("/offers/create")}
                >
                  Créer une offre
                </button>
              </li>
            </>
          )}

          {!isAuthenticated && (
            <>
              <li>
                <button
                  className={`button-header ${
                    location.pathname.includes("/offers") ? "active" : ""
                  }`}
                  onClick={() => handleNavigate("/login")}
                >
                  Offres d'emploi
                </button>
              </li>
              <li>
                <button
                  className={`button-header ${
                    location.pathname.includes("/entreprises") ? "active" : ""
                  }`}
                  onClick={() => handleNavigate("/login")}
                >
                  Entreprises
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="right-side">
        <div className="mobile-buttons">
          {isAuthenticated ? (
            <button
              className={`button-header ${
                location.pathname.includes("/profile") ? "active" : ""
              }`}
              onClick={() => handleNavigate("/profile")}
            >
              <i className="fa-solid fa-user fa-2xl"></i>
            </button>
          ) : (
            <>
              <button
                className="button-header"
                onClick={() => handleNavigate("/login")}
              >
                <i className="fa-solid fa-sign-in-alt fa-2xl"></i>
              </button>
            </>
          )}
        </div>

        <div className="button-container">
          {isAuthenticated && (
            <button
              className={`button-header ${
                location.pathname.includes("/profile") ? "active" : ""
              }`}
              onClick={() => handleNavigate("/profile")}
            >
              <img src="/src/assets/profile.jpg" alt="User Profile" className="profile-image" />
            </button>
          )}

          {!isAuthenticated && (
            <>
              <Button
                onClick={() => handleNavigate("/login")}
                text="Se connecter"
                className="button connect"
                bgColor="var(--color-secondary)"
                textColor="#fff"
              />
              <Button
                onClick={() => handleNavigate("/register")}
                text="S'inscrire"
                className="button subscribe"
                bgColor="var(--color-primary)"
                textColor="#fff"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
