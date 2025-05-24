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
  [BUSINESS_TYPES.HOTEL]: ['ROOMS', 'FACILITIES', 'ATTRACTIONS']
};

// Parse environment variables
const parseEnvArray = (envString) => {
  if (!envString) return [];
  return envString.replace(/[\[\]]/g, '').split(',').map(item => item.trim());
};

const parseLayoutArray = (envString) => {
  if (!envString) return [];
  return envString.replace(/[\[\]]/g, '').split(',').map(item => parseInt(item.trim()));
};

// Configuration object
export const businessConfig = {
  type: import.meta.env.VITE_BUSINESS_TYPE || BUSINESS_TYPES.HOTEL,
  activePages: parseEnvArray(import.meta.env.VITE_ACTIVE_PAGES),
  homeLayout: parseLayoutArray(import.meta.env.VITE_HOME_LAYOUT),
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

// Helper to get component from a number
export const getComponentInfo = (number) => {
  if (number === 0) return null;
  return COMPONENT_CODES[number] || null;
}; 