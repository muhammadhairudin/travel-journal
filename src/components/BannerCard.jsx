import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const BannerCard = ({ name, imageUrl, description }) => {
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
          alt={name}
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BannerCard; 