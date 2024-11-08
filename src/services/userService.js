import { ApiContext } from '../context/ApiContext';
import { useContext } from 'react';

export const useUserApi = () => {
  const { baseUrl, headers } = useContext(ApiContext);

  const getUserProfile = async () => {
    const response = await fetch(`${baseUrl}/api/v1/user-profile`, { headers });
    return response.json();
  };

  const updateUserProfile = async (profileData) => {
    const response = await fetch(`${baseUrl}/api/v1/update-user-profile`, {
      method: 'POST',
      headers,
      body: JSON.stringify(profileData),
    });
    return response.json();
  };

  return { getUserProfile, updateUserProfile };
}; 