import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminFeature.css'

import { NavLink, useNavigate } from 'react-router-dom'
import 'boxicons/css/boxicons.min.css'

function Setting() {
  const [balance, setBalance] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        const tokens = {
          refresh: localStorage.getItem('refresh'),
          access: localStorage.getItem('access'),
        }
      } catch (error) {
        console.error('Error fetching token balance:', error)
      }
    }
    fetchTokenBalance()
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="setting">
      {/* <div className="setting-block logo AccountInfo">
        <NavLink to="/admin_home" className="setting-block-link">
          <i className="bx bx-user"></i>
          <p>Thông tin tài khoản</p>
        </NavLink>
      </div> */}
      <div className="setting-block logo logOut">
        <button onClick={() => logout()} className="setting-block-link">
          <i className="bx bx-log-out"></i>
          <p>Đăng xuất</p>
        </button>
      </div>
    </div>
  )
}

function AdminFeature() {
  const [showSetting, setShowSetting] = useState(false)

  const handleShowSetting = () => {
    setShowSetting(!showSetting)
  }
  const [username, setUsername] = useState('')

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const tokens = {
          refresh: localStorage.getItem('refresh'),
          access: localStorage.getItem('access'),
        }
        const response = await axios.get(
          'http://127.0.0.1:8000/api/users/profile/',
          {
            headers: {
              Authorization: `Bearer ${tokens.access}`,
            },
          },
        )
        console.log(response.data) // Handle the response data as needed
        setUsername(response.data.name)
      } catch (error) {
        console.error('Error fetching username:', error)
      }
    }

    fetchUsername()
  }, [])

  return (
    <nav className="navbar-nav">
      <ul className="navbar-nav-ul">
        <li className="navbar-nav-ul-li">
          <NavLink to="/admin_home" className="navbar-nav-ul-li-link">
            <i className="bx bx-message-rounded"></i>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <NavLink to="/admin_home" className="navbar-nav-ul-li-link">
            <i className="bx bx-bell"></i>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <NavLink
            to="/admin_home"
            className="navbar-nav-ul-li-link navbar-nav-ul-li-link__admin"
          >
            <i className="bx bx-user-circle"></i>
            <p>{username}</p>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <div className="navbar-nav-ul-li-link">
            <i className="bx bx-cog " onClick={handleShowSetting}></i>
          </div>
        </li>
      </ul>
      {showSetting && <Setting />}
    </nav>
  )
}

export default AdminFeature
