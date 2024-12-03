import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent'
import Blank from './components/Blank/Blank'
import SendFeedback from './components/SendFeedback/SendFeedback'
import PrintingHistory from './components/PrintingLog/PrintingHistory'
import PrintingImple from './components/PrintingImple/PrintingImple'
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper'
import App from './App'
import PrintingPage from './components/PrintingPage/FileUpload'
import PrintingPage2 from './components/PrintingPage2/FileUpload2'

// import Home from './components/HomePage/HomeStudent/Home';
import Admin from '../src/components/admin/Admin'
import AdminPrintHis from './components/admin/AdminPrintHis/AdminPrintHis'
import AdminPayment from './components/admin/AdminPayment/AdminPayment'
import AdminListUser from './components/admin/AdminUser/AdminListUser'
import AddUser from './components/admin/AdminUser/AddUser'
import UpdateUser from './components/admin/AdminUser/UpdateUser'
import AdminSPSO from '../src/components/admin/AdminSPSO/admin_home'
import PrintingInformation from '../src/components/PrintingInformation/PrintingInformation'
import PrintingStatus from '../src/components/PrintingStatus/PrintingStatus'
import Report from './components/Statistical/Statistical'
import Report1 from './components/StatisticalDetail/StatisticalDetail'
import Report2 from './components/StatisticalDetail/StatisticalDetail2'
import Report3 from './components/StatisticalDetail/StatisticalDetail3'
import Report4 from './components/StatisticalDetail/StatisticalDetail4'
import Report5 from './components/StatisticalDetail/StatisticalDetail5'
import Report6 from './components/StatisticalDetail/StatisticalDetail6'
import Report7 from './components/StatisticalDetail/StatisticalDetail7'
import Report8 from './components/StatisticalDetail/StatisticalDetali8'
import Report9 from './components/StatisticalDetail/StatisticalDetail9'
import Report10 from './components/StatisticalDetail/StatisticalDetail10'
import Report11 from './components/StatisticalDetail/StatisticalDetail11'
import Report12 from './components/StatisticalDetail/StatisticalDetail12'
// import BuyPrintingPaper from '../src/components/BuyPaper/BuyPrintingPaper';

import Register from './components/Register/Register'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import Login from './components/Login/Login'
import Profile from './components/User/UserProfile'
import HomeGuest from './components/HomePage/HomeGuest'
import { ToastContainer } from 'react-toastify'

import AdminFeedback from './components/admin/AdminFeedback/AdminFeedback'
import FileUpload from './components/PrintingPage/FileUpload'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Blank />,
    children: [
      {
        path: '',
        element: <HomeGuest />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgotPassword',
        element: <ForgotPassword />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'student',
        element: <App />,
        children: [
          {
            path: 'student_home',
            element: <HomeStudent />,
          },
          {
            path: 'file_upload',
            element: <FileUpload/>
          },
          {
            path: 'printing_page',
            element: <PrintingPage />,
          },
          {
            path: 'file_upload/printing_page2',
            element: <PrintingPage2 />,
          },
          // {
          //   path: 'file_upload',
          //   element: <FileUpload />,
          // },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'send_feedback',
            element: <SendFeedback />,
          },
          {
            path: 'printing_history',
            element: <PrintingHistory />,
          },
          {
            path: 'buy_printing_paper',
            element: <BuyPrintingPaper />,
          },
        ],
      },
      {
        path: 'admin_home',
        element: <Admin />,
        children: [
          // {
          //   path: 'admin_SPSO',
          //   element: <AdminSPSO/>
          // },
          {
            path: 'history',
            element: <AdminPrintHis />,
          },
          {
            path: 'admin_payment',
            element: <AdminPayment />,
          },
          {
            path: 'users',
            element: <AdminListUser />,
          },
          {
            path: 'users/add_user',
            element: <AddUser />,
          },
          {
            path: 'users/update_user',
            element: <UpdateUser />,
          },
          {
            path: 'printInformation',
            element: <PrintingInformation />,
          },
          {
            path: 'printStatus',
            element: <PrintingStatus />,
          },
          {
            path: 'buy_printing_paper',
            element: <BuyPrintingPaper />,
          },
          {
            path: 'printing_imple',
            element: <PrintingImple />,
          },
          {
            path: '',
            element: <Report />,
          },
          {
            path: 'report1',
            element: <Report1 />,
          },
          {
            path: 'report2',
            element: <Report2 />,
          },
          {
            path: 'report3',
            element: <Report3 />,
          },
          {
            path: 'report4',
            element: <Report4 />,
          },
          {
            path: 'report5',
            element: <Report5 />,
          },
          {
            path: 'report6',
            element: <Report6 />,
          },
          {
            path: 'report7',
            element: <Report7 />,
          },
          {
            path: 'report8',
            element: <Report8 />,
          },
          {
            path: 'report9',
            element: <Report9 />,
          },
          {
            path: 'report10',
            element: <Report10 />,
          },
          {
            path: 'report11',
            element: <Report11 />,
          },
          {
            path: 'report12',
            element: <Report12 />,
          },
          {
            path: 'list_feedback',
            element: <AdminFeedback />,
          },
        ],
      },
    ],
  },
])

function Router() {
  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Router />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
