import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuth } from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store';
import ClosableAlert from '../../../common/closableAlert';
import { initialState } from '../../../store';

const Signup = () => {
  const setUser = useAppStore(state => state.setUser);
  const user = useAppStore(state => state.user);
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
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [emailUid, setEmailUid] = useState(null);
  const [mobileUid, setMobileUid] = useState(null);
  const [error, setError] = useState('')
  const isNameValid = /^[A-Za-z ]+$/.test(userInfo.name) && userInfo.name.length <= 80;
  const isMobileValid = /^\d{10}$/.test(userInfo.mobile);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email);
  const isPasswordValid = userInfo.password.length >= 6;
  const isOtpValid = /^\d{6}$/.test(otp);
  const navigate = useNavigate();

  const handleUserInfoChange = (field, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
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

    setUser({ ...user, [field]: value })
  };

  const handleOtpChange = (value) => {
    setOtp(value);
    setOtpError('');
  };


  const handleSendOtp = async () => {
    const appVerifier = new RecaptchaVerifier(firebaseAuth, "recapcha", { size: "invisible" })
    setIsLoading(false);
    if (userInfo?.mobile) {
      setIsLoading(true)
      try {
        const confirmationResult = await signInWithPhoneNumber(firebaseAuth, `+91${userInfo.mobile}`, appVerifier)
        setOtpConfirmation(confirmationResult);
        setIsOtpSent(true);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message)
      }
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true)
    try {
      const otpResult = await otpConfirmation.confirm(otp);
      setMobileUid(otpResult.user.uid)
      setOtpVerified(true);
      setUser({
        ...user,
        status: 'Awaiting Approval',
        role: 'READ',
        occupancyType: 'double',
        finalizedRent: '2500',
        mobileUid: otpResult.user.uid,
        mobile: otpResult.user.phoneNumber
      })
      setIsLoading(false)
    } catch (error) {
      setError(error.message)
      setOtpError('Invalid OTP');
      setOtpVerified(false);
      setIsLoading(false)
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
      setIsLoading(true)
      createUserWithEmailAndPassword(firebaseAuth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const current_user = userCredential.user;
          setEmailUid(userCredential.user.uid)
          setUser({ ...user, email: userCredential.user.email })
          navigate('/register', { state: { emailUid: current_user.uid, mobileUid, ...userInfo } })
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          setError(error.message)
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
          {isOtpSent && <ClosableAlert message="Otp has been sent to your mobile number" severity="success" />}
          {otpVerified && <ClosableAlert message="Otp Verified Click Sign Up" severity="success" />}
          {error && <ClosableAlert message={error} severity="error" />}
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
                Verify OTP {isLoading && <CircularProgress size={20} thickness={8} sx={{ marginLeft: 2, color: 'white' }} />}
              </Button>
            </>
          )}
          {!isOtpSent && !otpVerified && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendOtp}
              sx={{ marginTop: '10px' }}
              disabled={!isMobileValid || !isEmailValid || !isPasswordValid}
            >
              Send OTP {isLoading && <CircularProgress size={20} thickness={8} sx={{ marginLeft: 2, color: 'white' }} />}
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
              Sign Up {isLoading && <CircularProgress size={20} thickness={8} sx={{ marginLeft: 2, color: 'white' }} />}
            </Button>
          )}
        </Box>
      </Box>
      <div id="recapcha" style={{ display: 'none' }}></div>
    </Container>
  );
};

export default Signup;
