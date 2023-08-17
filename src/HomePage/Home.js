// import { height } from "@mui/system";
import React from "react";
import TemperatureWidget from "../temperatureDisplay/temperatureDisplay";
import "../HomePage/HomePage.css";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

const HomePage=()=>{

    const style1={
        backgroundColor:'skyblue',
        height:'602px',
    }
    const style2={
        backgroundColor:'yellow',
        height:'602px'
    }
    return(
        <div style={style1}>
            <div style={{display:'flex'}}>
            <TextField
                    type="text"
                    placeholder="Search by song/album/composers..."
                    // value={searchTerm}
                    // onChange={handleInputChange}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "black" }
                    }}
                    sx={{ backdropFilter: 'blur(70px)', width: '60%', marginTop: "30px", marginLeft: 22,zIndex:1 }}
                />
                 <Avatar sx={{ bgcolor: deepOrange[500],marginTop:'33px',marginLeft:5 }}>N</Avatar>
            </div>
            <div className="tempWidget">
            <TemperatureWidget />
            </div>
        </div>
    );
}
export default HomePage;