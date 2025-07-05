# Simplified Data Hooks

A collection of React hooks that automatically choose between API and local data based on demo mode, now using real data from the `@/data` folder.

## Overview

The simplified hooks provide a unified interface for accessing data, whether it comes from an API or local demo data. Currently, all hooks are in **demo mode** and use real data from the following sources:

- **Hotel data**: `src/data/apiDataHotel.js`
- **Clinic data**: `src/data/apiDataClinic.js` 
- **Gym data**: `src/data/apiDataGym.js`
- **User data**: `src/data/apiUserData.js`

## Available Hooks

### Core Hook
- `useSimplifiedData(dataType, options)` - The main hook that powers all other hooks

### Business-Specific Hooks
- `useHomeData(options)` - Complete home page data
- `useRooms(options)` - Hotel rooms data
- `useServices(options)` - Clinic services data  
- `usePackages(options)` - Gym packages data

### Component-Specific Hooks
- `useHeroData(options)` - Hero section data
- `useFacilities(options)` - Facilities data
- `useAttractions(options)` - Attractions data
- `useClasses(options)` - Gym classes data
- `useGallery(options)` - Gallery data
- `useFooter(options)` - Footer data

### User Data Hooks
- `useSettings(options)` - Application settings
- `useUserSettings()` - User-specific settings
- `useUserProfile()` - User profile information
- `useUserBookings()` - User bookings/appointments

### Utility Hooks
- `useDescription(options)` - Location description
- `useCoordinates(options)` - Location coordinates
- `useAvailablePages(options)` - Available pages for navigation
- `useLocations()` - Location management

## Usage Examples

### Basic Usage

```jsx
import { useHomeData, useHeroData, useRooms } from '../hooks/useSimplifiedData';

const MyComponent = () => {
  // Hotel data
  const hotelData = useHomeData({ businessType: 'hotel', locationId: 1 });
  const heroData = useHeroData({ businessType: 'hotel', locationId: 1 });
  const roomsData = useRooms({ businessType: 'hotel', locationId: 1 });

  // Clinic data
  const clinicData = useHomeData({ businessType: 'clinic', locationId: 1 });
  const servicesData = useServices({ businessType: 'clinic', locationId: 1 });

  // Gym data
  const gymData = useHomeData({ businessType: 'gym', locationId: 1 });
  const packagesData = usePackages({ businessType: 'gym', locationId: 1 });

  if (hotelData.loading) return <div>Loading...</div>;
  if (hotelData.error) return <div>Error: {hotelData.error}</div>;

  return (
    <div>
      <h1>{heroData.data?.bussinesName}</h1>
      <p>Available rooms: {roomsData.data?.length}</p>
    </div>
  );
};
```

### User Data

```jsx
import { useUserProfile, useUserSettings, useUserBookings } from '../hooks/useSimplifiedData';

const UserProfile = () => {
  const profile = useUserProfile();
  const settings = useUserSettings();
  const bookings = useUserBookings();

  return (
    <div>
      <h2>{profile.data?.name}</h2>
      <p>Email: {profile.data?.email}</p>
      <p>Language: {settings.data?.language}</p>
      <p>Active bookings: {bookings.data?.length}</p>
    </div>
  );
};
```

### Location Management

```jsx
import { useLocations } from '../hooks/useSimplifiedData';

const LocationSelector = () => {
  const { 
    data: locations, 
    currentLocation, 
    switchLocation,
    loading 
  } = useLocations();

  if (loading) return <div>Loading locations...</div>;

  return (
    <div>
      <h3>Current: {currentLocation?.name}</h3>
      <select onChange={(e) => switchLocation(parseInt(e.target.value))}>
        {locations.map(location => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
};
```

## Hook Options

All hooks accept an options object with the following properties:

```jsx
const options = {
  businessType: 'hotel',     // 'hotel', 'clinic', or 'gym'
  locationId: 1,            // Location ID (optional)
  autoLoad: true,           // Whether to auto-load data on mount
  tenantId: 1              // Tenant ID (for API mode)
};
```

## Hook Return Values

Each hook returns an object with the following properties:

```jsx
const {
  data,           // The actual data
  loading,        // Boolean indicating if data is being loaded
  error,          // Error message if something went wrong
  refresh,        // Function to refresh the data
  isDemoMode,     // Boolean indicating if in demo mode
  loadData        // Function to manually load data
} = useSimplifiedData('home', options);
```

## Data Structure

### Hotel Data
- **Rooms**: Room information with prices, descriptions, amenities
- **Facilities**: Hotel facilities with images
- **Attractions**: Local attractions
- **Hero**: Business name, cover image, logo
- **Footer**: Contact information, social media links

### Clinic Data
- **Services**: Medical services with categories
- **Gallery**: Clinic images
- **Hero**: Business information
- **Footer**: Contact details

### Gym Data
- **Packages**: Membership packages with features
- **Classes**: Available fitness classes
- **Facilities**: Gym facilities
- **Hero**: Business branding
- **Footer**: Contact information

### User Data
- **Profile**: Name, email, phone, avatar
- **Settings**: Language, currency, theme, notifications
- **Bookings**: Active bookings/appointments per location

## Demo Mode

Currently, all hooks are in **demo mode** and use local data from the `@/data` folder. This means:

- No API calls are made
- Data is loaded instantly from local files
- Perfect for development and testing
- Easy to switch to API mode later

To switch to API mode, modify the `isDemoMode` state in `useSimplifiedData.js`:

```jsx
// In useSimplifiedData.js
useEffect(() => {
  setIsDemoMode(false); // Change to false for API mode
}, []);
```

## Example Component

See `src/hooks/examples/SimplifiedHooksExample.jsx` for a comprehensive example showing how to use all the hooks with real data.

## Data Sources

The hooks use the following data files:

- `src/data/apiDataHotel.js` - Hotel-specific data with multiple locations
- `src/data/apiDataClinic.js` - Clinic-specific data with services and gallery
- `src/data/apiDataGym.js` - Gym-specific data with packages and classes
- `src/data/apiUserData.js` - User authentication and profile data

Each data file contains:
- Multiple location support
- Location-specific data (hero, facilities, etc.)
- Helper functions for data access
- Realistic data structures matching API responses 