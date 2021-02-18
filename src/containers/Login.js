import { useState } from "react";
import axios from "axios";

const Login = () => {
  //Je déclare les 4 states pour chaque input de mon form
  const [email, setEmail] = useState("alexis@mail.com");
  const [description, setDescription] = useState("description");
  const [password, setPassword] = useState("azerty");
  const [confirmPassword, setConfirmPassword] = useState("azerty");
  const [username, setUsername] = useState("alexis");

  //State pour gérer les erreurs
  //0 : pas d'erreurs
  // 1 : FRONT / un ou plusieurs champs sont vides
  // 2 : FRONT / MDP ne sont pas identiques
  // 3 : BACK / Email déjà pris en BDD
  // 4 : BACK / Username déjà pris en bdd
  const [error, setError] = useState(0);

  //Je déclare les fonctions qui vont me permettre de mettre à jour mes différents states
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleConfirmePasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  //Cette fonction sera déclenchée au click sur le bouton submit et fera partir la requête vers le back
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && description && password && confirmPassword && username) {
      setError(0);
      if (password === confirmPassword) {
        setError(0);
        try {
          const response = await axios.post(
            "http://localhost:4000/user/signup",
            {
              email: email,
              password: password,
              description: description,
              username: username,
            }
          );
          console.log(response.data);
        } catch (error) {
          // alert("An error occured");
          console.log(error.response);
          if (error.response.data.error === "This email is already used") {
            setError(3);
          } else if (
            error.response.data.error === "This username is already used !"
          ) {
            setError(4);
          }
        }
      } else {
        console.log("deuxième erreur erreur");
        setError(2);
      }
    } else {
      console.log("première erreur");
      setError(1);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="Password"
          type="text"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          placeholder="Confirm your password"
          type="text"
          name="confirme-password"
          value={confirmPassword}
          onChange={handleConfirmePasswordChange}
        />

        <input
          placeholder="Description"
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        {error === 1 ? (
          <p>FRONT : Merci de remplir tous les champs du formulaire</p>
        ) : error === 2 ? (
          <p>FRONT : Vos 2 mots de passe ne sont pas identiques</p>
        ) : error === 3 ? (
          <p>BACK : Cet email est déà pris</p>
        ) : error === 4 ? (
          <p>BACK : Ce username est déjà pris</p>
        ) : null}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
