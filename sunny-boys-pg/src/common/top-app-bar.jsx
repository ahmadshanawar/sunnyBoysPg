import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import LoginIcon from '@mui/icons-material/Login';

const TopAppBar = ({ onMenuIconClick, isSidebarOpen }) => {
  const isLoggedIn = useAppStore(state => state.isLoggedIn)
  const user = useAppStore(state => state.user);
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#251a33',
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        ...(isSidebarOpen && {
          width: 'calc(100% - 240px)', // Adjust based on your sidebar width
          marginLeft: '240px', // Adjust based on your sidebar width
        }),
      }}
    >
      <Toolbar>
       {user?.role==='Admin' && <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuIconClick}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sunny Boys' PG
        </Typography>

        {/* Links to different pages */}
        <Box>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', marginRight: '6px' }}>
            <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px', display: 'inline-flex' }} variant="button">
              <HomeIcon style={{ marginRight: '3px' }} /> Home
            </Typography>
          </Link>

          {/* Account Link (visible only when logged in) */}
          {(isLoggedIn && user.isUserRegistered) && (
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', marginRight: '6px' }}>
              <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px', display: 'inline-flex' }} variant="button">
                <AccountCircleIcon style={{ marginRight: '3px' }} /> Account
              </Typography>
            </Link>
          )}

          {/* Login/Logout Link */}
          <Link to={isLoggedIn ? "/logout" : "/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px', display: 'inline-flex' }} variant="button">
              {isLoggedIn ? <LogoutIcon style={{ marginRight: '3px' }} /> : <LoginIcon style={{ marginRight: '3px' }} />}
              {isLoggedIn ? 'Logout' : 'Login'}
            </Typography>
          </Link>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
