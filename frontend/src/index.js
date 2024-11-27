import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';
import Blank from './components/Blank/Blank';
import SendFeedback from './components/SendFeedback/SendFeedback';
import PrintingHistory from './components/PrintingLog/PrintingHistory';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import App from './App';
// import Home from './components/HomePage/HomeStudent/Home';
import Admin from '../src/components/admin/Admin';
import AdminPrintHis from './components/admin/AdminPrintHis/AdminPrintHis';
import AdminPayment from './components/admin/AdminPayment/AdminPayment';
import AdminListUser from './components/admin/AdminUser/AdminListUser';
import AddUser from './components/admin/AdminUser/AddUser';
import UpdateUser from './components/admin/AdminUser/UpdateUser';
import AdminSPSO from '../src/components/admin/AdminSPSO/admin_home';
import PrintingInformation from '../src/components/PrintingInformation/PrintingInformation';
import PrintingStatus from '../src/components/PrintingStatus/PrintingStatus';
// import BuyPrintingPaper from '../src/components/BuyPaper/BuyPrintingPaper';

import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Login from './components/Login/Login';

import HomeGuest from './components/HomePage/HomeGuest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blank/>,
    children:[
      {
        path: '',
        element: <HomeGuest />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'student',
        element: <App />,
        children: [
        {
          path:'student_home',
          element: <HomeStudent/>
        },
        {
          path: 'send_feedback',
          element: <SendFeedback/>
        },
        {
          path:'printing_history',
          element: <PrintingHistory/>
        },
        {
        path: 'buy_printing_paper',
        element: <BuyPrintingPaper/>
        },
      ]
      },
      {
        path: 'admin_home',
        element: <Admin/>,
        children:[
          // {
          //   path: 'admin_SPSO',
          //   element: <AdminSPSO/>
          // },
          {
            path: 'history',
            element: <AdminPrintHis/>
          },
          {
            path:'admin_payment',
            element: <AdminPayment/>
          },
          {
            path: 'users',
            element: <AdminListUser/>,
          },
          {
            path: 'users/add_user',
            element: <AddUser/>,
          },
          {
            path: 'users/update_user',
            element: <UpdateUser/>,
          },
          {
            path: 'printInformation',
            element: <PrintingInformation />,
          },
          {
            path: 'printStatus',
            element: <PrintingStatus />
          },
          
          {
            path: 'buy_printing_paper',
            element: <BuyPrintingPaper/>
          },
        ]
      }
      
      
     
    ]
  },
]);

function Router() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
