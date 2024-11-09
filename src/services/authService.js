import axiosInstance from './axiosInstance';

class AuthError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export const getUserRole = () => {
    // Contoh mendapatkan peran dari local storage
    return localStorage.getItem('userRole') || 'guest';
  };

export const login = async ({ email, password }) => {
  try {
    // Validasi input
    if (!email || !password) {
      throw new AuthError('Email dan password harus diisi', 400);
    }

    const response = await axiosInstance.post('/login', { email, password });
    
    // Validasi response
    if (!response.data) {
      throw new AuthError('Response tidak valid', 500);
    }

    const { code, token, user } = response.data;
    
    if (code === "200" && token && user) {
      // Set token ke axios instance
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Simpan data user
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      
      return {
        user,
        token,
        code: "200"
      };
    }
    
    throw new AuthError(response.data.message || 'Login gagal', code);
  } catch (error) {
    console.error('Login error:', error);
    throw handleApiError(error);
  }
};

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;
  
  try {
    // Set token ke header
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Ganti endpoint sesuai dengan API
    const response = await axiosInstance.get('/validate-token');
    
    if (response.data.code === "200") {
      return true;
    }
    
    // Jika token invalid, bersihkan storage
    localStorage.clear();
    return false;
  } catch (error) {
    localStorage.clear();
    delete axiosInstance.defaults.headers.common['Authorization'];
    return false;
  }
};

export const register = async (formData) => {
  try {
    const response = await axiosInstance.post('/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      passwordRepeat: formData.passwordRepeat,
      role: formData.role,
      profilePictureUrl: formData.profilePictureUrl,
      phoneNumber: formData.phoneNumber
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registrasi gagal');
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/';
};