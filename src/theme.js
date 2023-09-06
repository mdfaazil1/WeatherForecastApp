import { createTheme } from "@mui/material";

const theme=createTheme({
    palette:{
        primary:{
            main:'rgba(4, 255, 253, 0.16)'
        },
    },
    typography:{
        
        h1:{
            fontSize:70,
            fontWeight:600,
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
            fontWeight:700,
        },
        h5:{
            fontSize:16,
        },
        h6:{
            fontSize:19,
            fontWeight:550
        },
        h7:{
            fontSize:10,
            fontWeight:500,

        }
    },components: {
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              fontSize: '14px',
            //   color:"red" 
            },
          },
        },
      },

})

export default theme;