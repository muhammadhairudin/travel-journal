import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { useCartApi } from '../../services/cartService';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { getCartItems, updateCartItem } = useCartApi();

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartItems();
      setCartItems(data);
    };

    fetchCartItems();
  }, []);

  const handleUpdate = async (cartId, newQuantity) => {
    await updateCartItem(cartId, { quantity: newQuantity });
    alert('Cart updated successfully');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
            <Button onClick={() => handleUpdate(item.id, item.quantity + 1)}>Increase</Button>
            <Button onClick={() => handleUpdate(item.id, item.quantity - 1)}>Decrease</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Cart; 