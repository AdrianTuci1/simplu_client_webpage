import React from 'react';
import { 
    useBusinessData, 
    useHomeData, 
    useDataByType, 
    useLocationData,
    useSettings,
    useBusinessConfig,
    useCurrentBusinessData,
    useCurrentHomeData,
    useCurrentSettings,
    useCurrentDataByType,
    useCurrentBusinessConfig,
    useEnvironmentConfig,
    BUSINESS_TYPES,
    dataService 
} from '../hooks/useBusinessData.js';

/**
 * Example component demonstrating environment-based configuration
 * - Factory Pattern: Data providers are created by factory
 * - Strategy Pattern: Different business types use different strategies
 * - Singleton Pattern: Single data service instance
 * - Observer Pattern: Components subscribe to data changes
 * - Command Pattern: Data operations are executed as commands
 * - Environment Configuration: VITE_BUSINESS_TYPE and VITE_TENANT_ID
 */
const DataServiceExample = () => {
    // Environment configuration
    const envConfig = useEnvironmentConfig();

    // Example 1: Using current business data (environment-based)
    const { 
        data: currentBusinessData, 
        loading: currentLoading, 
        error: currentError,
        refresh: refreshCurrent 
    } = useCurrentBusinessData();

    // Example 2: Using current home data (environment-based)
    const { 
        data: currentHomeData, 
        loading: currentHomeLoading, 
        error: currentHomeError 
    } = useCurrentHomeData();

    // Example 3: Using current settings (environment-based)
    const { 
        data: currentSettings, 
        loading: currentSettingsLoading, 
        error: currentSettingsError 
    } = useCurrentSettings();

    // Example 4: Using current data by type (environment-based)
    const { 
        data: currentHeroData, 
        loading: currentHeroLoading, 
        error: currentHeroError 
    } = useCurrentDataByType('hero');

    // Example 5: Using current business config (environment-based)
    const { 
        data: currentConfig, 
        loading: currentConfigLoading, 
        error: currentConfigError 
    } = useCurrentBusinessConfig();

    // Example 6: Using specific business type (overrides environment)
    const { 
        data: hotelData, 
        loading: hotelLoading, 
        error: hotelError,
        refresh: refreshHotel 
    } = useBusinessData(BUSINESS_TYPES.HOTEL);

    // Example 7: Using specific data type for specific business
    const { 
        data: clinicHeroData, 
        loading: clinicHeroLoading, 
        error: clinicHeroError 
    } = useDataByType(BUSINESS_TYPES.CLINIC, 'hero');

    // Example 8: Using location data
    const { 
        data: locationData, 
        loading: locationLoading, 
        error: locationError 
    } = useLocationData(null, 1); // Uses current business type

    // Example 9: Direct service usage (Singleton Pattern)
    const handleDirectServiceUsage = () => {
        console.log('Direct service usage:');
        console.log('Current business type:', dataService.getCurrentBusinessType());
        console.log('Current tenant ID:', dataService.getCurrentTenantId());
        console.log('Environment config:', dataService.getEnvironmentConfig());
        
        // Test Strategy Pattern
        const currentProvider = dataService.getProvider();
        console.log('Current provider:', currentProvider);
        
        // Test different business types
        const hotelProvider = dataService.getProvider(BUSINESS_TYPES.HOTEL);
        const clinicProvider = dataService.getProvider(BUSINESS_TYPES.CLINIC);
        const gymProvider = dataService.getProvider(BUSINESS_TYPES.GYM);
        
        console.log('Hotel rooms:', hotelProvider.getRoomsData());
        console.log('Clinic medics:', clinicProvider.getMedicsData());
        console.log('Gym packages:', gymProvider.getAvailablePackages());
    };

    // Example 10: Test Environment Configuration
    const handleEnvironmentTest = () => {
        console.log('Environment Configuration Test:');
        console.log('VITE_BUSINESS_TYPE:', import.meta.env.VITE_BUSINESS_TYPE);
        console.log('VITE_TENANT_ID:', import.meta.env.VITE_TENANT_ID);
        console.log('Parsed business type:', dataService.getCurrentBusinessType());
        console.log('Parsed tenant ID:', dataService.getCurrentTenantId());
        console.log('Is valid config:', dataService.getEnvironmentConfig().isValid);
    };

    if (currentLoading || currentHomeLoading || currentSettingsLoading || 
        currentHeroLoading || currentConfigLoading || hotelLoading || 
        clinicHeroLoading || locationLoading) {
        return <div>Loading...</div>;
    }

    if (currentError || currentHomeError || currentSettingsError || 
        currentHeroError || currentConfigError || hotelError || 
        clinicHeroError || locationError) {
        return <div>Error: {currentError?.message || currentHomeError?.message || currentSettingsError?.message}</div>;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Environment-Based Data Service Example</h1>
            
            <div style={{ marginBottom: '20px', background: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
                <h2>Environment Configuration:</h2>
                <pre style={{ fontSize: '12px' }}>
                    {JSON.stringify(envConfig, null, 2)}
                </pre>
                <p><strong>VITE_BUSINESS_TYPE:</strong> {import.meta.env.VITE_BUSINESS_TYPE || 'Not set'}</p>
                <p><strong>VITE_TENANT_ID:</strong> {import.meta.env.VITE_TENANT_ID || 'Not set'}</p>
            </div>

            <div style={{ marginBottom: '20px', background: '#fff3cd', padding: '15px', borderRadius: '5px' }}>
                <h2>Design Patterns + Environment Configuration:</h2>
                <ul>
                    <li><strong>Factory Pattern:</strong> DataProviderFactory creates different providers</li>
                    <li><strong>Strategy Pattern:</strong> Different business types use different data strategies</li>
                    <li><strong>Singleton Pattern:</strong> Single DataService instance</li>
                    <li><strong>Observer Pattern:</strong> Components subscribe to data changes</li>
                    <li><strong>Command Pattern:</strong> Data operations executed as commands</li>
                    <li><strong>Environment Configuration:</strong> Automatic business type and tenant ID detection</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>1. Current Business Data (Environment-Based)</h2>
                <button onClick={refreshCurrent}>Refresh Current Data</button>
                <button onClick={handleDirectServiceUsage} style={{ marginLeft: '10px' }}>
                    Test Direct Service Usage
                </button>
                <button onClick={handleEnvironmentTest} style={{ marginLeft: '10px' }}>
                    Test Environment Config
                </button>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(currentBusinessData, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>2. Current Home Data (Environment-Based)</h2>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(currentHomeData, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>3. Current Settings (Environment-Based)</h2>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(currentSettings, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>4. Current Hero Data (Environment-Based)</h2>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(currentHeroData, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>5. Current Business Configuration (Environment-Based)</h2>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(currentConfig, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>6. Specific Hotel Data (Overrides Environment)</h2>
                <button onClick={refreshHotel}>Refresh Hotel Data</button>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(hotelData, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>7. Clinic Hero Data (Specific Business Type)</h2>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(clinicHeroData, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>8. Location Data (Uses Current Business Type)</h2>
                <pre style={{ 
                    background: '#f5f5f5', 
                    padding: '10px', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(locationData, null, 2)}
                </pre>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Environment-Based Usage Examples</h2>
                <div style={{ background: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
                    <h3>Current Business Data (No Parameters):</h3>
                    <code>
                        {`const { data, loading, error } = useCurrentBusinessData();`}
                    </code>
                    
                    <h3>Current Home Data (No Parameters):</h3>
                    <code>
                        {`const { data, loading, error } = useCurrentHomeData();`}
                    </code>
                    
                    <h3>Current Settings (No Parameters):</h3>
                    <code>
                        {`const { data, loading, error } = useCurrentSettings();`}
                    </code>
                    
                    <h3>Current Data by Type (Only Data Type):</h3>
                    <code>
                        {`const { data, loading, error } = useCurrentDataByType('hero');`}
                    </code>
                    
                    <h3>Environment Configuration:</h3>
                    <code>
                        {`const envConfig = useEnvironmentConfig();
console.log(envConfig.businessType); // From VITE_BUSINESS_TYPE
console.log(envConfig.tenantId);     // From VITE_TENANT_ID`}
                    </code>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Hook Usage Examples</h2>
                <div style={{ background: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
                    <h3>Environment-Based (Recommended):</h3>
                    <code>
                        {`// Uses VITE_BUSINESS_TYPE and VITE_TENANT_ID automatically
const { data, loading, error } = useCurrentBusinessData();
const { data } = useCurrentDataByType('hero');
const { data } = useCurrentSettings();`}
                    </code>
                    
                    <h3>Specific Business Type (Overrides Environment):</h3>
                    <code>
                        {`// Overrides environment configuration
const { data, loading, error } = useBusinessData(BUSINESS_TYPES.HOTEL);
const { data } = useDataByType(BUSINESS_TYPES.CLINIC, 'hero');`}
                    </code>
                    
                    <h3>Mixed Usage:</h3>
                    <code>
                        {`// Uses environment for business type, specific location
const { data } = useLocationData(null, 1);
// Uses specific business type, environment tenant
const { data } = useBusinessData(BUSINESS_TYPES.GYM);`}
                    </code>
                </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h2>Environment Variables Setup</h2>
                <div style={{ background: '#d4edda', padding: '15px', borderRadius: '5px' }}>
                    <h3>.env File Example:</h3>
                    <code>
                        {`# For Hotel
VITE_BUSINESS_TYPE=hotel
VITE_TENANT_ID=TN25-100000

# For Clinic  
VITE_BUSINESS_TYPE=clinic
VITE_TENANT_ID=TN25-200000

# For Gym
VITE_BUSINESS_TYPE=gym
VITE_TENANT_ID=TN25-300000`}
                    </code>
                    
                    <h3>Build Configuration:</h3>
                    <code>
                        {`# Different builds for different businesses
npm run build:hotel    # VITE_BUSINESS_TYPE=hotel VITE_TENANT_ID=TN25-100000
npm run build:clinic   # VITE_BUSINESS_TYPE=clinic VITE_TENANT_ID=TN25-200000
npm run build:gym      # VITE_BUSINESS_TYPE=gym VITE_TENANT_ID=TN25-300000`}
                    </code>
                </div>
            </div>
        </div>
    );
};

export default DataServiceExample; 