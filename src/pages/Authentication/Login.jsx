import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Paper,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import loginImage from '../../assets/images/login.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Implementasi login logic
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'grey.100'
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Form Login */}
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  Selamat Datang Kembali
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                  Silakan masuk untuk melanjutkan perjalanan Anda
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    margin="normal"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    margin="normal"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />

                  {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ mt: 4, mb: 2, py: 1.5 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Masuk'}
                  </Button>

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">
                      Belum punya akun?{' '}
                      <Link component={RouterLink} to="/register">
                        Daftar sekarang
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Grid>

            {/* Gambar Login */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box 
                  component="img"
                  src={loginImage}
                  alt="Login illustration"
                  sx={{ 
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'contain'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 