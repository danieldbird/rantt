import React, { useContext } from 'react';
import { ProductsContext } from '../../Shared/Context/ProductsContext';

function Admin() {
  const products = useContext(ProductsContext);

  return (
    <div className="admin container">
      <h2 className="text-3xl text-gray-500 my-5">Dashboard</h2>
      <h3 className="my-10">Total Products: {products.length}</h3>
    </div>
  );
}

export default Admin;
