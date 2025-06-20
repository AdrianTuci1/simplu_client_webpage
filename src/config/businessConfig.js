// Import component codes
import { COMPONENT_CODES } from './componentCodes';
import dataService, { BUSINESS_TYPES } from '../services/dataService.js';

/**
 * Business Configuration using Design Patterns
 * - Strategy Pattern: Different business types have different configurations
 * - Factory Pattern: Configuration objects are created by factory
 * - Singleton Pattern: Single configuration instance
 * - Environment Configuration: Uses VITE_BUSINESS_TYPE and VITE_TENANT_ID
 */

// Business types (using the ones from dataService for consistency)
export { BUSINESS_TYPES };

// Strategy Pattern: Base configuration strategy
class BusinessConfigStrategy {
  getAvailablePages() {
    throw new Error('getAvailablePages must be implemented');
  }
  
  getComponentCodes() {
    throw new Error('getComponentCodes must be implemented');
  }
  
  getDefaultLayout() {
    throw new Error('getDefaultLayout must be implemented');
  }
}

// Strategy Pattern: Hotel configuration
class HotelConfigStrategy extends BusinessConfigStrategy {
  getAvailablePages() {
    return ['ROOMS', 'FACILITIES'];
  }
  
  getComponentCodes() {
    return [11, 61, 111, 21, 101, 92, 71];
  }
  
  getDefaultLayout() {
    return [11, 61, 111, 21, 101, 92, 71];
  }
}

// Strategy Pattern: Gym configuration
class GymConfigStrategy extends BusinessConfigStrategy {
  getAvailablePages() {
    return ['PACKAGES', 'CLASSES'];
  }
  
  getComponentCodes() {
    return [11, 61, 21, 51, 92, 71];
  }
  
  getDefaultLayout() {
    return [11, 61, 21, 51, 92, 71];
  }
}

// Strategy Pattern: Clinic configuration
class ClinicConfigStrategy extends BusinessConfigStrategy {
  getAvailablePages() {
    return ['MEDICS', 'TREATMENTS'];
  }
  
  getComponentCodes() {
    return [11, 61, 22, 81, 31, 92, 71];
  }
  
  getDefaultLayout() {
    return [11, 61, 22, 81, 31, 92, 71];
  }
}

// Factory Pattern: Configuration factory
class BusinessConfigFactory {
  static createStrategy(businessType) {
    switch (businessType.toUpperCase()) {
      case BUSINESS_TYPES.HOTEL:
        return new HotelConfigStrategy();
      case BUSINESS_TYPES.GYM:
        return new GymConfigStrategy();
      case BUSINESS_TYPES.CLINIC:
        return new ClinicConfigStrategy();
      default:
        console.warn(`Unknown business type: ${businessType}. Using hotel as fallback.`);
        return new HotelConfigStrategy();
    }
  }
}

/**
 * Environment Configuration Parser
 * Uses the same environment configuration as dataService
 */
class EnvironmentParser {
  static parseArray(envString, fallbackValue) {
    if (!envString) {
      return fallbackValue;
    }
    try {
      return JSON.parse(envString.replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing environment array:', error);
      return fallbackValue;
    }
  }
  
  static parseLocations(envString) {
    if (!envString) {
      return this.getDefaultLocations();
    }
    
    try {
      const parsedArray = JSON.parse(envString.replace(/'/g, '"'));
      
      // Validate locations structure
      const validLocations = parsedArray.filter(location => 
        location.id && location.name && location.slug && location.address
      );
      
      if (validLocations.length === 0) {
        console.warn('No valid locations found in VITE_LOCATIONS. Using default locations.');
        return this.getDefaultLocations();
      }
      
      // Always set the first location as active
      validLocations.forEach((location, index) => {
        location.isActive = index === 0;
      });
      
      console.log(`Initialized ${validLocations.length} locations. Active location: ${validLocations[0].name}`);
      
      return validLocations;
    } catch (error) {
      console.error('Error parsing locations array:', error);
      return this.getDefaultLocations();
    }
  }
  
  static getDefaultLocations() {
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
}

/**
 * Singleton Pattern: Main business configuration
 */
class BusinessConfiguration {
  constructor() {
    if (BusinessConfiguration.instance) {
      return BusinessConfiguration.instance;
    }
    BusinessConfiguration.instance = this;
    
    this.initialize();
  }
  
  initialize() {
    // Get current business type from dataService
    this.businessType = dataService.getCurrentBusinessType();
    this.tenantId = dataService.getCurrentTenantId();
    
    // Create strategy for current business type
    this.strategy = BusinessConfigFactory.createStrategy(this.businessType);
    
    // Parse environment variables
    this.activePages = EnvironmentParser.parseArray(
      import.meta.env.VITE_ACTIVE_PAGES,
      this.strategy.getAvailablePages()
    );
    
    this.homeLayout = EnvironmentParser.parseArray(
      import.meta.env.VITE_HOME_LAYOUT,
      this.strategy.getDefaultLayout()
    );
    
    this.locations = EnvironmentParser.parseLocations(
      import.meta.env.VITE_LOCATIONS
    );
    
    // Validate configuration
    this.validate();
  }
  
  validate() {
    // Validate business type
    if (!Object.values(BUSINESS_TYPES).includes(this.businessType)) {
      console.error(`Invalid business type: ${this.businessType}`);
      return false;
    }
    
    // Validate active pages
    const validPages = this.strategy.getAvailablePages();
    const invalidPages = this.activePages.filter(page => !validPages.includes(page));
    
    if (invalidPages.length > 0) {
      console.error(`Invalid pages for ${this.businessType}: ${invalidPages.join(', ')}`);
      return false;
    }
    
    // Validate layout
    const validCodes = Object.keys(COMPONENT_CODES).map(Number);
    const invalidCodes = this.homeLayout.filter(code => !validCodes.includes(code) && code !== 0);
    
    if (invalidCodes.length > 0) {
      console.warn(`Invalid component codes in layout: ${invalidCodes.join(', ')}. Using fallback layout.`);
      this.homeLayout = this.strategy.getDefaultLayout();
    }
    
    return true;
  }
  
  // Getters
  getType() {
    return this.businessType;
  }
  
  getTenantId() {
    return this.tenantId;
  }
  
  getActivePages() {
    return this.activePages;
  }
  
  getHomeLayout() {
    return this.homeLayout;
  }
  
  getLocations() {
    return this.locations;
  }
  
  getAvailablePages() {
    return this.strategy.getAvailablePages();
  }
  
  getComponentCodes() {
    return this.strategy.getComponentCodes();
  }
  
  getDefaultLayout() {
    return this.strategy.getDefaultLayout();
  }
  
  // Page validation
  isPageActive(page) {
    const validPages = this.strategy.getAvailablePages();
    if (!validPages.includes(page)) {
      return false;
    }
    return this.activePages.includes(page);
  }
  
  // Layout helpers
  getLayoutComponents() {
    return this.homeLayout.map(code => ({
      code,
      component: COMPONENT_CODES[code],
      isValid: code === 0 || !!COMPONENT_CODES[code]
    }));
  }
  
  getLayoutInfo() {
    return {
      layout: this.homeLayout,
      totalSections: this.homeLayout.length,
      activeSections: this.homeLayout.filter(code => code !== 0).length,
      businessType: this.businessType,
      isValid: this.validateLayout()
    };
  }
  
  validateLayout() {
    const validCodes = Object.keys(COMPONENT_CODES).map(Number);
    const invalidCodes = this.homeLayout.filter(code => !validCodes.includes(code) && code !== 0);
    return invalidCodes.length === 0;
  }
  
  // Location helpers
  getCurrentLocation() {
    return this.locations[0] || null;
  }
  
  getInitialLocation() {
    return this.locations[0] || null;
  }
  
  getActiveLocation() {
    return this.locations[0] || null;
  }
  
  getLocationBySlug(slug) {
    return this.locations.find(loc => loc.slug === slug);
  }
  
  getLocationById(id) {
    return this.locations.find(loc => loc.id === id);
  }
  
  getAllLocations() {
    return this.locations;
  }
  
  getLocationCount() {
    return this.locations.length;
  }
  
  hasMultipleLocations() {
    return this.locations.length > 1;
  }
  
  // Component helpers
  getComponentInfo(number) {
    if (number === 0) return null;
    return COMPONENT_CODES[number] || null;
  }
  
  getBusinessComponentInfo(number) {
    if (number === 0) return null;
    
    const componentInfo = COMPONENT_CODES[number];
    if (!componentInfo) return null;
    
    const businessCodes = this.strategy.getComponentCodes();
    if (businessCodes.includes(number)) {
      return componentInfo;
    }
    
    return null;
  }
  
  // Configuration info
  getConfig() {
    return {
      type: this.businessType,
      tenantId: this.tenantId,
      activePages: this.activePages,
      homeLayout: this.homeLayout,
      locations: this.locations,
      availablePages: this.getAvailablePages(),
      componentCodes: this.getComponentCodes(),
      isValid: this.validate()
    };
  }
  
  // Refresh configuration (useful for testing)
  refresh() {
    this.initialize();
  }
}

// Create singleton instance
const businessConfigInstance = new BusinessConfiguration();

// Export the singleton instance
export default businessConfigInstance;

// Export convenience functions
export const getBusinessType = () => businessConfigInstance.getType();
export const getTenantId = () => businessConfigInstance.getTenantId();
export const getActivePages = () => businessConfigInstance.getActivePages();
export const getHomeLayout = () => businessConfigInstance.getHomeLayout();
export const getLocations = () => businessConfigInstance.getLocations();
export const getAvailablePages = () => businessConfigInstance.getAvailablePages();
export const getComponentCodes = () => businessConfigInstance.getComponentCodes();
export const getDefaultLayout = () => businessConfigInstance.getDefaultLayout();
export const isPageActive = (page) => businessConfigInstance.isPageActive(page);
export const getLayoutComponents = () => businessConfigInstance.getLayoutComponents();
export const getLayoutInfo = () => businessConfigInstance.getLayoutInfo();
export const validateLayout = () => businessConfigInstance.validateLayout();
export const getCurrentLocation = () => businessConfigInstance.getCurrentLocation();
export const getInitialLocation = () => businessConfigInstance.getInitialLocation();
export const getActiveLocation = () => businessConfigInstance.getActiveLocation();
export const getLocationBySlug = (slug) => businessConfigInstance.getLocationBySlug(slug);
export const getLocationById = (id) => businessConfigInstance.getLocationById(id);
export const getAllLocations = () => businessConfigInstance.getAllLocations();
export const getLocationCount = () => businessConfigInstance.getLocationCount();
export const hasMultipleLocations = () => businessConfigInstance.hasMultipleLocations();
export const getComponentInfo = (number) => businessConfigInstance.getComponentInfo(number);
export const getBusinessComponentInfo = (number) => businessConfigInstance.getBusinessComponentInfo(number);
export const getConfig = () => businessConfigInstance.getConfig();
export const validateConfig = () => businessConfigInstance.validate();

// Legacy exports for backward compatibility
export const businessConfig = businessConfigInstance.getConfig(); 