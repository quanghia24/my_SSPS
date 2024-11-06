import './App.css';

function App() {
  
  function handleChange(event) {
    console.log(`Selected file - ${event.target.files[0].name}`);
  }
  return (
    <div>
      You are now inside the App

      <input type="file" onChange={handleChange} />


    </div>
  );
}

export default App;
