import { renderHook, act } from '@testing-library/react';
import { useBusinessData } from '../../business/useBusinessData.js';

// Mock dependencies
jest.mock('../../utils/hookUtils.js', () => ({
    useDataState: jest.fn(),
    createObserverId: jest.fn(() => 'test_observer_id'),
    validateBusinessType: jest.fn(() => true),
    getTargetBusinessType: jest.fn((type) => type || 'clinic'),
    executeDataCommand: jest.fn()
}));

jest.mock('../../../services/dataService.js', () => ({
    getCurrentBusinessType: jest.fn(() => 'clinic'),
    isBusinessTypeSupported: jest.fn(() => true)
}));

describe('useBusinessData', () => {
    const mockUseDataState = require('../../utils/hookUtils.js').useDataState;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUseDataState.mockReturnValue({
            data: null,
            loading: false,
            error: null,
            refresh: jest.fn()
        });
    });

    test('should call useDataState with correct parameters', () => {
        renderHook(() => useBusinessData('hotel', { autoLoad: true, dataType: 'attractions' }));

        expect(mockUseDataState).toHaveBeenCalledWith(
            'test_observer_id',
            expect.any(Function),
            true,
            ['hotel', 'attractions', null, true]
        );
    });

    test('should return correct structure', () => {
        const { result } = renderHook(() => useBusinessData('hotel'));

        expect(result.current).toHaveProperty('data');
        expect(result.current).toHaveProperty('loading');
        expect(result.current).toHaveProperty('error');
        expect(result.current).toHaveProperty('refresh');
        expect(result.current).toHaveProperty('isValidBusinessType');
        expect(result.current).toHaveProperty('businessType');
    });

    test('should use default options when none provided', () => {
        renderHook(() => useBusinessData());

        expect(mockUseDataState).toHaveBeenCalledWith(
            'test_observer_id',
            expect.any(Function),
            true,
            ['clinic', null, null, true]
        );
    });

    test('should handle custom options', () => {
        renderHook(() => useBusinessData('gym', { 
            autoLoad: false, 
            dataType: 'services', 
            locationId: 123 
        }));

        expect(mockUseDataState).toHaveBeenCalledWith(
            'test_observer_id',
            expect.any(Function),
            false,
            ['gym', 'services', 123, true]
        );
    });

    test('should create loadData function that handles different scenarios', () => {
        const mockExecuteDataCommand = require('../../utils/hookUtils.js').executeDataCommand;
        
        renderHook(() => useBusinessData('hotel', { dataType: 'attractions' }));

        // Get the loadData function that was passed to useDataState
        const loadDataFunction = mockUseDataState.mock.calls[0][1];
        
        // Test with dataType
        act(() => {
            loadDataFunction();
        });
        
        expect(mockExecuteDataCommand).toHaveBeenCalledWith('getDataByType', {
            businessType: 'hotel',
            dataType: 'attractions'
        });
    });
}); 