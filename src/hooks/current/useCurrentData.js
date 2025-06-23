import { useMemo, useCallback } from 'react';
import { useDataState, executeDataCommand } from '../utils/hookUtils.js';

/**
 * Hook for getting current business data (uses environment configuration)
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoLoad - Whether to automatically load data on mount
 * @returns {Object} Current business data hook state
 */
export const useCurrentBusinessData = (options = {}) => {
    const { autoLoad = true } = options;

    const observerId = useMemo(() => 'current_business_data', []);

    const loadData = useCallback(async () => {
        return executeDataCommand('getCurrentBusinessData', {});
    }, []);

    return useDataState(observerId, loadData, autoLoad);
};

/**
 * Hook for getting current home data (uses environment configuration)
 * @returns {Object} Current home data hook state
 */
export const useCurrentHomeData = () => {
    const observerId = useMemo(() => 'current_home_data', []);

    const loadData = useCallback(async () => {
        return executeDataCommand('getCurrentHomeData', {});
    }, []);

    return useDataState(observerId, loadData, true);
};

/**
 * Hook for getting current settings (uses environment configuration)
 * @returns {Object} Current settings hook state
 */
export const useCurrentSettings = () => {
    const observerId = useMemo(() => 'current_settings', []);

    const loadData = useCallback(async () => {
        return executeDataCommand('getCurrentSettings', {});
    }, []);

    return useDataState(observerId, loadData, true);
};

/**
 * Hook for getting current business configuration (uses environment configuration)
 * @returns {Object} Current business config hook state
 */
export const useCurrentBusinessConfig = () => {
    const observerId = useMemo(() => 'current_business_config', []);

    const loadData = useCallback(async () => {
        return executeDataCommand('getCurrentBusinessConfig', {});
    }, []);

    return useDataState(observerId, loadData, true);
};

/**
 * Hook for getting current data by type (uses environment configuration)
 * @param {string} dataType - The type of data to fetch
 * @returns {Object} Current data by type hook state
 */
export const useCurrentDataByType = (dataType) => {
    const observerId = useMemo(() => `current_datatype_${dataType}`, [dataType]);

    const loadData = useCallback(async () => {
        if (!dataType) return null;
        return executeDataCommand('getCurrentDataByType', { dataType });
    }, [dataType]);

    return useDataState(observerId, loadData, !!dataType, [dataType]);
}; 