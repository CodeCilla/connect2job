import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Veuillez remplir tous les champs');
            setLoading(false);
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            navigate('/', { replace: true });
        } else {
            setError(result.error || 'Erreur lors de la connexion');
            setLoading(false);
        }
        
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Connectez-vous à votre compte</h2>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <form className="login-form" onSubmit={handleSubmit}>
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
                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                    <div className='divider'></div>
                    <button 
                        type="button" 
                        className="register-button"
                        onClick={() => navigate('/register')}
                    >
                        S'inscrire
                    </button>
                </form>
            </div>
        </div>
    );
};
    
export default Login;
  