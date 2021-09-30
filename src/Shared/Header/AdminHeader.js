import React, { useContext } from 'react';
import './AdminHeader.scss';
import { AuthContext } from '../Auth/Context/AuthContext';
import firebase from '../Auth/Database/Firebase';
import { Link } from 'react-router-dom';

function AdminHeader() {
  const { user } = useContext(AuthContext);

  const logout = () => {
    return firebase.auth().signOut();
  };
  return (
    <header className="header">
      <nav className="flex">
        <h1 className="inline">Rantt Admin</h1>
        <Link to="/admin/products">List Products</Link>
        <Link to="/admin/product/add">Add Product</Link>
        {user ? <button onClick={logout}>Logout</button> : null}
      </nav>
    </header>
  );
}

export default AdminHeader;
