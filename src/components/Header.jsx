import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Header = ({ title, subtitle, backgroundImage }) => {
  return (
    <Box
      sx={{
        background: backgroundImage 
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`
          : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 8,
        mb: 4
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 2
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Header; 