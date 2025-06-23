import { 
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
    getCurrentBusinessConfig
} from '../../services/dataService.js';

/**
 * Command Pattern: Data operation commands
 * Encapsulates data operations as objects
 */
export class DataCommand {
    constructor(operation, params) {
        this.operation = operation;
        this.params = params;
    }
    
    /**
     * Execute the command based on operation type
     * @returns {*} Result of the data operation
     * @throws {Error} If operation is unknown
     */
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
 * Executes commands without knowing their implementation details
 */
export class CommandInvoker {
    /**
     * Execute a command
     * @param {DataCommand} command - The command to execute
     * @returns {*} Result of the command execution
     */
    static execute(command) {
        return command.execute();
    }
} 