import { useState } from "react";
import SearchBox from "./SearchBox";
import WeatherInfo from './WeatherInfo';

function App() {
  
  const [dataFromChild, setDataFromChild] = useState('');

  // Callback function to handle data from the child
  const handleDataFromChild = (childData) => {
    setDataFromChild(childData);
  }

  return (
    <>
      <div className="navbar">
        <h1>
          <b> Weather Dashboard</b>
        </h1>
        <br></br>
        <div className="search">
          <SearchBox onData={handleDataFromChild}/>
        </div>
      </div>
      <div className="container" styles={"box-sizing: content-box;"}>
        <WeatherInfo city={dataFromChild}/>
      </div>
    </>
  );
}

export default App;
