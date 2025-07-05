import { useState, useEffect, useCallback } from 'react';
import { getHomePage, getServices, getPackages, getLocations } from '../api';
import { homeDataHotel, getLocationDataById as getHotelLocationData } from '../data/apiDataHotel';
import { homeDataClinic } from '../data/apiDataClinic';
import { homeDataGym, getLocationDataById as getGymLocationData } from '../data/apiDataGym';
import { authenticatedUser } from '../data/apiUserData';
import simplifiedConfig from '../config/simplifiedConfig';

/**
 * Simplified Data Hook
 * Automatically chooses between API and local data based on isDemoMode
 * 
 * @param {string} dataType - Type of data to fetch ('home', 'settings', 'hero', 'facilities', etc.)
 * @param {Object} options - Configuration options
 * @param {string} options.businessType - Business type (hotel, clinic, gym)
 * @param {number} options.locationId - Location ID
 * @param {boolean} options.autoLoad - Whether to auto-load data on mount
 * @returns {Object} Hook state { data, loading, error, refresh, isDemoMode }
 */
export const useSimplifiedData = (dataType, options = {}) => {
  const { 
    businessType = null, 
    locationId = null, 
    autoLoad = true 
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check if we're in demo mode (for now, always true)
  useEffect(() => {
    setIsDemoMode(true);
  }, []);

  // Load data function
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result;

      if (isDemoMode) {
        // Use local data from dataService
        console.log(`[DEMO MODE] Loading ${dataType} from local data`);
        result = await loadLocalData(dataType, businessType, locationId);
      } else {
        // Use API data
        console.log(`[API MODE] Loading ${dataType} from API`);
        result = await loadApiData(dataType, businessType, locationId, options.tenantId);
      }

      setData(result);
    } catch (err) {
      console.error(`Error loading ${dataType}:`, err);
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [dataType, businessType, locationId, isDemoMode, options.tenantId]);

  // Load data from local demo data
  const loadLocalData = async (type, business, location) => {
    console.log(`[useSimplifiedData] Loading ${type} for business: ${business}, location: ${location}`);
    
    // Get the appropriate data source based on business type
    let businessData;
    let locationData;
    
    switch (business) {
      case 'hotel':
        businessData = homeDataHotel;
        locationData = location ? getHotelLocationData(location) : businessData.locations[0]?.data;
        break;
      case 'clinic':
        businessData = homeDataClinic;
        locationData = businessData.locations.find(loc => loc.id === location)?.data || businessData.locations[0]?.data;
        break;
      case 'gym':
        businessData = homeDataGym;
        locationData = location ? getGymLocationData(location) : businessData.locations[0]?.data;
        break;
      default:
        // Default to hotel data if no business type specified
        businessData = homeDataHotel;
        locationData = businessData.locations[0]?.data;
    }

    // Return data based on type
    switch (type) {
      case 'home':
        return {
          tenantId: businessData.tenantId,
          businessType: businessData.businessType,
          currentLocation: businessData.currentLocation,
          availablePages: businessData.availablePages,
          locations: businessData.locations
        };
      case 'hero':
        return locationData?.hero || {};
      case 'facilities':
        return locationData?.facilities || [];
      case 'attractions':
        return locationData?.attractions || [];
      case 'rooms':
        return locationData?.rooms || [];
      case 'services':
        return locationData?.services || [];
      case 'packages':
        return locationData?.packages || [];
      case 'classes':
        return locationData?.classes || [];
      case 'gallery':
        return locationData?.gallery || [];
      case 'footer':
        return locationData?.footer || {};
      case 'locations':
        return businessData.locations || [];
      case 'availablePages':
        return businessData.availablePages || [];
      case 'settings':
        return authenticatedUser.settings || {};
      case 'userSettings':
        return authenticatedUser.settings || {};
      case 'userProfile':
        return {
          name: authenticatedUser.name,
          email: authenticatedUser.email,
          phone: authenticatedUser.phone,
          avatar: authenticatedUser.avatar
        };
      case 'userBookings':
        const currentLocationId = location || businessData.currentLocation;
        return authenticatedUser.locationData?.[currentLocationId]?.activeBookings || 
               authenticatedUser.locationData?.[currentLocationId]?.followingAppointment || [];
      case 'description':
        return locationData?.description || '';
      case 'coordinates':
        return locationData?.coordinates || businessData.locations[0]?.coordinates || [];
      default:
        return null;
    }
  };

  // Load data from API
  const loadApiData = async (type, business, location, tenantId) => {
    switch (type) {
      case 'home':
        return await getHomePage({ tenantId, locationId: location });
      case 'services':
        return await getServices(location);
      case 'packages':
        return await getPackages(location);
      case 'hero':
      case 'facilities':
      case 'attractions':
      case 'rooms':
      case 'classes':
      case 'gallery':
      case 'footer':
      case 'locations':
      case 'availablePages':
      case 'settings':
      case 'userSettings':
      case 'userProfile':
      case 'userBookings':
        // For now, return empty data for these types
        return [];
      default:
        throw new Error(`Unknown data type: ${type}`);
    }
  };

  // Auto-load data on mount
  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [autoLoad, loadData]);

  // Refresh function
  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refresh,
    isDemoMode,
    loadData
  };
};

function useDataWithTenantAndLocation(dataType, options = {}) {
  const { tenantId: optTenantId, locationId: optLocationId, businessType: optBusinessType, ...rest } = options;
  const { tenantId: locTenantId, currentLocation, isDemoMode } = useLocations();
  const tenantId = optTenantId || locTenantId;
  const locationId = optLocationId || currentLocation?.id;
  
  // Get business type from business config if not provided
  const businessType = optBusinessType || simplifiedConfig.getType();

  // Nu face request dacă lipsesc tenantId sau locationId (doar în API mode)
  const shouldFetch = isDemoMode || (!!tenantId && !!locationId);
  const hook = useSimplifiedData(dataType, { ...rest, businessType, tenantId, locationId, autoLoad: shouldFetch });

  if (!shouldFetch) {
    return { data: null, loading: true, error: null, refresh: () => {}, isDemoMode: hook.isDemoMode };
  }
  return hook;
}

export const useHomeData = (options = {}) => useDataWithTenantAndLocation('home', options);
export const useRooms = (options = {}) => useDataWithTenantAndLocation('rooms', options);
export const useServices = (options = {}) => useDataWithTenantAndLocation('services', options);
export const usePackages = (options = {}) => useDataWithTenantAndLocation('packages', options);

/**
 * Simplified Hook for Settings Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useSettings = (options = {}) => {
  return useSimplifiedData('settings', options);
};

/**
 * Simplified Hook for User Settings
 * @returns {Object} Hook state
 */
export const useUserSettings = () => {
  return useSimplifiedData('userSettings');
};

/**
 * Simplified Hook for User Profile
 * @returns {Object} Hook state
 */
export const useUserProfile = () => {
  return useSimplifiedData('userProfile');
};

/**
 * Simplified Hook for User Bookings
 * @returns {Object} Hook state
 */
export const useUserBookings = () => {
  return useSimplifiedData('userBookings');
};

/**
 * Simplified Hook for Hero Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useHeroData = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('hero', { ...options, businessType });
};

/**
 * Simplified Hook for Facilities Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useFacilities = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('facilities', { ...options, businessType });
};

/**
 * Simplified Hook for Attractions Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useAttractions = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('attractions', { ...options, businessType });
};

/**
 * Simplified Hook for Classes Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useClasses = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('classes', { ...options, businessType });
};

/**
 * Simplified Hook for Gallery Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useGallery = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('gallery', { ...options, businessType });
};

/**
 * Simplified Hook for Footer Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useFooter = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('footer', { ...options, businessType });
};

// TenantId helper
const getStoredTenantId = () => localStorage.getItem('tenantId');
const setStoredTenantId = (tenantId) => localStorage.setItem('tenantId', tenantId);

// Location helpers
const getStoredLocations = () => {
  try {
    return JSON.parse(localStorage.getItem('locations')) || [];
  } catch {
    return [];
  }
};
const setStoredLocations = (locations) => localStorage.setItem('locations', JSON.stringify(locations));
const getStoredCurrentLocation = () => {
  try {
    return JSON.parse(localStorage.getItem('currentLocation')) || null;
  } catch {
    return null;
  }
};
const setStoredCurrentLocation = (location) => localStorage.setItem('currentLocation', JSON.stringify(location));

export const useLocations = (options = {}) => {
  const [tenantId, setTenantId] = useState(() => getStoredTenantId());
  const [locations, setLocations] = useState(() => getStoredLocations());
  const [currentLocation, setCurrentLocation] = useState(() => getStoredCurrentLocation());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(true); // Always demo mode for now
  
  // Get business type from business config
  const businessType = simplifiedConfig.getType();
  console.log(`[useLocations] Using business type: ${businessType}`);

  // Set tenantId (ex: după login)
  const updateTenantId = useCallback((newTenantId) => {
    setTenantId(newTenantId);
    setStoredTenantId(newTenantId);
  }, []);

  // Fetch locations by tenantId
  const fetchLocations = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      if (!force && locations.length > 0) return;
      
      // In demo mode, use local data
      let data;
      if (isDemoMode) {
        // Use business config to get locations
        data = simplifiedConfig.getLocations();
      } else {
        // Use API data
        if (!tenantId) return;
        data = await getLocations({ tenantId });
      }
      
      setLocations(data);
      setStoredLocations(data);
      if (!currentLocation && data.length > 0) {
        setCurrentLocation(data[0]);
        setStoredCurrentLocation(data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tenantId, locations.length, currentLocation, isDemoMode, businessType]);

  // Switch location
  const switchLocation = useCallback((locationId) => {
    const loc = locations.find(l => l.id === locationId);
    if (loc) {
      setCurrentLocation(loc);
      setStoredCurrentLocation(loc);
    }
  }, [locations]);

  // Initialize locations (auto-load)
  useEffect(() => {
    if (options.autoLoad !== false && (tenantId || isDemoMode)) {
      fetchLocations();
    }
  }, [tenantId, options.autoLoad, fetchLocations, isDemoMode]);

  // Expose info
  const getLocationInfo = useCallback(() => {
    return {
      currentLocation,
      allLocations: locations,
      isMultiLocation: locations.length > 1
    };
  }, [currentLocation, locations]);

  return {
    data: locations,
    currentLocation,
    allLocations: locations,
    loading,
    error,
    tenantId,
    isDemoMode,
    setTenantId: updateTenantId,
    switchLocation,
    initializeLocations: fetchLocations,
    getLocationInfo,
    refresh: () => fetchLocations(true)
  };
};

/**
 * Simplified Hook for Available Pages
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useAvailablePages = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('availablePages', { ...options, businessType });
};

/**
 * Simplified Hook for Description Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useDescription = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('description', { ...options, businessType });
};

/**
 * Simplified Hook for Coordinates Data
 * @param {Object} options - Configuration options
 * @returns {Object} Hook state
 */
export const useCoordinates = (options = {}) => {
  const businessType = options.businessType || simplifiedConfig.getType();
  return useSimplifiedData('coordinates', { ...options, businessType });
}; 