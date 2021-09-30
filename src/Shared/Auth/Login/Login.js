import React, { useState, useContext } from 'react';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import firebase from '../Database/Firebase';
import { AuthContext } from '../Context/AuthContext';
import { Redirect } from 'react-router';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/admin" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        history.push('/admin');
      })
      .catch(() => {
        setError(true);
        console.log('Email or password is incorrect.');
      });
  };

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input is-primary"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={email}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input is-primary"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={password}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
        </div>
        {error ? <div className="error-message">Access denied.</div> : <div></div>}
        <button className="button is-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
