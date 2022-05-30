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
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuth(true);
      setUser(JSON.parse(user));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuth(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ auth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
