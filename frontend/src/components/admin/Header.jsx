import { Link } from 'react-router-dom'
import React from 'react'
import '../NavFooter/NavBar.css'
import LogoBK from '../../assets/logoBK.png'
import StudentFeature from '../NavFooter/StudentFeature'
import AdminFeature from './AdminFeature'

function Header() {
  return (
    <nav className="navbar">
      <Link to="/admin_home">
        <div className="logo-content">
          <img src={LogoBK} alt="Logo" />
          <div className="navbar-logo">SSPS</div>
        </div>
      </Link>
      <AdminFeature />
    </nav>
  )
}

export default Header
