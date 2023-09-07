import logo from './logo.svg';
import './App.css';
// import WeatherApp from "./Components/Location";
// import WeatherForecastComponent from './Components/Location';
import HomePage from "./Containers/Home";
import SavedWeather from './Containers/SavedWeather';
import {BrowserRouter,Routes,Route} from "react-router-dom";
// import Location from './Components/Location';
import Email from './Features/Authenticate.js';
import Login from './Phone';
import { Home } from '@mui/icons-material';
import HourlyWeather from './Components/HourlyWeather';
import DetailedWeather from './Containers/DetailedWeather';
import LineChart from './Components/HourGraph';
import Compare from './Containers/Compare';
import ProtectedRoute from './ProtectedRoutes';
import ErrorPage from './Containers/ErrorNotFoundPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
      
        <Route path='/wishlist' element={
        <ProtectedRoute>
          <SavedWeather/>
        </ProtectedRoute>}/>
        
        <Route path='/hourlyweather' element={<DetailedWeather/>}/>
        <Route path='/compare' element={<Compare/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
