import Button from '../components/Button';
const Home = () => {
  return (
    <>
      <Button
        text="Aller à l'accueil"
        to='/home'
        bgColor='var(--color-secondary)'
        textColor='#fff'
      />
    </>
  );
};
export default Home;
