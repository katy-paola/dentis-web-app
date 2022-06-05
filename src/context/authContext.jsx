import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
};

export const AuthContextProvider = ({ children }) => {
  /* Estado booleano para saber si esta o no auntenticado */
  const [auth, setAuth] = useState(false);
  /* Estado donde se guarda la información del Usuario */
  const [user, setUser] = useState({});

  /* Comprueba si hay un usuario en el localStorage y si lo hay, establece el estado auth a true
  y el estado user al usuario. */
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuth(true);
      setUser(JSON.parse(user));
    }
  }, []);

  /**
   * Login() toma un objeto usuario como argumento, establece el objeto usuario en localStorage, establece el estado auth
   * estado a true, y establece el estado del usuario al objeto usuario
   */
  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuth(true);
    setUser(user);
  };

  /**
   * La función de cierre de sesión elimina el usuario del almacenamiento local y establece los estados auth y user a false
   * y null respectivamente
   */
  const logout = () => {
    localStorage.removeItem('user');
    setAuth(false);
    setUser(null);
  };

  /* Devuelve el AuthContext.Provider con los valores de auth, user, login y logout. */
  return (
    <AuthContext.Provider value={{ auth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
