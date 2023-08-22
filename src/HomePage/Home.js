// import { height } from "@mui/system";
import React from "react";
import TemperatureWidget from "../temperatureDisplay/temperatureDisplay";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import {Link} from "react-router-dom";

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
                    placeholder="Search by Name/Co-ordinates"
                    // value={searchTerm}
                    // onChange={handleInputChange}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "black" }
                    }}
                    sx={{ backdropFilter: 'blur(70px)', width: '60%', marginTop: "30px", marginLeft: 22,zIndex:1 }}
                />
                <Link to="/wishlist">
                 <Avatar sx={{ bgcolor: deepOrange[500],marginTop:'33px',marginLeft:5, }}>N</Avatar>
                 </Link>    
            </div>
            <TemperatureWidget sx={{ paddingTop: '50px',marginLeft: '90px'}}/>
        </div>
    );
}
export default HomePage;