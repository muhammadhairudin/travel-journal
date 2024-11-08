import axiosInstance from './axiosInstance';

export const getUserRole = () => {
    // Contoh mendapatkan peran dari local storage
    return localStorage.getItem('userRole') || 'guest';
  };

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    
    if (response.data.code !== "200") {
      throw new Error(response.data.message || 'Login failed');
    }

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userRole', response.data.data.role);
    localStorage.setItem('userData', JSON.stringify(response.data.data));

    window.location.href = '/';
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (email, password, passwordRepeat) => {
  try {
    const response = await axiosInstance.post('/register', {
      email,
      password,
      passwordRepeat
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};