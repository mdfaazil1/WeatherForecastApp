import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Card,CardMedia,CardContent} from "@mui/material"

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 500,
  maxWidth: '100%',
  height:'250px',
  margin: 'auto',
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
  backgroundColor: 'rgba(0,0,0,0.08)',
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



  const [weatherData, setWeatherData] = useState([]);
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
    <Box sx={{ width: '100%', overflow: 'hidden',display:'flex' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="caption"  fontWeight={900} fontSize={30} sx={{marginLeft:0}}>
                {weatherData.current.temp_c}
            </Typography>

            <Typography noWrap>
                 
            </Typography>
            <Typography  letterSpacing={-0.25} fontWeight={350} sx={{marginRight:0}}>
                {weatherData.current.condition.text}
            </Typography>
           
          </Box>
          <CoverImage>
            <img
              alt="temp Icon"
              src={weatherData.current.condition.icon}
            />
          </CoverImage>
        </Box>
        <Box sx={{display:'flex',marginTop:2,padding:1,borderRadius:1}}>
        <Box sx={{border:'2px solid black',marginRight:0.5,height:70,borderRadius:1,width:80}}>
                <Typography>
                    max temp: {weatherData.forecast.forecastday[0].day.maxtemp_c}
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                min temp: {weatherData.forecast.forecastday[0].day.mintemp_c}
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                wind speed: {weatherData.current.wind_kph}
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                    humidity: {weatherData.current.humidity}
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                    total precipe: {weatherData.forecast.forecastday[0].day.totalprecip_mm}
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',borderRadius:1,width:80}}>
                <Typography>
                    avg humid: {weatherData.forecast.forecastday[0].day.avghumidity}
                </Typography>
            </Box>
            </Box>
      </Widget>
      <Card sx={{ width:250,borderRadius:10,marginRight:30,height:'280px' }}>
      <CardMedia
        component="img"
        alt="weather icon"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        sx={{marginLeft:3,marginTop:1}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            future weather predictions
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
    </Card>
    </Box>
  );
}