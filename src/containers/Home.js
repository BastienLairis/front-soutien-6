import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/login">Accéder au Formulaire !</Link>
    </div>
  );
};

export default Home;
