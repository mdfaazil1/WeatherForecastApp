import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import { GetData } from "../Api/Api";
import Skeleton from "@mui/material/Skeleton";
import BackgroundImg from "../Assests/background1.jpg";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import WeatherCard from "../Components/WeatherCard";
import WindIcon from "../Assests/Wind2.gif";
import MaximumTemp from "../Assests/MaximumTemperature.gif";
import MinimumTemp from "../Assests/MinimumTemp.gif";
import HumidIcon from "../Assests/Humidity.gif";
import PrecipitaionIcon from "../Assests/precipitaion.gif";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import UserContext from "../MyContext";
import CompareChart from "../Components/CompareGraphs";
import LineChart from "../Components/HourGraph";

const Compare = () => {
  const [UserLocation, setUserLocation] = useState("");
  const [WeatherData1, setWeatherData1] = useState("");
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [WeatherData,setWeatherData]=useState();
  let days = 3;
  const location = useLocation();
  
  useEffect(()=>{
    let WData = location.state;
    setWeatherData(WData);
  },[])
  

  // Use useEffect to fetch data when UserLocation changes
  useEffect(() => {
    async function fetchData() {
      if (UserLocation) {
        try {
          console.log("fetchdata method UserLocation", UserLocation);
          const data = await GetData(UserLocation, days);
          setWeatherData1(data);
          console.log("data from compare", WeatherData1);
          setLoading(false);
        } catch (error) {
          console.error(error);
          toast.error(error.message, { position: "bottom-left" });
        }
      }
    }

    fetchData(); // Call fetchData when UserLocation changes
  }, [UserLocation]);

  const handleInputChange = () => {
    if (city === "") {
      toast.warning("Please Enter the Location", { position: "bottom-left" });
    }
    else if(city==WeatherData?.location?.name){
        toast.warning("Comparison Cant be made with the same Location, Please re-enter different Location", { position: "bottom-left" });
    } 
    else {
      setUserLocation(city);
      setCity("");
    }
  };
  const InterchangeValue=()=>{
    const TempData=WeatherData1;
    setWeatherData1(WeatherData);
    setWeatherData(TempData);
  }
  const ImgStyle={
    height:"55px",
  }
  return (
    <>
      <ToastContainer />
      <Box sx={{backgroundImage:`url(${BackgroundImg})`,
        backgroundRepeat:"no-repeat",
        padding:0,
        height:"100vh",
        backgroundPosition:"center",
        backgroundSize:"cover"}}>
            <Grid container sx={{pt:"2%"}}>
                <Grid xs={5} sx={{
                    backdropFilter: 'blur(4px)',
                    backgroundColor:'rgba(255,255,255,0.4)',
                    ml:"6%",
                    borderRadius:"10px"}}>
                        <Typography variant="h2" sx={{mt:"12%"}}>
                        {WeatherData?.location?.name}
                        </Typography>
                        <Typography variant="h4">
                        {WeatherData?.current?.temp_c}°C
                        </Typography>
                        <Typography variant="h3">
                            The weather feels like {WeatherData?.current?.feelslike_c}°C
                        </Typography>
                        <Stack direction="row" sx={{ml:"4%",mr:"2%",justifyContent:"space-evenly"}}>
                        <WeatherCard Icon={<img src={MaximumTemp} style={ImgStyle}/>} Value={WeatherData?.forecast?.forecastday[0]?.day.maxtemp_c+"°C"} Text="Max.Temperature"/>
                        <WeatherCard Icon={<img src={MinimumTemp} style={ImgStyle}/>}  Value={WeatherData?.forecast?.forecastday[0]?.day.mintemp_c+"°C"} Text="Min.Temperature"/>
                        <WeatherCard Icon={<img src={WindIcon} style={ImgStyle}/>} Value={WeatherData?.current?.wind_kph+'km/h'} Text="Wind Speed"/>
                        <WeatherCard Icon={<img src={HumidIcon} style={ImgStyle}/>} Value={WeatherData?.current?.humidity+"%"} Text="Humidity"/>
                        <WeatherCard Icon={<img src={PrecipitaionIcon} style={ImgStyle}/>} Value={WeatherData?.forecast?.forecastday[0]?.day?.totalprecip_mm+"mm"} Text="Precipitation"/>
                        </Stack>
     
                </Grid>
                <IconButton onClick={InterchangeValue} sx={{height:"10%",ml:"1%"}}>
                    <Tooltip title="Change">
                        <CompareArrowsIcon/>
                    </Tooltip>
                </IconButton>
                <Grid xs={5} sx={{
                    backdropFilter: 'blur(4px)',
                    backgroundColor:'rgba(255,255,255,0.4)',
                    ml:"1%",
                    borderRadius:"10px"}}>
                        <TextField
                         required
                         type="text"
                         placeholder="Search by Name/Co-ordinates"
                         value={city}
                         onChange={(e) => {
                         setCity(e.target.value);
                        }}
                         InputProps={{
                         startAdornment: <SearchIcon />,
                         style: { color: "black" },
                        }}
                        sx={{
                         backdropFilter: "blur(70px)",
                         width: "60%",
                         marginTop: "2%",
                         marginLeft: "1%",
                         "& .MuiInputBase-input": {
                             padding: "1%",
                             },
                        }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleInputChange}
                            sx={{ marginTop: "2%", height:"10.5%",marginLeft: "2%", color: "black", backgroundColor: "grey" }}
                        >
                            Search
                        </Button>
                        <br/>
                        {!loading && <>
                        <Typography variant="h2" sx={{mt:"4%"}}>
                            {WeatherData1?.location?.name}
                        </Typography>
                        <Typography variant="h4">
                        {WeatherData1?.current?.temp_c}°C
                        </Typography>
                        <Typography variant="h3">
                            The weather feels like {WeatherData1?.current?.feelslike_c}°C
                        </Typography>
                        <Stack direction="row" sx={{ml:"3%",justifyContent:"space-evenly"}}>
                        <WeatherCard Icon={<img src={MaximumTemp} style={ImgStyle}/>} Value={WeatherData1?.forecast?.forecastday[0]?.day.maxtemp_c+"°C"} Text="Max.Temperature"/>
                        <WeatherCard Icon={<img src={MinimumTemp} style={ImgStyle}/>}  Value={WeatherData1?.forecast?.forecastday[0]?.day.mintemp_c+"°C"} Text="Min.Temperature"/>
                        <WeatherCard Icon={<img src={WindIcon} style={ImgStyle}/>} Value={WeatherData1?.current?.wind_kph+'km/h'} Text="Wind Speed"/>
                        <WeatherCard Icon={<img src={HumidIcon} style={ImgStyle}/>} Value={WeatherData1?.current?.humidity+"%"} Text="Humidity"/>
                        <WeatherCard Icon={<img src={PrecipitaionIcon} style={ImgStyle}/>} Value={WeatherData1?.forecast?.forecastday[0]?.day?.totalprecip_mm+"mm"} Text="Precipitation"/>
                        </Stack>
                            
                        </>
                        }
                        
                </Grid>
                <Grid sx={{
                    backdropFilter: 'blur(4px)',
                    backgroundColor:'rgba(255,255,255,0.4)',
                    ml:"30%",
                    mt:"1%",
                    mr:"5%",
                    // height:"10%",
                    width:"40%",
                    p:"1%",
                    mb:"2.2%",
                    borderRadius:"10px"}}>
            {WeatherData||WeatherData1?
                        (<UserContext.Provider value={{WeatherData,WeatherData1}}>
                                <CompareChart/>
                            </UserContext.Provider>):(<UserContext.Provider value={WeatherData}>
                                <LineChart/>
                            </UserContext.Provider>)}
                </Grid>
                
            </Grid>
            
      </Box>
    </>
  );
};

export default Compare;
