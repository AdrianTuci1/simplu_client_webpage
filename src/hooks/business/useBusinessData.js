import { useMemo, useCallback } from 'react';
import { useDataState, createObserverId, validateBusinessType, getTargetBusinessType, executeDataCommand } from '../utils/hookUtils.js';

/**
 * Custom hook for accessing business data using design patterns
 * @param {string} businessType - The type of business (hotel, clinic, gym) - optional, uses environment if not provided
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoLoad - Whether to automatically load data on mount
 * @param {string} options.dataType - Specific data type to load
 * @param {number} options.locationId - Specific location ID to load
 * @returns {Object} Hook state and data
 */
export const useBusinessData = (businessType = null, options = {}) => {
    const { 
        autoLoad = true, 
        dataType = null, 
        locationId = null 
    } = options;

    // Use environment business type if not provided
    const targetBusinessType = getTargetBusinessType(businessType);

    // Validate business type
    const isValidBusinessType = useMemo(() => {
        return validateBusinessType(targetBusinessType);
    }, [targetBusinessType]);

    // Create unique observer ID
    const observerId = useMemo(() => {
        return createObserverId(targetBusinessType, dataType, locationId);
    }, [targetBusinessType, dataType, locationId]);

    // Load data function using Command Pattern
    const loadData = useCallback(async () => {
        if (!isValidBusinessType) {
            throw new Error(`Unsupported business type: ${targetBusinessType}`);
        }

        if (dataType) {
            return executeDataCommand('getDataByType', { businessType: targetBusinessType, dataType });
        } else if (locationId) {
            return executeDataCommand('getLocationData', { businessType: targetBusinessType, locationId });
        } else {
            return executeDataCommand('getAllBusinessData', { businessType: targetBusinessType });
        }
    }, [targetBusinessType, dataType, locationId, isValidBusinessType]);

    const { data, loading, error, refresh } = useDataState(
        observerId, 
        loadData, 
        autoLoad && isValidBusinessType, 
        [targetBusinessType, dataType, locationId, isValidBusinessType]
    );

    return {
        data,
        loading,
        error,
        refresh,
        isValidBusinessType,
        businessType: targetBusinessType
    };
}; 