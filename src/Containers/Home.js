import React from "react";
import TemperatureWidget from "../Components/WeatherDisplay";
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Divider, Grid, IconButton, Stack, TextField,useTheme } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import { useState,useEffect,useContext,createContext } from "react";
import UserContext from "../MyContext";
import { GetData } from "../Api/Api";
import { auth,provider } from "../FirebaseConfig";
import { signInWithPopup, signOut } from 'firebase/auth';
import BackgroundImg from "../Assests/background1.jpg";
// import theme from "../theme";
import Skeleton from '@mui/material/Skeleton';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import OverView from "../Components/Summarised";
import HourlyWeather from "../Components/HourlyWeather";
import { Link } from "react-router-dom";
import {Typography} from "@mui/material";
import UpcomingDay from "../Components/UpcomingDay";
import AstroDetails from "../Components/AstroDetail";
import LineChart from "../Components/HourGraph";
import {Paper} from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deleteAll } from "../action";
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";

const HomePage=()=>{
  // const theme=useTheme();
  const [WeatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [UserLocation, setUserLocation] = useState();
  const [city,setCity]=useState("");
  const [view,setView]=useState(false);
  let days='3';
  const [user, setUser] = useState(null);

  const User=auth.currentUser;
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log('User is signed in:', user);
  //     } else {
  //       console.log('User is signed out');
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user]);
  const dispatch=useDispatch();

  const values=useSelector((state)=>state.values);


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        localStorage.setItem('dataKey', JSON.stringify(user));
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
        localStorage.clear();
        User="";
      })
      .catch((err) => {
        console.log(err);
      });
      dispatch(deleteAll());
      setAnchorEl(null);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  const location=useLocation();
  const WeatherData1=location.state;
  
  useEffect(() => {
    if(WeatherData1){
      setUserLocation(WeatherData1?.location?.name);
      console.log("weatherdata1 is not empty ",WeatherData1);
    }
    else{
      console.log("Weatherdata1 is empty")
      Locate();
    }
    
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
        toast.error(error.message,{position:"bottom-left"});
      }
    }
  }

  useEffect(() => {
      fetchData();
    }, [UserLocation]);


  if (!UserLocation||loading) {
    return <Stack sx={{backgroundImage:`url(${BackgroundImg})`,
    backgroundRepeat:"no-repeat",
    paddingBottom:"17%",
    backgroundPosition:"center",
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
        <Grid sx={{backgroundImage:`url(${BackgroundImg})`,
        backgroundRepeat:"no-repeat",
        paddingBottom:"0.8%",
        height:"100vh",
        backgroundPosition:"center",
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
                    sx={{ backdropFilter: 'blur(70px)',width: '60%', marginTop: "2%", marginLeft: 22,'& .MuiInputBase-input': {
                      padding: '1%',
                    }, }}
                />
                <Button
                variant="contained"
                onClick={handleInputChange}
                sx={{marginTop:'2%',marginLeft:'1%',color:"black",backgroundColor:"grey"}}>
                  Search
                </Button>
                {user||User?(
                <IconButton  sx={{marginLeft:'7.6%'}}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
                {/* <Link to="/wishlist" style={{marginTop:'2%',marginLeft:'7%',textDecoration:"none"}}> */}
                    <Avatar sx={{ bgcolor: deepOrange[500],mb:"-70%"}}>{User.displayName[0]}</Avatar>
                    </IconButton>):(<Button variant="contained" onClick={handleGoogleSignIn} sx={{marginTop:'2%',marginLeft:'5.5%',backgroundColor:"grey"}}>Login</Button>)}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <Link to="/wishlist" style={{textDecoration:"none",color:"black"}}> <MenuItem  >Favourites</MenuItem></Link>
                      <MenuItem onClick={SignOut}>Logout</MenuItem>
                    </Menu>
            </Grid>
             <UserContext.Provider   value={WeatherData}>
                
                <Grid container>
                  <Grid item xs={6}>
                    <TemperatureWidget/>
                  </Grid>
                  <Grid item xs={6}>
                  <Paper sx={{
                                        borderRadius:4,
                                        marginTop:"3%",
                                        marginLeft:"20%",
                                        backdropFilter: 'blur(4px)',
                                        backgroundColor:'rgba(255,255,255,0.4)',
                                        width:'60%',
                                        height:'57%',
                                        padding:"1%",
                  }}>
                    <LineChart/>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                  <Typography variant="h4" sx={{mt:1,mr:"18%"}}>
                  Additional Info  
                </Typography>
                <Divider orientation="horizontal" sx={{borderColor:"black",width:"90%",ml:"28%"}}/>
                  <AstroDetails />
                  </Grid>
                  <Grid item xs={6} >
                    <Typography variant="h4" sx={{mt:"-20%",mr:"33%"}}>
                      Next 2 Days    
                    </Typography>
                    <Divider orientation="horizontal" sx={{borderColor:"black",width:"30%",ml:20}}/>
                    <UpcomingDay/>
                  </Grid>
                </Grid>
            </UserContext.Provider>
            
        </Grid>
    );
}
export default HomePage;