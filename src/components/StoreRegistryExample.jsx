import React, { useEffect } from 'react';
import { 
    useCentralizedStore,
    useLocationStore,
    useHeroStore,
    useDescriptionStore,
    useFooterStore,
    useClinicAvailabilityStore,
    useClassesStore,
    usePackagesStore,
    useHotelStore,
    useClinicStore,
    useGymStore
} from '../store';

/**
 * Example component demonstrating the Store Registry Pattern
 * 
 * Architecture:
 * - Each component has its own dedicated store (locationStore, heroStore, etc.)
 * - All stores are imported from the centralized store/index.js (acts as registry)
 * - Centralized store provides business-specific data and environment configuration
 * - Components use their specific stores + centralized store for business data
 */
const StoreRegistryExample = () => {
    // Centralized store for business data and environment
    const {
        environment,
        businessData,
        ui,
        loadBusinessData,
        initializeStore,
        setLoading,
        setError
    } = useCentralizedStore();

    // Component-specific stores
    const locationStore = useLocationStore();
    const heroStore = useHeroStore();
    const descriptionStore = useDescriptionStore();
    const footerStore = useFooterStore();
    const clinicAvailabilityStore = useClinicAvailabilityStore();
    const classesStore = useClassesStore();
    const packagesStore = usePackagesStore();

    // Business-specific convenience hooks
    const hotelStore = useHotelStore();
    const clinicStore = useClinicStore();
    const gymStore = useGymStore();

    // Initialize stores
    useEffect(() => {
        const initStores = async () => {
            setLoading(true);
            try {
                // Initialize centralized store
                await initializeStore();
                
                // Initialize component-specific stores
                locationStore.initializeLocations();
                heroStore.loadHeroData();
                
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        initStores();
    }, [initializeStore, locationStore, heroStore, setLoading, setError]);

    if (ui.isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Loading stores...</h2>
                <p>Initializing component-specific stores from registry</p>
            </div>
        );
    }

    if (ui.error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error initializing stores</h2>
                <p>{ui.error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Store Registry Pattern Example</h1>
            <p>This demonstrates how each component has its own store, imported from the centralized registry.</p>

            {/* Environment Information */}
            <div style={{ marginBottom: '30px', background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
                <h2>Environment Configuration (Centralized Store)</h2>
                <p><strong>Business Type:</strong> {environment.businessType}</p>
                <p><strong>Tenant ID:</strong> {environment.tenantId}</p>
                <p><strong>Multi-tenant:</strong> {environment.isMultiTenant ? 'Yes' : 'No'}</p>
            </div>

            {/* Location Store */}
            <div style={{ marginBottom: '30px', background: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
                <h2>Location Store (Component-Specific)</h2>
                <p><strong>Current Location:</strong> {locationStore.currentLocation?.name || 'Not set'}</p>
                <p><strong>Total Locations:</strong> {locationStore.allLocations.length}</p>
                <p><strong>Is Multi-Location:</strong> {locationStore.allLocations.length > 1 ? 'Yes' : 'No'}</p>
                
                <button onClick={() => locationStore.resetToInitialLocation()}>
                    Reset to Initial Location
                </button>
            </div>

            {/* Hero Store */}
            <div style={{ marginBottom: '30px', background: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
                <h2>Hero Store (Component-Specific)</h2>
                <p><strong>Title:</strong> {heroStore.title}</p>
                <p><strong>Subtitle:</strong> {heroStore.subtitle}</p>
                <p><strong>Cover Image:</strong> {heroStore.coverImage ? 'Set' : 'Not set'}</p>
                <p><strong>Logo Image:</strong> {heroStore.logoImage ? 'Set' : 'Not set'}</p>
                <p><strong>Is Editing:</strong> {heroStore.isEditing ? 'Yes' : 'No'}</p>
                
                <button onClick={() => heroStore.setIsEditing(!heroStore.isEditing)}>
                    Toggle Edit Mode
                </button>
            </div>

            {/* Description Store */}
            <div style={{ marginBottom: '30px', background: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
                <h2>Description Store (Component-Specific)</h2>
                <p><strong>Description:</strong> {descriptionStore.description || 'No description'}</p>
                <p><strong>Location:</strong> {descriptionStore.location.join(', ')}</p>
                
                <button onClick={() => descriptionStore.setDescription('New description from button click')}>
                    Update Description
                </button>
            </div>

            {/* Footer Store */}
            <div style={{ marginBottom: '30px', background: '#e8f4f8', padding: '15px', borderRadius: '5px' }}>
                <h2>Footer Store (Component-Specific)</h2>
                <p><strong>Email:</strong> {footerStore.contact.email}</p>
                <p><strong>Phone:</strong> {footerStore.contact.phone}</p>
                <p><strong>Address:</strong> {footerStore.contact.address}</p>
                <p><strong>Weekdays:</strong> {footerStore.program.weekdays}</p>
                <p><strong>Social Media:</strong> {footerStore.socialMedia.length} platforms</p>
            </div>

            {/* Business-Specific Data */}
            <div style={{ marginBottom: '30px', background: '#f0f8ff', padding: '15px', borderRadius: '5px' }}>
                <h2>Business Data (Centralized Store)</h2>
                <p><strong>Business Type:</strong> {environment.businessType}</p>
                
                {environment.businessType === 'hotel' && (
                    <div>
                        <h3>Hotel Data:</h3>
                        <p>Rooms: {hotelStore.rooms.length}</p>
                        <p>Facilities: {hotelStore.facilities.length}</p>
                        <p>Attractions: {hotelStore.attractions.length}</p>
                    </div>
                )}
                
                {environment.businessType === 'clinic' && (
                    <div>
                        <h3>Clinic Data:</h3>
                        <p>Services: {clinicStore.services.length}</p>
                        <p>Gallery: {clinicStore.gallery.length}</p>
                        <p>Availability Calendar: {Object.keys(clinicStore.availabilityCalendar).length} entries</p>
                    </div>
                )}
                
                {environment.businessType === 'gym' && (
                    <div>
                        <h3>Gym Data:</h3>
                        <p>Classes: {gymStore.classes.length}</p>
                        <p>Packages: {gymStore.packages.length}</p>
                        <p>Facilities: {gymStore.facilities.length}</p>
                    </div>
                )}
            </div>

            {/* Component-Specific Stores */}
            <div style={{ marginBottom: '30px', background: '#fff3cd', padding: '15px', borderRadius: '5px' }}>
                <h2>Component-Specific Stores</h2>
                
                {/* Clinic Availability Store */}
                <div style={{ marginBottom: '15px' }}>
                    <h3>Clinic Availability Store</h3>
                    <p><strong>Is Loading:</strong> {clinicAvailabilityStore.isLoading ? 'Yes' : 'No'}</p>
                    <p><strong>Error:</strong> {clinicAvailabilityStore.error || 'None'}</p>
                    <p><strong>Availability Data:</strong> {Object.keys(clinicAvailabilityStore.availability).length} entries</p>
                    
                    <button onClick={() => clinicAvailabilityStore.fetchMonthAvailability(2024, 1)}>
                        Fetch January 2024 Availability
                    </button>
                </div>

                {/* Classes Store */}
                <div style={{ marginBottom: '15px' }}>
                    <h3>Classes Store</h3>
                    <p><strong>Total Classes:</strong> {classesStore.classes.length}</p>
                    {classesStore.classes.map(classItem => (
                        <div key={classItem.id} style={{ marginLeft: '20px' }}>
                            <p><strong>{classItem.title}</strong> - {classItem.description.substring(0, 50)}...</p>
                        </div>
                    ))}
                </div>

                {/* Packages Store */}
                <div style={{ marginBottom: '15px' }}>
                    <h3>Packages Store</h3>
                    <p><strong>Total Packages:</strong> {packagesStore.packages.length}</p>
                    {packagesStore.packages.map(pkg => (
                        <div key={pkg.id} style={{ marginLeft: '20px' }}>
                            <p><strong>{pkg.name}</strong> - ${pkg.price}/{pkg.period}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Store Actions */}
            <div style={{ marginBottom: '30px', background: '#d4edda', padding: '15px', borderRadius: '5px' }}>
                <h2>Store Actions</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={() => loadBusinessData()}>
                        Load Business Data
                    </button>
                    <button onClick={() => locationStore.refreshLocations()}>
                        Refresh Locations
                    </button>
                    <button onClick={() => heroStore.loadHeroData()}>
                        Load Hero Data
                    </button>
                    <button onClick={() => descriptionStore.setLocation([44.435971971072, 26.102325776537])}>
                        Set Location to Bucharest
                    </button>
                </div>
            </div>

            {/* Import Examples */}
            <div style={{ marginBottom: '30px', background: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                <h2>Import Examples</h2>
                <div style={{ background: '#fff', padding: '10px', borderRadius: '5px' }}>
                    <h3>For Components:</h3>
                    <pre style={{ background: '#f8f9fa', padding: '10px', borderRadius: '5px', overflow: 'auto' }}>
{`// Import from centralized registry
import { 
    useLocationStore,
    useHeroStore,
    useDescriptionStore,
    useFooterStore,
    useClinicAvailabilityStore,
    useClassesStore,
    usePackagesStore
} from '../store';

// Use in component
const MyComponent = () => {
    const locationStore = useLocationStore();
    const heroStore = useHeroStore();
    const descriptionStore = useDescriptionStore();
    
    return (
        <div>
            <h1>{heroStore.title}</h1>
            <p>{descriptionStore.description}</p>
            <p>Location: {locationStore.currentLocation?.name}</p>
        </div>
    );
};`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default StoreRegistryExample; 