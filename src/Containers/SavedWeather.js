import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack,Grid, IconButton, TextField, Tooltip } from '@mui/material';
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
import {useState,useEffect} from "react";
import TemperatureWidget from "../Components/WeatherDisplay"
import LineChart from '../Components/HourGraph';
import {Divider} from '@mui/material';
import AstroDetails from '../Components/AstroDetail';
import UpcomingDay from '../Components/UpcomingDay';
import Pagination from '@mui/material/Pagination';
import CompareIcon from '@mui/icons-material/Compare';
import SearchIcon from '@mui/icons-material/Search';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SavedWeather = () => {
  const dispatch = useDispatch();

  const SavedData1 = useSelector((state) => state.values);

  const [view, setView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [WeatherData,setWeatherData]=useState();
  
  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page
  const [page, setPage] = React.useState(1);
  // const handlePageChange = (event, newPage) => {
  //   setCurrentPage(newPage);
  // };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const SavedData = SavedData1.slice(indexOfFirstItem, indexOfLastItem);
  const [PageCount,setPageCount]=useState();
  useEffect(()=>{
    let TempCount=(SavedData1.length/itemsPerPage);
    if(TempCount>Math.floor(TempCount)){
      setPageCount(Math.floor(TempCount)+1);
    }
    else{
      setPageCount(TempCount)
    }
    
    console.log("pagination",TempCount,SavedData1.length);
  },[SavedData1.length])
 
    const handleChange = (event, value) => {
        setPage(value);
    };

  const RemoveFav = (RemovingData) => {
    dispatch(deleteValue(RemovingData));
  };

  const DataPass = (WeatherData1) => {
    setWeatherData(WeatherData1)
    console.log("button of savedWeather to homepage is selected", WeatherData1);
    setView(true);
  };


  const filteredData = SavedData.filter((item) =>
    item.location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const GotoHome=()=>{
  //   //  <Navigate to="/" />
  //   window.location.href="/";
  //   // console.log("saved weather container", SavedData)
  // }

  if(SavedData.length==0){
    return(
      <Grid
      sx={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        zIndex: -1,
      }}
    >
      <Typography variant="h1" sx={{pt:"10%"}}>
        No Location Saved.
      </Typography>
      <Grid sx={{position:"fixed",top:"80vh",ml:"45%"}}>
      <Link to="/" style={{textDecoration:"none"}}><Button >back to home</Button></Link>
      </Grid>
      </Grid>
    )
  }

  return (
    <Grid
      sx={{
        backgroundImage: `url(${BackgroundImg})`,
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        zIndex: -1,
      }}
    >
      
      {!view && (
        <>
        <Box sx={{display:"flex"}}>
      <Typography variant='h2' sx={{pt:"2%",ml:"10%",mr:"8.5%"}}>
        Favourites
      </Typography>
      <TextField
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon />,
              style: { color: "white" }
              }}
              sx={{ backdropFilter: 'blur(70px)',width: '60%', marginTop: "2%",'& .MuiInputBase-input': {
                padding: '1%',
              }, }}
          />
          </Box>
        <Grid container sx={{ p:"2%" }} spacing={2}>
          
          {filteredData.map((item, index) => (
            <Grid item key={index} 
            xs={12}
            sm={6}
            md={4}
            lg={3} >
              <Card
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '5px',
                }}
              >
                <Button onClick={() => DataPass(item)} sx={{width:"100%",
                backgroundColor: 'rgba(255,255,255,0.4)',
                color: 'black', 
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.4)', 
                },
              }} >
                <img src={item.current.condition.icon} height={150} alt="Weather Icon" />
                <CardContent sx={{ alignContent: 'center' }}>
                  <Typography gutterBottom variant="h4" component="div" sx={{ width: '120%', ml: '-10%' }}>
                    {item?.location?.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div" sx={{ width: '120%', ml: '-10%' }}>
                    {item?.current?.condition?.text}
                  </Typography>
                  <Typography variant="h3">{item?.current?.temp_c}°C</Typography>
                </CardContent>
                </Button>
                <br/>
                <Grid>
                <Link to="/compare" style={{marginRight:"65%"}} state={item}>
                  <Tooltip title="Compare">
          <IconButton  >
            <CompareIcon/>
          </IconButton>
          </Tooltip>
          </Link>
                <IconButton onClick={() => RemoveFav(item)}>
                  <FavoriteIcon sx={{ color: 'red' }} />
                </IconButton>
                </Grid>
              </Card>
              </Grid>
           
          ))}
          <br />
        </Grid>
        <Grid sx={{position:"fixed",top:"80vh",ml:"45%"}}>
        <Link to="/" style={{textDecoration:"none"}}><Button >back to home</Button></Link>
        <Pagination 
        count={PageCount} 
        page={page} 
        onChange={handleChange} 
        color='secondary' 
        sx={{mt:"14%",fontWeight:"800px"}}/>
      </Grid>
      </>
      )}
      
      {view&&<UserContext.Provider   value={WeatherData}>
                <Typography variant='h2' sx={{mr:"69%",pt:"0.5%",mb:"-1%"}}>
                  Favourite
                </Typography>
                <Grid container>
                  <Grid item  xs={12} sm={12} md={6} lg={6}>
                    <TemperatureWidget/>
                  </Grid>
                  <Grid item  xs={12} sm={12} md={6} lg={6}>
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
                  <Grid item  xs={12} sm={12} md={6} lg={6}>
                  <Typography variant="h4" sx={{mt:1,mr:"18%"}}>
                  Additional Info  
                </Typography>
                <Divider orientation="horizontal" sx={{borderColor:"black",width:"90%",ml:"28%"}}/>
                  <AstroDetails />
                  </Grid>
                  <Grid item  xs={12} sm={12} md={6} lg={6} >
                    <Typography variant="h4" sx={{mt:"-20%",mr:"33%"}}>
                      Next 2 Days    
                    </Typography>
                    <Divider orientation="horizontal" sx={{borderColor:"black",width:"30%",ml:20}}/>
                    <UpcomingDay/>
                  </Grid>
                </Grid>
            <Button contained sx={{mt:"1%",mb:"1%"}} onClick={()=>setView(false)}>Back to Favorite</Button> 
            </UserContext.Provider>
            }

    </Grid>
  );
};

export default SavedWeather;
