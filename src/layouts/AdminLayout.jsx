import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  LocalOffer as PromoIcon,
  Category as CategoryIcon,
  ViewCarousel as BannerIcon,
  Receipt as TransactionIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const drawerWidth = 260;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Pengguna', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Promo', icon: <PromoIcon />, path: '/admin/promos' },
    { text: 'Kategori', icon: <CategoryIcon />, path: '/admin/categories' },
    { text: 'Banner', icon: <BannerIcon />, path: '/admin/banners' },
    { text: 'Transaksi', icon: <TransactionIcon />, path: '/admin/transactions' }
  ];

  const drawer = (
    <div>
      <Toolbar
        sx={{
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          sx={{
            background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}
        >
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              button 
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={isActive}
              sx={{
                my: 0.5,
                mx: 1,
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: isActive ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                color: isActive ? 'primary.main' : 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  transform: 'translateX(8px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? 'primary.main' : 'text.secondary',
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
    </div>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          component="nav"
          sx={{ 
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            position: { sm: 'fixed' },
            top: 64,
            bottom: 'auto',
            height: `calc(100vh - 64px - 200px)`,
            overflowY: 'auto',
            zIndex: 1,
            transition: 'width 0.3s ease',
            '&:hover': {
              '& .MuiDrawer-paper': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }
          }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                top: 64,
                height: `calc(100vh - 64px - 200px)`
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                position: 'static',
                height: '100%'
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
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            minHeight: `calc(100vh - 64px - 200px)`
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout; 