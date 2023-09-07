import React,{useContext} from "react";
import UserContext from "../MyContext";
import { Box, Typography,Stack } from "@mui/material";
import Sunrise from "../Assests/Sunrise.gif";
import Sunset from "../Assests/Sunset.gif";
import VisibilityIcon from "../Assests/Vis.gif";
import WeatherCard from "./WeatherCard";
import UVIcon from "../Assests/uv.png";
import RainChance from "../Assests/rainchance.gif";
import PressureIcon from "../Assests/p1.gif";

const AstroDetails=()=>{
    const WeatherData=useContext(UserContext);
    const BoxStyle={
        height:"15vh",
        display:"flex",
        width:"161.5%",
        marginLeft:"20%",
        marginTop:"2.5%",
        backgroundColor:'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(3px)',
        borderRadius:"5px",
        paddingTop:"1%"
    }
    const ImgStyle={
        height:"50px",
        width:"50px",
      }
    return(
        <Box style={BoxStyle}>
         <Stack direction='row' sx={{justifyContent:"space-evenly",ml:"2%",width:"165vh"}}>
          <WeatherCard Icon={<img src={Sunrise} style={ImgStyle}/>} Value={WeatherData.forecast?.forecastday[0]?.astro?.sunrise} Text="Sunrise Time"/>
          <WeatherCard Icon={<img src={Sunset} style={ImgStyle}/>}  Value={WeatherData.forecast?.forecastday[0]?.astro?.sunset} Text="Sunset Time"/>
          <WeatherCard Icon={<img src={VisibilityIcon} style={ImgStyle}/>} Value={WeatherData.current?.vis_km+" km"} Text="Visibility"/>
          <WeatherCard Icon={<img src={RainChance} style={ImgStyle}/>} Value={WeatherData.forecast?.forecastday[0]?.day?.daily_chance_of_rain+"%"} Text="Chance Of Rain"/> 
          <WeatherCard Icon={<img src={UVIcon} style={ImgStyle}/>} Value={WeatherData.current?.uv+"%"} Text="UV Rays"/>
          {/* <WeatherCard Icon={<img src={PressureIcon} style={ImgStyle}/>} Value={WeatherData.current?.pressure_mb+" MBar"} Text="Pressure"/> */}
         </Stack>
        </Box>
    )
}
export default AstroDetails;