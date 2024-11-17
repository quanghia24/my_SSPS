import './App.css';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';
import PrintingHistory from './components/PrintingLog/PrintingHistory';
import SendFeedback from './components/SendFeedback/SendFeedback';


function App() {

  return (
    <div>
      

      {/* <input type="file" onChange={handleChange} /> */}
      {/* <HomeStudent/> */}
      {/* <PrintingHistory/> */}
      {/* <BuyPrintingPaper/> */}
      <SendFeedback/>
      

    </div>
  );
}

export default App;
