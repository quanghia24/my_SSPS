import React, { useEffect, useState } from "react";
import  axios  from "axios";
import './StudentFeature.css';


import { NavLink } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

function Setting() {
  const [balance,setBalance] = useState(0);
  useEffect(()=>{
   const fetchTokenBalance = async () => {
    try {
      const tokens ={
        refresh: localStorage.getItem("refresh"),
        access: localStorage.getItem("access")
      }
      const userResponse = await axios.get('http://127.0.0.1:8000//api/users/balance/',{
        headers:{
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      setBalance(userResponse.data.balance);
      console.log(userResponse.data.balance);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
   }
   fetchTokenBalance(); 
  },[])
  return (
    <div className="setting">
    
      <div className="setting-block paperNo">
        <p >Số trang in</p>
       <p>{balance}</p> 
      </div>
      <div className="setting-block logo AccountInfo">
        <NavLink to="/" className="setting-block-link">
          <i className="bx bx-user"></i>
          <p>Thông tin tài khoản</p>
        </NavLink>
      </div>
      <div className="setting-block logo logOut">
        <NavLink to="/" className="setting-block-link">
          <i className="bx bx-log-out"></i>
          <p>Đăng xuất</p>
        </NavLink>
      </div>
    </div>
  );
}
const username = localStorage.getItem('user_id')

function StudentFeature() {
  const [showSetting, setShowSetting] = useState (false);

  const handleShowSetting = () => {
    setShowSetting(!showSetting);
  }

  return (
    <nav className="navbar-nav">
      <ul className="navbar-nav-ul">
        <li className="navbar-nav-ul-li">
          <NavLink to="/" className="navbar-nav-ul-li-link">
            <i className="bx bx-message-rounded"></i>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <NavLink to="/" className="navbar-nav-ul-li-link">
            <i className="bx bx-bell"></i>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <NavLink
            to="/"
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
  );
}

export default StudentFeature;