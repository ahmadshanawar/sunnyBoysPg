import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store';

const TopAppBar = ({ onMenuIconClick, isSidebarOpen }) => {
  const isLoggedIn = useAppStore(state => state.isLoggedIn)
  const user = useAppStore(state => state.user);
  return (
    <AppBar
      position="fixed"
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
        {user?.role === 'Admin' && <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuIconClick}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>}
        <Link to="/home" style={{ flexGrow:1 ,textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6">
            Sunny Boys' PG
          </Typography>
        </Link>
        <>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px', display: 'inline-flex' }} variant="button">
              Home
            </Typography>
          </Link>
          {/* Account Link (visible only when logged in) */}
          {(isLoggedIn && user.isUserRegistered) && (
            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px', display: 'inline-flex' }} variant="button">
                Account
              </Typography>
            </Link>
          )}
          {/* Login/Logout Link */}
          <Link to={isLoggedIn ? "/logout" : "/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={{ letterSpacing: '1px', fontSize: '16px', display: 'inline-flex' }} variant="button">
              {isLoggedIn ? 'Logout' : 'Login'}
            </Typography>
          </Link>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
