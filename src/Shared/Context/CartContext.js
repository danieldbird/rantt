import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const value = { cart, setCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
