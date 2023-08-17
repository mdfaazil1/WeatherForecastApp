// import { height } from "@mui/system";
import React from "react";
import TemperatureWidget from "../temperatureDisplay/temperatureDisplay";
import "../HomePage/HomePage.css";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";

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
            <div>
            <TextField
                    type="text"
                    placeholder="Search by song/album/composers..."
                    // value={searchTerm}
                    // onChange={handleInputChange}
                    InputProps={{
                    startAdornment: <SearchIcon />,
                    style: { color: "white" }
                    }}
                    sx={{ backdropFilter: 'blur(70px)', width: '60%', marginTop: "30px", marginLeft: -20,zIndex:1 }}
                />
            </div>
            <div className="tempWidget">
            <TemperatureWidget />
            </div>
        </div>
    );
}
export default HomePage;