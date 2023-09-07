import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import BackgroundImg from "../Assests/background1.jpg";
const ErrorPage=()=>{
    return(
        <Grid sx={{backgroundImage:`url(${BackgroundImg})`,
        backgroundRepeat:"no-repeat",
        paddingBottom:"0.8%",
        height:"100vh",
        backgroundPosition:"center",
        backgroundSize:"cover"}}>
            <Typography variant="h1" sx={{pt:"17%"}}>
                Error Page Not Found
            </Typography>
        </Grid>
    )
}
export default ErrorPage;