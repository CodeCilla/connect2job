import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <header className="header">
      {/* LEFT SIDE: hamburger + logo */}
      <div className="left-side">
        <div
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* CLICKABLE LOGO */}
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

          <li>
            <button
              onClick={() => handleNavigate("/profil")}
              className={location.pathname.includes("/profil") ? "active" : ""}
            >
              Profil
            </button>
          </li>

          {/* Mobile-only buttons */}
          <div className="mobile-buttons">
            <button className="button connect">Se connecter</button>
            <button className="button subscribe">S'inscrire</button>
          </div>
        </ul>
      </nav>

      {/* Desktop-only buttons */}
      <div className="button-container">
        <button
          className="button connect"
          onClick={() => handleNavigate("/login")}
        >
          Se connecter
        </button>
        <button
          className="button subscribe"
          onClick={() => handleNavigate("/register")}
        >
          S'inscrire
        </button>
      </div>
    </header>
  );
};

export default Header;
