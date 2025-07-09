import { useState, useEffect } from 'react';
import { getBusinessType, isDemoMode, getServicesData } from '../config/demoMode';

/**
 * Main hook for services data access
 * @param {Object} options - Options for the request
 * @returns {Object} Data, loading state, error state, and utility functions
 */
export const useServicesData = (options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoModeState, setIsDemoModeState] = useState(isDemoMode()); // Use actual demo mode state

  const { locationId = 1, businessType = getBusinessType(), autoLoad = true } = options;

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // getServicesData handles the routing decision (demo vs API)
      const result = await getServicesData({ locationId, businessType });
      setData(result);
      setIsDemoModeState(isDemoMode());
    } catch (err) {
      setError(err.message);
      setIsDemoModeState(false);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    loadData();
  };

  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, [locationId, businessType]);

  return {
    data,
    loading,
    error,
    refresh,
    isDemoMode: isDemoModeState,
    loadData
  };
};

// Business-specific hooks
export const useServices = (options = {}) => {
  return useServicesData(options);
};

export const useTreatments = (options = {}) => {
  const result = useServicesData({ ...options, businessType: 'clinic' });
  return {
    ...result,
    data: result.data?.treatments || []
  };
};

export const usePackages = (options = {}) => {
  const result = useServicesData({ ...options, businessType: 'gym' });
  return {
    ...result,
    data: result.data?.packages || []
  };
};

export const useRooms = (options = {}) => {
  const result = useServicesData({ ...options, businessType: 'hotel' });
  return {
    ...result,
    data: result.data?.rooms || []
  };
};

// Export all hooks
export default {
  useServicesData,
  useServices,
  useTreatments,
  usePackages,
  useRooms
}; 