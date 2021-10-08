import React, { createContext, useEffect, useState } from 'react';
import firebase from '../Auth/Database/Firebase';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('products')
      .onSnapshot((snapshot) => {
        let data = [];
        snapshot.forEach((product) => {
          data.push({ id: product.id, ...product.data() });
        });
        setProducts(data);
      });
    return () => unsubscribe();
  }, []);
  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
