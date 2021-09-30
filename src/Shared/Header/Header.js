import React, { useContext } from 'react';
import './Header.scss';
import { AuthContext } from '../Auth/Context/AuthContext';
import firebase from '../Auth/Database/Firebase';

function Header() {
  const { user } = useContext(AuthContext);

  const logout = () => {
    return firebase.auth().signOut();
  };
  return (
    <header className="bg-yellow-200">
      <div className="container flex justify-between">
        <h1 className="text-yellow-700">Rantt</h1>
        <nav className="">{user ? <button onClick={logout}>Logout</button> : null}</nav>
      </div>
    </header>
  );
}

export default Header;
