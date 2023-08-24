import React from "react";
import TemperatureWidget from "../Components/temperatureDisplay";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, TextField } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
import { useState,useEffect,useContext,createContext } from "react";
import UserContext from "../MyContext";
import { GetData } from "../API/Api"; 
import { Rings } from "react-loader-spinner";
import { auth,provider } from "../FirebaseConfig";
import { signInWithPopup, signOut } from 'firebase/auth';


const HomePage=()=>{
  // const user = auth.currentUser;
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [City,setCity]=useState("");

  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
        setUser(user);
        console.log("user name: "+user.displayName)
      })
      .catch((err) => {
        console.log(err);
      });
  };


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

  const handleInputChange=()=>{
    setUserLocation("");
    fetchData();
  }

  async function fetchData() {
    if (userLocation||City) {
      try {
        const data = await GetData(userLocation.latitude,userLocation.longitude,City);
        setWeatherData(data);
        setLoading(false); // Set loading to false after data is fetched and set
      } catch (error) {
        console.error(error);
      }
    }
    
  }

  useEffect(() => {
      fetchData();
    }, [userLocation]);
    

  // if (!userLocation) {
  //   return <p>Loading user location... Turn on your location</p>;
  // }
  if (loading) {
    return <Rings/>;
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
        <Box style={style1}>
            <Box style={{display:'flex'}}>
            <TextField
                    type="text"
                    placeholder="Search by Name/Co-ordinates"
                    value={City}
                    onChange={(e)=>{setCity(e.target.value)}}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "black" }
                    }}
                    sx={{ backdropFilter: 'blur(70px)', width: '60%', marginTop: "30px", marginLeft: 22,zIndex:1 }}
                />
                <Button onClick={handleInputChange}>Search</Button>
                {user?(
                <Link to="/wishlist" style={{textDecoration:'none' }}>
                    <Avatar sx={{ bgcolor: deepOrange[500],marginTop:'33px',marginLeft:5}}>{user.displayName[0]}</Avatar>
                 </Link> ):(<Button onClick={handleGoogleSignIn}>Login</Button>)}   
            </Box>
             <UserContext.Provider   value={weatherData}>
                <TemperatureWidget/>
            </UserContext.Provider> 
        </Box>
    );
}
export default HomePage;