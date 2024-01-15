import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BuildIcon from '@mui/icons-material/Build';
const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Drawer Content */}
      <List>
        <ListItem>
          <IconButton onClick={onClose} sx={{ color: 'inherit', marginLeft: 'auto' }}>
            <ChevronLeftIcon />
          </IconButton>
        </ListItem>
        <ListItem button onClick={onClose} component={Link} to="/dashboard" >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={onClose} component={Link} to="/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={onClose} component={Link} to="/occupancy">
          <ListItemIcon>
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Occupancy" />
        </ListItem>
        <ListItem button onClick={onClose} component={Link} to="/tools">
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Tools" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
