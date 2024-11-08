import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Container } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary';

const GuestLayout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth="xl" 
        sx={{ 
          flexGrow: 1,
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <ErrorBoundary onRetry={() => window.location.reload()}>
          {children}
        </ErrorBoundary>
      </Container>
      <Footer />
    </Box>
  );
};

GuestLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default GuestLayout; 