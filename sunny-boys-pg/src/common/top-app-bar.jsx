import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const TopAppBar = ({ onMenuIconClick, isSidebarOpen }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#251a33',
        zIndex: 1100,
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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuIconClick}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sunny Boys' PG
        </Typography>

        {/* Links to different pages */}
        <Box>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', marginRight: '6px' }}>
            <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px' }} variant="button">Home</Typography>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', color: 'inherit', marginRight: '6px' }}>
            <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px' }} variant="button">About</Typography>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography sx={{ marginRight: '10px', letterSpacing: '1px', fontSize: '16px' }} variant="button">Login</Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
