import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// ClosableAlert component
const ClosableAlert = ({ message, severity }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant="filled">
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ClosableAlert;
