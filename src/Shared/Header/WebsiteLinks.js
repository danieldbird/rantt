import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
import LogoutButton from './LogoutButton';

function WebsiteLinks(props) {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  return (
    <ul
      className={props.main ? 'hidden sm:flex' : 'flex flex-col items-center hidden'}
      id={props.main ? '' : 'mobile-nav'}
      onClick={() => {
        document.getElementById('mobile-nav').classList.add('hidden');
      }}
    >
      <li className={props.padding}>
        <Link to="/cart" className="text-primary-louder px-5 font-semibold">
          Cart <span className="font-bold ml-2">{cart.length}</span>
        </Link>
      </li>
      {user ? (
        <li className={props.padding}>
          <LogoutButton />
        </li>
      ) : null}
    </ul>
  );
}

export default WebsiteLinks;
