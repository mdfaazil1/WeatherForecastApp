import { Box, Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import theme from "../theme";
import { useTheme } from "@emotion/react";

const WeatherCard=({Icon,Value,Text})=>{
    const theme=useTheme();
    const BoxStyle={
        marginRight:"7%",
        borderRadius:1,
        ml:"4%",
        // backgroundColor:"red",
        // height:"10vh",
      };

      return(
        <>
        <Box sx={BoxStyle}>
          <Tooltip title={Text} placement="top-start">
            
                {Icon}
                <br/>
                <Typography variant="h7">
                {Text}
                </Typography>
                <br/>
                <Typography sx={{mt:"5%"}} >
                {Value||"Forecast Not Available at the Moment"}
            </Typography>
            </Tooltip>
        </Box>
        </>
      )
}
export default WeatherCard;
