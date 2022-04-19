import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/register',
                {
                    email: email,
                    password: password,
                    username: userName,
                });
            history.push("/signin")
        } catch (e) {
            console.error(e);
        }
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit}>
          <label htmlFor="email">
              Emailadres
              <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
              />
          </label>
          <label htmlFor="username">
              Gebruikersnaam
              <input
                  type="text"
                  id="username"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
              />
          </label>
          <label htmlFor="password">
              Wachtwoord
              <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
              />
          </label>
          <button
              type="submit"
          >
              Registreren
          </button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;