import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import BannerCard from '../components/BannerCard';
import PromoCard from '../components/PromoCard';
import ActivityCard from '../components/ActivityCard';
import { useApi } from '../services/apiService';
import Header from '../components/Header';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [promos, setPromos] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getBanners, getPromos, getActivities } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bannersData, promosData, activitiesData] = await Promise.all([
          getBanners(),
          getPromos(),
          getActivities()
        ]);
        
        setBanners(bannersData?.data || []);
        setPromos(promosData?.data || []);
        setActivities(activitiesData?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header 
        title="Welcome to Travel Journal"
        subtitle="Discover Amazing Destinations"
        backgroundImage="https://source.unsplash.com/random/1920x1080/?travel,landscape"
      />
      
      <Container sx={{ py: 8 }}>
        {banners.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Featured Destinations
            </Typography>
            <Grid container spacing={3}>
              {banners.slice(0, 3).map((banner) => (
                <Grid item xs={12} md={4} key={banner.id}>
                  <BannerCard 
                    name={banner.name} 
                    imageUrl={banner.imageUrl}
                    description={banner.description} 
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {activities.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Popular Activities
            </Typography>
            <Grid container spacing={3}>
              {activities.slice(0, 6).map((activity) => (
                <Grid item xs={12} sm={6} md={4} key={activity.id}>
                  <ActivityCard 
                    title={activity.name}
                    description={activity.description}
                    imageUrl={activity.imageUrl}
                    price={activity.price}
                    rating={activity.rating}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {promos.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom>
              Special Offers
            </Typography>
            <Grid container spacing={3}>
              {promos.slice(0, 3).map((promo) => (
                <Grid item xs={12} sm={6} md={4} key={promo.id}>
                  <PromoCard 
                    title={promo.title}
                    description={promo.description}
                    imageUrl={promo.imageUrl}
                    discount={promo.discount}
                    validUntil={promo.validUntil}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Home;