import React from 'react';
import Layout from '../../layout';
import hostel_image from '../../assets/building.svg'
import { Box, Typography, Grid } from '@mui/material';
import CarouselComponent from './carousel';

const Home = () => {
  return (
    <Layout>
      <Box sx={{ paddingTop: '4%' }}>
        <Box style={{ padding: 40, textAlign:'center' }}>
          <Typography variant="h1" sx={{ color: '#d93604', fontWeight: 'bold', fontSize: '72px' }}>
            Welcome!
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ color: '#251a32', fontWeight: 'bold', fontSize: '60px' }}>
            Sunny Boys Hostel & PG
          </Typography>
        </Box>
        <Box padding={5}>
          <CarouselComponent />
        </Box>
      </Box>
    </Layout >
  );
};

export default Home;
