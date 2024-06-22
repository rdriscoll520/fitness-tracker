import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.post('/verify_token', null, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setAuthenticated(response.status === 200);
          if (response.status !== 200) {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  const signIn = () => {
    setAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
