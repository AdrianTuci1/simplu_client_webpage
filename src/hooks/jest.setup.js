// Mock React hooks for testing
import { renderHook } from '@testing-library/react';

// Global test utilities
global.renderHook = renderHook;

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn()
}; 
 