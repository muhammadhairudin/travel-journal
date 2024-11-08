import React, { createContext, useContext } from 'react';
import axiosInstance from '../services/axiosInstance';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const api = {
    get: (url) => axiosInstance.get(url),
    post: (url, data) => axiosInstance.post(url, data),
    put: (url, data) => axiosInstance.put(url, data),
    delete: (url) => axiosInstance.delete(url)
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext); 