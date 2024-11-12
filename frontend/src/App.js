import './App.css';
import BuyPrintingPaper from './components/BuyPaper/BuyPrintingPaper';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';
import PrintingHistory from './components/PrintingLog/PrintingHistory';


function App() {
  
  function handleChange(event) {
    console.log(`Selected file - ${event.target.files[0].name}`);
  }
  return (
    <div>
      

      {/* <input type="file" onChange={handleChange} /> */}
      {/* <HomeStudent/> */}
      {/* <PrintingHistory/> */}
      <BuyPrintingPaper/>
      

    </div>
  );
}

export default App;
