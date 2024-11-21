// src/components/Navbar.jsx
import { Link } from 'react-router-dom'; 
import React from 'react';
import './NavBar.css';
import LogoBK from '../../assets/logoBK.png'
import StudentFeature from './StudentFeature';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-content">
         <img src={LogoBK} alt="" />
      <div className="navbar-logo">SSPS</div>
      </div>
     
      <ul className="navbar-links">
        <li> <Link to="/in-tai-lieu">In tài liệu</Link></li>
        <li><Link to="/send_feedback">Đóng góp ý kiến</Link></li>
        <li><Link to="/buy_printing_paper">Mua giấy</Link></li>
        <li><Link to="/print_history">Lịch sử</Link></li>
      </ul>
      <StudentFeature/>
    </nav>
  );
}

export default Navbar;
