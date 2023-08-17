import logo from './logo.svg';
import './App.css';
import WeatherApp from './location/location';
import WeatherForecastComponent from './location/location';
import HomePage from "./HomePage/Home";

function App() {
  return (
    <div className="App">
      {/* <WeatherApp/> */}
      <HomePage/>
      {/* <WeatherForecastComponent/> */}
    </div>
  );
}

export default App;
