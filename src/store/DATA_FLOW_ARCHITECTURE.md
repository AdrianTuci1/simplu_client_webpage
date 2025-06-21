# Data Flow Architecture: DataService → useBusinessData → Store → Components

## Overview

This document explains how data flows through the application architecture, from the data service layer to React components, and the role of each layer in the system.

## Architecture Layers

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   dataService   │───▶│  useBusinessData │───▶│     Store       │───▶│   Components    │
│     (Data)      │    │     (Hooks)      │    │   (Zustand)     │    │   (React)       │
└─────────────────┘    └──────────────────┘    └─────────────────┘    └─────────────────┘
```

## 1. DataService Layer (`src/services/dataService.js`)

### Purpose
- **Data Source**: Provides raw business data for different business types (Hotel, Clinic, Gym)
- **Environment Configuration**: Parses `VITE_BUSINESS_TYPE` and `VITE_TENANT_ID`
- **Design Patterns**: Implements Factory, Strategy, and Singleton patterns

### Key Features
```javascript
// Singleton instance
const dataService = new DataService();

// Environment-based configuration
const businessType = getCurrentBusinessType(); // From VITE_BUSINESS_TYPE
const tenantId = getCurrentTenantId();         // From VITE_TENANT_ID

// Business-specific data providers
const hotelData = dataService.getProvider('hotel');
const clinicData = dataService.getProvider('clinic');
const gymData = dataService.getProvider('gym');
```

### Data Structure
```javascript
// Example: Hotel data structure
{
  tenantId: 100000,
  businessType: 'hotel',
  currentLocation: { id: 1, name: 'Hotel Unirii' },
  locations: [...],
  locationData: {
    hero: { title: 'Hotel Unirii', subtitle: 'București' },
    rooms: [...],
    facilities: [...],
    attractions: [...],
    footer: {...}
  }
}
```

## 2. useBusinessData Layer (`src/hooks/useBusinessData.js`)

### Purpose
- **React Integration**: Provides React hooks for data access
- **State Management**: Manages loading, error, and data states
- **Observer Pattern**: Implements real-time data synchronization
- **Command Pattern**: Encapsulates data operations

### Key Hooks

#### Environment-Based Hooks (Recommended)
```javascript
// Uses VITE_BUSINESS_TYPE and VITE_TENANT_ID automatically
const { data, loading, error } = useCurrentBusinessData();
const { data } = useCurrentHomeData();
const { data } = useCurrentSettings();
const { data } = useCurrentDataByType('hero');
```

#### Parameter-Based Hooks
```javascript
// Specify business type explicitly
const { data, loading, error } = useBusinessData('hotel');
const { data } = useDataByType('hotel', 'rooms');
const { data } = useLocationData('hotel', 1);
```

### Observer Pattern Implementation
```javascript
// Components subscribe to data changes
const { data, loading, error } = useCurrentBusinessData();

// When data changes, all subscribed components update automatically
useEffect(() => {
  if (data) {
    // Handle data update
  }
}, [data]);
```

## 3. Store Layer (`src/store/index.js`)

### Purpose
- **State Management**: Centralized state using Zustand
- **Data Transformation**: Transforms raw data into UI-ready format
- **Business Logic**: Implements business-specific strategies
- **Persistence**: Handles state persistence across sessions

### Store Structure
```javascript
const useCentralizedStore = create((set, get) => ({
  // Environment & Configuration
  environment: {
    businessType: 'hotel',
    tenantId: 100000,
    isMultiTenant: false
  },

  // Location Management
  location: {
    currentLocation: null,
    allLocations: [],
    isMultiLocation: false,
    totalLocations: 0
  },

  // Business Data (dynamic based on business type)
  businessData: {
    // Hotel: rooms, facilities, attractions
    // Clinic: services, gallery, availability
    // Gym: classes, packages, facilities
  },

  // UI State
  ui: {
    isLoading: false,
    error: null,
    isEditing: false
  },

  // Component-specific state
  hero: { title: '', subtitle: '', coverImage: '' },
  description: { text: '', location: [] },
  footer: { contact: {}, program: {}, socialMedia: [] },
  availability: { data: {}, isLoading: false, error: null }
}));
```

### Business-Specific Strategies
```javascript
const businessDataStrategies = {
  [BUSINESS_TYPES.HOTEL]: {
    getInitialState: () => ({
      rooms: [],
      facilities: [],
      attractions: []
    }),
    getDataTypes: () => ['rooms', 'facilities', 'attractions'],
    transformData: (data, type) => {
      // Transform raw data to UI format
      switch (type) {
        case 'rooms': return data?.rooms || [];
        case 'facilities': return data?.facilities || [];
        case 'attractions': return data?.attractions || [];
        default: return data;
      }
    }
  }
  // ... similar for clinic and gym
};
```

## 4. Data Flow Patterns

### Pattern 1: Direct Store Integration (Current Implementation)
```javascript
// Store calls dataService directly
import { getCurrentDataByType } from '../services/dataService';

const loadBusinessData = async (dataType) => {
  const data = getCurrentDataByType(dataType);
  const transformedData = strategy.transformData(data, dataType);
  set({ businessData: { ...state.businessData, [dataType]: transformedData } });
};
```

### Pattern 2: Hook-Based Integration (Recommended)
```javascript
// Store uses useBusinessData hooks
import { useCurrentDataByType } from '../hooks/useBusinessData';

const loadBusinessData = async (dataType) => {
  const { data } = useCurrentDataByType(dataType);
  const transformedData = strategy.transformData(data, dataType);
  set({ businessData: { ...state.businessData, [dataType]: transformedData } });
};
```

## 5. Component Usage Patterns

### Pattern 1: Store-Only Access
```javascript
import useCentralizedStore from '../store';

const MyComponent = () => {
  const { hero, businessData, ui } = useCentralizedStore();
  
  return (
    <div>
      <h1>{hero.title}</h1>
      {ui.isLoading && <Spinner />}
    </div>
  );
};
```

### Pattern 2: Hook-Only Access
```javascript
import { useCurrentBusinessData } from '../hooks/useBusinessData';

const MyComponent = () => {
  const { data, loading, error } = useCurrentBusinessData();
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      <h1>{data.homeData.locationData.hero.title}</h1>
    </div>
  );
};
```

### Pattern 3: Hybrid Access (Recommended)
```javascript
import { useCurrentBusinessData } from '../hooks/useBusinessData';
import useCentralizedStore from '../store';

const MyComponent = () => {
  // Use hooks for data fetching
  const { data, loading, error } = useCurrentBusinessData();
  
  // Use store for UI state and actions
  const { ui, setLoading, setError } = useCentralizedStore();
  
  // Sync data to store
  useEffect(() => {
    if (data && !loading) {
      // Update store with data from hooks
      initializeStore();
    }
  }, [data, loading]);
  
  return (
    <div>
      <h1>{data?.homeData?.locationData?.hero?.title}</h1>
      {ui.isLoading && <Spinner />}
    </div>
  );
};
```

## 6. Business-Specific Store Hooks

### Hotel Store
```javascript
import { useHotelStore } from '../store';

const HotelComponent = () => {
  const { rooms, facilities, attractions } = useHotelStore();
  
  return (
    <div>
      <h2>Rooms: {rooms.length}</h2>
      <h2>Facilities: {facilities.length}</h2>
      <h2>Attractions: {attractions.length}</h2>
    </div>
  );
};
```

### Clinic Store
```javascript
import { useClinicStore } from '../store';

const ClinicComponent = () => {
  const { services, gallery, availabilityCalendar } = useClinicStore();
  
  return (
    <div>
      <h2>Services: {services.length}</h2>
      <h2>Gallery: {gallery.length}</h2>
      <h2>Availability: {Object.keys(availabilityCalendar).length}</h2>
    </div>
  );
};
```

### Gym Store
```javascript
import { useGymStore } from '../store';

const GymComponent = () => {
  const { classes, packages, facilities } = useGymStore();
  
  return (
    <div>
      <h2>Classes: {classes.length}</h2>
      <h2>Packages: {packages.length}</h2>
      <h2>Facilities: {facilities.length}</h2>
    </div>
  );
};
```

## 7. Initialization Flow

### App-Level Initialization
```javascript
// In App.jsx or main component
import { useCurrentBusinessData } from '../hooks/useBusinessData';
import useCentralizedStore from '../store';

const App = () => {
  const { data, loading, error } = useCurrentBusinessData();
  const { initializeStore } = useCentralizedStore();
  
  useEffect(() => {
    if (data && !loading) {
      initializeStore();
    }
  }, [data, loading, initializeStore]);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <MainApp />;
};
```

### Component-Level Initialization
```javascript
// In individual components
const MyComponent = () => {
  const { data } = useCurrentBusinessData();
  const { loadBusinessData } = useCentralizedStore();
  
  useEffect(() => {
    if (data) {
      loadBusinessData('specificDataType');
    }
  }, [data, loadBusinessData]);
  
  // Component logic
};
```

## 8. Error Handling

### Hook-Level Error Handling
```javascript
const { data, loading, error, refresh } = useCurrentBusinessData();

if (error) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={refresh}>Retry</button>
    </div>
  );
}
```

### Store-Level Error Handling
```javascript
const { ui, setError } = useCentralizedStore();

useEffect(() => {
  if (ui.error) {
    // Handle store error (show notification, log, etc.)
    console.error('Store error:', ui.error);
  }
}, [ui.error]);
```

## 9. Performance Considerations

### Selective Re-renders
```javascript
// Subscribe only to needed state
const currentLocation = useCentralizedStore(state => state.location.currentLocation);
const isLoading = useCentralizedStore(state => state.ui.isLoading);
```

### Memoization
```javascript
const { businessData } = useCentralizedStore();
const rooms = useMemo(() => businessData.rooms || [], [businessData.rooms]);
```

### Lazy Loading
```javascript
// Load data only when needed
const { loadBusinessData } = useCentralizedStore();

const handleViewRooms = async () => {
  await loadBusinessData('rooms');
};
```

## 10. Testing Strategy

### Mock Data Service
```javascript
// Mock dataService for testing
jest.mock('../services/dataService', () => ({
  getCurrentBusinessData: () => mockBusinessData,
  getCurrentHomeData: () => mockHomeData,
  getCurrentDataByType: (type) => mockDataByType[type]
}));
```

### Mock Store
```javascript
// Mock store for testing
const mockStore = create(() => ({
  environment: { businessType: 'hotel', tenantId: 100000 },
  location: { currentLocation: null, allLocations: [] },
  businessData: { rooms: [], facilities: [] },
  ui: { isLoading: false, error: null }
}));
```

### Test Component Integration
```javascript
// Test component with both hooks and store
const TestComponent = () => {
  const { data } = useCurrentBusinessData();
  const { businessData } = useCentralizedStore();
  
  return (
    <div>
      <span data-testid="hook-data">{data?.businessType}</span>
      <span data-testid="store-data">{businessData.rooms?.length}</span>
    </div>
  );
};
```

## 11. Migration Guide

### From Direct dataService Usage
```javascript
// Before: Direct dataService usage
import dataService from '../services/dataService';
const data = dataService.getCurrentBusinessData();

// After: Use hooks
import { useCurrentBusinessData } from '../hooks/useBusinessData';
const { data } = useCurrentBusinessData();
```

### From Multiple Stores
```javascript
// Before: Multiple store imports
import useLocationStore from '../store/locationStore';
import useHeroStore from '../store/heroStore';
import useDescriptionStore from '../store/descriptionStore';

// After: Single centralized store
import useCentralizedStore from '../store';
const { location, hero, description } = useCentralizedStore();
```

## 12. Best Practices

### 1. Use Environment-Based Hooks
```javascript
// ✅ Recommended
const { data } = useCurrentBusinessData();

// ❌ Avoid unless necessary
const { data } = useBusinessData('hotel');
```

### 2. Initialize Store Early
```javascript
// ✅ Initialize in App component
useEffect(() => {
  if (data) initializeStore();
}, [data, initializeStore]);
```

### 3. Handle Loading States
```javascript
// ✅ Always handle loading and error states
const { data, loading, error } = useCurrentBusinessData();
if (loading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
```

### 4. Use Business-Specific Hooks
```javascript
// ✅ Use business-specific hooks for better type safety
const { rooms, facilities } = useHotelStore();
```

### 5. Implement Error Boundaries
```javascript
// ✅ Wrap components with error boundaries
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

## Conclusion

The data flow architecture provides a clean separation of concerns:

- **dataService**: Raw data and business logic
- **useBusinessData**: React integration and state management
- **Store**: UI state and data transformation
- **Components**: Presentation and user interaction

This architecture ensures scalability, maintainability, and type safety while providing a smooth developer experience. 