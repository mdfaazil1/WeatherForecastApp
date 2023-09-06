import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack,Grid, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link, Navigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BackgroundImg from "../Assests/background1.jpg";
import { addValue,deleteValue } from '../action';
import UserContext from '../MyContext';
import HomePage from './Home';
import {useState} from "react";
import TemperatureWidget from "../Components/WeatherDisplay"
import LineChart from '../Components/HourGraph';
import {Divider} from '@mui/material';
import AstroDetails from '../Components/AstroDetail';
import UpcomingDay from '../Components/UpcomingDay';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const SavedWeather=()=>{
  const dispatch=useDispatch();

  const SavedData=useSelector((state)=>state.values);
  const [view,setView]=useState(false);
  const RemoveFav=(RemovingData)=>{
    dispatch(deleteValue(RemovingData));
  }
  const [WeatherData,setWeatherData]=useState();
// const history=useHistory();
  const DataPass=(WeatherData1)=>{
setWeatherData(WeatherData1);
    console.log("button of savedWeather to homepage is selected",WeatherData1)
    // return(
    //   <>
    //   <Navigate to="/" state={WeatherData1}/>
    //   </>
    // );
    setView(true);
  }
  return (
    <Grid sx={{
      backgroundImage:`url(${BackgroundImg})`,
        backgroundRepeat:"no-repeat",
        // paddingBottom:"0.8%",
        height:"100%",
        width:"100%",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundAttachment: "fixed",
        // position:"fixed",
        zIndex:-1
    }}>   
    {!view&&<Grid container sx={{pt:"1%",pl:"5%"}} >
      {SavedData&&SavedData.map((item,index)=>(
    // <Link to="/"

    <Button item key={index} 
        onClick={()=>DataPass(item)}
    sx={{
      ml:"5%",
      mr:"-2%",
      mt:"2%",
      mb:"3%",
      height:"50%",
      width:"19%",
      // backgroundColor:'brown',
      // backdropFilter: 'blur(3px)',
      borderRadius:"5px",
      }}>
            <Card
                sx={{ 
                  p:"4%",
                  width:"100%",
                  backgroundColor:'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius:"5px",}}
              >
      <img src={item.current.condition.icon} height={150}/>
      <CardContent sx={{alignContent:"center"}}>
        <Typography gutterBottom variant="h4" component="div" sx={{width:"120%",ml:"-10%"}}>
          {item.location.name}
        </Typography>
        <Typography variant="h3" >
          {item.current.temp_c}°C
        </Typography>
      </CardContent>
      <IconButton onClick={()=>RemoveFav(item)} >
        <FavoriteIcon sx={{color:"red",ml:"800%"}}/>
      </IconButton>
      </Card>
      
    </Button>
    ))}
    <br/>



    </Grid>}
    <Link to="/" style={{textDecoration:"none",color:"white"}}>
      back to home
    </Link>
    {view&&<UserContext.Provider   value={WeatherData}>
                
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
            <Button contained sx={{bgcolor:"brown",color:"white",mt:"1%",mb:"1%"}} onClick={()=>setView(false)}>Back to Favorite</Button> 
            </UserContext.Provider>
            }
           
    </Grid>
 

  );
}
export default SavedWeather;