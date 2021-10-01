import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
