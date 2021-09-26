import React, { useContext } from 'react';
import './Header.scss';
import { AuthContext } from '../../Context/AuthContext';
import firebase from '../../Auth/Firebase/Firebase';

function Header() {
  const { user } = useContext(AuthContext);

  const logout = () => {
    return firebase.auth().signOut();
  };
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Rantt</h1>
        {user ? <button onClick={logout}>Logout</button> : null}
      </div>
    </header>
  );
}

export default Header;
