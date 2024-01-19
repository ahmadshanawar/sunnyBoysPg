import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';

const ActionAreaCard = (props) => {
  const { svg, heading, subText } = props;
  return (
    <Card sx={{ maxWidth: 350, height: 400, border: '2px solid gray' }} elevation={3}>
      <CardActionArea>
        <Box sx={{height:250}}>
          <CardMedia sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden', // Ensure that overflowing content is hidden    
          }}>
            <img src={svg}
              alt="services"
              style={{
                objectFit: 'cover', // Maintain aspect ratio and cover the entire container
                width: '100%', // Ensure the image takes up the full width of the container
                height: '100%', // Ensure the image takes up the full height of the container
                display: 'block',
                margin: 'auto',                
              }}
            />
          </CardMedia>
        </Box>
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default ActionAreaCard;
