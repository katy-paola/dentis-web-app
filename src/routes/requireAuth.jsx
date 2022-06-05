import { Navigate } from 'react-router-dom';
import { useAuthState } from '../context/authContext';

const RequireAuth = ({ children }) => {
  /* Desestructuración de la propiedad auth del hook useAuthState. */
  const { auth } = useAuthState();

  /* Un operador ternario. Si auth es verdadero, devolverá los hijos. Si auth es false, devolverá
  el componente Navigate hacia el login. */
  return auth ? children : <Navigate to={'/login'} />;
};

export default RequireAuth;
