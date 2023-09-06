import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import UserContext from '../MyContext';
import {Card,CardMedia,CardContent, Divider, Stack, IconButton, Button, Grid, Paper} from "@mui/material"
import HumidIcon from "../Assests/Humidity.gif";
import WeatherCard from './WeatherCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PrecipitaionIcon from "../Assests/precipitaion.gif";
import Tooltip from '@mui/material/Tooltip';
import  {auth}  from '../FirebaseConfig';
import Modal from '@mui/material/Modal';
import CompareIcon from '@mui/icons-material/Compare';
import WindIcon from "../Assests/Wind2.gif";
import MaximumTemp from "../Assests/MaximumTemperature.gif";
import MinimumTemp from "../Assests/MinimumTemp.gif";
import HourlyWeather from './HourlyWeather';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { addValue,deleteValue } from '../action';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Widget = styled('div')(({ theme }) => ({
  // padding: 16,
  borderRadius: 16,
  width:"100%",
  // maxWidth: '100%',
  // height:'285px',
  marginLeft:"25%",
  marginRight:"-15%",
  marginTop:"3%",
  // position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(10px)',
}));

const CoverImage = styled('div')({
  marginTop:"6%",
  position:"fixed",
  marginLeft:"64%",
  width: "30%",
  // height: "10%",
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  '& > img': {
    width: '100%',
  },
});


export default function TemperatureWidget() {
  const dispatch=useDispatch();

  const values=useSelector((state)=>state.values);

  const User=auth.currentUser;
  const WeatherData=useContext(UserContext);

  const formattedTime = new Date(WeatherData.location.localtime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  const [clicked,setClicked]=useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  // const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  

  const Compare=()=>{
    setOpen1(true);
  }
  useEffect(()=>{
    if(values){
    const SavedName=values.find(LocationName=>LocationName.location.name==WeatherData.location.name);
    if(SavedName){
      setClicked(false);
    }
    else{
      setClicked(true);
    }
  }
  else{
    setClicked(true);
  }
  },[WeatherData.location.name])
  useEffect(()=>{
    if(!User){
      setClicked(true);
    }
  },[User]);

  const AddFav=(WeatherData)=>{
    if(User){
      console.log("check from login check",User);
      setClicked(!clicked);
      if(clicked){
      console.log("click heart",clicked);
      dispatch(addValue(WeatherData));
      console.log("from store", WeatherData);
    }
    else{
      const SavedName=values.find(LocationName=>LocationName.location.name==WeatherData.location.name);
      dispatch(deleteValue(SavedName));
    }
    }
    else{
      setClicked(true);
      console.log("check from login check",User);
      toast.error("Login please", {position: "bottom-left"})
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const OpenMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const GetDayOfWeek=(dateString)=> {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayOfWeekIndex = date.getDay();
    return daysOfWeek[dayOfWeekIndex];
  }

  const ImgStyle={
    height:"55px",
  }
  const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid sx={{display:'flex',height:"63vh" }}>
      {WeatherData&&
      <Widget >
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/compare" style={{marginBottom:"27%",marginLeft:"2.7%"}} state={WeatherData}>
          <IconButton  >
            <CompareIcon/>
          </IconButton>
          </Link>
          <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Grid sx={ModalStyle}>
              Store check
                {values&&values.map((item,index)=>(
                  <div key={index}>{item.location.name}</div>
                ))}
            </Grid>
          </Modal>
          
          <Grid sx={{ ml:"2%",mt:"10%"}}>
            <Typography variant='h1'  sx={{marginLeft:"1%"}} >
                {WeatherData.current?.temp_c||'Current Temp Data not available at the moment'}°C
            </Typography>
            
            <Typography variant='h2' sx={{width:"100%"}}>
                {WeatherData.location?.name||'Location Data not available at the moment'}
            </Typography>
            <Typography variant='h3' sx={{ml:"1%",mt:"1%"}}>
                {WeatherData.current?.condition?.text||'Weather Data not available at the moment'}
                
            </Typography>
            <Typography variant='h3' sx={{ml:"-1%",mt:"6%"}}>
            {GetDayOfWeek(WeatherData?.location?.localtime)}, {formattedTime}
            </Typography>
          </Grid>

          <CoverImage >
            <img
              alt="temp Icon"
              src={WeatherData.current?.condition?.icon}
            />
          </CoverImage>

          <Tooltip title="Like" placement='right-start'>
          <IconButton sx={{mb:"27%",ml:"90%",position:"fixed"}} 
           controls={OpenMenu ? 'basic-menu' : undefined}
           haspopup="true"
           expanded={OpenMenu ? 'true' : undefined}
           onClick={()=>AddFav(WeatherData)}>
            {clicked?<FavoriteBorderIcon/>:<FavoriteIcon sx={{color:"red"}}/>}
          </IconButton>
          </Tooltip>
        </Grid>
        <Grid container sx={{mt:'4%',justifyContent:"space-evenly"}}>
          <Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={MaximumTemp} style={ImgStyle}/>} Value={WeatherData.forecast?.forecastday[0]?.day.maxtemp_c+"°C"} Text="Maximum Temperature"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
                      <WeatherCard Icon={<img src={MinimumTemp} style={ImgStyle}/>}  Value={WeatherData.forecast?.forecastday[0]?.day.mintemp_c+"°C"} Text="Minimum Temperature"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={WindIcon} style={ImgStyle}/>} Value={WeatherData.current?.wind_kph+'km/h'} Text="Wind Speed"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >

<WeatherCard Icon={<img src={HumidIcon} style={ImgStyle}/>} Value={WeatherData.current?.humidity+"%"} Text="Humidity"/>
</Grid>
<Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={PrecipitaionIcon} style={ImgStyle}/>} Value={WeatherData.forecast?.forecastday[0]?.day?.totalprecip_mm+"mm"} Text="Precipitation"/>
          </Grid>
        </Grid>
        
      </Widget>}
      


      {/* <Paper sx={{
        borderRadius:4,
        marginTop:"5%",
        marginLeft:"5%",
        backdropFilter: 'blur(4px)',
        backgroundColor:'rgba(255,255,255,0.4)',
        width:'30%',
        height:'50%',
        padding:"1%",
       }}> */}
        {/* <UserContext.Provider   value={WeatherData}>
        <LineChart/>
        </UserContext.Provider> */}
        {/* <Link
      to="/hourlyweather"
      state={WeatherData}
      style={{
        textDecoration: 'none',
        color: 'black',
        marginTop:"5%",
        marginLeft: '73%',
        display: 'flex', 
      }}
    >
      <Typography variant="h5">
        Hourly Details
      </Typography>
      <ArrowForwardIcon sx={{ height: '20px' }} />
    </Link> */}

    {/* </Paper> */}
    </Grid>
  );
}