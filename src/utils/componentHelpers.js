// Component Helpers
// Utilities for components to easily access their specific data

import { getDemoData, getBusinessType } from '../config/demoMode';
import React from 'react';
import useLocationStore from '../components/LocationSelector/locationStore';

/**
 * Get location-specific data for a component
 * @param {string} componentType - Component type
 * @param {number} locationId - Location ID
 * @returns {Object} Component data
 */
const getComponentData = (componentType, locationId = 1) => {
  const demoData = getDemoData();
  const businessType = getBusinessType();
  
  // Debug logging
  console.log('getComponentData: componentType:', componentType);
  console.log('getComponentData: locationId:', locationId);
  console.log('getComponentData: demoData:', demoData);
  
  // Get location-specific data
  const locationData = demoData?.homeData?.locations?.find(loc => loc.id === locationId);
  
  // Debug logging
  console.log('getComponentData: locationData:', locationData);
  
  if (!locationData) {
    console.log('getComponentData: No location data found for locationId:', locationId);
    return null;
  }
  
  // Return component-specific data based on business type
  switch (componentType) {
    case 'hero':
      return locationData.data?.hero;
    
    case 'description':
      return {
        description: locationData.data?.description,
        coordinates: locationData.data?.coordinates
      };
    
    case 'facilities':
      return locationData.data?.facilities;
    
    case 'attractions':
      return locationData.data?.attractions;
    
    case 'rooms':
      return locationData.data?.rooms;
    
    case 'packages':
      return locationData.data?.packages;
    
    case 'classes':
      return locationData.data?.classes;
    
    case 'gallery':
      return locationData.data?.gallery;
    
    case 'footer':
      return locationData.data?.footer;
    
    case 'clinicStats':
      return locationData.data?.clinicStats;
    
    case 'medics':
      return demoData?.medics;
    
    case 'treatments':
      return demoData?.services?.treatments;
    
    default:
      return null;
  }
};

/**
 * Hook for Hero component data
 * @returns {Object} Hero data
 */
export const useHeroData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('hero', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Description component data
 * @returns {Object} Description data
 */
export const useDescriptionData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  
  // Debug logging
  console.log('useDescriptionData: currentLocationId:', currentLocationId);
  console.log('useDescriptionData: locationId:', locationId);
  
  const data = getComponentData('description', locationId);
  
  // Debug logging
  console.log('useDescriptionData: data:', data);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Facilities component data
 * @returns {Object} Facilities data
 */
export const useFacilitiesData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('facilities', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Attractions component data
 * @returns {Object} Attractions data
 */
export const useAttractionsData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('attractions', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Rooms component data
 * @returns {Object} Rooms data
 */
export const useRoomsData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('rooms', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Services component data
 * @returns {Object} Services data
 */
export const useServicesData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('services', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Packages component data
 * @returns {Object} Packages data
 */
export const usePackagesData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('packages', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Classes component data
 * @returns {Object} Classes data
 */
export const useClassesData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('classes', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Gallery component data
 * @returns {Object} Gallery data
 */
export const useGalleryData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('gallery', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Footer component data
 * @returns {Object} Footer data
 */
export const useFooterData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('footer', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Clinic Stats component data
 * @returns {Object} Clinic stats data
 */
export const useClinicStatsData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('clinicStats', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Medics component data
 * @returns {Object} Medics data
 */
export const useMedicsData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('medics', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for Treatments component data
 * @returns {Object} Treatments data
 */
export const useTreatmentsData = (options = {}) => {
  // Get current location from the store
  const { currentLocationId } = useLocationStore();
  
  // Use provided locationId or current location from store
  const { locationId = currentLocationId } = options;
  const data = getComponentData('treatments', locationId);
  
  return {
    data,
    loading: false,
    error: null
  };
};

/**
 * Hook for business type and available pages
 * @returns {Object} Business type and available pages
 */
export const useBusinessInfo = () => {
  const businessType = getBusinessType();
  const demoData = getDemoData();
  const availablePages = demoData?.homeData?.availablePages || [];
  
  return {
    businessType,
    availablePages
  };
};

/**
 * Hook for location switching functionality
 * @returns {Object} Location switching functions and data
 */
export const useLocationSwitcher = () => {
  // Get state and actions from the store
  const {
    currentLocationId,
    allLocations,
    switchLocation,
    getCurrentLocation,
    initializeLocations,
    hasMultipleLocations
  } = useLocationStore();
  
  // Initialize locations if not already done
  React.useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);
  
  return {
    currentLocationId,
    allLocations,
    currentLocation: getCurrentLocation(),
    switchLocation,
    hasMultipleLocations: hasMultipleLocations()
  };
};

/**
 * Hook for global homepage data
 * @returns {Object} Global homepage data
 */
export const useGlobalData = () => {
  const demoData = getDemoData();
  const businessType = getBusinessType();
  
  return {
    homepageData: demoData?.homeData,
    businessType,
    availablePages: demoData?.homeData?.availablePages || [],
    tenantId: demoData?.homeData?.tenantId
  };
};

/**
 * Utility to check if a component should be rendered based on business type
 * @param {string} componentType - Component type
 * @param {string} businessType - Business type
 * @returns {boolean} Whether component should be rendered
 */
export const shouldRenderComponent = (componentType, businessType) => {
  const businessComponents = {
    dental: ['hero', 'description', 'facilities', 'gallery', 'footer', 'clinicStats', 'medics', 'treatments'],
    gym: ['hero', 'description', 'facilities', 'packages', 'classes', 'footer'],
    hotel: ['hero', 'description', 'attractions', 'facilities', 'rooms', 'footer']
  };
  
  return businessComponents[businessType]?.includes(componentType) || false;
};

/**
 * Utility to get component-specific props based on business type
 * @param {string} componentType - Component type
 * @param {Object} data - Component data
 * @param {string} businessType - Business type
 * @returns {Object} Component props
 */
export const getComponentProps = (componentType, data, businessType) => {
  const baseProps = {
    data,
    businessType
  };

  switch (componentType) {
    case 'hero':
      return {
        ...baseProps,
        coverImage: data?.coverImage,
        logoImage: data?.logoImage,
        businessName: data?.bussinesName,
        businessSlug: data?.bussinesSlug,
        blurAmount: data?.blurAmount,
        tintColor: data?.tintColor
      };
    
    case 'description':
      return {
        ...baseProps,
        description: data?.description,
        coordinates: data?.coordinates
      };
    
    case 'facilities':
      return {
        ...baseProps,
        facilities: data || []
      };
    
    case 'attractions':
      return {
        ...baseProps,
        attractions: data || []
      };
    
    case 'rooms':
      return {
        ...baseProps,
        rooms: data || []
      };
    
    case 'services':
      return {
        ...baseProps,
        services: data || []
      };
    
    case 'packages':
      return {
        ...baseProps,
        packages: data || []
      };
    
    case 'classes':
      return {
        ...baseProps,
        classes: data || []
      };
    
    case 'gallery':
      return {
        ...baseProps,
        gallery: data || []
      };
    
    case 'footer':
      return {
        ...baseProps,
        footer: data || {}
      };
    
    default:
      return baseProps;
  }
};

export default {
  useHeroData,
  useDescriptionData,
  useFacilitiesData,
  useAttractionsData,
  useRoomsData,
  useServicesData,
  usePackagesData,
  useClassesData,
  useGalleryData,
  useFooterData,
  useClinicStatsData,
  useMedicsData,
  useTreatmentsData,
  useBusinessInfo,
  useLocationSwitcher,
  useGlobalData,
  shouldRenderComponent,
  getComponentProps
}; 