import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import {
  People as PeopleIcon,
  LocalOffer as PromoIcon,
  Category as CategoryIcon,
  ViewCarousel as BannerIcon,
  Receipt as TransactionIcon,
  ArrowForward as ArrowForwardIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Data statis untuk dashboard
  const stats = {
    users: 150,
    transactions: 1250,
    promos: 25,
    categories: 12,
    banners: 8
  };

  const dashboardItems = [
    {
      title: 'Pengguna',
      count: stats.users,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      path: '/admin/users'
    },
    {
      title: 'Transaksi',
      count: stats.transactions,
      icon: <TransactionIcon sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      path: '/admin/transactions'
    },
    {
      title: 'Promo',
      count: stats.promos,
      icon: <PromoIcon sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      path: '/admin/promos'
    },
    {
      title: 'Kategori',
      count: stats.categories,
      icon: <CategoryIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      path: '/admin/categories'
    },
    {
      title: 'Banner',
      count: stats.banners,
      icon: <BannerIcon sx={{ fontSize: 40 }} />,
      color: '#d32f2f',
      path: '/admin/banners'
    }
  ];

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        padding: 3,
        bgcolor: '#f5f5f5'
      }}
    >
      <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Dashboard Admin
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  bgcolor: item.color,
                  color: 'white',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    cursor: 'pointer'
                  }
                }}
                onClick={() => navigate(item.path)}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    {item.icon}
                    <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                      {item.count}
                    </Typography>
                    <Typography variant="subtitle1">
                      Total {item.title}
                    </Typography>
                  </Box>
                  <IconButton 
                    sx={{ color: 'white' }}
                    onClick={() => navigate(item.path)}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Aksi Cepat
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PeopleIcon />}
                onClick={() => navigate('/admin/users')}
                sx={{ p: 2 }}
              >
                Kelola Pengguna
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<TransactionIcon />}
                onClick={() => navigate('/admin/transactions')}
                sx={{ p: 2 }}
              >
                Lihat Transaksi
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PromoIcon />}
                onClick={() => navigate('/admin/promos')}
                sx={{ p: 2 }}
              >
                Kelola Promo
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<BannerIcon />}
                onClick={() => navigate('/admin/banners')}
                sx={{ p: 2 }}
              >
                Kelola Banner
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;