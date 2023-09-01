import { createTheme } from "@mui/material";

const theme=createTheme({
    palette:{
        primary:{
            main:'rgba(4, 255, 253, 0.16)'
        },
    },
    typography:{
        fontFamily:"Hanalei-Fill",
        h1:{
            fontSize:80,
            fontWeight:900,
            color:"black"
        },
        h2:{
            fontSize:30,
            // fontWeight:700
            fontWeight:1000,
            
        },
        h3:{
            fontSize:20,
            fontWeight:3
        },
        h4:{
            fontSize:23,
            fontWeight:3,
        },
        h5:{
            fontSize:16,
            
        }
    }

})

export default theme;