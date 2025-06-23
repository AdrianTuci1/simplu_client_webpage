import { homeDataHotel, roomsData, createBookingHotel, settingsHotel } from '../data/apiDataHotel.js';
import { homeDataClinic, settings as settingsClinic, bookAppointment, cancelAppointment, medics } from '../data/apiDataClinic.js';
import { homeDataGym, availablePackages, acquirePackage, bookClass, settings as settingsGym } from '../data/apiDataGym.js';

/**
 * Data Service using Design Patterns
 * - Factory Pattern: For creating data providers
 * - Strategy Pattern: For different business types
 * - Singleton Pattern: For service instance
 * - Environment-based configuration: VITE_BUSINESS_TYPE and VITE_TENANT_ID
 */

// Business type constants
export const BUSINESS_TYPES = {
    HOTEL: 'hotel',
    CLINIC: 'clinic',
    GYM: 'gym'
};

/**
 * Environment Configuration using Singleton Pattern
 * Parses and validates environment variables
 */
class EnvironmentConfig {
    constructor() {
        this.config = this.parseConfig();
        this.validateConfig();
    }
    
    parseConfig() {
        // Set default values if environment variables don't exist
        const defaultBusinessType = 'clinic'; // Default to clinic
        const defaultTenantId = 1; // Default tenant ID
        
        return {
            businessType: this.parseBusinessType() || defaultBusinessType,
            tenantId: this.parseTenantId() || defaultTenantId
        };
    }
    
    parseBusinessType() {
        // Try to get from environment variable
        const envBusinessType = import.meta.env.VITE_BUSINESS_TYPE;
        
        if (envBusinessType) {
            return envBusinessType.toLowerCase();
        }
        
        // If no environment variable, try to detect from URL or other sources
        console.warn('VITE_BUSINESS_TYPE not found in environment, using default: clinic');
        return null; // Will use default from parseConfig
    }
    
    parseTenantId() {
        // Try to get from environment variable
        const envTenantId = import.meta.env.VITE_TENANT_ID;
        
        if (envTenantId) {
            const parsed = parseInt(envTenantId, 10);
            if (!isNaN(parsed)) {
                return parsed;
            }
        }
        
        // If no environment variable, use default
        console.warn('VITE_TENANT_ID not found in environment, using default: 1');
        return null; // Will use default from parseConfig
    }

    /**
     * Validate the configuration
     * @returns {boolean} True if valid
     */
    validateConfig() {
        const isValidBusinessType = Object.values(BUSINESS_TYPES).includes(this.config.businessType);
        const isValidTenantId = this.config.tenantId > 0;

        if (!isValidBusinessType) {
            console.error(`Invalid business type: ${this.config.businessType}`);
        }

        if (!isValidTenantId) {
            console.error(`Invalid tenant ID: ${this.config.tenantId}`);
        }

        return isValidBusinessType && isValidTenantId;
    }

    /**
     * Get current business type
     * @returns {string} Business type
     */
    getBusinessType() {
        return this.config.businessType;
    }

    /**
     * Get current tenant ID
     * @returns {number} Tenant ID
     */
    getTenantId() {
        return this.config.tenantId;
    }

    /**
     * Get full configuration
     * @returns {Object} Configuration object
     */
    getConfig() {
        return {
            businessType: this.config.businessType,
            tenantId: this.config.tenantId,
            isValid: this.validateConfig()
        };
    }

    /**
     * Check if current business type matches
     * @param {string} businessType - Business type to check
     * @returns {boolean} True if matches
     */
    isBusinessType(businessType) {
        return this.config.businessType === businessType.toLowerCase();
    }
}

// Global environment configuration
const envConfig = new EnvironmentConfig();

/**
 * Strategy Pattern: Base strategy for data providers
 */
class DataProviderStrategy {
    constructor(tenantId) {
        this.tenantId = tenantId;
    }

    getHomeData() {
        throw new Error('getHomeData must be implemented');
    }
    
    getSettings() {
        throw new Error('getSettings must be implemented');
    }
    
    getSpecificData(dataType) {
        throw new Error('getSpecificData must be implemented');
    }
    
    getBookingData() {
        throw new Error('getBookingData must be implemented');
    }

    /**
     * Update tenant ID in data
     * @param {Object} data - Data object
     * @returns {Object} Updated data
     */
    updateTenantId(data) {
        if (data && typeof data === 'object') {
            if (data.tenantId !== undefined) {
                data.tenantId = this.tenantId;
            }
            if (data.headers && data.headers.tenantId !== undefined) {
                data.headers.tenantId = this.tenantId;
            }
        }
        return data;
    }
}

/**
 * Strategy Pattern: Hotel data provider
 */
class HotelDataProvider extends DataProviderStrategy {
    getHomeData() {
        const data = { ...homeDataHotel };
        return this.updateTenantId(data);
    }
    
    getSettings() {
        const data = { ...settingsHotel };
        return this.updateTenantId(data);
    }
    
    getSpecificData(dataType) {
        const homeData = this.getHomeData();
        
        switch (dataType.toLowerCase()) {
            case 'hero':
                return homeData.locationData.hero;
            case 'locations':
                return homeData.locations;
            case 'footer':
                return homeData.locationData.footer;
            case 'facilities':
                return homeData.locationData.facilities;
            case 'attractions':
                return homeData.locationData.attractions;
            case 'rooms':
                return homeData.locationData.rooms;
            case 'roomscalendar':
                return homeData.locationData.roomsCalendar;
            case 'description':
                return {
                    description: homeData.locationData.description,
                    location: homeData.locationData.coordinates,
                    markdownPath: homeData.locationData.description // Treat as path to markdown file
                };
            default:
                throw new Error(`Unsupported data type for hotel: ${dataType}`);
        }
    }
    
    getBookingData() {
        const data = { ...createBookingHotel };
        return this.updateTenantId(data);
    }
    
    getRoomsData() {
        const data = { ...roomsData };
        return this.updateTenantId(data);
    }
}

/**
 * Strategy Pattern: Clinic data provider
 */
class ClinicDataProvider extends DataProviderStrategy {
    getHomeData() {
        const data = { ...homeDataClinic };
        return this.updateTenantId(data);
    }
    
    getSettings() {
        const data = { ...settingsClinic };
        return this.updateTenantId(data);
    }
    
    getSpecificData(dataType) {
        const homeData = this.getHomeData();
        
        switch (dataType.toLowerCase()) {
            case 'hero':
                return homeData.locationData.hero;
            case 'locations':
                return homeData.locations;
            case 'footer':
                return homeData.locationData.footer;
            case 'services':
                return homeData.locationData.services;
            case 'gallery':
                return homeData.locationData.gallery;
            case 'availabilitycalendar':
                return homeData.locationData.availabilityCalendar;
            case 'description':
                return {
                    description: homeData.locationData.description,
                    location: homeData.locationData.coordinates,
                    markdownPath: homeData.locationData.description // Treat as path to markdown file
                };
            default:
                throw new Error(`Unsupported data type for clinic: ${dataType}`);
        }
    }
    
    getBookingData() {
        const data = { ...bookAppointment };
        return this.updateTenantId(data);
    }
    
    getMedicsData() {
        const data = { ...medics };
        return this.updateTenantId(data);
    }
    
    getCancelAppointmentData() {
        const data = { ...cancelAppointment };
        return this.updateTenantId(data);
    }
}

/**
 * Strategy Pattern: Gym data provider
 */
class GymDataProvider extends DataProviderStrategy {
    getHomeData() {
        const data = { ...homeDataGym };
        return this.updateTenantId(data);
    }
    
    getSettings() {
        const data = { ...settingsGym };
        return this.updateTenantId(data);
    }
    
    getSpecificData(dataType) {
        const homeData = this.getHomeData();
        
        switch (dataType.toLowerCase()) {
            case 'hero':
                return homeData.locationData.hero;
            case 'locations':
                return homeData.locations;
            case 'footer':
                return homeData.locationData.footer;
            case 'facilities':
                return homeData.locationData.facilities;
            case 'packages':
                return homeData.locationData.packages;
            case 'classes':
                return homeData.locationData.classes;
            case 'description':
                return {
                    description: homeData.locationData.description,
                    location: homeData.locationData.coordinates,
                    markdownPath: homeData.locationData.description // Treat as path to markdown file
                };
            default:
                throw new Error(`Unsupported data type for gym: ${dataType}`);
        }
    }
    
    getBookingData() {
        const data = { ...bookClass };
        return this.updateTenantId(data);
    }
    
    getAvailablePackages() {
        const data = { ...availablePackages };
        return this.updateTenantId(data);
    }
    
    getAcquirePackageData() {
        const data = { ...acquirePackage };
        return this.updateTenantId(data);
    }
}

/**
 * Factory Pattern: Data provider factory
 */
class DataProviderFactory {
    static createProvider(businessType, tenantId) {
        switch (businessType.toLowerCase()) {
            case BUSINESS_TYPES.HOTEL:
                return new HotelDataProvider(tenantId);
            case BUSINESS_TYPES.CLINIC:
                return new ClinicDataProvider(tenantId);
            case BUSINESS_TYPES.GYM:
                return new GymDataProvider(tenantId);
            default:
                throw new Error(`Unsupported business type: ${businessType}`);
        }
    }
}

/**
 * Singleton Pattern: Main data service
 */
class DataService {
    constructor() {
        if (DataService.instance) {
            return DataService.instance;
        }
        DataService.instance = this;
        this.providers = new Map();
        this.envConfig = envConfig;
    }
    
    /**
     * Get current business type from environment
     * @returns {string} Current business type
     */
    getCurrentBusinessType() {
        return this.envConfig.getBusinessType();
    }

    /**
     * Get current tenant ID from environment
     * @returns {number} Current tenant ID
     */
    getCurrentTenantId() {
        return this.envConfig.getTenantId();
    }

    /**
     * Get environment configuration
     * @returns {Object} Environment config
     */
    getEnvironmentConfig() {
        return this.envConfig.getConfig();
    }

    /**
     * Check if current business type matches
     * @param {string} businessType - Business type to check
     * @returns {boolean} True if matches current business type
     */
    isCurrentBusinessType(businessType) {
        return this.envConfig.isBusinessType(businessType);
    }
    
    /**
     * Get or create a data provider for a business type
     */
    getProvider(businessType = null, tenantId = null) {
        const targetBusinessType = businessType || this.getCurrentBusinessType();
        const targetTenantId = tenantId || this.getCurrentTenantId();
        const key = `${targetBusinessType}_${targetTenantId}`;

        if (!this.providers.has(key)) {
            const provider = DataProviderFactory.createProvider(targetBusinessType, targetTenantId);
            this.providers.set(key, provider);
        }
        return this.providers.get(key);
    }
    
    /**
     * Get home data for current or specified business type
     */
    getHomeData(businessType = null) {
        const provider = this.getProvider(businessType);
        return provider.getHomeData();
    }
    
    /**
     * Get settings for current or specified business type
     */
    getSettings(businessType = null) {
        const provider = this.getProvider(businessType);
        return provider.getSettings();
    }
    
    /**
     * Get specific data by type for current or specified business type
     */
    getDataByType(businessType = null, dataType) {
        const provider = this.getProvider(businessType);
        return provider.getSpecificData(dataType);
    }
    
    /**
     * Get booking data for current or specified business type
     */
    getBookingData(businessType = null) {
        const provider = this.getProvider(businessType);
        return provider.getBookingData();
    }
    
    /**
     * Get business configuration
     */
    getBusinessConfig(businessType = null) {
        const homeData = this.getHomeData(businessType);
        return {
            tenantId: homeData.tenantId,
            businessType: homeData.businessType,
            currentLocation: homeData.currentLocation,
            availablePages: homeData.availablePages
        };
    }
    
    /**
     * Get location data for a specific location
     */
    getLocationData(businessType = null, locationId) {
        const homeData = this.getHomeData(businessType);
        const location = homeData.locations.find(loc => loc.id === locationId);
        
        if (!location) {
            throw new Error(`Location with ID ${locationId} not found`);
        }
        
        return {
            ...location,
            ...homeData.locationData
        };
    }
    
    /**
     * Get all data for current or specified business type
     */
    getAllBusinessData(businessType = null) {
        const provider = this.getProvider(businessType);
        const homeData = provider.getHomeData();
        const settings = provider.getSettings();
        
        const result = {
            homeData,
            settings,
            businessConfig: this.getBusinessConfig(businessType)
        };
        
        // Add business-specific data
        const currentBusinessType = businessType || this.getCurrentBusinessType();
        if (currentBusinessType === BUSINESS_TYPES.HOTEL) {
            result.roomsData = provider.getRoomsData();
        } else if (currentBusinessType === BUSINESS_TYPES.GYM) {
            result.packages = provider.getAvailablePackages();
        } else if (currentBusinessType === BUSINESS_TYPES.CLINIC) {
            result.medics = provider.getMedicsData();
        }
        
        return result;
    }
    
    /**
     * Check if a business type is supported
     */
    isBusinessTypeSupported(businessType) {
        try {
            this.getProvider(businessType);
            return true;
        } catch {
            return false;
        }
    }
    
    /**
     * Get all available business types
     */
    getAvailableBusinessTypes() {
        return Object.values(BUSINESS_TYPES);
    }
    
    /**
     * Clear cached providers (useful for testing)
     */
    clearCache() {
        this.providers.clear();
    }

    /**
     * Get current business data (uses environment configuration)
     */
    getCurrentBusinessData() {
        return this.getAllBusinessData();
    }

    /**
     * Get current business specific data
     */
    getCurrentDataByType(dataType) {
        return this.getDataByType(null, dataType);
    }
}

const dataService = new DataService();
export { dataService };

// Export convenience functions that use the singleton
export const getHomeData = (businessType) => dataService.getHomeData(businessType);
export const getSettings = (businessType) => dataService.getSettings(businessType);
export const getDataByType = (businessType, dataType) => dataService.getDataByType(businessType, dataType);
export const getBookingData = (businessType) => dataService.getBookingData(businessType);
export const getBusinessConfig = (businessType) => dataService.getBusinessConfig(businessType);
export const getLocationData = (businessType, locationId) => dataService.getLocationData(businessType, locationId);
export const getAllBusinessData = (businessType) => dataService.getAllBusinessData(businessType);
export const isBusinessTypeSupported = (businessType) => dataService.isBusinessTypeSupported(businessType);
export const getAvailableBusinessTypes = () => dataService.getAvailableBusinessTypes();

// Export current business functions (no parameters needed)
export const getCurrentBusinessData = () => dataService.getCurrentBusinessData();
export const getCurrentHomeData = () => dataService.getHomeData();
export const getCurrentSettings = () => dataService.getSettings();
export const getCurrentDataByType = (dataType) => dataService.getCurrentDataByType(dataType);
export const getCurrentBusinessConfig = () => dataService.getBusinessConfig();
export const getCurrentTenantId = () => dataService.getCurrentTenantId();
export const getCurrentBusinessType = () => dataService.getCurrentBusinessType();
export const getEnvironmentConfig = () => dataService.getEnvironmentConfig();

// Export all data objects for direct access if needed
export {
    homeDataHotel,
    roomsData,
    createBookingHotel,
    settingsHotel,
    homeDataClinic,
    settingsClinic,
    bookAppointment,
    cancelAppointment,
    medics,
    homeDataGym,
    availablePackages,
    acquirePackage,
    bookClass,
    settingsGym
}; 