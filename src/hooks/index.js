// Main business data hook
export { useBusinessData } from './business/useBusinessData.js';

// Current data hooks (use environment configuration)
export {
    useCurrentBusinessData,
    useCurrentHomeData,
    useCurrentSettings,
    useCurrentBusinessConfig,
    useCurrentDataByType
} from './current/useCurrentData.js';

// Specific data hooks
export {
    useHomeData,
    useSettings,
    useBusinessConfig,
    useDataByType,
    useLocationData
} from './specific/useSpecificData.js';

// Entity-specific hooks
export {
    useAttractions,
    useFacilities,
    useServices,
    useRooms
} from './entities/useEntityData.js';

// Configuration hooks
export { useEnvironmentConfig } from './config/useEnvironmentConfig.js';

// Utility functions
export {
    useDataState,
    createObserverId,
    validateBusinessType,
    getTargetBusinessType,
    createDataCommand,
    executeDataCommand
} from './utils/hookUtils.js';

// Pattern classes
export {
    DataStateObserver,
    dataObserver
} from './patterns/DataStateObserver.js';

export {
    DataCommand,
    CommandInvoker
} from './patterns/DataCommand.js';

// Re-export from dataService for convenience
export {
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
} from '../services/dataService.js'; 