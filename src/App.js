import logo from './logo.svg';
import './App.css';
import WeatherApp from './location/location';
import WeatherForecastComponent from './location/location';
import HomePage from "./HomePage/Home";
import SavedWeather from './SavedWeather/SavedWeather';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <WeatherApp/> */}
      {/* <HomePage/> */}
      {/* <SavedWeather/> */}
      {/* <WeatherForecastComponent/> */}
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path='/wishlist' element={<SavedWeather/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
