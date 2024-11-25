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
import Blank from './components/Blank/Blank';
import SendFeedback from './components/SendFeedback/SendFeedback';
import PrintingHistory from './components/PrintingLog/PrintingHistory';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import Nav from './components/Nav/Nav';
import PrintingInformation from './components/PrintingInformation/PrintingInformation';
import PrintingStatus from './components/PrintingStatus/PrintingStatus';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';


function App() {
  const router = useRoutes([
    {
      path: '/member',
      element: <Blank />,
      children: [
        {
          path: '/member/student',
          element: <HomeStudent />,
        },
        {
          path: '/member/send_feedback',
          element: <SendFeedback/>
        },
        {
          path:'/member/print_history',
          element: <PrintingHistory/>
        },
        {
          path: '/member/buy_printing_paper',
          element: <BuyPrintingPaper/>
        },
      ]
    },
    {
      path: '/admin',
      element: <Nav />,
      children: [
        {
          path: '/admin/printInformation',
          element: <PrintingInformation />,
        },
        {
          path: '/admin/printStatus',
          element: <PrintingStatus />
        },
        {
          path:'/admin/print_history',
          element: <PrintingHistory/>
        },
        {
          path: '/admin/buy_printing_paper',
          element: <BuyPrintingPaper/>
        },
      ]
    },
    {
      path: '/',
      element: <HomeGuest />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgotPassword',
      element: <ForgotPassword />
    }
  ]);
  
  return (
    <>
      {router}
      <ToastContainer/>
    </>
  );
}

export default App;
