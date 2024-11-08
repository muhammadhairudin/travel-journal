import { ApiContext } from '../context/ApiContext';
import { useContext } from 'react';

export const useCartApi = () => {
  const { baseUrl, headers } = useContext(ApiContext);

  const getCartItems = async () => {
    const response = await fetch(`${baseUrl}/api/v1/carts`, { headers });
    return response.json();
  };

  const updateCartItem = async (cartId, itemData) => {
    const response = await fetch(`${baseUrl}/api/v1/update-cart/${cartId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(itemData),
    });
    return response.json();
  };

  return { getCartItems, updateCartItem };
}; 