import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  styled,
} from '@mui/material';

import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from '@firebase/auth';
import { firebaseAuth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const CenteredContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const CenteredPaper = styled(Paper)({
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const LoginForm = styled('form')({
  width: '100%',
  marginTop: '8px',
});

const SubmitButton = styled(Button)({
  margin: '24px 0 16px',
});

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate= useNavigate();
  const handleLogin = async () => {
    if (isEmail(userId)) {
      console.log('Login with email:', userId);
      setPersistence(firebaseAuth, browserSessionPersistence)
        .then(async () => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, userId, password);
            // Signed in 
            const user = userCredential.user;
            console.log(user.uid);
            navigate('/profile', {state:{ uid:user.uid}})

          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });


    } else {
      setPassword('')
      console.log('Invalid email id');
      setError('Invalid email id');
    }
  };
  const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <CenteredContainer component="main" maxWidth="xs">
      <CenteredPaper elevation={3}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userId"
            label="Email Address"
            name="userId"
            autoComplete="userId"
            autoFocus
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            error={error !== ''}
            helperText={error}
          />
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Add a similar TextField for password or mobile, depending on your authentication method */}
          <SubmitButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </SubmitButton>
        </LoginForm>
      </CenteredPaper>
    </CenteredContainer>
  );
};

export default Login;
