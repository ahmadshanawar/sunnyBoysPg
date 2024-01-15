import React from 'react';
import Layout from '../layout';
import hostel_image from '../assets/building.svg'
import { Box, Typography, Grid, Paper } from '@mui/material';

const Home = () => {
  return (
    <Layout>
      <Box sx={{ paddingTop: '4%' }}>        
          <Grid container spacing={5}>
            <Grid item xs={8}>             
              <Box style={{padding:75}}>
                <Typography variant="h2" gutterBottom sx={{color:'#303068',fontWeight:'bold', fontSize:'72px'}}>
                  Sunny Boys Hostel
                </Typography>
                <Typography variant="h4" sx={{color:'#303068',fontWeight:'bold'}}>
                  Live in Peace
                </Typography>
              </Box>             
            </Grid>
            <Grid item xs={4} >
              <Box>
                <img
                  src={hostel_image}
                  alt="hostel"
                  style={{ maxWidth: '100%', height: '100%' }}
                />
              </Box>
            </Grid>
          </Grid>       
      </Box>
    </Layout >
  );
};

export default Home;
