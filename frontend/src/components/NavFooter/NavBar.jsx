// src/components/Navbar.jsx
import { Link } from 'react-router-dom'; 
import React from 'react';
import './NavBar.css';
import LogoBK from '../../assets/logoBK.png'
import StudentFeature from './StudentFeature';
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/student/student_home">
      <div className="logo-content">
         <img src={LogoBK} alt="" />
      <div className="navbar-logo">SSPS</div>
      </div>
      </Link>
     
      <ul className="navbar-links">
        <li> <Link to="/student/file_upload">In tài liệu</Link></li>
        <li><Link to="/student/send_feedback">Đóng góp ý kiến</Link></li>
        <li><Link to="/student/buy_printing_paper">Mua giấy</Link></li>
        <li><Link to="/student/printing_history">Lịch sử</Link></li>
      </ul>
      <StudentFeature/>
    </nav>
  );
}

export default Navbar;
