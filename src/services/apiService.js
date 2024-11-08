import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import axiosInstance from './axiosInstance';

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
      return result;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const getBanners = async () => {
    try {
      const response = await axiosInstance.get('/banners');
      return response.data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      throw error;
    }
  };

  const getPromos = async () => {
    try {
      const response = await axiosInstance.get('/promos');
      return response.data;
    } catch (error) {
      console.error('Error fetching promos:', error);
      throw error;
    }
  };

  const getActivities = async () => {
    try {
      const response = await axiosInstance.get('/activities');
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
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

  const createPromo = async (promoData) => {
    try {
      const response = await fetch('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo', {
        method: 'POST',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: promoData.title,
          description: promoData.description,
          terms_condition: promoData.terms_condition,
          promo_code: promoData.promo_code,
          promo_discount_price: parseInt(promoData.promo_discount_price),
          minimum_claim_price: parseInt(promoData.minimum_claim_price),
          imageUrl: promoData.imageUrl
        })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating promo:', error);
      throw error;
    }
  };

  const updatePromo = async (promoId, promoData) => {
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${promoId}`, {
        method: 'PUT',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: promoData.title,
          description: promoData.description,
          terms_condition: promoData.terms_condition,
          promo_code: promoData.promo_code,
          promo_discount_price: parseInt(promoData.promo_discount_price),
          minimum_claim_price: parseInt(promoData.minimum_claim_price),
          imageUrl: promoData.imageUrl
        })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating promo:', error);
      throw error;
    }
  };

  const deletePromo = async (promoId) => {
    try {
      const response = await fetch(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${promoId}`, {
        method: 'DELETE',
        headers: {
          'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error deleting promo:', error);
      throw error;
    }
  };

  return {
    getAllUsers,
    getBanners,
    getPromos,
    getActivities,
    getTransactions,
    createPromo,
    updatePromo,
    deletePromo,
    axiosInstance,
  };
}; 