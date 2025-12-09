import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setError('');
        setLoading(true);

        if (!email || !password || !name || !role) {
            setError('Veuillez remplir tous les champs');
            setLoading(false);
            return;
        }

        const userData = {
            email,
            name,
            password,
            role
        };

        const result = await register(userData);

        if (result.success) {
            navigate('/', { replace: true });
        } else {
            setError(result.error || 'Erreur lors de la création du compte');
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Créer votre compte</h2>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Votre nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Adresse e-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="votre@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Type d'utilisateur</label>
                        <select 
                            name="role" 
                            id="role" 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            disabled={loading}
                            className="form-select"
                        >
                            <option value="STUDENT">Étudiant</option>
                            <option value="COMPANY">Entreprise</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="register-button-register"
                        disabled={loading}
                    >
                        {loading ? 'Création...' : 'Créer un compte'}
                    </button>
                    <div className='divider'></div>
                    <button 
                        type="button" 
                        className="login-link-button"
                        onClick={() => navigate('/login')}
                    >
                        Déjà un compte ? Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
};
    
export default Register;
  