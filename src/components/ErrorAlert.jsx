import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <Snackbar 
      open={!!error} 
      autoHideDuration={6000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity="error" variant="filled">
        {error.message || 'Terjadi kesalahan'}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert; 