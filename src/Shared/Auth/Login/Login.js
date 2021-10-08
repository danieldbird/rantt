import React, { useState, useContext } from 'react';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import firebase from '../Database/Firebase';
import { AuthContext } from '../../Context/AuthContext';
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
      .then(() => {
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
    <div className="login container flex flex-col justify-center items-center align-middle">
      <h2 className="text-3xl text-gray-500 mt-20 mb-5">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="bg-gray-100 rounded-lg my-4">
          <span className="px-5 text-gray-500">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            className="bg-gray-100 px-3 py-3 rounded-lg"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={email}
          />
        </div>
        <div className="bg-gray-100 rounded-lg my-4">
          <span className="px-5 text-gray-500">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            className="bg-gray-100 px-3 py-3 rounded-lg"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={password}
          />
        </div>
        {error ? <div className="mb-4 text-red-500 text-center">Access denied.</div> : <div></div>}
        <button className="w-full bg-green-400 px-3 py-3 rounded-lg text-white">Login</button>
      </form>
    </div>
  );
}

export default Login;
