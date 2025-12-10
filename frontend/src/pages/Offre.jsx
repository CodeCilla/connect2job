import "../styles/Offre.css";
import Button from "../components/Button";
import logo from "../assets/acf-logo.png";


const Offre = ({offer}) => {

return (
    <>    
        <div className="button__offre">
            <Button 
                text="Retour"
                to='/offres'
                bgColor='var(--color-secondary)'
                textColor='#fff'
                />
        </div>
        <div className="company">
            <div className="company__statut">
                <Button
                text={offer?.contractType}
                bgColor='var(--color-secondary)'
                textColor='#fff'
                />
            </div>
            <div className="company__title">
                <img src={logo} alt="logo" />
                <h2>{offer?.title}</h2>
            </div>
            <div className="company__description">
                {offer?.company.description}
            </div>
            <div className="company__location">
                <div>
                    <h3>{offer?.company.name}</h3>
                    <h3>{offer?.company.location}</h3>
                </div>
                <div>
                    <Button
                        text="Postuler"
                        bgColor='var(--color-secondary)'
                        textColor='#fff'
                        />
                </div>
            </div>
        </div>
        <div className="offre">
            <h2>Description du poste</h2>
            <p>{offer?.description}</p>
        </div>
    </>
    );
};
export default Offre;
