import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Chargement...', fullScreen = false }) => {
  return (
    <div className={`loading-spinner-container ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
