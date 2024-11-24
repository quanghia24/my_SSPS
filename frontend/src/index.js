import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
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


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
