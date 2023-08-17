import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 500,
  maxWidth: '100%',
  height:'250px',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    marginLeft:159,
  width: 150,
  height: 150,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function TemperatureWidget() {
//   const theme = useTheme();
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography variant="caption"  fontWeight={900} fontSize={30} sx={{marginLeft:-5}}>
                30 °C|°F
            </Typography>

            <Typography noWrap>
                 
            </Typography>
            <Typography  letterSpacing={-0.25} fontWeight={350} sx={{marginRight:2}}>
                text about the weather
            </Typography>
           
          </Box>
          <CoverImage>
            <img
              alt="temp Icon"
            //   src="/static/images/sliders/chilling-sunday.jpg"
            />
          </CoverImage>
        </Box>
        <Box sx={{display:'flex',marginTop:2,padding:1,borderRadius:1}}>
        <Box sx={{border:'2px solid black',marginRight:0.5,height:70,borderRadius:1,width:80}}>
                <Typography>
                    max temp
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                   min temp
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                wind speed
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                    humid
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',marginRight:0.5,borderRadius:1,width:80}}>
                <Typography>
                    precep
                </Typography>
            </Box>
            <Box sx={{border:'2px solid black',borderRadius:1,width:80}}>
                <Typography>
                    avg humid
                </Typography>
            </Box>
            </Box>
      </Widget>
    </Box>
  );
}