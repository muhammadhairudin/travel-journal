import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserLayout = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  // Redirect jika belum login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Redirect admin ke halaman admin
  if (userRole === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Navbar di bagian atas */}
      
      {/* Main content dengan flex-grow agar footer selalu di bawah */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer /> {/* Footer di bagian bawah */}
    </div>
  );
};

export default UserLayout; 