import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GridViewIcon from '@mui/icons-material/GridView';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CameraRearIcon from '@mui/icons-material/CameraRear';
import MoneyIcon from '@mui/icons-material/Money'

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
            <GridViewIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={onClose} component={Link} to="/lobby">
          <ListItemIcon>
            <CameraRearIcon />
          </ListItemIcon>
          <ListItemText primary="Lobby" />
        </ListItem>
        <ListItem button onClick={onClose} component={Link} to="/tennantPayments">
          <ListItemIcon>
            <MoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
        <ListItem button onClick={onClose} component={Link} to="/expenseTracker">
          <ListItemIcon>
            <CurrencyExchangeIcon />
          </ListItemIcon>
          <ListItemText primary="Expenses" />
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
      </List>
    </Drawer>
  );
};

export default Sidebar;
