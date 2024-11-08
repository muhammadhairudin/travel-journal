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
  Stack,
  InputAdornment,
  TablePagination
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { useApi } from '../../services/apiService';

const ManagePromos = () => {
  const [promos, setPromos] = useState([]);
  const [filteredPromos, setFilteredPromos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    terms_condition: '',
    imageUrl: '',
    promo_code: '',
    promo_discount_price: 0,
    minimum_claim_price: 0
  });

  const { getPromos, createPromo, updatePromo, deletePromo } = useApi();

  const fetchPromos = async () => {
    try {
      const response = await getPromos();
      if (response.data) {
        setPromos(response.data);
        setFilteredPromos(response.data);
      }
    } catch (error) {
      console.error('Error fetching promos:', error);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  useEffect(() => {
    filterPromos();
  }, [promos, searchTerm]);

  const filterPromos = () => {
    let filtered = [...promos];
    if (searchTerm) {
      filtered = filtered.filter(promo => 
        promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.promo_code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPromos(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (promo = null) => {
    setSelectedPromo(promo);
    setFormData(promo || {
      title: '',
      description: '',
      terms_condition: '',
      imageUrl: '',
      promo_code: '',
      promo_discount_price: 0,
      minimum_claim_price: 0
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPromo(null);
    setFormData({
      title: '',
      description: '',
      terms_condition: '',
      imageUrl: '',
      promo_code: '',
      promo_discount_price: 0,
      minimum_claim_price: 0
    });
  };

  const handleSubmit = async () => {
    try {
      if (selectedPromo) {
        await updatePromo(selectedPromo.id, formData);
      } else {
        await createPromo(formData);
      }
      fetchPromos();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving promo:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this promo?')) {
      try {
        await deletePromo(id);
        fetchPromos();
      } catch (error) {
        console.error('Error deleting promo:', error);
      }
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Promo Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Promo
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search promos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Promo Code</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Min. Claim</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPromos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>{promo.title}</TableCell>
                  <TableCell>{promo.description}</TableCell>
                  <TableCell>{promo.promo_code}</TableCell>
                  <TableCell>{promo.promo_discount_price}</TableCell>
                  <TableCell>{promo.minimum_claim_price}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpenDialog(promo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(promo.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedPromo ? 'Edit Promo' : 'Add New Promo'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Terms & Conditions"
            fullWidth
            multiline
            rows={3}
            value={formData.terms_condition}
            onChange={(e) => setFormData({ ...formData, terms_condition: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Promo Code"
            fullWidth
            value={formData.promo_code}
            onChange={(e) => setFormData({ ...formData, promo_code: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Discount Price"
            type="number"
            fullWidth
            value={formData.promo_discount_price}
            onChange={(e) => setFormData({ ...formData, promo_discount_price: Number(e.target.value) })}
          />
          <TextField
            margin="dense"
            label="Minimum Claim Price"
            type="number"
            fullWidth
            value={formData.minimum_claim_price}
            onChange={(e) => setFormData({ ...formData, minimum_claim_price: Number(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedPromo ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManagePromos; 