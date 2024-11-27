import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavFooter/NavBar';
import Footer from '../NavFooter/Footer';

function Blank() {
    return (
        <div className="blank">
          <Outlet/>
         
        </div>
    );
}

export default Blank;