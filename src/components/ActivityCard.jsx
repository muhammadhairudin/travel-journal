import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';

const ActivityCard = ({ title, description, imageUrl, price, rating }) => {
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
        <Box sx={{ 
          mt: 'auto',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" color="primary">
            ${price}
          </Typography>
          <Rating value={rating} readOnly size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard; 