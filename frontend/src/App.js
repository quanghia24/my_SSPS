import './App.css';
import HomeStudent from './components/HomePage/HomeStudent/HomeStudent';

function App() {
  
  function handleChange(event) {
    console.log(`Selected file - ${event.target.files[0].name}`);
  }
  return (
    <div>
      

      {/* <input type="file" onChange={handleChange} /> */}
      <HomeStudent/>

    </div>
  );
}

export default App;
