// App.js

import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { Chart } from './lineChart';
import Bag from '../../assets/dashboard/ic_glass_bag.png';
import Buy from '../../assets/dashboard/ic_glass_buy.png'
import Message from '../../assets/dashboard/ic_glass_message.png'
import Users from '../../assets/dashboard/ic_glass_users.png'

const Dashboard = () => {
  return (
    <Box sx={{ marginTop: '7%', marginLeft: '3%', marginRight: '3%' }}>
      <Grid container spacing={3}>
        {/* Cards Section */}
        <Grid item xs={3}>
          <Card sx={{ maxHeight: 200, maxWidth: 320, textAlign: 'center', backgroundColor: '#d2d2fa', borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6">Total Amount Collected</Typography>
              <img src={Bag} alt="Amount Collected Icon" />
              <Typography variant="h4">$5000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxHeight: 200, maxWidth: 320, textAlign: 'center', backgroundColor: '#fafca7', borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6">Total Amount Due</Typography>
              <img src={Message} alt="Amount Collected Icon" />
              <Typography variant="h4">$1000</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxHeight: 200, maxWidth: 320, textAlign: 'center', backgroundColor: '#ace1fc', borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6">Total Expense</Typography>
              <img src={Buy} alt="Amount Collected Icon" />
              <Typography variant="h4">$1500</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{ maxHeight: 200, maxWidth: 320, textAlign: 'center', backgroundColor: '#f5b8bf', borderRadius: '15px' }}>
            <CardContent>
              <Typography variant="h6">Total Active Tenants</Typography>
              <img src={Users} alt="Amount Collected Icon" />
              <Typography variant="h4">15</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card elevation={3} sx={{ padding: 2 }}>
                <Chart
                  title="Collection
                  "
                  type="line"
                  data={[50400, 60123, 45000, 63800, 64800, 66600, 56800, 71000, 71200, 81400, 79600, 72800]}
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card elevation={3} sx={{ padding: 2 }}>
                <Chart
                  title="Expenses"
                  type="bar"
                  data={[20, 50, 80, 100, 120, 150, 200, 250, 300, 350, 400, 450]}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
