import { useMemo, useCallback } from 'react';
import { useDataState, getTargetBusinessType, executeDataCommand } from '../utils/hookUtils.js';

/**
 * Hook for getting attractions data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Attractions data hook state
 */
export const useAttractions = (businessType = null) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `attractions_${targetBusinessType}`, [targetBusinessType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType) return null;
        return executeDataCommand('getAttractions', { businessType: targetBusinessType });
    }, [targetBusinessType]);

    return useDataState(observerId, loadData, !!targetBusinessType, [targetBusinessType]);
};

/**
 * Hook for getting facilities data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Facilities data hook state
 */
export const useFacilities = (businessType = null) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `facilities_${targetBusinessType}`, [targetBusinessType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType) return null;
        return executeDataCommand('getFacilities', { businessType: targetBusinessType });
    }, [targetBusinessType]);

    return useDataState(observerId, loadData, !!targetBusinessType, [targetBusinessType]);
};

/**
 * Hook for getting services data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Services data hook state
 */
export const useServices = (businessType = null) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `services_${targetBusinessType}`, [targetBusinessType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType) return null;
        return executeDataCommand('getServices', { businessType: targetBusinessType });
    }, [targetBusinessType]);

    return useDataState(observerId, loadData, !!targetBusinessType, [targetBusinessType]);
};

/**
 * Hook for getting rooms data
 * @param {string} businessType - The type of business (optional, uses environment if not provided)
 * @returns {Object} Rooms data hook state
 */
export const useRooms = (businessType = null) => {
    const targetBusinessType = getTargetBusinessType(businessType);
    const observerId = useMemo(() => `rooms_${targetBusinessType}`, [targetBusinessType]);

    const loadData = useCallback(async () => {
        if (!targetBusinessType) return null;
        return executeDataCommand('getRooms', { businessType: targetBusinessType });
    }, [targetBusinessType]);

    return useDataState(observerId, loadData, !!targetBusinessType, [targetBusinessType]);
}; 