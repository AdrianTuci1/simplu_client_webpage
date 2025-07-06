// Component Helpers
// Utilities for components to easily access their specific data

import { useComponentData, useLocationData, useHomepageData } from '../contexts/HomepageDataContext';

/**
 * Hook for Hero component data
 * @returns {Object} Hero data and loading state
 */
export const useHeroData = () => {
  return useComponentData('hero');
};

/**
 * Hook for Description component data
 * @returns {Object} Description data and loading state
 */
export const useDescriptionData = () => {
  return useComponentData('description');
};

/**
 * Hook for Facilities component data
 * @returns {Object} Facilities data and loading state
 */
export const useFacilitiesData = () => {
  return useComponentData('facilities');
};

/**
 * Hook for Attractions component data
 * @returns {Object} Attractions data and loading state
 */
export const useAttractionsData = () => {
  return useComponentData('attractions');
};

/**
 * Hook for Rooms component data
 * @returns {Object} Rooms data and loading state
 */
export const useRoomsData = () => {
  return useComponentData('rooms');
};

/**
 * Hook for Services component data
 * @returns {Object} Services data and loading state
 */
export const useServicesData = () => {
  return useComponentData('services');
};

/**
 * Hook for Packages component data
 * @returns {Object} Packages data and loading state
 */
export const usePackagesData = () => {
  return useComponentData('packages');
};

/**
 * Hook for Classes component data
 * @returns {Object} Classes data and loading state
 */
export const useClassesData = () => {
  return useComponentData('classes');
};

/**
 * Hook for Gallery component data
 * @returns {Object} Gallery data and loading state
 */
export const useGalleryData = () => {
  return useComponentData('gallery');
};

/**
 * Hook for Footer component data
 * @returns {Object} Footer data and loading state
 */
export const useFooterData = () => {
  return useComponentData('footer');
};

/**
 * Hook for Clinic Stats component data
 * @returns {Object} Clinic stats data and loading state
 */
export const useClinicStatsData = () => {
  return useComponentData('clinicStats');
};

/**
 * Hook for Medics component data
 * @returns {Object} Medics data and loading state
 */
export const useMedicsData = () => {
  return useComponentData('medics');
};

/**
 * Hook for Treatments component data
 * @returns {Object} Treatments data and loading state
 */
export const useTreatmentsData = () => {
  return useComponentData('treatments');
};

/**
 * Hook for business type and available pages
 * @returns {Object} Business type and available pages
 */
export const useBusinessInfo = () => {
  const { businessType, getAvailablePages } = useHomepageData();
  
  return {
    businessType,
    availablePages: getAvailablePages()
  };
};

/**
 * Hook for location switching functionality
 * @returns {Object} Location switching functions and data
 */
export const useLocationSwitcher = () => {
  const { 
    currentLocationId, 
    switchLocation, 
    getAllLocations,
    dataContext 
  } = useHomepageData();
  
  return {
    currentLocationId,
    switchLocation,
    allLocations: getAllLocations(),
    currentLocation: dataContext?.location
  };
};

/**
 * Hook for global homepage data
 * @returns {Object} Global homepage data
 */
export const useGlobalData = () => {
  const { 
    homepageData, 
    dataContext, 
    loading, 
    error,
    refresh 
  } = useHomepageData();
  
  return {
    homepageData,
    dataContext,
    loading,
    error,
    refresh,
    tenantId: dataContext?.tenantId,
    businessType: dataContext?.businessType,
    availablePages: dataContext?.availablePages
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