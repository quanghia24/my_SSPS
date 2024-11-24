import React from "react";
import { Link } from 'react-router-dom'; 
import '../NavFooter/NavBar.css';
import LogoBK from '../../assets/logoBK.png'
import StudentFeature from '../NavFooter/StudentFeature';

function Header() {
  return (
    <nav className="navbar">
      <div className="logo-content">
         <img src={LogoBK} alt="" />
      <div className="navbar-logo">SSPS</div>
      </div>
     
      <StudentFeature/>
    </nav>
  )
}

export default Header;
