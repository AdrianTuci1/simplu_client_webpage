// API function to authenticate user
const API_BASE_URL = import.meta.env.VITE_API || '';
import { authenticateUser } from '../config/demoMode.js';

export const authenticate = async (credentials) => {
  try {
    // Check if we should use demo data
    const demoData = authenticateUser(credentials);
    if (demoData !== 'API_CALL') {
      return demoData;
    }
    
    // Make real API call
    const response = await fetch(`${API_BASE_URL}/api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};
