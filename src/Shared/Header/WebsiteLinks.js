import React from 'react';
import { Link } from 'react-router-dom';

function WebsiteLinks(props) {
  return (
    <ul
      className={props.main ? 'hidden sm:flex' : 'flex flex-col items-center hidden'}
      id={props.main ? '' : 'mobile-nav'}
      onClick={() => {
        document.getElementById('mobile-nav').classList.toggle('hidden');
      }}
    >
      <li className={props.padding}>
        <Link to="/products" className="text-primary-louder px-5 font-semibold">
          Products
        </Link>
      </li>
      <li className={props.padding}>
        <Link to="/cart" className="text-primary-louder px-5 font-semibold">
          Cart
        </Link>
      </li>
    </ul>
  );
}

export default WebsiteLinks;
