import React, { useContext } from 'react';
import { CartContext } from '../../Shared/Context/CartContext';
// import axios from 'axios';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const removeFromCart = (id) => {
    const newCart = cart.filter(function (value, index, arr) {
      return id !== index;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  let subTotal = 0;
  let shipping = 1000;
  let taxes = 0;
  let total = 0;
  const taxPercentage = 0.15;

  const convertCentsToDollars = (num) => {
    return num / 100;
  };

  const calculateTotals = (currentCart) => {
    subTotal = currentCart.reduce((sum, product) => sum + product.price, 0);
    taxes = (subTotal + shipping) * taxPercentage;
    // total = subTotal + shipping + taxes;
    total = subTotal;
    subTotal = convertCentsToDollars(subTotal).toFixed(2);
    total = convertCentsToDollars(total).toFixed(2);
    taxes = convertCentsToDollars(taxes).toFixed(2);
    shipping = convertCentsToDollars(shipping).toFixed(2);
  };

  calculateTotals(cart);

  return (
    <div className="container flex flex-col mb-10 sm:w-2/3 md:w-3/5  lg:w-2/5">
      <h2 className="text-3xl text-gray-500 my-5 uppercase">Cart</h2>
      {cart.length ? (
        <div className="border rounded-lg shadow-md">
          <table className="w-4/5 mx-auto mt-10">
            <tbody>
              {cart.map((product, index) => {
                const price = product.price / 100;
                return (
                  <tr key={product.id} className={`${index !== 0 ? 'border-t' : undefined}`}>
                    <td className="w-10 py-3">
                      <img src={product.image_url} alt="product" />
                    </td>
                    <td className="uppercase text-sm text-gray-500 text-left pl-5">
                      {product.title}
                    </td>
                    <td className="text-sm text-gray-500 text-right pr-5">$ {price.toFixed(2)}</td>
                    <td>
                      <button
                        className="text-red-500 font-bold"
                        onClick={() => {
                          removeFromCart(index);
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} className="text-primary-louder" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <table className="w-4/5 mx-auto my-10">
            <tbody>
              <tr className="">
                <th className="text-left uppercase text-md text-gray-500 pb-2">Subtotal</th>
                <td className="text-right text-md text-gray-500">$ {subTotal}</td>
              </tr>
              {/* <tr>
                <th className="text-left uppercase text-md text-gray-500 py-2">Shipping</th>
                <td className="text-right text-md text-gray-500">$ {shipping}</td>
              </tr>
              <tr>
                <th className="text-left uppercase text-md text-gray-500 py-2">Taxes</th>
                <td className="text-right text-md text-gray-500">$ {taxes}</td>
              </tr> */}
              <tr>
                <th className="text-left uppercase text-2xl text-gray-600 pt-10">Total</th>
                <td className="text-right text-2xl text-gray-600 pt-10">$ {total}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex w-full justify-center my-10">
            <form
              action="http://localhost:5001/rantt-6595b/us-central1/app/create-checkout-session"
              method="POST"
              className="flex w-full justify-center"
            >
              <input
                type="hidden"
                name="cart"
                value={JSON.stringify(
                  cart.map((item) => {
                    return item.id;
                  })
                )}
              />
              <button
                className="bg-primary-louder text-white py-2 px-4 uppercase rounded-lg w-full mx-5 sm:w-1/2"
                type="submit"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      ) : (
        <span>Your cart is empty.</span>
      )}
      {/* <hr className="mt-10 mb-2" />
      <Checkout /> */}
    </div>
  );
}

export default Cart;
