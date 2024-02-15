import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

// ClosableAlert component
const ClosableAlert = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000); // Close automatically after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={null} // Set to null to control manually
      TransitionComponent={Slide} // Apply a transition effect
      TransitionProps={{
        direction: 'up', // Specify the direction of the transition
        timeout: {
          enter: 200, // Duration of the enter transition in milliseconds
          exit: 400, // Duration of the exit transition in milliseconds
        },
      }}
    >
      <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ClosableAlert;
