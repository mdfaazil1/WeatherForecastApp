import logo from './logo.svg';
import './App.css';
import WeatherApp from './Components/location';
import WeatherForecastComponent from './Components/location';
import HomePage from "./Containers/Home";
import SavedWeather from './Containers/SavedWeather';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Location from './Components/location';
import Email from './Features/Authenticate.js';
import Login from './Phone';
import { Home } from '@mui/icons-material';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route path='/wishlist' element={<SavedWeather/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
