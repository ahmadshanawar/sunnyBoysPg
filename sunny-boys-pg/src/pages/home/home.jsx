import React from 'react';
import Layout from '../../layout';
import { Box, Typography, Button } from '@mui/material';
import CarouselComponent from './carousel';
import OutboundIcon from '@mui/icons-material/Outbound';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
const Home = () => {
  const isLoggedIn = useAppStore(state => state.isLoggedIn);
  const navigate = useNavigate();
  return (
    <Layout>    
      <Box sx={{ paddingTop: '4%' }}>
        <Box style={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ color: '#d93604', fontWeight: 'bold', fontSize: '72px' }}>
            Welcome!
          </Typography>
          <Typography variant="h2" gutterBottom sx={{ color: '#251a32', fontWeight: 'bold', fontSize: '60px' }}>
            Sunny Boys Hostel & PG
          </Typography>
        </Box>
        <Box padding={2}>
          <CarouselComponent />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          {!isLoggedIn ?
            <Button
              onClick={() => navigate('/signUp')}
              variant='contained'
              size="large"
              endIcon={<OutboundIcon style={{ fontSize: '30' }} />}
              style={{ fontSize: 22, backgroundColor: '#251a33' }}
            >
              Register
            </Button> :
            <Button
              onClick={() => navigate('/profile')}
              variant='contained'
              size="large"
              endIcon={<OutboundIcon style={{ fontSize: '30' }} />}
              style={{ fontSize: 22, backgroundColor: '#251a33' }}
            >
              Go To Acoount
            </Button>
          }
        </Box>
      </Box>
    </Layout >
  );
};

export default Home;
