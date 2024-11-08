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
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Link
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useApi } from '../../services/apiService';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    payment_method: ''
  });
  const [detailDialog, setDetailDialog] = useState(false);

  const { getTransactions, updateTransaction, deleteTransaction } = useApi();

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      if (response.data) {
        setTransactions(response.data);
        setFilteredTransactions(response.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm]);

  const filterTransactions = () => {
    let filtered = [...transactions];
    if (searchTerm) {
      filtered = filtered.filter(transaction => 
        transaction.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.payment_method?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTransactions(filtered);
  };

  // Handler functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (transaction = null) => {
    setSelectedTransaction(transaction);
    setFormData(transaction ? {
      status: transaction.status || '',
      payment_method: transaction.payment_method || ''
    } : {
      status: '',
      payment_method: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTransaction(null);
    setFormData({ status: '', payment_method: '' });
  };

  const handleSubmit = async () => {
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction.id, formData);
        fetchTransactions();
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransaction(id);
        fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const StatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'success':
          return '#4CAF50';
        case 'pending':
          return '#FFC107';
        case 'failed':
          return '#F44336';
        default:
          return '#757575';
      }
    };

    return (
      <Box
        sx={{
          backgroundColor: getStatusColor(status),
          color: 'white',
          padding: '4px 12px',
          borderRadius: '16px',
          display: 'inline-block',
          fontSize: '0.875rem'
        }}
      >
        {status}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Transaction Management
      </Typography>

      <TextField
        fullWidth
        placeholder="Search transactions..."
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
              <TableCell>Invoice ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.invoiceId}</TableCell>
                  <TableCell>{formatCurrency(transaction.totalAmount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img 
                        src={transaction.payment_method?.imageUrl} 
                        alt={transaction.payment_method?.name}
                        style={{ width: 24, height: 24, objectFit: 'contain' }}
                      />
                      {transaction.payment_method?.name}
                    </Box>
                  </TableCell>
                  <TableCell>{formatDate(transaction.orderDate)}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => {
                      setSelectedTransaction(transaction);
                      setDetailDialog(true);
                    }}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDialog(transaction)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog 
        open={detailDialog} 
        onClose={() => setDetailDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Transaction Detail
        </DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Invoice Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Invoice ID</Typography>
                        <Typography>{selectedTransaction.invoiceId}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Status</Typography>
                        <StatusBadge status={selectedTransaction.status} />
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Total Amount</Typography>
                        <Typography>{formatCurrency(selectedTransaction.totalAmount)}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
                
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Payment Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Payment Method</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <img 
                            src={selectedTransaction.payment_method?.imageUrl} 
                            alt={selectedTransaction.payment_method?.name}
                            style={{ width: 24, height: 24, objectFit: 'contain' }}
                          />
                          <Typography>{selectedTransaction.payment_method?.name}</Typography>
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Virtual Account</Typography>
                        <Typography>{selectedTransaction.payment_method?.virtual_account_number}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Account Name</Typography>
                        <Typography>{selectedTransaction.payment_method?.virtual_account_name}</Typography>
                      </Box>
                      {selectedTransaction.proofPaymentUrl && (
                        <Box>
                          <Typography color="text.secondary" gutterBottom>Payment Proof</Typography>
                          <Link href={selectedTransaction.proofPaymentUrl} target="_blank">
                            View Payment Proof
                          </Link>
                        </Box>
                      )}
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Date Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Order Date</Typography>
                        <Typography>{formatDate(selectedTransaction.orderDate)}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Expired Date</Typography>
                        <Typography>{formatDate(selectedTransaction.expiredDate)}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography color="text.secondary">Last Updated</Typography>
                        <Typography>{formatDate(selectedTransaction.updatedAt)}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Edit Transaction
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={formData.payment_method}
              label="Payment Method"
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
            >
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
              <MenuItem value="cash">Cash</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Transactions; 