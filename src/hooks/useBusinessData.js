import { useState, useEffect, useMemo, useCallback } from 'react';
import dataService, { 
    getHomeData, 
    getDataByType, 
    getSettings, 
    getBusinessConfig,
    getLocationData,
    getAllBusinessData,
    getCurrentBusinessData,
    getCurrentHomeData,
    getCurrentSettings,
    getCurrentDataByType,
    getCurrentBusinessConfig,
    getCurrentTenantId,
    getCurrentBusinessType,
    getEnvironmentConfig,
    BUSINESS_TYPES,
    isBusinessTypeSupported
} from '../services/dataService.js';

/**
 * Observer Pattern: Data state observer
 */
class DataStateObserver {
    constructor() {
        this.observers = new Map();
    }
    
    subscribe(id, callback) {
        if (!this.observers.has(id)) {
            this.observers.set(id, new Set());
        }
        this.observers.get(id).add(callback);
        
        return () => {
            const callbacks = this.observers.get(id);
            if (callbacks) {
                callbacks.delete(callback);
                if (callbacks.size === 0) {
                    this.observers.delete(id);
                }
            }
        };
    }
    
    notify(id, data) {
        const callbacks = this.observers.get(id);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}

// Global observer instance
const dataObserver = new DataStateObserver();

/**
 * Command Pattern: Data operation commands
 */
class DataCommand {
    constructor(operation, params) {
        this.operation = operation;
        this.params = params;
    }
    
    execute() {
        switch (this.operation) {
            case 'getHomeData':
                return getHomeData(this.params.businessType);
            case 'getDataByType':
                return getDataByType(this.params.businessType, this.params.dataType);
            case 'getSettings':
                return getSettings(this.params.businessType);
            case 'getBusinessConfig':
                return getBusinessConfig(this.params.businessType);
            case 'getLocationData':
                return getLocationData(this.params.businessType, this.params.locationId);
            case 'getAllBusinessData':
                return getAllBusinessData(this.params.businessType);
            case 'getCurrentBusinessData':
                return getCurrentBusinessData();
            case 'getCurrentHomeData':
                return getCurrentHomeData();
            case 'getCurrentSettings':
                return getCurrentSettings();
            case 'getCurrentDataByType':
                return getCurrentDataByType(this.params.dataType);
            case 'getCurrentBusinessConfig':
                return getCurrentBusinessConfig();
            case 'getAttractions':
                return getDataByType(this.params.businessType || 'hotel', 'attractions');
            case 'getFacilities':
                return getDataByType(this.params.businessType || 'hotel', 'facilities');
            case 'getServices':
                return getDataByType(this.params.businessType || 'clinic', 'services');
            case 'getRooms':
                return getDataByType(this.params.businessType || 'hotel', 'rooms');
            default:
                throw new Error(`Unknown operation: ${this.operation}`);
        }
    }
}

/**
 * Command Pattern: Command invoker
 */
class CommandInvoker {
    static execute(command) {
        return command.execute();
    }
}

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

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Use environment business type if not provided
    const targetBusinessType = businessType || getCurrentBusinessType();

    // Validate business type
    const isValidBusinessType = useMemo(() => {
        return isBusinessTypeSupported(targetBusinessType);
    }, [targetBusinessType]);

    // Create unique observer ID
    const observerId = useMemo(() => {
        return `${targetBusinessType}_${dataType || 'all'}_${locationId || 'default'}`;
    }, [targetBusinessType, dataType, locationId]);

    // Load data function using Command Pattern
    const loadData = useCallback(async () => {
        if (!isValidBusinessType) {
            setError(new Error(`Unsupported business type: ${targetBusinessType}`));
            return;
        }

        setLoading(true);
        setError(null);

        try {
            let command;
            
            if (dataType) {
                command = new DataCommand('getDataByType', { businessType: targetBusinessType, dataType });
            } else if (locationId) {
                command = new DataCommand('getLocationData', { businessType: targetBusinessType, locationId });
            } else {
                command = new DataCommand('getAllBusinessData', { businessType: targetBusinessType });
            }

            const result = CommandInvoker.execute(command);
            setData(result);
            
            // Notify observers
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, dataType, locationId, isValidBusinessType, observerId]);

    // Subscribe to data changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    // Auto-load data on mount
    useEffect(() => {
        if (autoLoad && isValidBusinessType) {
            loadData();
        }
    }, [autoLoad, isValidBusinessType, loadData]);

    // Refresh data function
    const refresh = useCallback(() => {
        loadData();
    }, [loadData]);

    return {
        data,
        loading,
        error,
        refresh,
        isValidBusinessType,
        businessType: targetBusinessType
    };
};

/**
 * Hook for getting current business data (uses environment configuration)
 * @returns {Object} Current business data hook state
 */
export const useCurrentBusinessData = (options = {}) => {
    const { autoLoad = true } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const observerId = useMemo(() => 'current_business_data', []);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getCurrentBusinessData', {});
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [observerId]);

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
    }, [autoLoad, loadData]);

    const refresh = useCallback(() => {
        loadData();
    }, [loadData]);

    return {
        data,
        loading,
        error,
        refresh
    };
};

/**
 * Hook for getting current home data (uses environment configuration)
 * @returns {Object} Current home data hook state
 */
export const useCurrentHomeData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const observerId = useMemo(() => 'current_home_data', []);

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getCurrentHomeData', {});
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting current settings (uses environment configuration)
 * @returns {Object} Current settings hook state
 */
export const useCurrentSettings = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const observerId = useMemo(() => 'current_settings', []);

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getCurrentSettings', {});
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting current business configuration (uses environment configuration)
 * @returns {Object} Current business config hook state
 */
export const useCurrentBusinessConfig = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const observerId = useMemo(() => 'current_business_config', []);

    useEffect(() => {
        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getCurrentBusinessConfig', {});
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting current data by type (uses environment configuration)
 * @param {string} dataType - The type of data to fetch
 * @returns {Object} Current data by type hook state
 */
export const useCurrentDataByType = (dataType) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const observerId = useMemo(() => `current_datatype_${dataType}`, [dataType]);

    useEffect(() => {
        if (!dataType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getCurrentDataByType', { dataType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [dataType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting home data specifically
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Home data hook state
 */
export const useHomeData = (businessType = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `home_${targetBusinessType}`, [targetBusinessType]);

    useEffect(() => {
        if (!targetBusinessType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getHomeData', { businessType: targetBusinessType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting settings data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Settings data hook state
 */
export const useSettings = (businessType = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `settings_${targetBusinessType}`, [targetBusinessType]);

    useEffect(() => {
        if (!targetBusinessType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getSettings', { businessType: targetBusinessType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting business configuration
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Business config hook state
 */
export const useBusinessConfig = (businessType = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `config_${targetBusinessType}`, [targetBusinessType]);

    useEffect(() => {
        if (!targetBusinessType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getBusinessConfig', { businessType: targetBusinessType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting specific data type
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @param {string} dataType - The type of data to fetch
 * @returns {Object} Specific data hook state
 */
export const useDataByType = (businessType = null, dataType) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `datatype_${targetBusinessType}_${dataType}`, [targetBusinessType, dataType]);

    useEffect(() => {
        if (!targetBusinessType || !dataType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getDataByType', { businessType: targetBusinessType, dataType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, dataType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting location data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @param {number} locationId - The location ID
 * @returns {Object} Location data hook state
 */
export const useLocationData = (businessType = null, locationId) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `location_${targetBusinessType}_${locationId}`, [targetBusinessType, locationId]);

    useEffect(() => {
        if (!targetBusinessType || !locationId) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getLocationData', { businessType: targetBusinessType, locationId });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, locationId, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting environment configuration
 * @returns {Object} Environment configuration
 */
export const useEnvironmentConfig = () => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        const envConfig = getEnvironmentConfig();
        setConfig(envConfig);
    }, []);

    return config;
};

/**
 * Hook for getting attractions data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Attractions data hook state
 */
export const useAttractions = (businessType = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `attractions_${targetBusinessType}`, [targetBusinessType]);

    useEffect(() => {
        if (!targetBusinessType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getAttractions', { businessType: targetBusinessType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting facilities data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Facilities data hook state
 */
export const useFacilities = (businessType = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `facilities_${targetBusinessType}`, [targetBusinessType]);

    useEffect(() => {
        if (!targetBusinessType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getFacilities', { businessType: targetBusinessType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting services data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Services data hook state
 */
export const useServices = (businessType = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `services_${targetBusinessType}`, [targetBusinessType]);

    useEffect(() => {
        if (!targetBusinessType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getServices', { businessType: targetBusinessType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

/**
 * Hook for getting rooms data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Rooms data hook state
 */
export const useRooms = (businessType = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const targetBusinessType = businessType || getCurrentBusinessType();
    const observerId = useMemo(() => `rooms_${targetBusinessType}`, [targetBusinessType]);

    useEffect(() => {
        if (!targetBusinessType) return;

        setLoading(true);
        setError(null);

        try {
            const command = new DataCommand('getRooms', { businessType: targetBusinessType });
            const result = CommandInvoker.execute(command);
            setData(result);
            dataObserver.notify(observerId, result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [targetBusinessType, observerId]);

    // Subscribe to changes
    useEffect(() => {
        const unsubscribe = dataObserver.subscribe(observerId, (newData) => {
            setData(newData);
        });

        return unsubscribe;
    }, [observerId]);

    return { data, loading, error };
};

// Export business types for convenience
export { BUSINESS_TYPES };

// Export the data service instance for direct access
export { dataService };

// Export environment functions
export {
    getCurrentBusinessData,
    getCurrentHomeData,
    getCurrentSettings,
    getCurrentDataByType,
    getCurrentBusinessConfig,
    getCurrentTenantId,
    getCurrentBusinessType,
    getEnvironmentConfig
}; 