// Demo mode configuration
// Checks VITE_BUSINESS_TYPE (dental, gym, hotel) and VITE_DEMO_MODE
// When in demo mode, returns data from the appropriate demo data files
// Otherwise, indicates that real API calls should be made

const BUSINESS_TYPE = import.meta.env.VITE_BUSINESS_TYPE || 'dental';
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

// Import demo data files
import * as clinicData from '../data/apiDataClinic.js';
import * as gymData from '../data/apiDataGym.js';
import * as hotelData from '../data/apiDataHotel.js';

// Demo data mapping
const demoDataMap = {
  dental: clinicData,
  gym: gymData,
  hotel: hotelData,
};

/**
 * Check if the application is running in demo mode
 * @returns {boolean} True if demo mode is enabled
 */
export const isDemoMode = () => {
  return DEMO_MODE;
};

/**
 * Get the current business type
 * @returns {string} The business type (dental, gym, hotel)
 */
export const getBusinessType = () => {
  return BUSINESS_TYPE;
};

/**
 * Get the appropriate demo data based on business type
 * @returns {Object} The demo data for the current business type
 */
export const getDemoData = () => {
  const data = demoDataMap[BUSINESS_TYPE];
  if (!data) {
    console.warn(`No demo data found for business type: ${BUSINESS_TYPE}`);
    return null;
  }
  return data;
};

/**
 * Get home data - either from demo data or indicates real API call needed
 * @param {Object} params - Parameters for the API call
 * @returns {Object|string} Demo data if in demo mode, or 'API_CALL' if real API needed
 */
export const getHomeData = (params) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    return demoData?.homeData || null;
  }
  return 'API_CALL'; // Indicates that a real API call should be made
};

/**
 * Get services data - either from demo data or indicates real API call needed
 * @param {number} locationId - Location ID
 * @returns {Object|string} Demo data if in demo mode, or 'API_CALL' if real API needed
 */
export const getServicesData = (locationId = 1) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    const locationData = demoData?.homeData?.locations?.find(loc => loc.id === locationId);
    return locationData?.data?.services || [];
  }
  return 'API_CALL'; // Indicates that a real API call should be made
};

/**
 * Authenticate user - either from demo data or indicates real API call needed
 * @param {Object} credentials - User credentials (email, password)
 * @returns {Object|string} Demo authentication data if in demo mode, or 'API_CALL' if real API needed
 */
export const authenticateUser = (credentials) => {
  if (isDemoMode()) {
    const demoData = getDemoData();
    return demoData?.settings || null;
  }
  return 'API_CALL'; // Indicates that a real API call should be made
};

// Export all functions
export default {
  isDemoMode,
  getBusinessType,
  getDemoData,
  getHomeData,
  getServicesData,
  authenticateUser,
}; 