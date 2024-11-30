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
import StatisticalDetail from './components/StatisticalDetail/StatisticalDetail';
import StatisticalDetail2 from './components/StatisticalDetail/StatisticalDetail2';
import StatisticalDetail3 from './components/StatisticalDetail/StatisticalDetail3';
import StatisticalDetail4 from './components/StatisticalDetail/StatisticalDetail4';
import StatisticalDetail5 from './components/StatisticalDetail/StatisticalDetail5';
import StatisticalDetail6 from './components/StatisticalDetail/StatisticalDetail6';
import StatisticalDetail7 from './components/StatisticalDetail/StatisticalDetail7';
import StatisticalDetail8 from './components/StatisticalDetail/StatisticalDetali8';
import StatisticalDetail9 from './components/StatisticalDetail/StatisticalDetail9';
import StatisticalDetail10 from './components/StatisticalDetail/StatisticalDetail10';
import StatisticalDetail11 from './components/StatisticalDetail/StatisticalDetail11';
import StatisticalDetail12 from './components/StatisticalDetail/StatisticalDetail12';
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
          <Route path='/statistical/detail1' element={<StatisticalDetail/>}/>
          <Route path='/statistical/detail2' element={<StatisticalDetail2/>}/>
          <Route path='/statistical/detail3' element={<StatisticalDetail3/>}/>
          <Route path='/statistical/detail4' element={<StatisticalDetail4/>}/>
          <Route path='/statistical/detail5' element={<StatisticalDetail5/>}/>
          <Route path='/statistical/detail6' element={<StatisticalDetail6/>}/>
          <Route path='/statistical/detail7' element={<StatisticalDetail7/>}/>
          <Route path='/statistical/detail8' element={<StatisticalDetail8/>}/>
          <Route path='/statistical/detail9' element={<StatisticalDetail9/>}/>
          <Route path='/statistical/detail10' element={<StatisticalDetail10/>}/>
          <Route path='/statistical/detail11' element={<StatisticalDetail11/>}/>
          <Route path='/statistical/detail12' element={<StatisticalDetail12/>}/>


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
