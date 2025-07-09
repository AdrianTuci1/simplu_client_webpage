// API function to get services data for all business types
const API_BASE_URL = import.meta.env.VITE_API || '';
import { isDemoMode, getDemoData, getBusinessType } from '../config/demoMode.js';

export const getServices = async (params = {}) => {
  const { locationId = 1, businessType = getBusinessType() } = params;
  
  try {
    // Check if we should use demo data
    if (isDemoMode()) {
      const demoData = getDemoData();
      
      // Get location-specific data
      const locationData = demoData?.homeData?.locations?.find(loc => loc.id === locationId);
      
      if (!locationData) {
        return null;
      }
      
      // Return different services based on business type
      switch (businessType) {
        case 'clinic':
        case 'dental':
          // For clinic, return treatments from the services object
          return demoData?.services || { treatments: [] };
        
        case 'gym':
          // For gym, return packages from location data
          return { packages: locationData.data?.packages || [] };
        
        case 'hotel':
          // For hotel, return rooms from location data
          return { rooms: locationData.data?.rooms || [] };
        
        default:
          return null;
      }
    }
    
    // Make real API call
    const queryParams = new URLSearchParams({
      locationId: locationId.toString(),
      ...(businessType && { businessType })
    });
    
    const response = await fetch(`${API_BASE_URL}/api/services?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch services data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services data:', error);
    throw error;
  }
};
