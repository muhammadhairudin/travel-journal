import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, CircularProgress, Link } from '@mui/material';
import { register } from '../../services/authService';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
    phoneNumber: '',
    profilePictureUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80',
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

    if (formData.password !== formData.passwordRepeat) {
      setError('Password tidak cocok');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registrasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 4, 
        mb: 4, 
        p: 3, 
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper' 
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Daftar Akun
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
    </Container>
  );
};

export default Register; 