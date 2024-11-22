import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';
import Blank from './components/Blank/Blank';
import SendFeedback from './components/SendFeedback/SendFeedback';
import PrintingHistory from './components/PrintingLog/PrintingHistory';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import App from './App';
import Home from './components/HomePage/HomeStudent/Home';
import Admin from '../src/components/admin/Admin';
import AdminPrintHis from './components/admin/AdminPrintHis/AdminPrintHis';
import AdminPayment from './components/admin/AdminPayment/AdminPayment';
import AdminListUser from './components/admin/AdminUser/AdminListUser';
import AddUser from './components/admin/AdminUser/AddUser';
import UpdateUser from './components/admin/AdminUser/UpdateUser';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blank/>,
    children:[
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
        }
      ]
      },
      {
        path: 'admin_home',
        element: <Admin/>,
        children:[
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
          }
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
