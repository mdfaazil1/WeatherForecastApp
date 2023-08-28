import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const WeatherCard=({Icon,Value})=>{
    const BoxStyle={
        // border:'5px solid darkblue',
        marginRight:0.5,
        borderRadius:1,
      };
    
      const ImgStyle={
        height:"20px",
      }
    
      const TypographyStyle={
        fontSize:"12px",
        marginTop:1,
      }
      return(
        <>
        <Box sx={BoxStyle}>
            <Typography sx={TypographyStyle}>
                {Icon}
                <br/>
                {Value||"Forecast Not Available at the Moment"}
            </Typography>
        </Box>
        <Divider orientation="vertical" flexItem style={{ borderColor: 'black' }} />
        </>
      )
}
export default WeatherCard;
