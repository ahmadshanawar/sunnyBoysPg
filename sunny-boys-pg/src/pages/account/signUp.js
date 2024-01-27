// Signup.js

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuth } from '../../services/firebase';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

  const [otpConfirmation, setOtpConfirmation] = useState(null);
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');

  const isNameValid = /^[A-Za-z ]+$/.test(userInfo.name) && userInfo.name.length <= 80;
  const isMobileValid = /^\d{10}$/.test(userInfo.mobile);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email);
  const isPasswordValid = userInfo.password.length >= 6;
  const isOtpValid = /^\d{6}$/.test(otp);

  const handleUserInfoChange = (field, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
    // Reset error for the changed field
    switch (field) {
      case 'name':
        setNameError('');
        break;
      case 'mobile':
        setMobileError('');
        break;
      case 'email':
        setEmailError('');
        break;
      case 'password':
        setPasswordError('');
        break;
      default:
        break;
    }
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    setOtpError('');
  };

  const handleSendOtp = async () => {
    const appVerifier = new RecaptchaVerifier(firebaseAuth, "recapcha", {})
    try {
      const confirmationResult = await signInWithPhoneNumber(firebaseAuth, `+91${userInfo.mobile}`, appVerifier)
      setOtpConfirmation(confirmationResult);
      setIsOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await otpConfirmation.confirm(otp);
      setOtpVerified(true);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Invalid OTP');
      setOtpVerified(false);
    }
  };

  const handleSignup = async () => {
    if (!isNameValid) {
      setNameError('Invalid name. Please enter only letters and spaces (max 80 characters).');
      return;
    }

    if (!isMobileValid) {
      setMobileError('Invalid mobile number. Please enter a 10-digit number.');
      return;
    }

    if (!isEmailValid) {
      setEmailError('Invalid email address. Please enter a valid email.');
      return;
    }

    if (!isPasswordValid) {
      setPasswordError('Invalid password. Please enter at least 6 characters.');
      return;
    }

    if (!isOtpValid) {
      setOtpError('Invalid OTP. Please enter a 6-digit OTP.');
      return;
    }

    if (otpVerified) {
      createUserWithEmailAndPassword(firebaseAuth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const isSignupDisabled =
    !isNameValid || !isMobileValid || !isEmailValid || !isPasswordValid || !isOtpValid;

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f4f4f4',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            width: '300px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Sign Up
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userInfo.name}
            onChange={(e) => handleUserInfoChange('name', e.target.value)}
            error={!!nameError}
            helperText={nameError}
            InputProps={{
              startAdornment: <AccountCircleIcon />,
            }}
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userInfo.mobile}
            onChange={(e) => handleUserInfoChange('mobile', e.target.value)}
            error={!!mobileError}
            helperText={mobileError}
            InputProps={{
              startAdornment: <PhoneIcon />,
            }}
          />
          <TextField
            label="Email ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userInfo.email}
            onChange={(e) => handleUserInfoChange('email', e.target.value)}
            error={!!emailError}
            helperText={emailError}
            InputProps={{
              startAdornment: <EmailIcon />,
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userInfo.password}
            onChange={(e) => handleUserInfoChange('password', e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            InputProps={{
              startAdornment: <LockIcon />,
            }}
          />
          {isOtpSent && !otpVerified && (
            <>
              <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                error={!!otpError}
                helperText={otpError}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVerifyOtp}
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                disabled={!otp}
              >
                Verify OTP
              </Button>
            </>
          )}

          <div id="recapcha"></div>
          {!isOtpSent && !otpVerified && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendOtp}
              sx={{ marginTop: '10px' }}
              disabled={!isMobileValid || !isEmailValid || !isPasswordValid}
            >
              Send OTP
            </Button>
          )}

          {otpVerified && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignup}
              sx={{ marginTop: '10px' }}
              disabled={isSignupDisabled}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
