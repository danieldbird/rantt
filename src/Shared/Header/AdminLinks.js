import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function AdminHeader(props) {
  return (
    <ul
      className={props.main ? 'hidden sm:flex' : 'flex flex-col items-center hidden'}
      id={props.main ? '' : 'mobile-nav'}
      onClick={() => {
        document.getElementById('mobile-nav').classList.toggle('hidden');
      }}
    >
      <li className={props.padding}>
        <Link to="/admin" className="text-primary-louder px-5 font-semibold">
          Admin
        </Link>
      </li>
      <li className={props.padding}>
        <Link to="/admin/products" className="text-primary-louder px-5 font-semibold">
          List
        </Link>
      </li>
      <li className={props.padding}>
        <Link to="/admin/product/add" className="text-primary-louder px-5 font-semibold">
          Add New
        </Link>
      </li>
      <li className={props.padding}>
        <LogoutButton />
      </li>
    </ul>
  );
}

export default AdminHeader;
