# Store Registry Pattern

## Overview

The Store Registry Pattern is an architecture where each component has its own dedicated store, but all stores are imported from a centralized registry (`src/store/index.js`). This provides better separation of concerns while maintaining a single import point.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    src/store/index.js                       │
│                    (Registry/Index)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │locationStore│ │  heroStore  │ │description  │           │
│  │             │ │             │ │   Store     │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │footerStore  │ │clinicAvail  │ │classesStore │           │
│  │             │ │   Store     │ │             │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │packagesStore│ │Centralized  │ │Business     │           │
│  │             │ │   Store     │ │  Hooks      │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Benefits

1. **Separation of Concerns**: Each component has its own dedicated store
2. **Single Import Point**: All stores imported from one location
3. **Better Organization**: Clear structure and easy to find stores
4. **Independent Development**: Teams can work on different stores independently
5. **Type Safety**: Each store can have its own TypeScript types
6. **Testing**: Easier to mock individual stores for testing

## Store Structure

### 1. Component-Specific Stores

Each component has its own store with focused responsibility:

```javascript
// src/store/locationStore.js
const useLocationStore = create((set, get) => ({
  currentLocation: null,
  allLocations: [],
  initializeLocations: () => { /* ... */ },
  setCurrentLocation: (location) => { /* ... */ },
  switchLocation: (locationId) => { /* ... */ }
}));

// src/store/heroStore.js
const useHeroStore = create((set) => ({
  coverImage: '',
  logoImage: '',
  title: '',
  subtitle: '',
  setCoverImage: (image) => set({ coverImage: image }),
  setTitle: (title) => set({ title })
}));

// src/store/descriptionStore.js
const useDescriptionStore = create((set) => ({
  description: '',
  location: [44.435971971072, 26.102325776537],
  setDescription: (text) => set({ description: text }),
  setLocation: (coords) => set({ location: coords })
}));
```

### 2. Centralized Registry

The main store file acts as a registry/index:

```javascript
// src/store/index.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Business-specific data strategies
const businessDataStrategies = {
  [BUSINESS_TYPES.HOTEL]: { /* ... */ },
  [BUSINESS_TYPES.CLINIC]: { /* ... */ },
  [BUSINESS_TYPES.GYM]: { /* ... */ }
};

// Centralized store for business data and environment
const useCentralizedStore = create(
  persist(
    (set, get) => ({
      // Environment and Configuration
      environment: {
        businessType: currentBusinessType,
        tenantId: currentTenantId,
        isMultiTenant: false
      },

      // Business Data (dynamic based on business type)
      businessData: businessStrategy ? businessStrategy.getInitialState() : {},

      // UI State
      ui: {
        isLoading: false,
        error: null,
        isEditing: false
      },

      // Actions
      loadBusinessData: async (dataType) => { /* ... */ },
      initializeStore: async () => { /* ... */ },
      setLoading: (isLoading) => set((state) => ({ /* ... */ }))
    }),
    {
      name: 'centralized-store',
      partialize: (state) => ({
        environment: state.environment,
        businessData: state.businessData
      })
    }
  )
);

// Export the centralized store
export default useCentralizedStore;

// Import and re-export all component-specific stores
export { default as useLocationStore } from './locationStore';
export { default as useHeroStore } from './heroStore';
export { default as useDescriptionStore } from './descriptionStore';
export { default as useFooterStore } from './footerStore';
export { default as useClinicAvailabilityStore } from './clinicAvailabilityStore';
export { default as useClassesStore } from './useClassesStore';
export { default as usePackagesStore } from './packages/packagesStore';

// Business-specific convenience hooks
export const useHotelStore = () => {
  const store = useCentralizedStore();
  return {
    ...store,
    rooms: store.businessData.rooms || [],
    facilities: store.businessData.facilities || [],
    attractions: store.businessData.attractions || []
  };
};

export const useClinicStore = () => {
  const store = useCentralizedStore();
  return {
    ...store,
    services: store.businessData.services || [],
    gallery: store.businessData.gallery || [],
    availabilityCalendar: store.businessData.availabilitycalendar || {}
  };
};

export const useGymStore = () => {
  const store = useCentralizedStore();
  return {
    ...store,
    classes: store.businessData.classes || [],
    packages: store.businessData.packages || [],
    facilities: store.businessData.facilities || []
  };
};
```

## Usage in Components

### Basic Component Usage

```javascript
// Import from centralized registry
import { 
  useLocationStore,
  useHeroStore,
  useDescriptionStore,
  useFooterStore
} from '../store';

const MyComponent = () => {
  // Use component-specific stores
  const locationStore = useLocationStore();
  const heroStore = useHeroStore();
  const descriptionStore = useDescriptionStore();
  const footerStore = useFooterStore();

  return (
    <div>
      <h1>{heroStore.title}</h1>
      <p>{descriptionStore.description}</p>
      <p>Location: {locationStore.currentLocation?.name}</p>
      <p>Contact: {footerStore.contact.email}</p>
    </div>
  );
};
```

### Component with Business Data

```javascript
import { 
  useCentralizedStore,
  useLocationStore,
  useHeroStore,
  useHotelStore // Business-specific hook
} from '../store';

const HotelComponent = () => {
  // Centralized store for business data and environment
  const {
    environment,
    businessData,
    ui,
    loadBusinessData,
    initializeStore
  } = useCentralizedStore();

  // Component-specific stores
  const locationStore = useLocationStore();
  const heroStore = useHeroStore();

  // Business-specific data
  const { rooms, facilities, attractions } = useHotelStore();

  useEffect(() => {
    const initStores = async () => {
      await initializeStore();
      locationStore.initializeLocations();
      heroStore.fetchHeroData();
    };
    initStores();
  }, []);

  return (
    <div>
      <h1>{heroStore.title}</h1>
      <p>Business Type: {environment.businessType}</p>
      <p>Rooms: {rooms.length}</p>
      <p>Facilities: {facilities.length}</p>
      {ui.isLoading && <Spinner />}
    </div>
  );
};
```

### Complex Component with Multiple Stores

```javascript
import { 
  useCentralizedStore,
  useLocationStore,
  useHeroStore,
  useDescriptionStore,
  useFooterStore,
  useClinicAvailabilityStore,
  useClinicStore
} from '../store';

const ClinicDashboard = () => {
  // Centralized store
  const { environment, ui, loadBusinessData } = useCentralizedStore();

  // Component-specific stores
  const locationStore = useLocationStore();
  const heroStore = useHeroStore();
  const descriptionStore = useDescriptionStore();
  const footerStore = useFooterStore();
  const clinicAvailabilityStore = useClinicAvailabilityStore();

  // Business-specific data
  const { services, gallery, availabilityCalendar } = useClinicStore();

  const handleFetchAvailability = async () => {
    await clinicAvailabilityStore.fetchMonthAvailability(2024, 1);
  };

  return (
    <div>
      <header>
        <h1>{heroStore.title}</h1>
        <p>{descriptionStore.description}</p>
        <p>Location: {locationStore.currentLocation?.name}</p>
      </header>

      <main>
        <section>
          <h2>Services ({services.length})</h2>
          {/* Services list */}
        </section>

        <section>
          <h2>Availability</h2>
          <button onClick={handleFetchAvailability}>
            Fetch Availability
          </button>
          {clinicAvailabilityStore.isLoading && <Spinner />}
        </section>
      </main>

      <footer>
        <p>Contact: {footerStore.contact.email}</p>
        <p>Phone: {footerStore.contact.phone}</p>
      </footer>
    </div>
  );
};
```

## Data Flow

### 1. Component-Specific Data Flow

```
Component → Component Store → Component State
```

```javascript
// Component updates its own store
const heroStore = useHeroStore();
heroStore.setTitle('New Title');
```

### 2. Business Data Flow

```
Component → Centralized Store → dataService → Business Data
```

```javascript
// Component loads business data through centralized store
const { loadBusinessData } = useCentralizedStore();
await loadBusinessData('rooms');
```

### 3. Cross-Store Communication

```
Component Store A → Component Store B (via component)
```

```javascript
// Component coordinates between stores
const locationStore = useLocationStore();
const heroStore = useHeroStore();

const handleLocationChange = (location) => {
  locationStore.setCurrentLocation(location);
  heroStore.setTitle(`${location.name} - ${heroStore.title}`);
};
```

## Store Initialization

### App-Level Initialization

```javascript
// In App.jsx
import { 
  useCentralizedStore,
  useLocationStore,
  useHeroStore,
  useDescriptionStore
} from '../store';

const App = () => {
  const { initializeStore, setLoading, setError } = useCentralizedStore();
  const locationStore = useLocationStore();
  const heroStore = useHeroStore();
  const descriptionStore = useDescriptionStore();

  useEffect(() => {
    const initAllStores = async () => {
      setLoading(true);
      try {
        // Initialize centralized store
        await initializeStore();
        
        // Initialize component-specific stores
        locationStore.initializeLocations();
        heroStore.fetchHeroData();
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    initAllStores();
  }, []);

  return <MainApp />;
};
```

### Component-Level Initialization

```javascript
// In individual components
const MyComponent = () => {
  const { loadBusinessData } = useCentralizedStore();
  const locationStore = useLocationStore();

  useEffect(() => {
    // Initialize when component mounts
    if (locationStore.allLocations.length === 0) {
      locationStore.initializeLocations();
    }
  }, []);

  // Component logic
};
```

## Testing Strategy

### Mock Individual Stores

```javascript
// Mock specific stores for testing
jest.mock('../store', () => ({
  useLocationStore: () => ({
    currentLocation: { id: 1, name: 'Test Location' },
    allLocations: [{ id: 1, name: 'Test Location' }],
    setCurrentLocation: jest.fn(),
    initializeLocations: jest.fn()
  }),
  useHeroStore: () => ({
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    setTitle: jest.fn(),
    setSubtitle: jest.fn()
  }),
  useCentralizedStore: () => ({
    environment: { businessType: 'hotel', tenantId: 100000 },
    businessData: { rooms: [], facilities: [] },
    ui: { isLoading: false, error: null },
    loadBusinessData: jest.fn(),
    initializeStore: jest.fn()
  })
}));
```

### Test Store Integration

```javascript
// Test component with multiple stores
const TestComponent = () => {
  const locationStore = useLocationStore();
  const heroStore = useHeroStore();
  const { environment } = useCentralizedStore();

  return (
    <div>
      <span data-testid="location">{locationStore.currentLocation?.name}</span>
      <span data-testid="title">{heroStore.title}</span>
      <span data-testid="business-type">{environment.businessType}</span>
    </div>
  );
};
```

## Migration Guide

### From Single Centralized Store

```javascript
// Before: Everything in one store
const { hero, location, description } = useCentralizedStore();

// After: Separate stores
const heroStore = useHeroStore();
const locationStore = useLocationStore();
const descriptionStore = useDescriptionStore();
```

### From Multiple Import Files

```javascript
// Before: Multiple imports
import useLocationStore from '../store/locationStore';
import useHeroStore from '../store/heroStore';
import useDescriptionStore from '../store/descriptionStore';

// After: Single import from registry
import { 
  useLocationStore,
  useHeroStore,
  useDescriptionStore
} from '../store';
```

## Best Practices

### 1. Keep Stores Focused

```javascript
// ✅ Good: Focused store
const useHeroStore = create((set) => ({
  title: '',
  subtitle: '',
  coverImage: '',
  setTitle: (title) => set({ title }),
  setSubtitle: (subtitle) => set({ subtitle })
}));

// ❌ Bad: Store with too many responsibilities
const useHeroStore = create((set) => ({
  title: '',
  subtitle: '',
  userData: {}, // Should be in userStore
  settings: {}, // Should be in settingsStore
  setTitle: (title) => set({ title })
}));
```

### 2. Use Business-Specific Hooks

```javascript
// ✅ Good: Use business-specific hooks
const { rooms, facilities } = useHotelStore();

// ❌ Bad: Access business data directly
const { businessData } = useCentralizedStore();
const rooms = businessData.rooms;
```

### 3. Initialize Stores Properly

```javascript
// ✅ Good: Initialize in App component
useEffect(() => {
  initializeStore();
  locationStore.initializeLocations();
}, []);

// ❌ Bad: Initialize in every component
useEffect(() => {
  // This will run multiple times
  initializeStore();
}, []);
```

### 4. Handle Loading States

```javascript
// ✅ Good: Handle loading states
const { ui } = useCentralizedStore();
if (ui.isLoading) return <Spinner />;

// ❌ Bad: No loading state handling
return <Component />;
```

## Conclusion

The Store Registry Pattern provides:

- **Better Organization**: Each component has its own store
- **Single Import Point**: All stores imported from one location
- **Separation of Concerns**: Clear responsibilities for each store
- **Scalability**: Easy to add new stores and components
- **Maintainability**: Changes to one store don't affect others
- **Testing**: Easier to mock and test individual stores

This pattern is ideal for large applications where different teams work on different components and you want to maintain clear boundaries between different parts of the application state. 