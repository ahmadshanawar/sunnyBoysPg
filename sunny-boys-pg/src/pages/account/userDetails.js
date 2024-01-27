import React, { useState } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent
} from '@mui/material';
import { maxWidth } from '@mui/system';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    houseNumber: '',
    lane: '',
    locality: '',
    pinCode: '',
    parentName: '',
    parentMobile: '',
    occupation: '',
    collegeName: '',
    collegeId: '',
    adhaarNumber: '',
    adhaarFront: null,
    adhaarBack: null,
    collegeIdPhoto: null,
    checkInDate: '',
    checkOutDate: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
          <Typography variant="h5" gutterBottom style={{ marginBottom: '20px' }}>
            Tennant Registration Form
          </Typography>
          <Grid container spacing={2}>
            {/* House Number and Lane/Street */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="House number/name"
                value={formData.houseNumber}
                onChange={(e) => handleInputChange('houseNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Lane/Street"
                value={formData.lane}
                onChange={(e) => handleInputChange('lane', e.target.value)}
              />
            </Grid>

            {/* Locality and City */}
            <Grid item xs={7}>
              <TextField
                fullWidth
                label="Locality"
                value={formData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </Grid>

            {/* PIN Code and State */}
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="PIN code"
                value={formData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="State"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Parent Name"
            value={formData.parentName}
            onChange={(e) => handleInputChange('parentName', e.target.value)}
            style={{ marginBottom: '15px', marginTop: '15px' }}
          />
          <TextField
            fullWidth
            label="Parent Mobile Number"
            value={formData.parentMobile}
            onChange={(e) => handleInputChange('parentMobile', e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel>Occupation</InputLabel>
            <Select
              value={formData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
            >
              <MenuItem value="working">Working</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="College/Organization Name"
            value={formData.collegeName}
            onChange={(e) => handleInputChange('collegeName', e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="College/Organization ID/Roll Number"
            value={formData.collegeId}
            onChange={(e) => handleInputChange('collegeId', e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Adhaar Number"
            value={formData.adhaarNumber}
            onChange={(e) => handleInputChange('adhaarNumber', e.target.value)}
            style={{ marginBottom: '20px' }}
          />
          <Typography variant="h6" gutterBottom>
            Date Selector
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextField
              fullWidth
              type="date"
              label="Check In date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.checkInDate}
              onChange={(e) => handleInputChange('checkInDate', e.target.value)}
              style={{ marginBottom: '15px', marginRight: '10px' }}
            />
            <TextField
              fullWidth
              type="date"
              label="Tentative Checkout date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.checkOutDate}
              onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Box>
          <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>
            Upload ID Photos
          </Typography>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange('adhaarFront', e.target.files[0])}
                  style={{ marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange('adhaarBack', e.target.files[0])}
                  style={{ marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange('collegeIdPhoto', e.target.files[0])}
                  style={{ marginBottom: '20px' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    {formData.adhaarFront && (
                      <div>                       
                        <img src={URL.createObjectURL(formData.adhaarFront)} alt="Adhaar Front" style={{ maxWidth: '100%' }} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    {formData.adhaarBack && (
                      <div>                       
                        <img src={URL.createObjectURL(formData.adhaarBack)} alt="Adhaar Back" style={{ maxWidth: '100%' }} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    {formData.collegeIdPhoto && (
                      <div>                       
                        <img src={URL.createObjectURL(formData.collegeIdPhoto)} alt="College ID Photo" style={{ maxWidth: '100%' }} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Button style={{marginTop:'15px', marginLeft:'auto', display:'block'}} variant="contained" color="primary" onClick={handleSubmit}>
            Sign me Up
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
