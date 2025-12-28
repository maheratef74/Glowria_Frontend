import API_BASE_URL from '../config/api';
import { getCookie, setCookie, removeCookie } from '../utils/cookies';

// Helper function to get auth token from cookies
const getToken = () => {
  return getCookie('token');
};

// Helper function to set auth token in cookies
const setToken = (token) => {
  setCookie('token', token, 7); // Store for 7 days
};

// Helper function to remove auth token from cookies
const removeToken = () => {
  removeCookie('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Helper function to get headers with language
const getHeadersWithLanguage = (language = 'en') => {

    //console.log('###########################################');

  const headers = {
    'Content-Type': 'application/json'
  };
  
  // Only add Accept-Language header if language is Arabic
  if (language === 'ar') {
    headers['Accept-Language'] = 'ar-EG';
  }
  
  return headers;
};

// Register user
export const register = async (userData, language = 'en') => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeadersWithLanguage(language),
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        password: userData.password,
        confirmpassword: userData.confirmPassword
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle validation errors (400 with errors object)
      if (data.errors && typeof data.errors === 'object') {
        const errorObj = {
          type: 'validation',
          errors: data.errors,
          message: data.title || 'Validation failed'
        };
        throw errorObj;
      }
      // Handle simple error message (e.g., email exists)
      throw new Error(data.message || 'Registration failed');
    }

    // Store token if registration is successful
    if (data.token) {
      setToken(data.token);
    }

    return {
      success: true,
      token: data.token,
      message: data.data || 'Registration successful'
    };
  } catch (error) {
    throw error;
  }
};

// Login user
export const login = async (credentials, language = 'en') => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeadersWithLanguage(language),
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      // Return structured error so callers can handle validation or message
      return { success: false, message: data.message || 'Login failed', data };
    }

    // Store token if login is successful
    // token may be in different shapes depending on backend
    const token = data.token || (data.data && data.data.token) || (data?.data?.token) || null;
    if (token) setToken(token);

    return { success: true, data };
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      // If token is invalid, remove it
      if (response.status === 401) {
        removeToken();
      }
      throw new Error(data.message || 'Failed to get user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logout = () => {
  removeToken();
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Export as default object for easier imports
const authService = {
  register,
  login,
  getCurrentUser,
  logout,
  isAuthenticated,
  getToken,
  setToken,
  removeToken
};

export default authService;
