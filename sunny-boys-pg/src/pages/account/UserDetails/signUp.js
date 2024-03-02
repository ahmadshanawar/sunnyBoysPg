import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography, CircularProgress, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from '@firebase/auth';
import { firebaseAuth, firebaseDb } from '../../../firebase';
import { setDoc, doc } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store';
import ClosableAlert from '../../../common/closableAlert';
import { format } from 'date-fns';

const Signup = () => {
  const setUser = useAppStore(state => state.setUser);
  const user = useAppStore(state => state.user);
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
  const [error, setError] = useState('');
  const isOtpValid = /^\d{6}$/.test(otp);

  const navigate = useNavigate();

  const handleUserInfoChange = (field, value) => {
    const isNameValid = /^[A-Za-z\s]+$/.test(value) && value.length <= 100;
    const isMobileValid = /^\d{10}$/.test(value.replace("+91", ""));
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPasswordValid = value.length >= 6;
    setUser(prevUserInfo => ({ ...prevUserInfo, [field]: value }));

    switch (field) {
      case 'name':
        setNameError(isNameValid ? '' : 'Invalid name. Please enter only letters and spaces (max 80 characters).');
        break;
      case 'mobile':
        setMobileError(isMobileValid ? '' : 'Invalid mobile number. Please enter a 10-digit number.');
        break;
      case 'email':
        setEmailError(isEmailValid ? '' : 'Invalid email address. Please enter a valid email.');
        break;
      case 'password':
        setPasswordError(isPasswordValid ? '' : 'Invalid password. Please enter at least 6 characters.');
        break;
      default:
        break;
    }
    setUser({ ...user, [field]: value });
  };

  const handleOtpChange = value => {
    setOtp(value);
    setOtpError('');
  };

  const handleSendOtp = async () => {
    const appVerifier = new RecaptchaVerifier(firebaseAuth, "recapcha", { size: "invisible" });
    setIsLoading(true);
    try {
      const confirmationResult = await signInWithPhoneNumber(firebaseAuth, `+91${user.mobile}`, appVerifier);
      setOtpConfirmation(confirmationResult);
      setIsOtpSent(true);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const otpResult = await otpConfirmation.confirm(otp);
      setOtpVerified(true);
      setUser({
        ...user,
        status: 'Awaiting Approval',
        role: 'READ',
        occupancyType: 'Double',
        finalizedRent: '2500',
        mobileUid: otpResult.user.uid,
        mobile: otpResult.user.phoneNumber,
        isUserRegistered: false,
        paymentHistory: [
          { amountDue: '0', dueDate: '', status: 'Pending', paidOn: '', crearedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') }
        ]
      });
    } catch (error) {
      setError(error.message);
      setOtpError('Invalid OTP');
      setOtpVerified(false);
    }
    setIsLoading(false);
  };

  const handleSignup = async () => {
    if (nameError || mobileError || emailError || passwordError || !isOtpValid || !otpVerified) {
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, user.email, user.password);
      const current_user = userCredential.user;
      await setDoc(doc(firebaseDb, "Users", current_user.uid), { ...user, emailUid: current_user.uid });
      setUser({ ...user, emailUid: current_user.uid });
      navigate('/register');
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Grid container sx={{ justifyContent: 'center' }} >
        <Grid item sm={12} md={4} lg={3}>
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
            value={user.name}
            onChange={e => handleUserInfoChange('name', e.target.value)}
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
            value={user.mobile}
            onChange={e => handleUserInfoChange('mobile', e.target.value)}
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
            value={user.email}
            onChange={e => handleUserInfoChange('email', e.target.value)}
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
            value={user.password}
            onChange={e => handleUserInfoChange('password', e.target.value)}
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
                onChange={e => handleOtpChange(e.target.value)}
                error={!!otpError}
                helperText={otpError}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVerifyOtp}
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                disabled={!otp || otp.length !== 6}
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
              disabled={mobileError || emailError || passwordError}
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
              disabled={isLoading}
            >
              Sign Up {isLoading && <CircularProgress size={20} thickness={8} sx={{ marginLeft: 2, color: 'white' }} />}
            </Button>
          )}
        </Grid>
      </Grid>
      <div id="recapcha" style={{ display: 'none' }}></div>
    </Container>
  );
};

export default Signup;
