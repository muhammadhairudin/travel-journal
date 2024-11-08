import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Box, Container } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary';

const GuestLayout = () => {
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
          px: { xs: 2, md: 3 }
        }}
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Container>
      <Footer />
    </Box>
  );
};

export default GuestLayout; 