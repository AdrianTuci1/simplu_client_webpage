import React from 'react';
import {
    useBusinessData,
    useCurrentBusinessData,
    useAttractions,
    useServices,
    useEnvironmentConfig
} from '../index.js';

/**
 * Exemplu de utilizare a hooks-urilor modulare
 */
const UsageExample = () => {
    // Hook principal pentru business data
    const { 
        data: businessData, 
        loading: businessLoading, 
        error: businessError,
        refresh: refreshBusiness,
        isValidBusinessType,
        businessType 
    } = useBusinessData('hotel', {
        autoLoad: true,
        dataType: 'attractions'
    });

    // Hook pentru datele curente (folosește environment)
    const { 
        data: currentData, 
        loading: currentLoading 
    } = useCurrentBusinessData();

    // Hook specializat pentru attractions
    const { 
        data: attractions, 
        loading: attractionsLoading 
    } = useAttractions('hotel');

    // Hook specializat pentru services
    const { 
        data: services, 
        loading: servicesLoading 
    } = useServices('clinic');

    // Hook pentru configurația de environment
    const envConfig = useEnvironmentConfig();

    if (businessLoading || currentLoading || attractionsLoading || servicesLoading) {
        return <div>Loading...</div>;
    }

    if (businessError) {
        return <div>Error: {businessError.message}</div>;
    }

    return (
        <div className="usage-example">
            <h1>Business Data Hooks - Usage Example</h1>
            
            <section>
                <h2>Environment Configuration</h2>
                <pre>{JSON.stringify(envConfig, null, 2)}</pre>
            </section>

            <section>
                <h2>Main Business Data Hook</h2>
                <p>Business Type: {businessType}</p>
                <p>Valid Business Type: {isValidBusinessType ? 'Yes' : 'No'}</p>
                <button onClick={refreshBusiness}>Refresh Business Data</button>
                <pre>{JSON.stringify(businessData, null, 2)}</pre>
            </section>

            <section>
                <h2>Current Business Data (Environment)</h2>
                <pre>{JSON.stringify(currentData, null, 2)}</pre>
            </section>

            <section>
                <h2>Attractions (Hotel)</h2>
                <pre>{JSON.stringify(attractions, null, 2)}</pre>
            </section>

            <section>
                <h2>Services (Clinic)</h2>
                <pre>{JSON.stringify(services, null, 2)}</pre>
            </section>
        </div>
    );
};

export default UsageExample; 