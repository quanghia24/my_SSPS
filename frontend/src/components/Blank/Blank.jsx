import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavFooter/NavBar';
import Footer from '../NavFooter/Footer';

function Blank() {
    return (
        <div className="blank">
          <NavBar/>
          <Outlet/>
          <Footer/>
        </div>
    );
}

export default Blank;