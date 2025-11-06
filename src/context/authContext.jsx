import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/apiService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const loadUserFromToken = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
          apiService.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } catch {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    loadUserFromToken();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const response = await apiService.post('/login', { email, password });
      const { token: respToken, user: respUser } = response.data;

      localStorage.setItem('token', respToken);
      localStorage.setItem('user', JSON.stringify(respUser));

      setToken(respToken);
      setUser(respUser);
      setIsAuthenticated(true);
      apiService.defaults.headers.common['Authorization'] = `Bearer ${respToken}`;

      return respUser;
    } catch (error) {
      setAuthError('Login failed. Please check your credentials and try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (fullName, email, password, role) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const response = await apiService.post('/signup', { fullName, email, password, role });
      const { token: respToken, user: respUser } = response.data;

      localStorage.setItem('token', respToken);
      localStorage.setItem('user', JSON.stringify(respUser));

      setToken(respToken);
      setUser(respUser);
      setIsAuthenticated(true);
      apiService.defaults.headers.common['Authorization'] = `Bearer ${respToken}`;

      return respUser;
    } catch (error) {
      setAuthError('Signup failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete apiService.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    authError,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <p style={{ textAlign: 'center', padding: '2rem' }}>Loading application...</p>
      ) : (
        <>
          {authError && <p style={{ color: 'red' }}>{authError}</p>}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
