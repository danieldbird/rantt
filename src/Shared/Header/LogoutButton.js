import React from 'react';
import firebase from '../Auth/Database/Firebase';
function LogoutButton() {
  const logout = () => {
    return firebase.auth().signOut();
  };

  return (
    <button className="text-primary-louder px-5 font-semibold underline" onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;
