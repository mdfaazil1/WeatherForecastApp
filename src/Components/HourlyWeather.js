import Grid from '@mui/material/Grid';
import React,{useContext,useEffect} from "react"; 
import { useLocation } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserContext from "../MyContext";
import OverView from "./Summarised";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const HourlyWeather=()=>{
  
    const location=useLocation();
   const WeatherData=location.state;
  useEffect(()=>{
    console.log("from hourly weather", location);
    console.log("check from hourly weather ",WeatherData);
  },[]);

  const TimeFormat=(DataTime)=>{
    const date=new Date(DataTime);
    const time=date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      return time;
  }


  const ImgStyle={
    height:"30px",
    marginLeft:500,
  }
return(    
<Grid container spacing={2} >
  <Grid sx={{ml:12,mt:"2%",width:"50%"}} >
  {WeatherData &&
    WeatherData.forecast.forecastday[0].hour.map((item, index) => (
        <Accordion key={index} sx={{ mt: "1%" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {TimeFormat(item.time)}
              <img src={item.condition.icon} style={ImgStyle} />
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography sx={{ ml: "-60%" }}>
            Temp: {item.temp_c}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ))}

</Grid>
<Grid sx={{mt:"2%"}} >
          <UserContext.Provider   value={WeatherData}>
                {/* <OverView/> */}
            </UserContext.Provider>
            </Grid>
            
</Grid>
)}
export default HourlyWeather;