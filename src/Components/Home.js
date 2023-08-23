// import { height } from "@mui/system";
import React from "react";
import TemperatureWidget from "./temperatureDisplay";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
import { useState,useEffect,useContext,createContext } from "react";
import axios from "axios";
import UserContext from "../MyContext";
import { Lines } from 'react-preloaders';
// export const UserContext=createContext();

const HomePage=()=>{

  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log("lat",latitude);
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
          days: '5',
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
          await axios.request(options)
          .then((response)=>{
            console.log("this is response check1 ",response.data);
            setWeatherData(response.data);
          });
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

    const style1={
        backgroundColor:'skyblue',
        height:'602px',
    }
    const style2={
        backgroundColor:'yellow',
        height:'602px'
    }
    return(
        <div style={style1}>
            <div style={{display:'flex'}}>
            <TextField
                    type="text"
                    placeholder="Search by Name/Co-ordinates"
                    // value={searchTerm}
                    // onChange={handleInputChange}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "black" }
                    }}
                    sx={{ backdropFilter: 'blur(70px)', width: '60%', marginTop: "30px", marginLeft: 22,zIndex:1 }}
                />
                <Link to="/wishlist">
                    <Avatar sx={{ bgcolor: deepOrange[500],marginTop:'33px',marginLeft:5, }}>N</Avatar>
                 </Link>    
            </div>
             <UserContext.Provider   value={weatherData}>
                <TemperatureWidget/>
            </UserContext.Provider> 
        </div>
    );
}
export default HomePage;