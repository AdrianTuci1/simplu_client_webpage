// API function to get services data
const API_BASE_URL = import.meta.env.VITE_API || '';
import { getServicesData } from '../config/demoMode.js';

export const getServices = async (locationId = 1) => {
  try {
    // Check if we should use demo data
    const demoData = getServicesData(locationId);
    if (demoData !== 'API_CALL') {
      return demoData;
    }
    
    // Make real API call
    const response = await fetch(`${API_BASE_URL}/api/services?locationId=${locationId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch services data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services data:', error);
    throw error;
  }
};
