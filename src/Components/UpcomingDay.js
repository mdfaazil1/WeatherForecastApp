import React,{useContext} from "react";
import UserContext from "../MyContext";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UpcomingDay=()=>{
    const WeatherData=useContext(UserContext);

    const GetDayOfWeek=(dateString)=> {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateString);
        const dayOfWeekIndex = date.getDay();
        return daysOfWeek[dayOfWeekIndex];
      }

    return(
<Box sx={{ display:"flex",mt:2,ml:"20%" }}>
      <Grid container spacing={5}>
            {WeatherData&&WeatherData.forecast.forecastday.slice(1).map((Day,index)=>(
                <Grid item xs={4} key={index}  sx={{marginRight:"3.5%"}}>
                    <Card elevation={0} sx={{backdropFilter:"blur(4px)",backgroundColor:"rgba(255,255,255,0.4)",width:"130%",height:"85%"}}>
                       <Typography variant="h6">
                         {GetDayOfWeek(Day.date)}<br/>
                        </Typography>
                    
                    <Typography variant="h5" sx={{mb:"10%",mt:"-8%"}}>
                        {Day.day.maxtemp_c}°C  <img src={Day.day.condition.icon} height={70}/>
                    </Typography>
                    </Card>
                </Grid>    
            ))}
        
      </Grid>
    </Box>
    );
}
export default UpcomingDay;