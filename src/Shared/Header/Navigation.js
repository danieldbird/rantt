import React from 'react';

import AdminLinks from './AdminLinks';
import WebsiteLinks from './WebsiteLinks';
function Navigation(props) {
  const handleMobileToggle = () => {
    document.getElementById('mobile-nav').classList.toggle('hidden');
  };
  return (
    <nav className="flex flex-col items-center" id="desktop-nav">
      {props.main ? (
        <svg
          xmlns="<http://www.w3.org/2000/svg>"
          id="menu-button"
          className="h-6 w-10 cursor-pointer sm:hidden block text-primary-louder"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleMobileToggle}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M4 4h22M4 12h22M4 20h22"
          />
        </svg>
      ) : null}

      {!props.admin ? (
        <WebsiteLinks main={props.main} padding={props.padding} />
      ) : (
        <AdminLinks main={props.main} padding={props.padding} />
      )}
    </nav>
  );
}

export default Navigation;
