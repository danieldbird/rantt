import React, { useContext } from 'react';
import { CartContext } from '../../Shared/Context/CartContext';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  return (
    <div className="container flex flex-col lg:flex-row mb-10">
      <div className="lg:w-1/2 lg:px-12">
        <h2 className="text-3xl text-gray-500 my-5">Cart</h2>
        <div className="">
          {cart.map((item) => {
            return (
              <div key={item.id} className="flex justify-between items-center my-4">
                <div className="w-12">
                  <img src={item.image_url} alt="product" />
                </div>
                <div>{item.title}</div>
                <div>{item.price}</div>
                <div className="text-red-500 font-bold">x</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:w-1/2 lg:border-l lg:px-12">
        <h2 className="text-3xl text-gray-500 my-5">Checkout</h2>
        <div>Checkout data and form etc</div>
      </div>
    </div>
  );
}

export default Cart;
