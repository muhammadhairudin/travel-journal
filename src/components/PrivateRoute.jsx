import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role, allowedRoles }) => {
  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 