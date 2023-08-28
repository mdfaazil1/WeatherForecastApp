import React from "react";
import TemperatureWidget from "../Components/WeatherDisplay";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, TextField } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";
import { useState,useEffect,useContext,createContext } from "react";
import UserContext from "../MyContext";
import { GetData } from "../Api/Api";
import { Rings } from "react-loader-spinner";
import { auth,provider } from "../FirebaseConfig";
import { signInWithPopup, signOut } from 'firebase/auth';


const HomePage=()=>{
 
  const [WeatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [UserLocation, setUserLocation] = useState(null);
  const [city,setCity]=useState("");

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
  const SignOut=()=>{
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const Locate=()=>{
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
  }
  useEffect(() => {
    Locate();
  }, []);

  const handleInputChange=()=>{
    console.log("after giving search",city)
    if(isNaN(city)){
      setUserLocation((city.split(',')));
      console.log("from input",UserLocation);
      setCity("");
      fetchData();
    }
    else if(!isNaN(city)){
    setUserLocation("");
    fetchData();
  }
  console.log("after giving search",city,UserLocation)
  }


  async function fetchData() {
    if (UserLocation||city) {
      try {
        console.log("fetchdata method ")
        const data = await GetData(UserLocation.latitude,UserLocation.longitude,city);
        setWeatherData(data);
        setLoading(false); 
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
      fetchData();
    }, [UserLocation]);
    

  if (!UserLocation) {
    return <Box style={{marginLeft:'43%',marginTop:'20%'}}><Rings /></Box>;
  }
  if (loading) {
    return <Box style={{marginLeft:'43%',marginTop:'20%'}}><Rings /></Box>;
  }

    const style1={
        backgroundColor:'skyblue',
        paddingBottom:"14.3%",
    }
    const style2={
        backgroundColor:'yellow',
        height:'602px'
    }
    return(
        <Box style={style1}>
            <Box style={{display:'flex'}}>
            <TextField
                    required
                    type="text"
                    placeholder="Search by Name/Co-ordinates"
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "black" }
                    }}
                    sx={{ backdropFilter: 'blur(70px)',width: '60%', marginTop: "30px", marginLeft: 22,'& .MuiInputBase-input': {
                      padding: '1%',
                    }, }}
                />
                <Button onClick={handleInputChange} 
                sx={{marginTop:'2%',marginLeft:'1%'}}>
                  Search
                </Button>
                {user?(
                <IconButton onClick={SignOut}>
                    <Avatar sx={{ bgcolor: deepOrange[500]}}>{user.displayName[0]}</Avatar>
                </IconButton>):(<Button variant="contained" onClick={handleGoogleSignIn} sx={{marginTop:'2%',marginLeft:'12%'}}>Login</Button>)}   
            </Box>
             <UserContext.Provider   value={WeatherData}>
                <TemperatureWidget/>
            </UserContext.Provider> 
        </Box>
    );
}
export default HomePage;