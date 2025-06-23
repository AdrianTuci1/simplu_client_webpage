import { useState, useEffect, useMemo, useCallback } from 'react';
import { dataObserver } from '../patterns/DataStateObserver.js';
import { DataCommand, CommandInvoker } from '../patterns/DataCommand.js';
import { 
    getCurrentBusinessType, 
    isBusinessTypeSupported 
} from '../../services/dataService.js';

/**
 * Utility hook for managing data state with observer pattern
 * @param {string} observerId - Unique identifier for the observer
 * @param {Function} loadDataFunction - Function that loads the data
 * @param {boolean} autoLoad - Whether to auto-load data on mount
 * @param {Array} dependencies - Dependencies for the loadDataFunction
 * @returns {Object} Hook state { data, loading, error, refresh }
 */
export const useDataState = (observerId, loadDataFunction, autoLoad = true, dependencies = []) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await loadDataFunction();
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [observerId, loadDataFunction]);

    // Subscribe to data changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    // Auto-load data on mount
    useEffect(() => {
        if (autoLoad) {
            loadData();
        }
    }, [autoLoad, loadData, ...dependencies]);

    const refresh = useCallback(() => {
        loadData();
    }, [loadData]);

    return { data, loading, error, refresh };
};

/**
 * Utility for creating observer IDs
 * @param {string} businessType - Business type
 * @param {string} dataType - Data type
 * @param {string|number} locationId - Location ID
 * @returns {string} Observer ID
 */
export const createObserverId = (businessType, dataType = null, locationId = null) => {
    const parts = [businessType];
    if (dataType) parts.push(dataType);
    if (locationId) parts.push(locationId.toString());
    return parts.join('_');
};

/**
 * Utility for validating business type
 * @param {string} businessType - Business type to validate
 * @returns {boolean} Whether the business type is valid
 */
export const validateBusinessType = (businessType) => {
    return isBusinessTypeSupported(businessType);
};

/**
 * Utility for getting target business type (with fallback to environment)
 * @param {string} businessType - Provided business type
 * @returns {string} Target business type
 */
export const getTargetBusinessType = (businessType = null) => {
    return businessType || getCurrentBusinessType();
};

/**
 * Utility for creating data commands
 * @param {string} operation - Operation type
 * @param {Object} params - Command parameters
 * @returns {DataCommand} Data command instance
 */
export const createDataCommand = (operation, params) => {
    return new DataCommand(operation, params);
};

/**
 * Utility for executing data commands
 * @param {string} operation - Operation type
 * @param {Object} params - Command parameters
 * @returns {*} Command result
 */
export const executeDataCommand = (operation, params) => {
    const command = createDataCommand(operation, params);
    return CommandInvoker.execute(command);
}; 