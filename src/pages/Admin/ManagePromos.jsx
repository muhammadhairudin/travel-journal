import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  TablePagination,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, LocalOffer as PromoIcon } from '@mui/icons-material';
import { useApi } from '../../services/apiService';

const ManagePromos = () => {
  const [promos, setPromos] = useState([]);
  const [filteredPromos, setFilteredPromos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [promoStats, setPromoStats] = useState({
    total: 0,
    active: 0,
    expired: 0
  });

  const { getPromos, axiosInstance } = useApi();

  const fetchPromos = async () => {
    setIsLoading(true);
    try {
      const response = await getPromos();
      console.log('Raw Response:', response);
      
      if (response.code === "200" && response.data) {
        const promoData = response.data;
        console.log('Promo Data:', promoData);
        
        if (Array.isArray(promoData)) {
          setPromos(promoData);
          setFilteredPromos(promoData);
          
          const now = new Date();
          setPromoStats({
            total: promoData.length,
            active: promoData.filter(promo => new Date(promo.updatedAt) <= now).length,
            expired: promoData.filter(promo => new Date(promo.updatedAt) > now).length
          });
        } else {
          console.error('Data bukan array:', promoData);
          showSnackbar('Format data tidak sesuai', 'error');
        }
      } else {
        console.error('Response tidak valid:', response);
        showSnackbar('Gagal memuat data promo', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Gagal memuat data promo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching promos...');
    fetchPromos();
  }, []);

  useEffect(() => {
    filterPromos();
  }, [promos, searchTerm]);

  useEffect(() => {
    console.log('Current Promos State:', promos);
    console.log('Current Filtered Promos State:', filteredPromos);
  }, [promos, filteredPromos]);

  const filterPromos = () => {
    let filtered = [...promos];
    if (searchTerm) {
      filtered = filtered.filter(promo => 
        promo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.promo_code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPromos(filtered);
  };

  const handleDelete = async (promoId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus promo ini?')) {
      try {
        await axiosInstance.delete(`/delete-promo/${promoId}`);
        showSnackbar('Promo berhasil dihapus');
        fetchPromos();
      } catch (error) {
        showSnackbar('Gagal menghapus promo', 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = (field, value) => {
    setSelectedPromo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Promo Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>
            <PromoIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{promoStats.total}</Typography>
            <Typography>Total Promos</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#28a745', color: 'white' }}>
            <PromoIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{promoStats.active}</Typography>
            <Typography>Active Promos</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#dc3545', color: 'white' }}>
            <PromoIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{promoStats.expired}</Typography>
            <Typography>Expired Promos</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Search by title, description, or promo code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PromoIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
        onClick={() => {
          setSelectedPromo(null);
          setOpenDialog(true);
        }}
      >
        Add New Promo
      </Button>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Promo Code</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Min. Claim</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>Memuat data...</Typography>
                </TableCell>
              </TableRow>
            ) : !filteredPromos || filteredPromos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography>
                    Tidak ada data promo
                    {console.log('FilteredPromos saat render:', filteredPromos)}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredPromos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img 
                          src={promo.imageUrl} 
                          alt={promo.title}
                          style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                        />
                        {promo.title}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography noWrap>{promo.description}</Typography>
                    </TableCell>
                    <TableCell>{promo.promo_code}</TableCell>
                    <TableCell>Rp {promo.promo_discount_price?.toLocaleString()}</TableCell>
                    <TableCell>Rp {promo.minimum_claim_price?.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(promo.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        onClick={() => {
                          setSelectedPromo(promo);
                          setOpenDialog(true);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(promo.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPromos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPromo ? 'Edit Promo' : 'Add New Promo'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={selectedPromo?.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={selectedPromo?.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Terms & Conditions"
              multiline
              rows={3}
              value={selectedPromo?.terms_condition || ''}
              onChange={(e) => handleInputChange('terms_condition', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Promo Code"
              value={selectedPromo?.promo_code || ''}
              onChange={(e) => handleInputChange('promo_code', e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Discount Price"
              type="number"
              value={selectedPromo?.promo_discount_price || ''}
              onChange={(e) => handleInputChange('promo_discount_price', e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Minimum Claim Price"
              type="number"
              value={selectedPromo?.minimum_claim_price || ''}
              onChange={(e) => handleInputChange('minimum_claim_price', e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Image URL"
              value={selectedPromo?.imageUrl || ''}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            {selectedPromo ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManagePromos;