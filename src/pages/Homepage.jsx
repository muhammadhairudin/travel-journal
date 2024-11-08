import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Chip
} from '@mui/material';
import { useApi } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promos, setPromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getBanners, getCategories, getPromos } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [bannersRes, categoriesRes, promosRes] = await Promise.all([
        getBanners(),
        getCategories(),
        getPromos()
      ]);

      if (bannersRes.data) setBanners(bannersRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (promosRes.data) setPromos(promosRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Banner Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Featured Destinations</Typography>
        <Grid container spacing={3}>
          {banners.map((banner) => (
            <Grid item xs={12} md={4} key={banner.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={banner.imageUrl}
                  alt={banner.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {banner.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Categories Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Categories</Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': { transform: 'scale(1.02)', transition: '0.3s' }
                }}
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.imageUrl}
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Promos Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Special Offers</Typography>
        <Grid container spacing={3}>
          {promos.map((promo) => (
            <Grid item xs={12} sm={6} md={4} key={promo.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={promo.imageUrl}
                  alt={promo.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {promo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {promo.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={`Code: ${promo.promoCode}`}
                      color="primary"
                      size="small"
                    />
                    <Typography variant="h6" color="primary">
                      {formatCurrency(promo.discount)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Homepage; 