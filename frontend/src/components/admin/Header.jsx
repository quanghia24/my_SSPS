// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import './Header.css';
import LogoBK from '../../assets/logoBK.png';

function Header() {
  return (
    <nav className="navbar">
      <Link to="/admin_home">
        <div className="logo-content">
          <img src={LogoBK} alt="Logo" />
          <div className="navbar-logo">SSPS</div>
        </div>
      </Link>
      <NavLink to="/" className="setting-block-link1">
          <i className="bx bx-log-out"></i>
          <p>Đăng xuất</p>
        </NavLink>
    </nav>
  );
}

export default Header;