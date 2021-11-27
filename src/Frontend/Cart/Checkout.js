import axios from 'axios';
import React, { useContext } from 'react';
import { CartContext } from '../../Shared/Context/CartContext';
import StripeLogo from '../../Shared/images/stripe-logo.svg';

function Checkout() {
  const { cart, setCart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('poo');
    axios
      .post('http://localhost:5001/rantt-6595b/us-central1/app/stripe-checkout', {
        cart,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="lg:w-1/2 lg:border-l lg:px-12">
      <h2 className="text-3xl text-gray-500 my-5 uppercase">Checkout</h2>
      {cart.length ? (
        <div className="my-10">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="border rounded-lg my-2 p-2 w-full">
              <input type="text" name="name" placeholder="Name" />
            </div>
            <div className="border rounded-lg my-2 p-2 w-full">
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="border rounded-lg my-2 p-2 w-full">
              <input type="text" name="address" placeholder="Shipping Address" />
            </div>
            <div className="border rounded-lg my-2 p-2 w-1/2">
              <input type="text" name="city" placeholder="City" />
            </div>
            <div className="border rounded-lg my-2 p-2 w-1/2">
              <input type="text" name="post-code" placeholder="Post Code" />
            </div>
            <div className="border rounded-lg my-2 p-2 w-full">
              <input type="number" name="card" placeholder="Card Number" />
            </div>
            <input
              type="submit"
              value="Checkout"
              className="bg-primary-louder text-white rounded-md py-2"
            />
          </form>
        </div>
      ) : (
        <span>Nothing to checkout.</span>
      )}
      <hr />
      <h3 className="text-2xl text-gray-500 my-5">Payment Methods</h3>
      <div className="flex">
        <img src={StripeLogo} alt="stripe" className="w-24" />
      </div>
    </div>
  );
}

export default Checkout;
