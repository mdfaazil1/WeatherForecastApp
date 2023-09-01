import { Box, Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import theme from "../theme";
import { useTheme } from "@emotion/react";

const WeatherCard=({Icon,Value,Text})=>{
    const theme=useTheme();
    const BoxStyle={
        // border:'5px solid darkblue',
        marginRight:"7%",
        borderRadius:1,
        ml:"4%",
      };

      return(
        <>
        <Box sx={BoxStyle}>
          <Tooltip title={Text} placement="top-start">
            <Typography sx={theme.typography}>
                {Icon}
                <br/>
                {Value||"Forecast Not Available at the Moment"}
            </Typography>
            </Tooltip>
        </Box>
        </>
      )
}
export default WeatherCard;
