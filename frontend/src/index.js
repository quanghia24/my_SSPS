import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
// import Login from './components/Login/Login';
import { CookiesProvider } from 'react-cookie'
import FileUpload from "./components/PrintingPage/FileUpload"
import FileUpload2 from './components/PrintingPage2/FileUpload2';
import ConfigPrinter from './components/ConfigPrinter/ConfigPrinter';
import Statistical from './components/Statistical/Statistical';
function Router() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/fileupload' element={<FileUpload />} />
          <Route path='/fileupload2' element={<FileUpload2 />} />
          <Route path='/configprinter' element={<ConfigPrinter />} />
          <Route path='/statistical' element={<Statistical />} />

        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  )
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
