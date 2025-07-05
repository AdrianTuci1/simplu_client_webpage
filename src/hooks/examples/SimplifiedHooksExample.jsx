import React from 'react';
import {
  useSimplifiedData,
  useHomeData,
  useHeroData,
  useFacilities,
  useAttractions,
  useRooms,
  useServices,
  usePackages,
  useClasses,
  useGallery,
  useFooter,
  useSettings,
  useUserProfile,
  useUserBookings,
  useDescription,
  useCoordinates,
  useAvailablePages,
  useLocations
} from '../useSimplifiedData';
import simplifiedConfig from '../../config/simplifiedConfig';

/**
 * Example component demonstrating the simplified hooks
 * Shows how hooks automatically choose between API and local data based on isDemoMode
 */
const SimplifiedHooksExample = () => {
  // Get current business type from config
  const currentBusinessType = simplifiedConfig.getType();
  
  // Example 1: Hotel data (no need to specify businessType - it's automatic)
  const hotelHome = useHomeData({ locationId: 1 });
  const hotelHero = useHeroData({ locationId: 1 });
  const hotelRooms = useRooms({ locationId: 1 });
  const hotelFacilities = useFacilities({ locationId: 1 });
  const hotelAttractions = useAttractions({ locationId: 1 });
  const hotelFooter = useFooter({ locationId: 1 });

  // Example 2: Clinic data (if we want to override business type)
  const clinicHome = useHomeData({ businessType: 'clinic', locationId: 1 });
  const clinicServices = useServices({ businessType: 'clinic', locationId: 1 });
  const clinicGallery = useGallery({ businessType: 'clinic', locationId: 1 });

  // Example 3: Gym data (if we want to override business type)
  const gymHome = useHomeData({ businessType: 'gym', locationId: 1 });
  const gymPackages = usePackages({ businessType: 'gym', locationId: 1 });
  const gymClasses = useClasses({ businessType: 'gym', locationId: 1 });

  // Example 4: User data
  const userSettings = useUserSettings();
  const userProfile = useUserProfile();
  const userBookings = useUserBookings();

  // Example 5: Generic data
  const description = useDescription({ locationId: 1 });
  const coordinates = useCoordinates({ locationId: 1 });
  const availablePages = useAvailablePages({ locationId: 1 });

  // Example 6: Locations
  const { 
    data: locations, 
    currentLocation, 
    loading: locationsLoading,
    error: locationsError,
    isDemoMode 
  } = useLocations();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simplified Hooks Example</h1>
      <p>This example demonstrates how to use the updated useSimplifiedData hook with automatic business type detection.</p>

      {/* Business Config Info */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', background: '#e8f4fd' }}>
        <h2>⚙️ Business Configuration</h2>
        <p><strong>Current Business Type:</strong> {currentBusinessType}</p>
        <p><strong>Demo Mode:</strong> {isDemoMode ? 'ON' : 'OFF'}</p>
        <p><strong>Available Pages:</strong> {simplifiedConfig.getAvailablePages().join(', ')}</p>
        <p><strong>Total Locations:</strong> {locations?.length || 0}</p>
        <p><strong>Current Location:</strong> {currentLocation?.name || 'None'}</p>
      </section>

      {/* Current Business Type Data */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>🏢 {currentBusinessType.toUpperCase()} Data (Current Config)</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Home Data:</h3>
          {hotelHome.loading ? (
            <p>Loading home data...</p>
          ) : hotelHome.error ? (
            <p style={{ color: 'red' }}>Error: {hotelHome.error}</p>
          ) : (
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
              {JSON.stringify(hotelHome.data, null, 2)}
            </pre>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Hero Data:</h3>
          {hotelHero.loading ? (
            <p>Loading hero data...</p>
          ) : hotelHero.error ? (
            <p style={{ color: 'red' }}>Error: {hotelHero.error}</p>
          ) : (
            <div>
              <p><strong>Business Name:</strong> {hotelHero.data?.bussinesName}</p>
              <p><strong>Cover Image:</strong> {hotelHero.data?.coverImage}</p>
              <p><strong>Logo Image:</strong> {hotelHero.data?.logoImage}</p>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Rooms ({hotelRooms.data?.length || 0}):</h3>
          {hotelRooms.loading ? (
            <p>Loading rooms...</p>
          ) : hotelRooms.error ? (
            <p style={{ color: 'red' }}>Error: {hotelRooms.error}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
              {hotelRooms.data?.map(room => (
                <div key={room.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                  <h4>{room.name}</h4>
                  <p><strong>Type:</strong> {room.type}</p>
                  <p><strong>Price:</strong> {room.price} {room.currency}</p>
                  <p><strong>Description:</strong> {room.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Facilities ({hotelFacilities.data?.length || 0}):</h3>
          {hotelFacilities.loading ? (
            <p>Loading facilities...</p>
          ) : hotelFacilities.error ? (
            <p style={{ color: 'red' }}>Error: {hotelFacilities.error}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {hotelFacilities.data?.map(facility => (
                <div key={facility.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                  <h4>{facility.name}</h4>
                  <p><strong>Images:</strong> {facility.images?.length || 0}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Clinic Data (Override) */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>🏥 Clinic Data (Override)</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Services ({clinicServices.data?.length || 0}):</h3>
          {clinicServices.loading ? (
            <p>Loading services...</p>
          ) : clinicServices.error ? (
            <p style={{ color: 'red' }}>Error: {clinicServices.error}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {clinicServices.data?.map(service => (
                <div key={service.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                  <h4>{service.name}</h4>
                  <p><strong>Category:</strong> {service.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gym Data (Override) */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>💪 Gym Data (Override)</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Packages ({gymPackages.data?.length || 0}):</h3>
          {gymPackages.loading ? (
            <p>Loading packages...</p>
          ) : gymPackages.error ? (
            <p style={{ color: 'red' }}>Error: {gymPackages.error}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {gymPackages.data?.map(pkg => (
                <div key={pkg.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                  <h4>{pkg.name}</h4>
                  <p><strong>Price:</strong> {pkg.price}</p>
                  <p><strong>Duration:</strong> {pkg.duration}</p>
                  <p><strong>Features:</strong></p>
                  <ul>
                    {pkg.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Classes ({gymClasses.data?.length || 0}):</h3>
          {gymClasses.loading ? (
            <p>Loading classes...</p>
          ) : gymClasses.error ? (
            <p style={{ color: 'red' }}>Error: {gymClasses.error}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
              {gymClasses.data?.map(classItem => (
                <div key={classItem.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                  <h4>{classItem.name}</h4>
                  <p><strong>Description:</strong> {classItem.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* User Data */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>👤 User Data</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>User Profile:</h3>
          {userProfile.loading ? (
            <p>Loading user profile...</p>
          ) : userProfile.error ? (
            <p style={{ color: 'red' }}>Error: {userProfile.error}</p>
          ) : (
            <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
              <p><strong>Name:</strong> {userProfile.data?.name}</p>
              <p><strong>Email:</strong> {userProfile.data?.email}</p>
              <p><strong>Phone:</strong> {userProfile.data?.phone}</p>
              <p><strong>Avatar:</strong> {userProfile.data?.avatar}</p>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>User Settings:</h3>
          {userSettings.loading ? (
            <p>Loading user settings...</p>
          ) : userSettings.error ? (
            <p style={{ color: 'red' }}>Error: {userSettings.error}</p>
          ) : (
            <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
              {JSON.stringify(userSettings.data, null, 2)}
            </pre>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>User Bookings:</h3>
          {userBookings.loading ? (
            <p>Loading user bookings...</p>
          ) : userBookings.error ? (
            <p style={{ color: 'red' }}>Error: {userBookings.error}</p>
          ) : (
            <div>
              <p><strong>Total Bookings:</strong> {userBookings.data?.length || 0}</p>
              {userBookings.data?.length > 0 && (
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
                  {JSON.stringify(userBookings.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Generic Data */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>📋 Generic Data</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>Description:</h3>
          {description.loading ? (
            <p>Loading description...</p>
          ) : description.error ? (
            <p style={{ color: 'red' }}>Error: {description.error}</p>
          ) : (
            <p><strong>Description Path:</strong> {description.data}</p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Coordinates:</h3>
          {coordinates.loading ? (
            <p>Loading coordinates...</p>
          ) : coordinates.error ? (
            <p style={{ color: 'red' }}>Error: {coordinates.error}</p>
          ) : (
            <p><strong>Coordinates:</strong> [{coordinates.data?.join(', ')}]</p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3>Available Pages:</h3>
          {availablePages.loading ? (
            <p>Loading available pages...</p>
          ) : availablePages.error ? (
            <p style={{ color: 'red' }}>Error: {availablePages.error}</p>
          ) : (
            <div>
              <p><strong>Pages:</strong></p>
              <ul>
                {availablePages.data?.map((page, index) => (
                  <li key={index}>{page}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Locations */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
        <h2>📍 Locations</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3>All Locations ({locations?.length || 0}):</h3>
          {locationsLoading ? (
            <p>Loading locations...</p>
          ) : locationsError ? (
            <p style={{ color: 'red' }}>Error: {locationsError}</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {locations?.map(location => (
                <div key={location.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                  <h4>{location.name}</h4>
                  <p><strong>ID:</strong> {location.id}</p>
                  <p><strong>Slug:</strong> {location.slug}</p>
                  <p><strong>Address:</strong> {location.address}</p>
                  <p><strong>Phone:</strong> {location.phone}</p>
                  <p><strong>Email:</strong> {location.email}</p>
                  <p><strong>Current:</strong> {currentLocation?.id === location.id ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Demo Mode Info */}
      <section style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', background: '#e8f4fd' }}>
        <h2>ℹ️ Demo Mode Information</h2>
        <p><strong>Current Mode:</strong> Demo Mode (using local data from @/data folder)</p>
        <p><strong>Business Type:</strong> Automatically detected from simplifiedConfig.js</p>
        <p><strong>Data Sources:</strong></p>
        <ul>
          <li>Hotel data: <code>src/data/apiDataHotel.js</code></li>
          <li>Clinic data: <code>src/data/apiDataClinic.js</code></li>
          <li>Gym data: <code>src/data/apiDataGym.js</code></li>
          <li>User data: <code>src/data/apiUserData.js</code></li>
        </ul>
        <p><strong>Note:</strong> All hooks automatically use the business type from simplifiedConfig.js. You can override it by passing <code>businessType</code> in options.</p>
      </section>
    </div>
  );
};

export default SimplifiedHooksExample; 