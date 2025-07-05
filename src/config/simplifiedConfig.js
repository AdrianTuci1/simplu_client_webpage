// Simplified Business Configuration
// Direct mapping between business types and their configurations

const BUSINESS_TYPES = {
  HOTEL: 'hotel',
  CLINIC: 'clinic', 
  GYM: 'gym'
};

// Simple component mapping
const COMPONENTS = {
  // Hero
  11: 'HeroVariant1',
  
  // Features
  21: 'FeaturesVariant1',
  22: 'FeaturesVariant2',
  
  // Gallery
  31: 'GalleryVariant1',
  
  // Description
  61: 'DescriptionVariant1',
  
  // Packages
  44: 'PackagesVariant1',
  
  // Classes
  51: 'ClassesVariant1',
  52: 'ClassesVariant2',
  
  // Footer
  71: 'FooterVariant1',
  
  // Clinic Stats
  81: 'ClinicStatsVariant1',
  
  // End Info
  92: 'EndInfo',
  
  // Rooms
  101: 'RoomsVariant1',
  
  // Attractions
  111: 'AttractionsVariant1',
};

// Business configurations - direct and simple
const BUSINESS_CONFIGS = {
  [BUSINESS_TYPES.HOTEL]: {
    name: 'Hotel',
    homeLayout: [11, 61, 111, 21, 101, 92, 71], // Hero, Description, Attractions, Features, Rooms, EndInfo, Footer
    availablePages: ['ROOMS', 'FACILITIES', 'ATTRACTIONS'],
    defaultLocation: 'unirii'
  },
  
  [BUSINESS_TYPES.GYM]: {
    name: 'Gym',
    homeLayout: [11, 61, 21, 44, 51, 92, 71], // Hero, Description, Features, Packages, Classes, EndInfo, Footer
    availablePages: ['PACKAGES', 'CLASSES'],
    defaultLocation: 'unirii'
  },
  
  [BUSINESS_TYPES.CLINIC]: {
    name: 'Clinic',
    homeLayout: [11, 61, 22, 81, 31, 71], // Hero, Description, Features, ClinicStats, Gallery, Footer
    availablePages: ['MEDICS', 'TREATMENTS'],
    defaultLocation: 'unirii'
  }
};

// Default locations for all business types
const DEFAULT_LOCATIONS = [
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

// Simple configuration class
class SimplifiedConfig {
  constructor() {
    this.businessType = this.getBusinessTypeFromEnv();
    this.tenantId = this.getTenantIdFromEnv();
    this.locations = this.getLocationsFromEnv();
    this.config = BUSINESS_CONFIGS[this.businessType] || BUSINESS_CONFIGS[BUSINESS_TYPES.HOTEL];
  }

  getBusinessTypeFromEnv() {
    const envType = import.meta.env.VITE_BUSINESS_TYPE;
    if (envType) {
      // Map aliases to main types
      const mappings = {
        'dental': BUSINESS_TYPES.CLINIC,
        'medical': BUSINESS_TYPES.CLINIC,
        'hospital': BUSINESS_TYPES.CLINIC,
        'fitness': BUSINESS_TYPES.GYM,
        'sport': BUSINESS_TYPES.GYM,
        'accommodation': BUSINESS_TYPES.HOTEL,
        'lodging': BUSINESS_TYPES.HOTEL
      };
      return mappings[envType.toLowerCase()] || envType;
    }
    return BUSINESS_TYPES.HOTEL; // Default
  }

  getTenantIdFromEnv() {
    return import.meta.env.VITE_TENANT_ID || 'demo-tenant-123';
  }

  getLocationsFromEnv() {
    const envLocations = import.meta.env.VITE_LOCATIONS;
    if (envLocations) {
      try {
        const parsed = JSON.parse(envLocations.replace(/'/g, '"'));
        return parsed.map((loc, index) => ({
          ...loc,
          isActive: index === 0
        }));
      } catch (error) {
        console.warn('Invalid locations in env, using defaults');
      }
    }
    return DEFAULT_LOCATIONS;
  }

  // Getters
  getType() { return this.businessType; }
  getTenantId() { return this.tenantId; }
  getLocations() { return this.locations; }
  getHomeLayout() { return this.config.homeLayout; }
  getAvailablePages() { return this.config.availablePages; }
  getActiveLocation() { return this.locations.find(loc => loc.isActive); }
  getAllLocations() { return this.locations; }
  hasMultipleLocations() { return this.locations.length > 1; }
  
  isPageActive(page) {
    return this.config.availablePages.includes(page);
  }

  getComponentName(code) {
    return COMPONENTS[code];
  }

  getConfig() {
    return {
      businessType: this.businessType,
      tenantId: this.tenantId,
      locations: this.locations,
      homeLayout: this.config.homeLayout,
      availablePages: this.config.availablePages,
      name: this.config.name
    };
  }
}

// Export singleton instance
const simplifiedConfig = new SimplifiedConfig();

export {
  BUSINESS_TYPES,
  COMPONENTS,
  BUSINESS_CONFIGS,
  DEFAULT_LOCATIONS,
  SimplifiedConfig
};

export default simplifiedConfig; 