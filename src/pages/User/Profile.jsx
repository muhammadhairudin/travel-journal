import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Box,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { useUserApi } from '../../services/userService';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePictureUrl: '',
    address: ''
  });

  const { getUserProfile, updateUserProfile } = useUserApi();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
      setFormData({
        name: data.name || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        profilePictureUrl: data.profilePictureUrl || '',
        address: data.address || ''
      });
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateUserProfile(formData);
      setSuccess(true);
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Profile Header */}
          <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" gutterBottom>
              Profile
            </Typography>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Grid>

          {/* Alert Messages */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Alert severity="success" onClose={() => setSuccess(false)}>
                Profile updated successfully!
              </Alert>
            </Grid>
          )}

          {/* Profile Picture */}
          <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={profile.profilePictureUrl}
              alt={profile.name}
              sx={{ width: 200, height: 200, mb: 2 }}
            />
            {isEditing && (
              <TextField
                name="profilePictureUrl"
                label="Profile Picture URL"
                fullWidth
                value={formData.profilePictureUrl}
                onChange={handleChange}
                size="small"
              />
            )}
          </Grid>

          {/* Profile Info */}
          <Grid item xs={12} md={8}>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Full Name"
                      fullWidth
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      fullWidth
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="phoneNumber"
                      label="Phone Number"
                      fullWidth
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="address"
                      label="Address"
                      fullWidth
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            ) : (
              <Box>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6">{profile.name}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <EmailIcon color="primary" />
                  <Typography>{profile.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <PhoneIcon color="primary" />
                  <Typography>{profile.phoneNumber || 'Not provided'}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <LocationOnIcon color="primary" />
                  <Typography>{profile.address || 'Not provided'}</Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile; 