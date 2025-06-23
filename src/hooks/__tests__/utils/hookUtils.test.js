import { 
    createObserverId, 
    validateBusinessType, 
    getTargetBusinessType,
    createDataCommand,
    executeDataCommand
} from '../../utils/hookUtils.js';
import { DataCommand } from '../../patterns/DataCommand.js';

// Mock dataService
jest.mock('../../../services/dataService.js', () => ({
    getCurrentBusinessType: jest.fn(() => 'clinic'),
    isBusinessTypeSupported: jest.fn((type) => ['hotel', 'clinic', 'gym'].includes(type))
}));

describe('hookUtils', () => {
    describe('createObserverId', () => {
        test('should create ID with business type only', () => {
            const id = createObserverId('hotel');
            expect(id).toBe('hotel');
        });

        test('should create ID with business type and data type', () => {
            const id = createObserverId('hotel', 'attractions');
            expect(id).toBe('hotel_attractions');
        });

        test('should create ID with business type, data type and location ID', () => {
            const id = createObserverId('hotel', 'attractions', 123);
            expect(id).toBe('hotel_attractions_123');
        });

        test('should convert location ID to string', () => {
            const id = createObserverId('hotel', 'attractions', 123);
            expect(id).toBe('hotel_attractions_123');
        });
    });

    describe('validateBusinessType', () => {
        test('should return true for valid business types', () => {
            expect(validateBusinessType('hotel')).toBe(true);
            expect(validateBusinessType('clinic')).toBe(true);
            expect(validateBusinessType('gym')).toBe(true);
        });

        test('should return false for invalid business types', () => {
            expect(validateBusinessType('invalid')).toBe(false);
            expect(validateBusinessType('')).toBe(false);
            expect(validateBusinessType(null)).toBe(false);
        });
    });

    describe('getTargetBusinessType', () => {
        test('should return provided business type', () => {
            const result = getTargetBusinessType('hotel');
            expect(result).toBe('hotel');
        });

        test('should return current business type when none provided', () => {
            const result = getTargetBusinessType();
            expect(result).toBe('clinic');
        });

        test('should return current business type when null provided', () => {
            const result = getTargetBusinessType(null);
            expect(result).toBe('clinic');
        });
    });

    describe('createDataCommand', () => {
        test('should create DataCommand instance', () => {
            const command = createDataCommand('getHomeData', { businessType: 'hotel' });
            expect(command).toBeInstanceOf(DataCommand);
            expect(command.operation).toBe('getHomeData');
            expect(command.params).toEqual({ businessType: 'hotel' });
        });
    });

    describe('executeDataCommand', () => {
        test('should execute command and return result', () => {
            const mockResult = { data: 'test' };
            const mockExecute = jest.fn().mockReturnValue(mockResult);
            
            // Mock DataCommand constructor
            const originalDataCommand = global.DataCommand;
            global.DataCommand = jest.fn().mockImplementation(() => ({
                execute: mockExecute
            }));

            const result = executeDataCommand('getHomeData', { businessType: 'hotel' });

            expect(global.DataCommand).toHaveBeenCalledWith('getHomeData', { businessType: 'hotel' });
            expect(mockExecute).toHaveBeenCalled();
            expect(result).toBe(mockResult);

            // Restore original
            global.DataCommand = originalDataCommand;
        });
    });
}); 