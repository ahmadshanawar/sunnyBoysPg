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
import { useAppStore } from '../../store';
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
  const setUser = useAppStore((state) => state.setUser);
  const user = useAppStore((state) => state.user);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (isEmail(userId)) {
      console.log('Login with email:', userId);
      setPersistence(firebaseAuth, browserSessionPersistence)
        .then(async () => {
          try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, userId, password);
            const userCred = userCredential.user;
            setUser({ ...user, emailUid: userCred.uid })
            navigate('/profile')

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
            sx={{backgroundColor:'#251a33', marginTop:'5px'}}
            fullWidth
            onClick={handleLogin}
          >
            Login
          </SubmitButton>          
          <Button
            variant="contained"
            sx={{backgroundColor:'#251a33', marginTop:'5px'}}
            fullWidth
            onClick={() => navigate('/signUp') }
          >
            Register
          </Button>
          <Button
            variant="contained"
           sx={{backgroundColor:'#251a33', marginTop:'5px'}}
            fullWidth
            onClick={() => navigate('/') }
          >
            Home
          </Button>
        </LoginForm>
      </CenteredPaper>
    </CenteredContainer>
  );
};

export default Login;
