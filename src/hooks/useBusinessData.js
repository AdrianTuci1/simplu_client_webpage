/**
 * @deprecated This file is deprecated. Please use the modular structure instead.
 * 
 * Import from the new modular structure:
 * - Main hook: import { useBusinessData } from './hooks/index.js'
 * - Specific hooks: import { useCurrentBusinessData } from './hooks/current/useCurrentData.js'
 * - Entity hooks: import { useAttractions } from './hooks/entities/useEntityData.js'
 * 
 * See README.md in the hooks directory for complete documentation.
 */

// Re-export from new modular structure for backward compatibility
export {
    // Main business data hook
    useBusinessData,
    
    // Current data hooks (use environment configuration)
    useCurrentBusinessData,
    useCurrentHomeData,
    useCurrentSettings,
    useCurrentBusinessConfig,
    useCurrentDataByType,
    
    // Specific data hooks
    useHomeData,
    useSettings,
    useBusinessConfig,
    useDataByType,
    useLocationData,
    
    // Entity-specific hooks
    useAttractions,
    useFacilities,
    useServices,
    useRooms,
    
    // Configuration hooks
    useEnvironmentConfig,
    
    // Utility functions
    useDataState,
    createObserverId,
    validateBusinessType,
    getTargetBusinessType,
    createDataCommand,
    executeDataCommand,
    
    // Pattern classes
    DataStateObserver,
    dataObserver,
    DataCommand,
    CommandInvoker,
    
    // Re-export from dataService for convenience
    BUSINESS_TYPES,
    dataService,
    getCurrentBusinessData,
    getCurrentHomeData,
    getCurrentSettings,
    getCurrentDataByType,
    getCurrentBusinessConfig,
    getCurrentTenantId,
    getCurrentBusinessType,
    getEnvironmentConfig
} from './index.js';

console.warn(
    'useBusinessData.js is deprecated. Please use the modular structure from ./hooks/index.js instead. ' +
    'See README.md in the hooks directory for complete documentation.'
); 