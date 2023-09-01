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
import GetDayOfWeek from './Day';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width:"40%",
  // maxWidth: '100%',
  // height:'100%',
  marginLeft:172,
  marginTop:70,
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  marginTop:"9%",
  marginLeft:"35%",
  width: 150,
  height: 150,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  '& > img': {
    width: '100%',
  },
});


export default function TemperatureWidget() {

  const User=auth.currentUser;
  const WeatherData=useContext(UserContext);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  // const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);


  const Compare=()=>{
    setOpen1(true);

  }

  const AddFav=()=>{
    if(User){
      console.log("check from login check",User);
      toast.error("user is logged in");

    }
    else{
      console.log("check from login check",User);
      toast.error("Login please", {position: "bottom-left"})
    }
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
    <Grid sx={{display:'flex'}}>
      {WeatherData&&
      <Widget >
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{mt:-25}} onClick={Compare}>
            <CompareIcon/>
          </IconButton>
          <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Grid sx={ModalStyle}>
                
            </Grid>
          </Modal>
          
          <Grid sx={{ ml: 2,mt:5, minWidth: 0 }}>
            <Typography variant='h1'  fontWeight={900} sx={{marginLeft:1}} >
                {WeatherData.current?.temp_c||'Current Temp Data not available at the moment'}°C
            </Typography>
            
            <Typography variant='h2' sx={{marginLeft:0.5}}>
                {WeatherData.location?.name||'Location Data not available at the moment'}
            </Typography>
            <Typography variant='h3' sx={{marginLeft:2,mt:1}}>
                {WeatherData.current?.condition?.text||'Weather Data not available at the moment'}
                <br/>{formattedTime}
            </Typography>

          </Grid>

          <CoverImage>
            <img
              alt="temp Icon"
              src={WeatherData.current?.condition?.icon}
            />
          </CoverImage>

          <Tooltip title="More" placement='right-start'>
          <IconButton sx={{marginTop:-25}} onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
          </Tooltip>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Grid sx={ModalStyle}>
                <Button contained onClick={AddFav} sx={{backgroundColor:"grey",color:"black"}}>
                    Add to Fav
                </Button>
            </Grid>
          </Modal>

        </Grid>
        <Stack direction='row' sx={{mt:'4%'}}>
          <WeatherCard Icon={<img src={MaximumTemp} style={ImgStyle}/>} Value={WeatherData.forecast?.forecastday[0]?.day.maxtemp_c+"°C"} Text="Maximum Temperature"/>
          <WeatherCard Icon={<img src={MinimumTemp} style={ImgStyle}/>}  Value={WeatherData.forecast?.forecastday[0]?.day.mintemp_c+"°C"} Text="Minimum Temperature"/>
          <WeatherCard Icon={<img src={WindIcon} style={ImgStyle}/>} Value={WeatherData.current?.wind_kph+'km/h'} Text="Wind Speed"/>
          <WeatherCard Icon={<img src={HumidIcon} style={ImgStyle}/>} Value={WeatherData.current?.humidity+"%"} Text="Humidity"/>
          <WeatherCard Icon={<img src={PrecipitaionIcon} style={ImgStyle}/>} Value={WeatherData.forecast?.forecastday[0]?.day?.totalprecip_mm+"mm"} Text="Precipitation"/>
        </Stack>
        <Link
      to="/hourlyweather"
      state={WeatherData}
      style={{
        textDecoration: 'none',
        color: 'black',
        marginTop:"2%",
        marginLeft: '78%',
        display: 'flex', 
      }}
    >
      <Typography variant="h5">
        Hourly Details
      </Typography>
      <ArrowForwardIcon sx={{ height: '20px' }} />
    </Link>
        
      </Widget>}
      <Paper sx={{
        borderRadius:16,
        marginTop:"4.5%",
        marginLeft:"5%",
        backdropFilter: 'blur(40px)',
        backgroundColor:'rgba(255,255,255,0.4)',
        width:'28%',
        height:'100%',
        zIndex: 1,
        paddingBottom:"1.5%"
       }}>
        <Typography variant='h2'>
          Next 3 Days
        </Typography>
        {/* <Divider orientation="horizontal" flexItem style={{ borderColor: 'black' }} /> */}
      {WeatherData&& WeatherData.forecast.forecastday.map((Wdata,index)=>(
      <CardContent key={index}>
      <Typography>
            Temperature On {GetDayOfWeek(Wdata.date)} seems to be {Wdata.day.maxtemp_c}°C
              <img src={Wdata.day.condition.icon} alt="Weather icon" />
      </Typography>
    </CardContent>
      ))}
    </Paper>
    </Grid>
  );
}