import { Outlet } from 'react-router-dom';
import './App.css';
import Blank from './components/Blank/Blank';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';
import PrintingHistory from './components/PrintingLog/PrintingHistory';
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
