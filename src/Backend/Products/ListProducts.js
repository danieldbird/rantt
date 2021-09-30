import React, { useEffect, useState } from 'react';
import firebase from '../../Shared/Auth/Database/Firebase';

function ListProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let items = [];
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((snapshot) => {
        snapshot.forEach((product) => {
          items.push(product.data());
        });
        setProducts(items);
      });
  }, []);

  return (
    <div className="list-products">
      <h1>Products</h1>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.title}</td>
                <td>
                  <img src={product.image_url} alt="product" />
                </td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListProducts;
