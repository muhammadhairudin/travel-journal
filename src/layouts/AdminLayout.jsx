import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  LocalOffer as PromoIcon,
  ViewCarousel as BannerIcon,
  Receipt as TransactionIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const drawerWidth = 260;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/manage-users' },
    { text: 'Categories', icon: <CategoryIcon />, path: '/admin/manage-categories' },
    { text: 'Promos', icon: <PromoIcon />, path: '/admin/manage-promos' },
    { text: 'Banners', icon: <BannerIcon />, path: '/admin/manage-banners' },
    { text: 'Transactions', icon: <TransactionIcon />, path: '/admin/transactions' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', bgcolor: 'background.default' }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}>
          Admin Panel
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 2,
                mb: 1,
                borderRadius: 2,
                backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateX(8px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                },
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                  minWidth: 40,
                  transition: 'color 0.2s ease',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.02em',
                  }
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box 
        sx={{ 
          display: 'flex', 
          flex: 1,
          position: 'relative',
          pt: `${theme.mixins.toolbar.minHeight}px`,
        }}
      >
        <Box
          component="nav"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: '0 0 20px rgba(0,0,0,0.05)',
              position: 'fixed',
              top: `${theme.mixins.toolbar.minHeight}px`,
              height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
              zIndex: theme.zIndex.drawer,
            },
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                position: 'static',
                height: '100%',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2.5,
            pl: 3.5,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth - 48}px` },
            maxWidth: '1600px',
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout; 