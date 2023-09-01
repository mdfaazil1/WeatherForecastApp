import React from "react";
import TemperatureWidget from "../Components/WeatherDisplay";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, IconButton, Stack, TextField,useTheme } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { useState,useEffect,useContext,createContext } from "react";
import UserContext from "../MyContext";
import { GetData } from "../Api/Api";
import { Rings } from "react-loader-spinner";
import { auth,provider } from "../FirebaseConfig";
import { signInWithPopup, signOut } from 'firebase/auth';
import BackgroundImg from "../Assests/b1.jpg";
// import theme from "../theme";
import Skeleton from '@mui/material/Skeleton';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HourlyWeather from "../Components/HourlyWeather";
import { Link } from "react-router-dom";

const HomePage=()=>{
  // const theme=useTheme();
  const [WeatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [UserLocation, setUserLocation] = useState();
  const [city,setCity]=useState("");
  const [view,setView]=useState(false);
  let days='3';
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('User is signed out');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);


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
          let InitialLocation=`${latitude},${longitude}`;
          setUserLocation(InitialLocation);
          // console.log("lat",UserLocation[0],"long",UserLocation[1]);
        },
        (error) => {
          console.error('Error getting user location:', error);
          setUserLocation("");
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
    if(city==""){
      toast.warning("Please Enter the Location",{position: "bottom-left"});
    }
    else{
    setUserLocation(city);
    fetchData();
    setCity("");
  console.log("after giving search city",city)
    }
  }


  async function fetchData() {
    if (UserLocation) {
      try {
        console.log("fetchdata method UserLocation", UserLocation);
        const data = await GetData(UserLocation,days);
        setWeatherData(data);
        setLoading(false);
      }  catch (error) {
        console.error(error);
        toast.error(error.message,{position:"bottom-left"}); // Show the error message to the user
      }
    }
  }

  useEffect(() => {
      fetchData();
    }, [UserLocation]);


  if (!UserLocation||loading) {
    return <Stack sx={{backgroundImage:`url(${BackgroundImg})`,backgroundRepeat:"no-repeat",paddingBottom:"15.8%",backgroundPosition:"center",
    backgroundSize:"cover"}}>
              <Box sx={{display:'flex',}}>
                <Skeleton variant="text" sx={{width:'60%',fontSize:'3rem',ml:22,mt:2}}/>
                <Skeleton variant="rounded" sx={{width:'6%',ml:5,mt:4}} height={35}/>

              </Box>
              <Box sx={{display:'flex'}}>
              <Skeleton variant="rounded" sx={{width:'40%',ml:22 ,mt:8}} height={300}/>
              <Skeleton variant="rounded"sx={{width:'20%',ml:10,mt:8}} height={300}/>
              </Box>
          </Stack>;
  }
    return(
        <Grid sx={{backgroundImage:`url(${BackgroundImg})`,backgroundRepeat:"no-repeat",paddingBottom:"11.8%",backgroundPosition:"center",
        backgroundSize:"cover"}}>
          <ToastContainer/>
            <Grid style={{display:'flex'}}>
            <TextField
                    required
                    type="text"
                    placeholder="Search by Name/Co-ordinates"
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "white" }
                    }}
                    sx={{ backdropFilter: 'blur(70px)',width: '60%', marginTop: "30px", marginLeft: 22,'& .MuiInputBase-input': {
                      padding: '1%',
                    }, }}
                />
                <Button
                variant="contained"
                onClick={handleInputChange}
                sx={{marginTop:'2%',marginLeft:'1%',color:"black",backgroundColor:"grey"}}>
                  Search
                </Button>
                {user?(
                <IconButton onClick={SignOut} sx={{marginLeft:'12%',marginTop:'2%'}}>
                    <Avatar sx={{ bgcolor: deepOrange[500]}}>{user.displayName[0]}</Avatar>
                </IconButton>):(<Button variant="contained" onClick={handleGoogleSignIn} sx={{marginTop:'2%',marginLeft:'12%',backgroundColor:"grey"}}>Login</Button>)}
            </Grid>
             <UserContext.Provider   value={WeatherData}>
                <TemperatureWidget/>
            </UserContext.Provider>
            
        </Grid>
    );
}
export default HomePage;