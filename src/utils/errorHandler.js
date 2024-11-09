export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR') {
    super(message);
    this.code = code;
  }
}

export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Error dari response API
    const message = error.response.data?.message || 'Terjadi kesalahan pada server';
    const code = error.response.status;
    return new AppError(message, code);
  } else if (error.request) {
    // Error karena tidak ada response
    return new AppError('Tidak dapat terhubung ke server', 'NETWORK_ERROR');
  } else {
    // Error lainnya
    return new AppError(error.message || 'Terjadi kesalahan', 'CLIENT_ERROR');
  }
}; 