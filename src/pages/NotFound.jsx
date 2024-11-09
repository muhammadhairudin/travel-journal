import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="mt-8 text-4xl font-semibold text-gray-800">
        Halaman Tidak Ditemukan
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Maaf, halaman yang Anda cari tidak dapat ditemukan.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg
                 hover:bg-blue-700 transition-colors duration-300
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default NotFound; 