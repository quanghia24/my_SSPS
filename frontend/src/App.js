import { Outlet } from 'react-router-dom';
import './App.css';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRoutes } from "react-router-dom";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register/Register";
import HomeGuest from "./components/HomePage/HomeGuest";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';
import PrintingHistory from './components/PrintingLog/PrintingHistory';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import Nav from './components/Nav/Nav';
import PrintingInformation from './components/PrintingInformation/PrintingInformation';
import PrintingStatus from './components/PrintingStatus/PrintingStatus';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import SendFeedback from './components/SendFeedback/SendFeedback';
import Navbar from './components/NavFooter/NavBar';
import Footer from './components/NavFooter/Footer';


function App() {

  return (
    <div>
      
      <Navbar/>
      <Outlet/>
      <Footer/>

    </div>
  );
}

export default App;
