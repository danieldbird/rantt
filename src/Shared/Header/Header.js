import React, { useContext, useState, useEffect } from 'react';
import './Header.scss';
import { AuthContext } from '../Auth/Context/AuthContext';
import firebase from '../Auth/Database/Firebase';
import Navigation from './Navigation';

function Header() {
  const { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIfAdmin = async () => {
      if (user) {
        return await firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            return tokenResult.claims.role === 'admin';
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    checkIfAdmin().then((result) => {
      setIsAdmin(result);
    });

    return checkIfAdmin();
  }, [user]);

  return (
    <header className="container">
      <div className="main-nav flex justify-between items-center">
        <h1 className="text-primary-louder font-black logo">Rantt</h1>
        <Navigation admin={isAdmin} main={true} />
      </div>
      <Navigation admin={isAdmin} main={false} padding="py-4" />
    </header>
  );
}

export default Header;
