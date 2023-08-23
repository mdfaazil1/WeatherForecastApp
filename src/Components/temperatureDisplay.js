import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UserContext from '../MyContext';
import {Card,CardMedia,CardContent} from "@mui/material"


const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 500,
  maxWidth: '100%',
  height:'250px',
  // margin: 'auto',
  marginLeft:172,
  marginTop:70,
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    marginLeft:159,
  width: 150,
  height: 150,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  // backgroundColor: 'white',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function TemperatureWidget() {
  
  const weatherData=useContext(UserContext);
  // const[weatherData,setWeatherData]=useState([]);
  useEffect(()=>{
    // setWeatherData(DATA);
    console.log("check2",weatherData);
  },[])



  return (
    <Box sx={{ width: '100%', overflow: 'hidden',display:'flex' }}>
      {weatherData&&
      <Widget >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="caption"  fontWeight={900} fontSize={30} sx={{marginLeft:12}}>
                {weatherData.current?.temp_c||'Current Temp Data not available at the moment'}°C
            </Typography>

            <Typography noWrap sx={{fontWeight:920,marginLeft:11}}>
                {weatherData.location?.name||'Location Data not available at the moment'}
            </Typography>
            <Typography  letterSpacing={-0.25} fontWeight={350} sx={{marginLeft:12}}>
                {weatherData.current?.condition?.text||'Weather Data not available at the moment'}
            </Typography>

          </Box>
          <CoverImage>
            <img
              alt="temp Icon"
              src={weatherData.current?.condition?.icon}
            />
          </CoverImage>
        </Box>
        <Box sx={{display:'flex',marginTop:2,padding:1,borderRadius:1}}>
        <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,}}>
                <Typography>
                    max temp: {weatherData.forecast?.forecastday[0]?.day?.maxtemp_c||'Data not available at the moment'}°C
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,}}>
                <Typography>
                min temp: {weatherData.forecast?.forecastday[0]?.day.mintemp_c||'Data not available at the moment'}°C
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,}}>
                <Typography>
                wind speed: {weatherData.current?.wind_kph||'Data not available at the moment'} kph
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,}}>
                <Typography>
                    humidity: {weatherData.current?.humidity||'Data not available at the moment'}
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,}}>
                <Typography>
                    total precipitation: {weatherData.forecast?.forecastday[0]?.day?.totalprecip_mm||'Data not available at the moment'}mm
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',borderRadius:1,}}>
                <Typography>
                    avg humid: {weatherData.forecast.forecastday[0].day.avghumidity}
                </Typography>
            </Box>
            </Box>
      </Widget>}
      <Card sx={{ width:250,borderRadius:10,marginTop:9,marginLeft:10 }}>
      {weatherData&& weatherData.forecast.forecastday.map((Wdata,index)=>(
      <CardContent key={index}>
        <Typography gutterBottom component="div">
            {Wdata.date}--- Max temp on this day is {Wdata.day.maxtemp_c}°C
        </Typography>

      </CardContent>
      ))}
    </Card>
    </Box>
  );
}