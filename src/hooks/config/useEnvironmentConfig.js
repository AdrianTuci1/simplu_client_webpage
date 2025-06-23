import { useState, useEffect } from 'react';
import { getEnvironmentConfig } from '../../services/dataService.js';

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