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
import BarGrah from "../Components/BarGraph";

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleInputChange();
    }
  }

  const handleInputChange = () => {
    if (city === "") {
      toast.warning("Please Enter the Location", { position: "bottom-left" });
    }
    else if(UserLocation===city||WeatherData?.location?.name.toLowerCase()===city.toLowerCase()){
        console.log("from if else of compare container",WeatherData?.location?.name)
        toast.warning("Comparison Cant be made with the same Location, Please re-enter different Location", { position: "bottom-left" });
    }
    else {
      setUserLocation(city);
      setCity("");
      console.log("from else in Compare",WeatherData.location.name);
    }
  };
  const InterchangeValue=()=>{
    if(!WeatherData1){
        toast.warning("Please select a Location to swap",{position:"bottom-left"})
    }
    else{const TempData=WeatherData1;
    setWeatherData1(WeatherData);
    setWeatherData(TempData);}
  }
  const ImgStyle={
    height:"55px",
  }
  return (
    <>
      <ToastContainer />
      <Box sx={{backgroundImage:`url(${BackgroundImg})`,
        backgroundRepeat:"no-repeat",
        height:"100%",
        p:"1%",
        backgroundPosition:"center",
        backgroundSize:"cover"}}>
            <Grid>
            
            <Typography variant="h2">
                Compare Location's weather
            </Typography>

            </Grid>
            <Grid container sx={{pt:"2%"}} spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={5} sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor:'rgba(255,255,255,0.4)',
                    ml:"7%",
                    borderRadius:"10px"}}>
                        <Typography variant="h2" sx={{mt:"10%"}}>
                        {WeatherData?.location?.name}
                        </Typography>
                        <Typography variant="h4">
                        {WeatherData?.current?.temp_c}°C
                        </Typography>
                        <Typography variant="h3">
                            The weather feels like {WeatherData?.current?.feelslike_c}°C
                        </Typography>
                        <Grid container sx={{mt:'1%',justifyContent:"space-evenly"}}>
          <Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={MaximumTemp} style={ImgStyle}/>} Value={WeatherData?.forecast?.forecastday[0]?.day.maxtemp_c+"°C"} Text="Max.Temperature"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
                      <WeatherCard Icon={<img src={MinimumTemp} style={ImgStyle}/>}  Value={WeatherData?.forecast?.forecastday[0]?.day.mintemp_c+"°C"} Text="Min.Temperature"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={WindIcon} style={ImgStyle}/>} Value={WeatherData?.current?.wind_kph+'km/h'} Text="Wind Speed"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >

<WeatherCard Icon={<img src={HumidIcon} style={ImgStyle}/>} Value={WeatherData?.current?.humidity+"%"} Text="Humidity"/>
</Grid>
<Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={PrecipitaionIcon} style={ImgStyle}/>} Value={WeatherData?.forecast?.forecastday[0]?.day?.totalprecip_mm+"mm"} Text="Precipitation"/>
          </Grid>
        </Grid>

                </Grid>
                <IconButton onClick={InterchangeValue} sx={{height:"10%"}}>
                    <Tooltip title="Swap">
                        <CompareArrowsIcon/>
                    </Tooltip>
                </IconButton>
                <Grid item xs={12} sm={12} md={6} lg={5} sx={{
                    backdropFilter: 'blur(10px)',
                    backgroundColor:'rgba(255,255,255,0.4)',
                    borderRadius:"10px"}}>
                        <TextField
                         required
                         type="text"
                         placeholder="Search by Name/Co-ordinates"
                         value={city}
                         onKeyDown={handleKeyDown}
                         onChange={(e) => {
                         setCity(e.target.value);
                        }}
                         InputProps={{
                         startAdornment: <SearchIcon />,
                         style: { color: "black" },
                        }}
                        sx={{
                        //  backdropFilter: "blur(5px)",
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
                            sx={{ marginTop: "2%", height:"10.5%",marginLeft: "2%", color: "black" }}
                        >
                            Search
                        </Button>
                        <br/>
                        {!loading && <>
                        <Typography variant="h2" sx={{mt:"2%"}}>
                            {WeatherData1?.location?.name}
                        </Typography>
                        <Typography variant="h4">
                        {WeatherData1?.current?.temp_c}°C
                        </Typography>
                        <Typography variant="h3">
                            The weather feels like {WeatherData1?.current?.feelslike_c}°C
                        </Typography>
                        <Grid container sx={{mt:'1%',justifyContent:"space-evenly"}}>
          <Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={MaximumTemp} style={ImgStyle}/>} Value={WeatherData1?.forecast?.forecastday[0]?.day.maxtemp_c+"°C"} Text="Max.Temperature"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
                      <WeatherCard Icon={<img src={MinimumTemp} style={ImgStyle}/>}  Value={WeatherData1?.forecast?.forecastday[0]?.day.mintemp_c+"°C"} Text="Min.Temperature"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={WindIcon} style={ImgStyle}/>} Value={WeatherData1?.current?.wind_kph+'km/h'} Text="Wind Speed"/>
          </Grid>
          <Grid item xs={12} sm={6} md={2} >

<WeatherCard Icon={<img src={HumidIcon} style={ImgStyle}/>} Value={WeatherData1?.current?.humidity+"%"} Text="Humidity"/>
</Grid>
<Grid item xs={12} sm={6} md={2} >
          <WeatherCard Icon={<img src={PrecipitaionIcon} style={ImgStyle}/>} Value={WeatherData1?.forecast?.forecastday[0]?.day?.totalprecip_mm+"mm"} Text="Precipitation"/>
          </Grid>
        </Grid>
                        </>
                        }

                </Grid>
                </Grid>

            {WeatherData||WeatherData1?
                        (<UserContext.Provider value={{WeatherData,WeatherData1}}>
                           <Grid container spacing={0} sx={{pt:"1%",pl:"6%"}}> 
                            <Grid item xs={12} sm={12} md={6} lg={5.3} sx={{ backdropFilter: 'blur(10px)',
                    backgroundColor:'rgba(255,255,255,0.4)',borderRadius:"10px",mr:"4.2%",p:"1%"}}>
                                <CompareChart/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={5.3} sx={{p:"1%",borderRadius:"10px", backdropFilter: 'blur(10px)',
                    backgroundColor:'rgba(255,255,255,0.4)'}}>
                                <BarGrah/>
                                </Grid>
                            </Grid>
                            </UserContext.Provider>)
                            :
                            (<UserContext.Provider value={WeatherData}>
                                <Grid>HIIIi</Grid>
                            </UserContext.Provider>)
                            }
      </Box>
    </>
  );
};

export default Compare;
