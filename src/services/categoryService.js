import { ApiContext } from '../context/ApiContext';
import { useContext } from 'react';

export const useCategoryApi = () => {
  const { baseUrl, headers } = useContext(ApiContext);

  const getCategories = async () => {
    const response = await fetch(`${baseUrl}/api/v1/categories`, { headers });
    return response.json();
  };

  return { getCategories };
}; 