import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchHomepageData, createDataContext, validateHomepageData } from '../utils/homepageDataManager';
import { getBusinessType } from '../config/demoMode';

// Create context
const HomepageDataContext = createContext();

/**
 * Homepage Data Provider Component
 * Fetches homepage data once and provides it to all child components
 */
export const HomepageDataProvider = ({ children, tenantId, locationId }) => {
  const [homepageData, setHomepageData] = useState(null);
  const [dataContext, setDataContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocationId, setCurrentLocationId] = useState(locationId || 1);

  // Fetch homepage data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        tenantId: tenantId || 'demo-tenant',
        locationId: currentLocationId
      };

      const data = await fetchHomepageData(params);
      
      if (!validateHomepageData(data)) {
        throw new Error('Invalid homepage data structure');
      }

      setHomepageData(data);
      
      // Create data context for the current location
      const context = createDataContext(data, currentLocationId, getBusinessType());
      setDataContext(context);
      
    } catch (err) {
      console.error('Error fetching homepage data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Switch location
  const switchLocation = (newLocationId) => {
    if (newLocationId !== currentLocationId) {
      setCurrentLocationId(newLocationId);
    }
  };

  // Fetch data on mount and when location changes
  useEffect(() => {
    fetchData();
  }, [tenantId, currentLocationId]);

  // Update data context when homepage data or location changes
  useEffect(() => {
    if (homepageData) {
      const context = createDataContext(homepageData, currentLocationId, getBusinessType());
      setDataContext(context);
    }
  }, [homepageData, currentLocationId]);

  // Context value
  const contextValue = {
    // Data
    homepageData,
    dataContext,
    loading,
    error,
    
    // Current state
    currentLocationId,
    businessType: getBusinessType(),
    
    // Actions
    switchLocation,
    refresh: fetchData,
    
    // Utility functions
    getComponentData: (componentType) => {
      return dataContext?.getComponentData(componentType);
    },
    getLocationData: () => {
      return dataContext?.locationData;
    },
    getAllLocations: () => {
      return dataContext?.allLocations || [];
    },
    getAvailablePages: () => {
      return dataContext?.availablePages || [];
    }
  };

  return (
    <HomepageDataContext.Provider value={contextValue}>
      {children}
    </HomepageDataContext.Provider>
  );
};

/**
 * Hook to use homepage data context
 * @returns {Object} Homepage data context
 */
export const useHomepageData = () => {
  const context = useContext(HomepageDataContext);
  if (!context) {
    throw new Error('useHomepageData must be used within a HomepageDataProvider');
  }
  return context;
};

/**
 * Hook to get component-specific data
 * @param {string} componentType - Component type
 * @returns {Object} Component data
 */
export const useComponentData = (componentType) => {
  const { dataContext, loading, error } = useHomepageData();
  
  return {
    data: dataContext?.getComponentData(componentType),
    loading,
    error
  };
};

/**
 * Hook to get location data
 * @returns {Object} Location data
 */
export const useLocationData = () => {
  const { dataContext, loading, error } = useHomepageData();
  
  return {
    location: dataContext?.location,
    locationData: dataContext?.locationData,
    loading,
    error
  };
};

export default HomepageDataContext; 