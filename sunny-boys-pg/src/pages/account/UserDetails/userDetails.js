import React, { useEffect, useState } from 'react';
import PinCodeQuery from 'india-pincode-search';
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
  Divider
} from '@mui/material';
import { firebaseDb } from '../../../firebase';
import { doc, setDoc } from "@firebase/firestore";
import { useNavigate, useLocation } from 'react-router-dom';
import MultiFileUpload from './multiFileUpload';
import { useAppStore } from '../../../store';
var validator = require('aadhaar-validator');

const RegistrationForm = () => {
  const { state } = useLocation()
  const navigate = useNavigate();
  const userData = useAppStore(state => state.user)
  const setUserData = useAppStore(state => state.setUser)
  const setIsLoggedIn = useAppStore(state => state.setIsLoggedIn)

  const [userPhotoes, setUserPhotoes] = useState({
    adhaarFront: null,
    adhaarBack: null,
    collegeIdPhoto: null,
  })

  const [validationErrors, setValidationErrors] = useState({
    pinCode: '',
    parentName: '',
    parentMobile: '',
    adhaarNumber: '',
  });
  const [pinCodeSearchResult, setPinCodeSearchResult] = useState({ city: '', village: '', state: '' })

  const validatePinCode = (value) => {
    const isValid = /^\d{6}$/.test(value) && PinCodeQuery.search(value)?.length > 0;
    return isValid ? '' : 'PIN code must be a valid 6-digit number';
  };

  const validateParentName = (value) => {
    const isValid = /^[A-Za-z\s]+$/.test(value);
    return isValid ? '' : 'Name should not contain numbers or special characters';
  };

  const validateParentMobile = (value) => {
    const isValid = /^\d{10}$/.test(value);
    return isValid ? '' : 'Mobile number must be a 10-digit number';
  };

  const validateAdhaarNumber = (value) => {
    const isValid = /^\d{12}$/.test(value)
    //&& validator.isValidNumber(value);
    return isValid ? '' : 'Adhaar number must be a Valid 12-digit number';
  };

  const handleInputChange = (field, value) => {
    if (field === 'pinCode' && value?.length === 6) {
      let result = PinCodeQuery.search(value);
      setPinCodeSearchResult(result)
    }
    if (field === 'adhaarFront' || field === 'adhaarBack' || field === 'collegeIdPhoto') {
      setUserPhotoes({ ...userPhotoes, [field]: value });
    }
    else {
      setUserData({ ...userData, [field]: value });
    }
    // Validate on input change
    setValidationErrors({ ...validationErrors, [field]: validateField(field, value) });
  };

  useEffect(() => {
    if (pinCodeSearchResult?.length > 0 && validationErrors.pinCode === '') {
      setUserData({ ...userData, city: pinCodeSearchResult[0]?.city || pinCodeSearchResult[0]?.village, state: pinCodeSearchResult[0]?.state })
    } else {
      setUserData({ ...userData, city: '', state: '' })
    }
  }, [pinCodeSearchResult])

  useEffect(() => {
    if (state?.emailUid) {
      setUserData({ ...userData, emailUid: state.emailUid })
    }
  }, [])

  const validateField = (field, value) => {
    switch (field) {
      case 'pinCode':
        return validatePinCode(value);
      case 'parentName':
        return validateParentName(value);
      case 'parentMobile':
        return validateParentMobile(value);
      case 'adhaarNumber':
        return validateAdhaarNumber(value);
      default:
        return '';
    }
  };

  const isFormValid = () => {
    return Object.values(userData).every((value) => value !== '') &&
      Object.values(validationErrors).every((error) => error === '') &&
      userData.collegeIdPhotoFileName !== null &&
      userData.adhaarFrontFileName !== null &&
      userData.adhaarBackFileName !== null;
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        await setDoc(doc(firebaseDb, "Users", userData.emailUid), { ...userData, ...state });
        setIsLoggedIn(true);
        setUserData({ ...userData, isUserRegistered: true })
        navigate('/profile')
      }
      catch (err) {
        console.log(err)
      }
    } else {
      alert('Please fill in the form correctly');
    }
  };
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Tennant Registration Form
          </Typography>
          <Divider sx={{ marginBottom: 2, borderWidth: 2, backgroundColor: 'lightBlue' }} />
          <Grid container spacing={2}>
            {/* House Number and Lane/Street */}
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="House number/name"
                value={userData.houseNumber}
                onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Lane/Street"
                value={userData.lane}
                onChange={(e) => handleInputChange('lane', e.target.value)}
              />
            </Grid>

            {/* Locality and City */}
            <Grid item xs={7}>
              <TextField
                fullWidth
                label="Locality"
                value={userData.locality}
                onChange={(e) => handleInputChange('locality', e.target.value)}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="PIN code"
                value={userData.pinCode}
                onChange={(e) => handleInputChange('pinCode', e.target.value)}
                helperText={userData.pinCode ? validationErrors.pinCode : ''}
                error={!!validationErrors.pinCode && userData.pinCode !== ''}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                disabled
                fullWidth
                label="City"
                value={userData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                disabled
                fullWidth
                label="State"
                value={userData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Parent Name"
            value={userData.parentName}
            onChange={(e) => handleInputChange('parentName', e.target.value)}
            helperText={userData.parentName ? validationErrors.parentName : ''}
            error={!!validationErrors.parentName && !!userData.parentName}
            style={{ marginBottom: '15px', marginTop: '15px' }}
          />
          <TextField
            fullWidth
            label="Parent Mobile Number"
            value={userData.parentMobile}
            onChange={(e) => handleInputChange('parentMobile', e.target.value)}
            helperText={userData.parentMobile ? validationErrors.parentMobile : ''}
            error={!!validationErrors.parentMobile && userData.parentMobile !== ''}
            style={{ marginBottom: '20px' }}
          />
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel>Occupation</InputLabel>
            <Select
              value={userData.occupation}
              onChange={(e) => handleInputChange('occupation', e.target.value)}
            >
              <MenuItem value="working">Working</MenuItem>
              <MenuItem value="student">Student</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="College/Organization Name"
            value={userData.collegeName}
            onChange={(e) => handleInputChange('collegeName', e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="College/Organization ID/Roll Number"
            value={userData.collegeId}
            onChange={(e) => handleInputChange('collegeId', e.target.value)}
            style={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            label="Adhaar Number"
            value={userData.adhaarNumber}
            onChange={(e) => handleInputChange('adhaarNumber', e.target.value)}
            helperText={userData.adhaarNumber ? validationErrors.adhaarNumber : ''}
            error={!!validationErrors.adhaarNumber && userData.adhaarNumber !== ''}
            style={{ marginBottom: '20px' }}
          />
          <Typography variant="h6" gutterBottom>
            Date Selector
          </Typography>
          <Divider sx={{ marginBottom: 3, borderWidth: 2, backgroundColor: 'lightBlue' }} />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextField
              fullWidth
              type="date"
              label="Check In date"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
              value={userData?.checkInDate}
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
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
              value={userData?.checkOutDate}
              onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
              style={{ marginBottom: '20px' }}
            />
          </Box>
          <MultiFileUpload />
          <Button
            style={{ marginTop: '15px', marginLeft: 'auto', display: 'block' }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            Sign me Up
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
