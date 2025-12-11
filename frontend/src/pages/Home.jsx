import Button from "../components/Button";
import "../styles/Home.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import hommePortrait from "../assets/jeune-homme-barbu-avec-chemise-rayee.jpg";
import femmePortrait from "../assets/portrait-d-une-jeune-femme-d-affaires-tenant-des-lunettes-a-la-main-sur-fond-gris.jpg";

const Home = () => {
    const { isAuthenticated, isStudent, isCompany } = useAuth();
    const navigate = useNavigate();

    return (
        <main className="home">
            <section className="home__hero">
                <div className="home__hero-inner">
                    {!isAuthenticated && (
                        <>
                            <h1 className="home__title">
                                Trouvez votre <br />
                                <span>opportunité</span> idéale
                            </h1>
                            <div className="home__cta">
                                <Button
                                    text="Trouvez votre entreprise"
                                    onClick={() => navigate("/register")}
                                    bgColor="var(--color-secondary)"
                                    textColor="#fff"
                                />
                                <Button
                                    text="Trouvez votre alternant"
                                    onClick={() => navigate("/register")}
                                    bgColor="#FBF3EA"
                                    textColor="var(--color-secondary)"
                                />
                            </div>
                        </>
                    )}
                    {isStudent && (
                        <>
                            <h1 className="home__title">
                                Trouvez votre <br />
                                <span>alternance</span> idéale
                            </h1>
                            <div className="home__cta">
                                <Button
                                    text="Voir les offres d'emploi"
                                    onClick={() => navigate("/offers")}
                                    bgColor="var(--color-secondary)"
                                    textColor="#fff"
                                />
                                <Button
                                    text="Mon profil"
                                    onClick={() => navigate("/profile")}
                                    bgColor="#FBF3EA"
                                    textColor="var(--color-secondary)"
                                />
                            </div>
                        </>
                    )}
                    {isCompany && (
                        <>
                            <h1 className="home__title">
                                Trouvez votre <br />
                                <span>alternant</span> idéal
                            </h1>
                            <div className="home__cta">
                                <Button
                                    text="Publier une offre"
                                    onClick={() => navigate("/offers/create")}
                                    bgColor="var(--color-secondary)"
                                    textColor="#fff"
                                />
                                <Button
                                    text="Mes offres"
                                    onClick={() => navigate("/profile")}
                                    bgColor="#FBF3EA"
                                    textColor="var(--color-secondary)"
                                />
                            </div>
                        </>
                    )}
                </div>
            </section>
            <section className="home__stats">
                <div className="stat-card">
                    <div className="stat-icon" aria-hidden>
                        🏢
                    </div>
                    <div>
                        <p className="stat-value">450+</p>
                        <p className="stat-label">Entreprises partenaires</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" aria-hidden>
                        👥
                    </div>
                    <div>
                        <p className="stat-value">2,800+</p>
                        <p className="stat-label">Apprenants connectés</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" aria-hidden>
                        👥
                    </div>
                    <div>
                        <p className="stat-value">800+</p>
                        <p className="stat-label">Recrutements réussis</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" aria-hidden>
                        👥
                    </div>
                    <div>
                        <p className="stat-value">1200+</p>
                        <p className="stat-label">Offres d'emplois</p>
                    </div>
                </div>
            </section>

            <section className="home__partners">
                <h2 className="section-title-partners">
                    <span className="accent">Elles</span> nous ont fait
                    confiance, pourquoi pas <span className="accent">vous</span>{" "}
                    ?
                </h2>
                <div
                    className="slider-container"
                    aria-label="Entreprises partenaires"
                >
                    <div className="slider">
                        <div className="slider__track">
                            <div className="partner">
                                <img
                                    src="/src/assets/Accor_Logo.png"
                                    alt="Accor"
                                    className="partner-logo"
                                />
                            </div>
                            <div className="partner">
                                <img
                                    src="/src/assets/amazon-mobile-logo.png"
                                    alt="Amazon"
                                    className="partner-logo"
                                />
                            </div>
                            <div className="partner">
                                <img
                                    src="/src/assets/apple-logo.svg"
                                    alt="Apple"
                                    className="partner-logo"
                                />
                            </div>
                            <div className="partner">
                                <img
                                    src="/src/assets/afterpay-logo.svg"
                                    alt="Afterpay"
                                    className="partner-logo"
                                />
                            </div>
                            <div className="partner">
                                <img
                                    src="/src/assets/acf-logo.png"
                                    alt="ACF"
                                    className="partner-logo"
                                />
                            </div>
                            <div className="partner">
                                <img
                                    src="/src/assets/aioseo-client-logo-4.svg"
                                    alt="Client 1"
                                    className="partner-logo"
                                />
                            </div>
                            <div className="partner">
                                <img
                                    src="/src/assets/aioseo-client-logo-11.svg"
                                    alt="Client 2"
                                    className="partner-logo"
                                />
                            </div>
                            <div className="partner">
                                <img
                                    src="/src/assets/aioseo-client-logo-11.svg"
                                    alt="Client 2"
                                    className="partner-logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home__testimonials">
                <h2 className="section-title-testimonials">
                    Ils{" "}
                    <span>ont trouvé leur emploi de rêve, et si c'était</span>{" "}
                    votre tour ?
                </h2>
                <div className="testimonials-grid">
                    <article className="testimonial">
                        <div className="avatar">
                            <img
                                src={hommePortrait}
                                alt="Portrait de Quentin Jacque"
                                className="avatar-img"
                            />
                        </div>
                        <h3 className="name">Quentin Jacque</h3>
                        <p className="role">
                            etudiant AIS ekod
                            <br />
                            promotion 2024
                        </p>
                    </article>
                    <article className="testimonial">
                        <div className="avatar">
                            <img
                                src={femmePortrait}
                                alt="Portrait de Marie Dubois"
                                className="avatar-img"
                            />
                        </div>
                        <h3 className="name">Marie Dubois</h3>
                        <p className="role">
                            etudiante CDA ekod
                            <br />
                            promotion 2023
                        </p>
                    </article>
                </div>
            </section>

            <section className="home__testimonials">
                <div className="testimonials-container">
                    <div className="testimonials-desktop">
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                <div className="testimonial-avatar">
                                    <img
                                        src={hommePortrait}
                                        alt="Quentin Jacque"
                                    />
                                </div>
                                <div className="testimonial-text">
                                    <p className="testimonial-quote">
                                        "Grâce à Connect2Job, j'ai trouvé une
                                        alternance qui correspond parfaitement à
                                        mes attentes. L'accompagnement
                                        personnalisé m'a permis de décrocher un
                                        poste dans une entreprise innovante."
                                    </p>
                                    <div className="testimonial-info">
                                        <h3 className="testimonial-name">
                                            Quentin Jacque
                                        </h3>
                                        <p className="testimonial-role">
                                            Étudiant AIS EKOD
                                            <br />
                                            Promotion 2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
export default Home;
