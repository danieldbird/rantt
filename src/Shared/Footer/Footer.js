import React from 'react';
import './Footer.scss';
import poweredByStripeLogo from '../images/powered-by-stripe.svg';

function Footer() {
  return (
    <footer className="mt-auto bg-black-light pt-14 pb-8 flex flex-col items-center">
      <span className="text-gray-400 text-sm">Rantt Copyright © {new Date().getFullYear()}</span>
      <img className="w-36 py-4" src={poweredByStripeLogo} alt="powered by stripe" />
    </footer>
  );
}

export default Footer;
