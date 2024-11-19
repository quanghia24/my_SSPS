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
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {
        path: '/student',
        element: <HomeStudent />,
      },
      {
        path: '/send_feedback',
        element: <SendFeedback/>
      },
      {
        path:'/print_history',
        element: <PrintingHistory/>
      },
      {
        path: '/buy_printing_paper',
        element: <BuyPrintingPaper/>
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
