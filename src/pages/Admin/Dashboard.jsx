import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  alpha,
} from '@mui/material';
import {
  People as PeopleIcon,
  SupervisorAccount as AdminIcon,
  Person as UserIcon,
  LocalOffer as PromoIcon,
  ViewCarousel as BannerIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const statCards = [
    {
      title: 'Total Users',
      count: '279',
      icon: <PeopleIcon sx={{ fontSize: 24 }} />,
      color: '#1976d2',
      link: '/admin/manage-users'
    },
    {
      title: 'Admin Users',
      count: '158',
      icon: <AdminIcon sx={{ fontSize: 24 }} />,
      color: '#dc3545',
      link: '/admin/manage-users'
    },
    {
      title: 'Regular Users',
      count: '118',
      icon: <UserIcon sx={{ fontSize: 24 }} />,
      color: '#28a745',
      link: '/admin/manage-users'
    },
    {
      title: 'Active Promos',
      count: '9',
      icon: <PromoIcon sx={{ fontSize: 24 }} />,
      color: '#198754',
      link: '/admin/manage-promos'
    },
    {
      title: 'Banners',
      count: '4',
      icon: <BannerIcon sx={{ fontSize: 24 }} />,
      color: '#fd7e14',
      link: '/admin/manage-banners'
    },
    {
      title: 'Categories',
      count: '5',
      icon: <CategoryIcon sx={{ fontSize: 24 }} />,
      color: '#6f42c1',
      link: '/admin/manage-categories'
    },
  ];

  const recentTransactions = [
    { id: 1, date: '2024-02-08', amount: 299 },
    { id: 2, date: '2024-02-07', amount: 199 },
    { id: 3, date: '2024-02-06', amount: 499 },
    { id: 4, date: '2024-02-05', amount: 399 },
  ];

  const StatCard = ({ title, count, icon, color }) => (
    <Card
      sx={{
        height: '100%',
        p: 2,
        borderRadius: 2,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 12px -1px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              {count}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(color, 0.1),
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <StatCard {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Recent Transactions
            </Typography>
            <List>
              {recentTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Transaction #${transaction.id}`}
                      secondary={new Date(transaction.date).toLocaleDateString()}
                    />
                    <Typography variant="h6" color="primary">
                      ${transaction.amount}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Quick Actions
            </Typography>
            <List>
              {/* Quick actions list */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 