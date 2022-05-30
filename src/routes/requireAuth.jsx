import { Navigate } from 'react-router-dom';
import { useAuthState } from '../context/authContext';

const RequireAuth = ({ children }) => {
  const { auth } = useAuthState();

  return auth ? children : <Navigate to={'/login'} />;
};

export default RequireAuth;
