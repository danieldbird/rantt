import React, { useContext } from 'react';
import { ProductsContext } from '../../Shared/Context/ProductsContext';
import { CartContext } from '../../Shared/Context/CartContext';
function Products() {
  const products = useContext(ProductsContext);
  const { cart, setCart } = useContext(CartContext);

  const handleAddItemToCart = (product) => {
    setCart([...cart, product]);
    console.log('added');
  };

  return (
    <div className="flex flex-wrap justify-center mt-5 max-w-6xl mx-auto">
      {products.map((product) => {
        return (
          <div key={product.id} className="border rounded-lg my-2 mx-2 p-3 sm:mx-4 sm:my-4">
            <h4 className="text-primary-louder font-bold text-xl">{product.title}</h4>
            <img src={product.image_url} alt="product" className="w-48 sm:w-52" />
            <div className="text-lg text-center text-gray-700 pb-2">$ {product.price}</div>
            <div className="text-sm text-center italic text-gray-300 pb-4">
              {product.quantity} left
            </div>
            <button
              className="w-full rounded text-white py-2 bg-primary-loud hover:bg-primary-louder uppercase"
              onClick={() => {
                handleAddItemToCart(product);
              }}
            >
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Products;
