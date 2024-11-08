import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';

const PromoCard = ({ title, description, imageUrl, discount, validUntil }) => {
  return (
    <Card sx={{ 
      height: 380,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 3,
      '&:hover': {
        transform: 'scale(1.02)',
        transition: 'transform 0.2s ease-in-out'
      }
    }}>
      <Box sx={{ position: 'relative', pt: '56.25%' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <Chip
          label={`${discount}% OFF`}
          color="error"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontSize: '1.1rem',
            fontWeight: 'bold'
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 1
          }}
        >
          {description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', display: 'block' }}>
          Valid until: {new Date(validUntil).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PromoCard; 