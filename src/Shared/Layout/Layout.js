import React, { useEffect, useContext, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';
import { AuthContext } from '../Auth/Context/AuthContext';
import firebase from '../Auth/Database/Firebase';
import AdminHeader from '../Header/AdminHeader';

function Layout({ children }) {
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
    <div className="flex flex-col h-screen">
      {!isAdmin ? <Header /> : <AdminHeader />}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
