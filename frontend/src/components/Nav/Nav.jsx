import React from 'react'
import Footer from '../NavFooter/Footer';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

function Nav() {
    return (
        <div className="blank">
          <Header/>
          <Outlet/>
          <Footer/>
        </div>
    );
}

export default Nav
