import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Avatar } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const { isAuthenticated, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Travel Journal
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {!isAuthenticated ? (
            // Menu untuk guest/public
            <>
              <Button color="inherit" component={Link} to="/about">
                Tentang
              </Button>
              <Button color="inherit" component={Link} to="/contact">
                Kontak
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Masuk
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Daftar
              </Button>
            </>
          ) : userRole === 'admin' ? (
            // Menu untuk admin
            <>
              <Button color="inherit" component={Link} to="/admin/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/admin/users">
                Kelola User
              </Button>
              <Button color="inherit" component={Link} to="/admin/promos">
                Kelola Promo
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Keluar
              </Button>
            </>
          ) : (
            // Menu untuk user biasa
            <>
              <Button color="inherit" component={Link} to="/user/homepage">
                Beranda
              </Button>
              <Button color="inherit" component={Link} to="/user/explore">
                Jelajahi
              </Button>
              <Button color="inherit" component={Link} to="/user/transactions">
                Pesanan Saya
              </Button>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={{ padding: 0 }}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Profile"
                    src={localStorage.getItem('userProfilePic')}
                  />
                </IconButton>
                <Button color="inherit" onClick={handleLogout}>
                  Keluar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;