// Import component codes
import { COMPONENT_CODES } from './componentCodes';

// Business types
export const BUSINESS_TYPES = {
  HOTEL: 'HOTEL',
  GYM: 'GYM',
  DENTAL: 'DENTAL'
};

// Available pages for each business type
export const AVAILABLE_PAGES = {
  [BUSINESS_TYPES.DENTAL]: ['MEDICS', 'TREATMENTS'],
  [BUSINESS_TYPES.GYM]: ['PACKAGES', 'CLASSES'],
  [BUSINESS_TYPES.HOTEL]: ['ROOMS', 'FACILITIES']
};

// Component codes for each business type
export const BUSINESS_COMPONENT_CODES = {
  [BUSINESS_TYPES.HOTEL]: [11, 61, 111, 21, 101, 92, 71],
  [BUSINESS_TYPES.GYM]: [11, 61, 21, 51, 92, 71],
  [BUSINESS_TYPES.DENTAL]: [11, 61, 22, 81, 31, 92, 71]
};

// Helper function to parse environment array
const parseEnvArray = (envString) => {
  if (!envString) {
    // Default active pages based on business type
    const businessType = import.meta.env.VITE_BUSINESS_TYPE || BUSINESS_TYPES.HOTEL;
    return AVAILABLE_PAGES[businessType] || [];
  }
  try {
    return JSON.parse(envString.replace(/'/g, '"'));
  } catch (error) {
    console.error('Error parsing environment array:', error);
    // Fallback to default pages
    const businessType = import.meta.env.VITE_BUSINESS_TYPE || BUSINESS_TYPES.HOTEL;
    return AVAILABLE_PAGES[businessType] || [];
  }
};

// Helper function to parse layout array
const parseLayoutArray = (envString) => {
  if (!envString) {
    // Default layout based on business type
    const businessType = import.meta.env.VITE_BUSINESS_TYPE || BUSINESS_TYPES.HOTEL;
    return BUSINESS_COMPONENT_CODES[businessType] || [11, 61, 21, 30, 41, 51];
  }
  try {
    const parsedArray = JSON.parse(envString.replace(/'/g, '"'));
    
    // Validate that all codes are valid component codes
    const validCodes = Object.keys(COMPONENT_CODES).map(Number);
    const invalidCodes = parsedArray.filter(code => !validCodes.includes(code) && code !== 0);
    
    if (invalidCodes.length > 0) {
      console.warn(`Invalid component codes in VITE_HOME_LAYOUT: ${invalidCodes.join(', ')}. Using fallback layout.`);
      const businessType = import.meta.env.VITE_BUSINESS_TYPE || BUSINESS_TYPES.HOTEL;
      return BUSINESS_COMPONENT_CODES[businessType] || [11, 61, 21, 30, 41, 51];
    }
    
    return parsedArray;
  } catch (error) {
    console.error('Error parsing layout array:', error);
    // Fallback to business-specific layout
    const businessType = import.meta.env.VITE_BUSINESS_TYPE || BUSINESS_TYPES.HOTEL;
    return BUSINESS_COMPONENT_CODES[businessType] || [11, 61, 21, 30, 41, 51];
  }
};

// Helper function to parse locations array
const parseLocationsArray = (envString) => {
  if (!envString) {
    // Default locations - first location is always active
    return [
      {
        id: 'location-1',
        name: 'Unirii',
        slug: 'unirii',
        address: 'Strada Unirii, Nr. 123, București',
        phone: '+40 123 456 789',
        email: 'unirii@business.ro',
        isActive: true
      },
      {
        id: 'location-2', 
        name: 'Centru',
        slug: 'centru',
        address: 'Strada Victoriei, Nr. 45, București',
        phone: '+40 123 456 790',
        email: 'centru@business.ro',
        isActive: false
      },
      {
        id: 'location-3',
        name: 'Pipera',
        slug: 'pipera',
        address: 'Bulevardul Pipera, Nr. 67, București', 
        phone: '+40 123 456 791',
        email: 'pipera@business.ro',
        isActive: false
      }
    ];
  }
  try {
    const parsedArray = JSON.parse(envString.replace(/'/g, '"'));
    
    // Validate locations structure
    const validLocations = parsedArray.filter(location => 
      location.id && location.name && location.slug && location.address
    );
    
    if (validLocations.length === 0) {
      console.warn('No valid locations found in VITE_LOCATIONS. Using default locations.');
      return parseLocationsArray(null);
    }
    
    // Always set the first location as active, regardless of what's in the config
    validLocations.forEach((location, index) => {
      location.isActive = index === 0;
    });
    
    console.log(`Initialized ${validLocations.length} locations. Active location: ${validLocations[0].name}`);
    
    return validLocations;
  } catch (error) {
    console.error('Error parsing locations array:', error);
    return parseLocationsArray(null);
  }
};

// Configuration object
export const businessConfig = {
  type: import.meta.env.VITE_BUSINESS_TYPE || BUSINESS_TYPES.HOTEL,
  activePages: parseEnvArray(import.meta.env.VITE_ACTIVE_PAGES),
  homeLayout: parseLayoutArray(import.meta.env.VITE_HOME_LAYOUT),
  // Add support for multiple locations
  locations: parseLocationsArray(import.meta.env.VITE_LOCATIONS)
};

// Validation
export const validateConfig = () => {
  if (!Object.values(BUSINESS_TYPES).includes(businessConfig.type)) {
    console.error(`Invalid business type: ${businessConfig.type}`);
    return false;
  }

  const validPages = AVAILABLE_PAGES[businessConfig.type];
  const invalidPages = businessConfig.activePages.filter(page => !validPages.includes(page));
  
  if (invalidPages.length > 0) {
    console.error(`Invalid pages for ${businessConfig.type}: ${invalidPages.join(', ')}`);
    return false;
  }

  return true;
};

// Helper functions
export const getAvailablePages = () => AVAILABLE_PAGES[businessConfig.type];

// Check if a page is active for the current business type
export const isPageActive = (page) => {
  // First check if the page is valid for the current business type
  const validPages = AVAILABLE_PAGES[businessConfig.type];
  if (!validPages.includes(page)) {
    return false;
  }
  
  // Then check if it's in the active pages list
  return businessConfig.activePages.includes(page);
};

export const getHomeLayout = () => businessConfig.homeLayout;

// Helper functions for layout management
export const getLayoutComponents = () => {
  return businessConfig.homeLayout.map(code => ({
    code,
    component: COMPONENT_CODES[code],
    isValid: code === 0 || !!COMPONENT_CODES[code]
  }));
};

export const validateLayout = () => {
  const validCodes = Object.keys(COMPONENT_CODES).map(Number);
  const invalidCodes = businessConfig.homeLayout.filter(code => !validCodes.includes(code) && code !== 0);
  
  if (invalidCodes.length > 0) {
    console.error(`Invalid component codes in layout: ${invalidCodes.join(', ')}`);
    return false;
  }
  
  return true;
};

export const getLayoutInfo = () => {
  return {
    layout: businessConfig.homeLayout,
    totalSections: businessConfig.homeLayout.length,
    activeSections: businessConfig.homeLayout.filter(code => code !== 0).length,
    businessType: businessConfig.type,
    isValid: validateLayout()
  };
};

// Get business-specific component codes
export const getBusinessComponentCodes = () => {
  return BUSINESS_COMPONENT_CODES[businessConfig.type] || [];
};

// Get component info for business type
export const getBusinessComponentInfo = (number) => {
  if (number === 0) return null;
  
  // First check if it's a valid component code
  const componentInfo = COMPONENT_CODES[number];
  if (!componentInfo) return null;
  
  // Check if it's in the business-specific codes
  const businessCodes = BUSINESS_COMPONENT_CODES[businessConfig.type];
  if (businessCodes && businessCodes.includes(number)) {
    return componentInfo;
  }
  
  return null;
};

// Location helper functions
export const getCurrentLocation = () => {
  // Always return the first location as the current/initial location
  return businessConfig.locations[0] || null;
};

export const getInitialLocation = () => {
  return businessConfig.locations[0] || null;
};

export const getLocationBySlug = (slug) => {
  return businessConfig.locations.find(loc => loc.slug === slug);
};

export const getLocationById = (id) => {
  return businessConfig.locations.find(loc => loc.id === id);
};

export const getAllLocations = () => {
  return businessConfig.locations;
};

export const getActiveLocation = () => {
  // For now, we always return the first location as active
  // This can be extended later to support dynamic active location
  return businessConfig.locations[0] || null;
};

export const getLocationCount = () => {
  return businessConfig.locations.length;
};

export const hasMultipleLocations = () => {
  return businessConfig.locations.length > 1;
};

// Helper to get component from a number (legacy support)
export const getComponentInfo = (number) => {
  if (number === 0) return null;
  return COMPONENT_CODES[number] || null;
};

export const getBusinessLayout = (businessType = null) => {
  const type = businessType || businessConfig.type;
  return BUSINESS_COMPONENT_CODES[type] || [];
};

export const getAvailableLayouts = () => {
  return Object.keys(BUSINESS_COMPONENT_CODES).reduce((acc, businessType) => {
    acc[businessType] = BUSINESS_COMPONENT_CODES[businessType];
    return acc;
  }, {});
}; 