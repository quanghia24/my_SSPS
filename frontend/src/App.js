import './App.css';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';
import PrintingHistory from './components/PrintingLog/PrintingHistory';
import SendFeedback from './components/SendFeedback/SendFeedback';


function App() {
  
  function handleChange(event) {
    console.log(`Selected file - ${event.target.files[0].name}`);
  }
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
