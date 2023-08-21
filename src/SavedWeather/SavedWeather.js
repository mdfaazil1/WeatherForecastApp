import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

const SavedWeather=()=>{
  return (
    <Stack sx={{marginLeft:10,marginTop:5}}>
    <Card sx={{ maxWidth: 345,marginBottom:3 }}>
      <CardMedia
        component="img"
        alt="weather icon"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          saved Data 1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Info 1
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345,marginBottom:3  }}>
      <CardMedia
        component="img"
        alt="weather icon"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          saved data 2
        </Typography>
        <Typography variant="body2" color="text.secondary">
          info 2
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ maxWidth: 345,marginBottom:3  }}>
      <CardMedia
        component="img"
        alt="weather icon"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          saved data 3
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Info 3
        </Typography>
      </CardContent>
    </Card>
    </Stack>

  );
}
export default SavedWeather;