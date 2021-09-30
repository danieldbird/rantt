import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="mt-auto bg-gray-800 pt-24 pb-8">
      <div className="text-gray-500 text-sm text-center">
        Rantt Copyright © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
