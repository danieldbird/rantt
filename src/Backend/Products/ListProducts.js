import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../Shared/Context/ProductsContext';

function ListProducts() {
  const products = useContext(ProductsContext);

  return (
    <div className="list-products container">
      <h2 className="text-3xl text-gray-500 my-5">Products</h2>

      <table className="min-w-full divide-y divide-gray-200 mt-10 mb-20">
        <thead>
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              QTY
            </th>
            <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product, index) => {
            const price = product.price / 100;
            return (
              <tr key={index} className={index % 2 && 'bg-gray-50'}>
                <td className="px-2 py-3 text-left text-sm font-medium text-gray-500">
                  {product.title}
                </td>
                <td className="px-2 py-3 text-left text-sm font-medium text-gray-500">
                  <img src={product.image_url} alt="product" className="w-12" />
                </td>
                <td className="px-2 py-3 text-left text-sm font-medium text-gray-500">
                  $ {price.toFixed(2)}
                </td>
                <td className="px-2 py-3 text-center text-sm font-medium text-gray-500">
                  {product.quantity}
                </td>
                <td className="text-center">
                  <Link
                    to={{
                      pathname: `/admin/product/edit/${product.id}`,
                      state: { product },
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-primary-louder" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListProducts;
