import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import FacebookIcon from '../assets/facebook.png';
import TwitterIcon from '../assets/twitter.png';
import InstagramIcon from '../assets/instagram.png';
import MalletteIcon from '../assets/mallette.png';

const Footer = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isStudent, isCompany } = useAuth();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand">
              <div className="brand__icon">
                <img className="brand__img" src={MalletteIcon} alt="Icône mallette" />
              </div>
              <div className="brand__title">Connect2Job</div>
            </div>

            <p className="footer__tagline">La plateforme de recrutement dédiée à l'écosystème EKOD.</p>

            <div className="footer__socials">
              <a href="#" aria-label="Facebook">
                <img src={FacebookIcon} alt="Facebook" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src={TwitterIcon} alt="Twitter" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src={InstagramIcon} alt="Instagram" />
              </a>
            </div>
          </div>

          {(!isAuthenticated || isStudent) && (
            <div className="footer__section">
              <h3 className="section__title">Candidats</h3>
              <ul className="footer__list">
                {isStudent ? (
                  <>
                    <li><button onClick={() => navigate('/offers')} type="button">Rechercher un emploi</button></li>
                    <li><button onClick={() => navigate('/profile')} type="button">Mon profil</button></li>
                    <li><button onClick={() => navigate('/profile')} type="button">Mes candidatures</button></li>
                  </>
                ) : (
                  <>
                    <li><button onClick={() => navigate('/')} type="button">Rechercher un emploi</button></li>
                    <li><button onClick={() => navigate('/register')} type="button">Créer un profil</button></li>
                    <li><button onClick={() => navigate('/register')} type="button">Conseils carrière</button></li>
                    <li><button onClick={() => navigate('/register')} type="button">Formation</button></li>
                  </>
                )}
              </ul>
            </div>
          )}

          {(!isAuthenticated || isCompany) && (
            <div className="footer__section">
              <h3 className="section__title">Entreprises</h3>
              <ul className="footer__list">
                {isCompany ? (
                  <>
                    <li><button onClick={() => navigate('/offers/create')} type="button">Publier une offre</button></li>
                    <li><button onClick={() => navigate('/profile')} type="button">Mes offres</button></li>
                    <li><button onClick={() => navigate('/profile')} type="button">Candidats</button></li>
                    <li><button onClick={() => navigate('/profile')} type="button">Mon profil</button></li>
                  </>
                ) : (
                  <>
                    <li><button onClick={() => navigate('/register')} type="button">Publier une offre</button></li>
                    <li><button onClick={() => navigate('/register')} type="button">Rechercher des talents</button></li>
                    <li><button onClick={() => navigate('/register')} type="button">Solutions RH</button></li>
                    <li><button onClick={() => navigate('/register')} type="button">Devenir partenaire</button></li>
                  </>
                )}
              </ul>
            </div>
          )}

          <div className="footer__section">
            <h3 className="section__title">Support</h3>
            <ul className="footer__list">
              <li><button onClick={() => navigate('/register')} type="button">Centre d'aide</button></li>
              <li><button onClick={() => navigate('/register')} type="button">Contact</button></li>
              <li><button onClick={() => navigate('/register')} type="button">Conditions d'utilisation</button></li>
              <li><button onClick={() => navigate('/register')} type="button">Politique de confidentialité</button></li>
            </ul>
          </div>
        </div>

        <div className="footer__copyright">© 2025 Connect2Job. Tous droits réservés.</div>
      </div>
    </footer>
  );
};

export default Footer;
