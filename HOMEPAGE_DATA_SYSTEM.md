# Homepage Data System

This document explains the new homepage data system that makes a single request and distributes data across multiple components based on location and business type.

## Overview

The homepage data system consists of:
1. **Single API Request**: One call to get all homepage data
2. **Data Distribution**: Data is distributed to components based on location and business type
3. **Context Provider**: React context provides data to all components
4. **Component Helpers**: Utilities for components to access their specific data

## Architecture

```
HomepageDataProvider
├── fetchHomepageData() - Single API call
├── createDataContext() - Distribute data by location
├── Home Component - Render based on business type
└── Child Components - Access data via hooks
```

## Key Files

### 1. Data Management (`src/utils/homepageDataManager.js`)
- **`fetchHomepageData(params)`**: Makes single API request or uses demo data
- **`extractLocationData(homepageData, locationId)`**: Gets location-specific data
- **`getComponentData(homepageData, locationId, businessType, componentType)`**: Gets component-specific data
- **`getBusinessLayout(businessType)`**: Returns component layout for business type
- **`createDataContext(homepageData, locationId, businessType)`**: Creates data context for components

### 2. React Context (`src/contexts/HomepageDataContext.jsx`)
- **`HomepageDataProvider`**: Provides data to all child components
- **`useHomepageData()`**: Hook to access homepage data context
- **`useComponentData(componentType)`**: Hook to get component-specific data
- **`useLocationData()`**: Hook to get location data

### 3. Component Helpers (`src/utils/componentHelpers.js`)
- **`useHeroData()`**: Hook for hero component data
- **`useDescriptionData()`**: Hook for description component data
- **`useFacilitiesData()`**: Hook for facilities component data
- **`useAttractionsData()`**: Hook for attractions component data
- **`useRoomsData()`**: Hook for rooms component data
- **`useServicesData()`**: Hook for services component data
- **`usePackagesData()`**: Hook for packages component data
- **`useClassesData()`**: Hook for classes component data
- **`useGalleryData()`**: Hook for gallery component data
- **`useFooterData()`**: Hook for footer component data
- **`useBusinessInfo()`**: Hook for business type and available pages
- **`useLocationSwitcher()`**: Hook for location switching functionality

### 4. Updated Home Component (`src/routes/Home.jsx`)
- Uses `HomepageDataProvider` to fetch and provide data
- Renders components based on business type layout
- Handles loading and error states

## Business Type Layouts

### Dental Clinic (`dental`)
```javascript
[11, 61, 22, 81, 31, 71]
// Hero, Description, Features, ClinicStats, Gallery, Footer
```

### Gym (`gym`)
```javascript
[11, 61, 21, 44, 51, 92, 71]
// Hero, Description, Features, Packages, Classes, EndInfo, Footer
```

### Hotel (`hotel`)
```javascript
[11, 61, 111, 21, 101, 92, 71]
// Hero, Description, Attractions, Features, Rooms, EndInfo, Footer
```

## Data Flow

### 1. Initial Load
```
Home Component → HomepageDataProvider → fetchHomepageData() → API/Demo Data
```

### 2. Data Distribution
```
HomepageDataProvider → createDataContext() → Component-Specific Data
```

### 3. Component Access
```
Component → useComponentData('componentType') → Specific Data
```

## Usage Examples

### In Home Component
```javascript
import { HomepageDataProvider, useHomepageData } from '../contexts/HomepageDataContext';

const Home = ({ location, tenantId }) => {
  return (
    <HomepageDataProvider tenantId={tenantId} locationId={location?.id}>
      <HomeContent location={location} />
    </HomepageDataProvider>
  );
};
```

### In Child Components
```javascript
import { useHeroData, useBusinessInfo } from '../utils/componentHelpers';

const HeroComponent = () => {
  const { data: heroData, loading, error } = useHeroData();
  const { businessType } = useBusinessInfo();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{heroData.bussinesName}</h1>
      <img src={heroData.coverImage} alt="Hero" />
    </div>
  );
};
```

### Location Switching
```javascript
import { useLocationSwitcher } from '../utils/componentHelpers';

const LocationSelector = () => {
  const { currentLocationId, switchLocation, allLocations } = useLocationSwitcher();

  return (
    <select 
      value={currentLocationId} 
      onChange={(e) => switchLocation(parseInt(e.target.value))}
    >
      {allLocations.map(location => (
        <option key={location.id} value={location.id}>
          {location.name}
        </option>
      ))}
    </select>
  );
};
```

## Data Structure

### Homepage Data Structure
```javascript
{
  tenantId: 1,
  businessType: "hotel", // or "dental", "gym"
  currentLocation: 1,
  availablePages: ["rooms", "facilities", "attractions"],
  locations: [
    {
      id: 1,
      name: "Location 1",
      slug: "location-1",
      coordinates: [lat, lng],
      address: "Address",
      phone: "Phone",
      email: "Email",
      city: "City",
      country: "Country",
      data: {
        hero: { /* hero data */ },
        description: "./description.md",
        coordinates: [lat, lng],
        facilities: [ /* facilities array */ ],
        attractions: [ /* attractions array */ ],
        rooms: [ /* rooms array */ ],
        services: [ /* services array */ ],
        packages: [ /* packages array */ ],
        classes: [ /* classes array */ ],
        gallery: [ /* gallery array */ ],
        footer: { /* footer data */ },
        clinicStats: { /* clinic stats data */ },
        medics: [ /* medics array */ ],
        treatments: [ /* treatments array */ ]
      }
    }
  ]
}
```

### Component Data Structure
Each component receives data specific to its type:

#### Hero Component
```javascript
{
  coverImage: "url",
  logoImage: "url",
  bussinesName: "Business Name",
  bussinesSlug: "business-slug",
  blurAmount: 0.2,
  tintColor: "rgba(0,0,0,0.3)"
}
```

#### Facilities Component
```javascript
[
  {
    id: 1,
    name: "Facility Name",
    images: ["url1", "url2"]
  }
]
```

## Benefits

1. **Single Request**: Only one API call for all homepage data
2. **Performance**: Reduced network requests and faster loading
3. **Consistency**: All components use the same data source
4. **Flexibility**: Easy to switch between locations and business types
5. **Maintainability**: Centralized data management
6. **Type Safety**: Structured data access through hooks
7. **Demo Support**: Seamless integration with demo mode

## Migration Guide

### From Old System
1. **Replace individual API calls** with single homepage request
2. **Update components** to use new hooks instead of individual data fetching
3. **Wrap Home component** with `HomepageDataProvider`
4. **Use component helpers** for data access

### Example Migration
```javascript
// Old way
const { data: heroData } = useSimplifiedData('hero', { locationId: 1 });

// New way
const { data: heroData } = useHeroData();
```

## Error Handling

The system includes comprehensive error handling:
- **API Errors**: Caught and displayed to user
- **Invalid Data**: Validation ensures data structure integrity
- **Missing Components**: Graceful fallbacks for missing data
- **Loading States**: Proper loading indicators

## Demo Mode Integration

The system seamlessly integrates with demo mode:
- **Automatic Detection**: Uses demo data when `VITE_DEMO_MODE=true`
- **Same Interface**: Components work the same in demo and production
- **Business Type Support**: Different demo data for each business type
- **Location Support**: Demo data includes multiple locations 