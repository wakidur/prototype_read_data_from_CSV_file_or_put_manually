import React from 'react';
import Aux from '../../HOC/Aux';
import Header from '../Header/Header';

const Layout = ({ children }) => (
  <Aux>
    <Header />
    <main role='main' className='container'>
      {children}
    </main>
  </Aux>
);

export default Layout;
