import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      if (authService.isAuthenticated()) {
        const response = await authService.getCurrentUser();
        if (response.success) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, language = 'en') => {
    try {
      const response = await authService.login(credentials, language);
      if (response.success) {
        // Try to fetch current user after token is stored
        try {
          const userRes = await authService.getCurrentUser();
          if (userRes && userRes.success && userRes.data && userRes.data.user) {
            setUser(userRes.data.user);
          }
        } catch (e) {
          // ignore, user may be fetched later
        }
        setIsAuthenticated(true);
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (userData, language = 'en') => {
    try {
      const response = await authService.register(userData, language);
      if (response.success) {
        // Token is already saved in authService; try to fetch user
        try {
          const userRes = await authService.getCurrentUser();
          if (userRes && userRes.success && userRes.data && userRes.data.user) {
            setUser(userRes.data.user);
          }
        } catch (e) {
          // ignore
        }
        setIsAuthenticated(true);
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message };
    } catch (error) {
      // Pass through the error object to preserve validation errors
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
