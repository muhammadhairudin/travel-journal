import { ApiContext } from '../context/ApiContext';
import { useContext } from 'react';

export const useActivityApi = () => {
  const { baseUrl, headers } = useContext(ApiContext);

  const getActivities = async () => {
    const response = await fetch(`${baseUrl}/api/v1/activities`, { headers });
    return response.json();
  };

  const getActivityById = async (id) => {
    const response = await fetch(`${baseUrl}/api/v1/activity/${id}`, { headers });
    return response.json();
  };

  return { getActivities, getActivityById };
}; 