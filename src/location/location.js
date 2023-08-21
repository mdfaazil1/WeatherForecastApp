// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function WeatherApp() {
//   // const variable array to save the users location
//   const [userLocation, setUserLocation] = useState(null);
//   const [weatherData, setWeatherData] = useState([]);
//   // define the function that finds the users geolocation
//   useEffect(()=>{
//   const getUserLocation = async () => {
//     // if geolocation is supported by the users browser
//     if (navigator.geolocation) {
//       // get the current users location
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           // save the geolocation coordinates in two variables
//           const { latitude, longitude } = position.coords;
//           // update the value of userlocation variable
//           setUserLocation({ latitude, longitude });
//           let params = {};
//           params = {
//             q: "chennai",
//             days: '3'
//           };
//           const options = {
//                     method: 'GET',
//                     url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
//                     params,
//                     headers: {
//                       'X-RapidAPI-Key': 'f975f26eb2mshe985ed1001f4ea5p1c87e4jsnb3e181c3e99b',
//                       'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//                     }
//                   };
//                   try {
//                     const response = axios.request(options);
//                     if(response){
//                     setWeatherData(response.data);
//                     console.log(weatherData.current.temp_c);}
//                     else{
//                         alert("error");
//                     }
//                   } catch (error) {
//                     console.error(error);
//                   }
//             //  console.log(weatherData);   
//         },
//         // if there was an error getting the users location
//         (error) => {
//             console.log(userLocation);  
//           console.error('Error getting user location:', error);
//         }
//       );
//     }
//     // if geolocation is not supported by the users browser
//     else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   };
//   getUserLocation();
// },[userLocation]);

//   // return an HTML page for the user to check their location
//   return (
//         <div>
//           <h1>Weather Forecast</h1>
//               {/* {weatherData.forecast.forecastday&&
//                 <div >max temp in deg c: {weatherData.forecast.forecastday[0].day.maxtemp_c}</div>
//              } */}
//               {weatherData.current&&
//                 <div >current temp: {weatherData.current.temp_c}<br></br>
//                 <img src={weatherData.current.condition.icon}/></div>
//               }
//         </div>
//       );
//     };
// export default WeatherApp;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
 
// const WeatherForecastComponent = () => {
//   const [weatherData, setWeatherData] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [inputType, setInputType] = useState('city'); // Default to 'city'
//   const [view,setView]=useState(false);


//     const fetchWeatherData = async () => {
//       let params = {};
//       if (inputType === 'city') {
//         params = {
//           q: inputValue,
//           days: '3'
//         };
//       } else if (inputType === 'coordinates') {
//         const [latitude, longitude] = inputValue.split(',');
//         params = {
//           lat: latitude.trim(),
//           lon: longitude.trim(),
//           days: '1'
//         };
//       }


 
//       const options = {
//         method: 'GET',
//         url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
//         params,
//         headers: {
//           'X-RapidAPI-Key': 'f975f26eb2mshe985ed1001f4ea5p1c87e4jsnb3e181c3e99b',
//           'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//         }
//       };
//       try {
//         const response = await axios.request(options);
//         if(response){
//         setWeatherData(response.data);
//         console.log(weatherData.current.temp_c);
//         setView(true);
//     }
            
//         else{
//             alert("error");
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     useEffect(()=>{
//         fetchWeatherData();
//     },[inputValue])
 
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//     if(inputValue==null){
//         // setInputValue("");
//         // setWeatherData([]);
//         setView(false); 
//     }
   
//   };
 
//   const handleInputTypeChange = (event) => {
//     setInputType(event.target.value);
//   };
//   return (
//     <div>
//       <h1>Weather Forecast</h1>
//       <div>
//         {/* <label>
//           Input Type:
//           <select value={inputType} onChange={handleInputTypeChange}>
//             <option value="city">City Name</option>
//             <option value="coordinates">Coordinates</option>
//           </select>
//         </label> */}
//       </div>
//       <div>
//         <label>
//           Input Value:
//           <input type="text" value={inputValue} onChange={handleInputChange} />
//         </label>
//         <button onClick={fetchWeatherData}>click here</button>
//       </div>
//         {view &&<div>
//           {weatherData.forecast.forecastday&&
//             <div >max temp in deg c: {weatherData.forecast.forecastday[0].day.maxtemp_c}</div>
//          }
//           {weatherData.current&&
//             <div >current temp: {weatherData.current.temp_c}<br></br>
//             <img src={weatherData.current.condition.icon}/></div>
//           }
//           </div>}
//     </div>
//   );
// };
// export default WeatherForecastComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecastComponent = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('city'); // Default to 'city'

  useEffect(() => {
    const fetchWeatherData = async () => {
      let params = {};
      if (inputType === 'city') {
        params = {
          q: inputValue,
          days: '3'
        };
      } 
    //   else if (inputType === 'coordinates') {
    //     const [latitude, longitude] = inputValue.split(',');
    //     params = {
    //       lat: latitude.trim(),
    //       lon: longitude.trim(),
    //       days: '3'
    //     };
    //   }
 
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params,
        headers: {
          'X-RapidAPI-Key': 'f975f26eb2mshe985ed1001f4ea5p1c87e4jsnb3e181c3e99b',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
 
      try {
        const response = await axios.request(options);
        setWeatherData(response.data.forecast.forecastday);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeatherData();
  }, [inputType, inputValue]);
 
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
 
  const handleInputTypeChange = (event) => {
    setInputType(event.target.value);
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <div>
        <label>
          Input Type:
          <select value={inputType} onChange={handleInputTypeChange}>
            <option value="city">City Name</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Input Value:
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
      </div>
        <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Average Temp (°C)</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.map((dayData,index) => (
            <tr key={index}>
              <td>{dayData.date}</td>
              <td>{dayData.day.avgtemp_c}</td>
              <td>{dayData.day.maxtemp_c}</td>
              <td>{dayData.day.mintemp_c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherForecastComponent;