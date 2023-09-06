import React,{useContext,useEffect} from "react";
import UserContext from "../MyContext";
import { Box, Typography } from "@mui/material";
const OverView=()=>{
    // const theme=useTheme
    const WeatherData=useContext(UserContext);
  useEffect(()=>{
    console.log("check from OverView",WeatherData);
  },[]);
  return(
    <Box sx={{position:"fixed",ml:3,border:"2px solid black",width:"40%",borderRadius:10,}}>
        An Overview of Today's Weather<br/>
    <img src={WeatherData.forecast.forecastday[0].day.condition.icon}/><br/>
    <Typography variant="h4" mb={"65%"}>    
    The temperature feels like {WeatherData.current.feelslike_c} °C<br/>
    Sunrise Time: {WeatherData.forecast.forecastday[0].astro.sunrise}<br/>
    Sunset Time: {WeatherData.forecast.forecastday[0].astro.sunset}<br/>
    Moon Phase: {WeatherData.forecast.forecastday[0].astro.moon_phase}<br/>
    Chance of Rain: {WeatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
    </Typography>
    </Box>
  
  )}
export default OverView;
