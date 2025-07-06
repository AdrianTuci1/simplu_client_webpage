// Homepage Data Manager
// Manages data distribution from a single homepage request across multiple components

import { getHomePage } from '../api';
import { isDemoMode, getHomeData } from '../config/demoMode';

/**
 * Get homepage data from API or demo data
 * @param {Object} params - Request parameters
 * @param {string} params.tenantId - Tenant ID
 * @param {number} params.locationId - Location ID (optional)
 * @returns {Promise<Object>} Homepage data
 */
export const fetchHomepageData = async (params) => {
  try {
    // Check if we should use demo data
    const demoData = getHomeData(params);
    if (demoData !== 'API_CALL') {
      return demoData;
    }
    
    // Make real API call
    return await getHomePage(params);
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    throw error;
  }
};

/**
 * Extract location-specific data from homepage data
 * @param {Object} homepageData - Full homepage data
 * @param {number} locationId - Target location ID
 * @returns {Object} Location-specific data
 */
export const extractLocationData = (homepageData, locationId) => {
  if (!homepageData?.locations) {
    console.warn('No locations found in homepage data');
    return null;
  }

  // Find the specific location
  const location = homepageData.locations.find(loc => loc.id === locationId);
  if (!location) {
    console.warn(`Location ${locationId} not found, using first location`);
    return homepageData.locations[0]?.data || null;
  }

  return location.data;
};

/**
 * Get component-specific data based on business type and location
 * @param {Object} homepageData - Full homepage data
 * @param {number} locationId - Location ID
 * @param {string} businessType - Business type
 * @param {string} componentType - Component type
 * @returns {Object} Component-specific data
 */
export const getComponentData = (homepageData, locationId, businessType, componentType) => {
  const locationData = extractLocationData(homepageData, locationId);
  if (!locationData) return null;

  switch (componentType) {
    case 'hero':
      return locationData.hero || {};
    
    case 'description':
      return {
        description: locationData.description,
        coordinates: locationData.coordinates
      };
    
    case 'facilities':
      return locationData.facilities || [];
    
    case 'attractions':
      return locationData.attractions || [];
    
    case 'rooms':
      return locationData.rooms || [];
    
    case 'services':
      return locationData.services || [];
    
    case 'packages':
      return locationData.packages || [];
    
    case 'classes':
      return locationData.classes || [];
    
    case 'gallery':
      return locationData.gallery || [];
    
    case 'footer':
      return locationData.footer || {};
    
    case 'clinicStats':
      return locationData.clinicStats || {};
    
    case 'medics':
      return locationData.medics || [];
    
    case 'treatments':
      return locationData.treatments || [];
    
    default:
      console.warn(`Unknown component type: ${componentType}`);
      return null;
  }
};

/**
 * Get business-specific component layout
 * @param {string} businessType - Business type
 * @returns {Array} Array of component codes
 */
export const getBusinessLayout = (businessType) => {
  const layouts = {
    dental: [11, 61, 22, 81, 31, 71], // Hero, Description, Features, ClinicStats, Gallery, Footer
    gym: [11, 61, 21, 44, 51, 92, 71], // Hero, Description, Features, Packages, Classes, EndInfo, Footer
    hotel: [11, 61, 111, 21, 101, 92, 71] // Hero, Description, Attractions, Features, Rooms, EndInfo, Footer
  };
  
  return layouts[businessType] || layouts.hotel;
};

/**
 * Get available pages for business type
 * @param {string} businessType - Business type
 * @returns {Array} Array of available page names
 */
export const getAvailablePages = (businessType) => {
  const pages = {
    dental: ['medics', 'treatments'],
    gym: ['packages', 'classes'],
    hotel: ['rooms', 'facilities', 'attractions']
  };
  
  return pages[businessType] || [];
};

/**
 * Create a data context for components
 * @param {Object} homepageData - Full homepage data
 * @param {number} locationId - Current location ID
 * @param {string} businessType - Business type
 * @returns {Object} Data context with all component data
 */
export const createDataContext = (homepageData, locationId, businessType) => {
  if (!homepageData) return null;

  const locationData = extractLocationData(homepageData, locationId);
  if (!locationData) return null;

  return {
    // Global data
    tenantId: homepageData.tenantId,
    businessType: homepageData.businessType,
    currentLocation: locationId,
    availablePages: homepageData.availablePages,
    allLocations: homepageData.locations,
    
    // Location-specific data
    location: homepageData.locations.find(loc => loc.id === locationId),
    locationData: locationData,
    
    // Component-specific data
    hero: locationData.hero || {},
    description: {
      description: locationData.description,
      coordinates: locationData.coordinates
    },
    facilities: locationData.facilities || [],
    attractions: locationData.attractions || [],
    rooms: locationData.rooms || [],
    services: locationData.services || [],
    packages: locationData.packages || [],
    classes: locationData.classes || [],
    gallery: locationData.gallery || [],
    footer: locationData.footer || {},
    clinicStats: locationData.clinicStats || {},
    medics: locationData.medics || [],
    treatments: locationData.treatments || [],
    
    // Utility functions
    getComponentData: (componentType) => getComponentData(homepageData, locationId, businessType, componentType),
    getBusinessLayout: () => getBusinessLayout(businessType),
    getAvailablePages: () => getAvailablePages(businessType)
  };
};

/**
 * Validate homepage data structure
 * @param {Object} data - Homepage data to validate
 * @returns {boolean} True if valid
 */
export const validateHomepageData = (data) => {
  if (!data) return false;
  
  const required = ['tenantId', 'businessType', 'locations'];
  return required.every(field => data.hasOwnProperty(field));
};

/**
 * Get minimal location data for both locations
 * @param {Object} homepageData - Full homepage data
 * @returns {Array} Array of minimal location data
 */
export const getMinimalLocationData = (homepageData) => {
  if (!homepageData?.locations) return [];
  
  return homepageData.locations.map(location => ({
    id: location.id,
    name: location.name,
    slug: location.slug,
    coordinates: location.coordinates,
    address: location.address,
    phone: location.phone,
    email: location.email,
    city: location.city,
    country: location.country
  }));
};

export default {
  fetchHomepageData,
  extractLocationData,
  getComponentData,
  getBusinessLayout,
  getAvailablePages,
  createDataContext,
  validateHomepageData,
  getMinimalLocationData
}; 