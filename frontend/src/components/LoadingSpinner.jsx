const LoadingSpinner = ({ message = 'Chargement...' }) => {
  return (
    <div>
      <>
        {/* Votre implémentation du spinner de chargement*/}
      </>
      {message && <p>{message}</p>
      /* "message &&" permet de s'assurer que la variable message est définie avant de l'afficher sinon ça va causer une erreur */
      /* c'est la même chose que si j'avais écrit :
      if (message) {
        <p>{message}</p>
      }
      */}
    </div>
  );
};

export default LoadingSpinner;
