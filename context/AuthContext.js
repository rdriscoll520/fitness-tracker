import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/verify_token', {
            headers: { Authorization: `Bearer ${token}` },
            method: 'GET'
          });
        
          setAuthenticated(response.ok);
          if (!response.ok) {
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
  

  const signIn = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Assuming the token is returned in data.token
        setAuthenticated(true);
      } else {
        alert(data.message || 'Authentication failed'); // Show error message from server
      }
    } catch (error) {
      console.error('SignIn error:', error);
      alert('An error occurred during sign in');
    }
  };
  

  const signOut = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    // Add any additional clean-up here
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);