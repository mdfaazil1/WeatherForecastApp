import React, { useState, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserContext from '../MyContext';
import {Card,CardMedia,CardContent, Divider, Stack, IconButton, Button, Grid, Paper} from "@mui/material"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import HumidIcon from "../Assests/Humidity.png";
import { faTemperatureLow,faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import WeatherCard from './WeatherCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import  {auth}  from '../FirebaseConfig';
import Modal from '@mui/material/Modal';

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
  useEffect(()=>{
    console.log("check2",WeatherData);
  },[]);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const AddFav=()=>{
    if(User){
      console.log("check from login check",User);
      alert("user is logged in");

    }
    else{
      console.log("check from login check",User);
      alert("Login please")
    }
  }

  const ImgStyle={
    height:"20px",
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
          
          <Grid sx={{ ml: 8, minWidth: 0 }}>
            <Typography variant="caption"  fontWeight={900} fontSize={30} sx={{marginLeft:1}} >
                {WeatherData.current?.temp_c||'Current Temp Data not available at the moment'}°C
            </Typography>
            
            <Typography sx={{fontWeight:920,marginLeft:0.5}}>
                {WeatherData.location?.name||'Location Data not available at the moment'}
            </Typography>
            <Typography fontWeight={350} sx={{marginLeft:2}}>
                {WeatherData.current?.condition?.text||'Weather Data not available at the moment'}
            </Typography>

          </Grid>
          <CoverImage>
            <img
              alt="temp Icon"
              src={WeatherData.current?.condition?.icon}
            />
          </CoverImage>
          <Tooltip title="More" placement='right-start'>
          <IconButton sx={{marginTop:-18}} onClick={handleOpen}>
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
                <Button onClick={AddFav}>
                    Add to Fav
                </Button>
            </Grid>
          </Modal>

        </Grid>
        <Divider orientation='horizontal' style={{borderColor:'black'}}/>
        <Stack direction='row' spacing={3} sx={{marginTop:'5%'}}>
          <WeatherCard Icon={<FontAwesomeIcon icon={faTemperatureHigh} style={ImgStyle}/>} Value={WeatherData.forecast?.forecastday[0]?.day.maxtemp_c+"°C"}/>

          <WeatherCard Icon={<FontAwesomeIcon icon={faTemperatureLow} style={ImgStyle}/>}  Value={WeatherData.forecast?.forecastday[0]?.day.mintemp_c+"°C"}/>

          <WeatherCard Icon={<FontAwesomeIcon icon={faWind} style={{height:'20px'}}/>} Value={WeatherData.current?.wind_kph+'kph'} />
            
          <WeatherCard Icon={<img src={HumidIcon} style={ImgStyle}/>} Value={WeatherData.current?.humidity}/>
            
          <WeatherCard  Value={"total precipitation:"+ WeatherData.forecast?.forecastday[0]?.day?.totalprecip_mm+"mm"}/>
    
          <WeatherCard Value={"avg humid:"+ WeatherData.forecast.forecastday[0].day.avghumidity}/>
        </Stack>
        
      </Widget>}
      <Paper sx={{
        borderRadius:10,
        marginTop:"4.5%",
        marginLeft:"5%",
        backdropFilter: 'blur(40px)',
        backgroundColor:'rgba(255,255,255,0.4)',
        width:'20%',
        height:'100%',
       }}>
      {WeatherData&& WeatherData.forecast.forecastday.map((Wdata,index)=>(
      <CardContent key={index} >
        <Typography gutterBottom component="div">
            {Wdata.date}-- {Wdata.day.maxtemp_c}°C
            <img src={Wdata.day.condition.icon}/>
        </Typography>
        
        <Divider orientation='horizontal' style={{ borderWidth:2 }}/>
      </CardContent>
      ))}
    </Paper>
    </Grid>
  );
}