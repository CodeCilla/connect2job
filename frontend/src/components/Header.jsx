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

  const { isAuthenticated } = useAuth();

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

        <button onClick={() => handleNavigate("/")} className="logo-button">
          <div className="logo">Connect2Job</div>
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="desktop-nav">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <button
              onClick={() => handleNavigate("/")}
              className={location.pathname === "/" ? "active" : ""}
            >
              Accueil
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigate("/offers")}
              className={location.pathname.includes("/offers") ? "active" : ""}
            >
              Offres d'emploi
            </button>
          </li>

          <li>
            <button
              onClick={() => handleNavigate("/my-offers")}
              className={
                location.pathname.includes("/my-offers") ? "active" : ""
              }
            >
              Entreprises
            </button>
          </li>
        </ul>
      </nav>

      <div className="right-side">
        {/* Mobile-only buttons */}
        <div className="mobile-buttons">
          <button
            onClick={() => handleNavigate("/user")}
            className={location.pathname.includes("/user") ? "active" : ""}
          >
            <FontAwesomeIcon icon={byPrefixAndName.fas['user']} style={{color: "#f56c59ff",}} />
          </button>
        </div>

        {/* Desktop-only buttons */}
        <div className="button-container">
          {isAuthenticated && <>
          <button
            onClick={() => handleNavigate("/user")}
            className={location.pathname.includes("/user") ? "active" : ""}
          >
            <FontAwesomeIcon icon={byPrefixAndName.fas['user']} style={{color: "#f56c59ff",}} />
          </button>
          </>}
          {!isAuthenticated && (
            <>
              <Button
                onClick={() => handleNavigate("/login")}
                text="Se connecter"
                className="button connect"
                bgColor="#f56c59ff"
                textColor="#fff"
              />
              <Button
                onClick={() => handleNavigate("/register")}
                text="S'inscrire"
                className="button subscribe"
                bgColor="#662222"
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
