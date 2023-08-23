// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Location=()=>{

//     const[userLocation,setUserLocation]=useState("");
//     const[tempLocationData,setTempLocationData]=useState([]);
//     const[coords,setCoords]=useState("");

//     useEffect(()=>{
 
//     tempLocate();
//     },[]);

    // const tempLocate=()=>{
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const { latitude, longitude } = position.coords;
    //           setUserLocation({ latitude, longitude });
    //           console.log("from geoposition")
    //           console.log(userLocation.latitude,userLocation.longitude);
    //         },
    //         (error) => {
    //           console.error('Error getting user location:', error);
    //         }
    //       );
    //     }
    //     else {
    //       console.error('Geolocation is not supported by this browser.');
    //     }   
    // }
    
//     const[view,setView]=useState(false);
//     const getData= async()=>{
//         const coords1=userLocation.latitude+","+userLocation.longitude;
//         setCoords(coords1);
//         console.log(coords);
//         const options = {
//             method: 'GET',
//             url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
//             params: {
//               q: 'hyderabad',
//               days: '3'
//             },
//             headers: {
//               'X-RapidAPI-Key': 'c1e118f12cmshfa0aa57509c2001p13ae3ejsnc49a888bfb3f',
//               'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//             }
//           };
//           const response= await axios.request(options);
//           setView(true);
//           setTempLocationData(response.data.current);

//     }

// return(
//     <div>
//         <button onClick={getData}>click</button>
//         {view&&tempLocationData&&
//         <div >
//             {/* location: {tempLocationData.location.name} */}
//             <br></br>
//             brief: {tempLocationData.location.name} 
//             {/* <img src={tempLocationData.current.condition.icon}/> */}
//         </div>}
//     </div>
// )
// }
// export default Location;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Location = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const fetchWeatherData = async () => {
        const params = {
          q: `${userLocation.latitude},${userLocation.longitude}`,
          days: '3',
        };

        const options = {
          method: 'GET',
          url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
          params,
          headers: {
            'X-RapidAPI-Key': 'f975f26eb2mshe985ed1001f4ea5p1c87e4jsnb3e181c3e99b',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
          },
        };

        try {
          const response = await axios.request(options);
          setWeatherData(response.data);
          setView(true);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      };

      fetchWeatherData();
    }
  }, [userLocation]);

  if (!userLocation) {
    return <p>Loading user location... Turn on your location</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Weather Forecast</h1>
        <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Average Temp (°C)</th>
            <th>Max Temp (°C)</th>
            <th>Min Temp (°C)</th>
            <th>current Temp</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {weatherData &&
            <tr>
              <td>1</td>
              <td>{weatherData.forecast.forecastday[0].day.avgtemp_c}</td>
              <td>{weatherData.forecast.forecastday[0].day.maxtemp_c}</td>
              <td>{weatherData.location.name}</td>
              <td>{weatherData.current.temp_c}</td>
              <td><img src={weatherData.current.condition.icon}/></td>
            </tr>
        }
        </tbody>
      </table>
    </div>
  );

};
export default Location;