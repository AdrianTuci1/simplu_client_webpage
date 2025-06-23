import { useMemo, useCallback } from 'react';
import { useDataState, getTargetBusinessType, executeDataCommand } from '../utils/hookUtils.js';

/**
 * Hook for getting home data specifically
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Home data hook state
 */
export const useHomeData = (businessType = null) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `home_${targetBusinessType}`, [targetBusinessType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType) return null;
        return executeDataCommand('getHomeData', { businessType: targetBusinessType });
    }, [targetBusinessType]);

    return useDataState(observerId, loadData, !!targetBusinessType, [targetBusinessType]);
};

/**
 * Hook for getting settings data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Settings data hook state
 */
export const useSettings = (businessType = null) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `settings_${targetBusinessType}`, [targetBusinessType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType) return null;
        return executeDataCommand('getSettings', { businessType: targetBusinessType });
    }, [targetBusinessType]);

    return useDataState(observerId, loadData, !!targetBusinessType, [targetBusinessType]);
};

/**
 * Hook for getting business configuration
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Business config hook state
 */
export const useBusinessConfig = (businessType = null) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `config_${targetBusinessType}`, [targetBusinessType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType) return null;
        return executeDataCommand('getBusinessConfig', { businessType: targetBusinessType });
    }, [targetBusinessType]);

    return useDataState(observerId, loadData, !!targetBusinessType, [targetBusinessType]);
};

/**
 * Hook for getting specific data type
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @param {string} dataType - The type of data to fetch
 * @returns {Object} Specific data hook state
 */
export const useDataByType = (businessType = null, dataType) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `datatype_${targetBusinessType}_${dataType}`, [targetBusinessType, dataType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType || !dataType) return null;
        return executeDataCommand('getDataByType', { businessType: targetBusinessType, dataType });
    }, [targetBusinessType, dataType]);

    return useDataState(observerId, loadData, !!(targetBusinessType && dataType), [targetBusinessType, dataType]);
};

/**
 * Hook for getting location data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @param {number} locationId - The location ID
 * @returns {Object} Location data hook state
 */
export const useLocationData = (businessType = null, locationId) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `location_${targetBusinessType}_${locationId}`, [targetBusinessType, locationId]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType || !locationId) return null;
        return executeDataCommand('getLocationData', { businessType: targetBusinessType, locationId });
    }, [targetBusinessType, locationId]);

    return useDataState(observerId, loadData, !!(targetBusinessType && locationId), [targetBusinessType, locationId]);
}; 