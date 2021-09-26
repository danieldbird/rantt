import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="copyright">Rantt Copyright © {new Date().getFullYear()}</div>
      </div>
    </footer>
  );
}

export default Footer;
