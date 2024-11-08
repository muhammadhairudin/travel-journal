import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';

export const useApi = () => {
  const getAllUsers = async () => {
    try {
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', {
        method: 'GET',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log('Users API Response:', result);
      if (result.code === 200) {
        return result;
      }
      return { data: [] };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { data: [] };
    }
  };

  const getBanners = async () => {
    try {
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners', {
        method: 'GET',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        return result;
      }
      return { data: [] };
    } catch (error) {
      console.error('Error fetching banners:', error);
      return { data: [] };
    }
  };

  const getPromos = async () => {
    try {
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', {
        method: 'GET',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        return result;
      }
      return { data: [] };
    } catch (error) {
      console.error('Error fetching promos:', error);
      return { data: [] };
    }
  };

  const getTransactions = async () => {
    try {
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transactions', {
        method: 'GET',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.code === 200) {
        return result;
      }
      return { data: [] };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { data: [] };
    }
  };

  return {
    getAllUsers,
    getBanners,
    getPromos,
    getTransactions
  };
}; 