import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';
import { useCartApi } from '../../services/cartService';
import { useApi } from '../../services/apiService';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { getCarts, getPaymentMethods, createTransaction } = useApi();

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCarts();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  const handleUpdate = async (cartId, newQuantity) => {
    await updateCartItem(cartId, { quantity: newQuantity });
    alert('Cart updated successfully');
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Cart</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdate(item.id, item.quantity + 1)}>Increase</Button>
                  <Button onClick={() => handleUpdate(item.id, item.quantity - 1)}>Decrease</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Cart; 