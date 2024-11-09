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
import registerImage from '../../assets/images/register.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    phoneNumber: '',
    profilePictureUrl: 'default-avatar.png',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // ... logika submit tetap sama
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
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box 
                  component="img"
                  src={registerImage}
                  alt="Register illustration"
                  sx={{ 
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'contain'
                  }}
                />
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: 400, mx: 'auto' }}>
                <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                  Daftar Akun
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                  Bergabunglah untuk memulai petualangan Anda
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    label="Nama Lengkap"
                    fullWidth
                    margin="normal"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  
                  <TextField
                    name="phoneNumber"
                    label="Nomor Telepon"
                    fullWidth
                    margin="normal"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                  
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  
                  <TextField
                    name="passwordRepeat"
                    label="Ulangi Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={formData.passwordRepeat}
                    onChange={handleChange}
                    required
                  />

                  {error && (
                    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    size="large"
                    disabled={loading}
                    sx={{ mt: 3 }}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Daftar'}
                  </Button>

                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Typography variant="body2">
                      Sudah punya akun?{' '}
                      <Link component={RouterLink} to="/login">
                        Masuk di sini
                      </Link>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register; 