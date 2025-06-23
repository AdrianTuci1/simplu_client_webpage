module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapping: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverageFrom: [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/coverage/**',
        '!**/jest.config.js',
        '!**/jest.setup.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    testMatch: [
        '<rootDir>/src/hooks/__tests__/**/*.test.js'
    ],
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest'
    }
}; 