// src/components/Navbar.jsx
import React from 'react';
import './NavBar.css';
import LogoBK from '../../../assets/logoBK.png'
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-content">
         <img src={LogoBK} alt="" />
      <div className="navbar-logo">SSPS</div>
      </div>
     
      <ul className="navbar-links">
        <li >In tài liệu</li>
        <li>Đóng góp ý kiến</li>
        <li>Mua giấy</li>
        <li>Lịch sử</li>
      </ul>
      <div className="navbar-icons">
        <button>🔔</button>
        <button>👤</button>
      </div>
    </nav>
  );
}

export default Navbar;
