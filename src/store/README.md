# Centralized Store Architecture

## Overview

The centralized store (`src/store/index.js`) consolidates all business-specific stores into a single, unified state management solution that integrates seamlessly with the `dataService.js`. It uses design patterns to provide a clean, maintainable, and scalable architecture.

## Architecture Patterns

### 1. Strategy Pattern
- **Business Data Strategies**: Each business type (Hotel, Clinic, Gym) has its own strategy for handling data transformation and initialization
- **Dynamic Data Loading**: Business-specific data is loaded and transformed according to the current business type

### 2. Factory Pattern
- **Data Provider Factory**: Creates appropriate data providers based on business type
- **Store Initialization**: Dynamically initializes store state based on business configuration

### 3. Singleton Pattern
- **Centralized Store**: Single store instance manages all application state
- **Persistent Storage**: Uses Zustand's persist middleware for state persistence

## Store Structure

### Core State Sections

```javascript
{
  // Environment & Configuration
  environment: {
    businessType: 'hotel|clinic|gym',
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
    // Hotel: rooms, facilities, attractions, roomscalendar
    // Clinic: services, gallery, availabilitycalendar
    // Gym: classes, packages, facilities
  },

  // UI State
  ui: {
    isLoading: false,
    error: null,
    isEditing: false
  },

  // Hero Section
  hero: {
    coverImage: '',
    logoImage: '',
    blurAmount: 0,
    tintColor: 'rgba(0,0,0,0)',
    title: '',
    subtitle: ''
  },

  // Description
  description: {
    text: '',
    location: [44.435971971072, 26.102325776537],
    charLimit: 500
  },

  // Footer
  footer: {
    contact: { email, phone, address },
    program: { weekdays, saturday, sunday },
    socialMedia: []
  },

  // Clinic-specific: Availability
  availability: {
    data: {},
    isLoading: false,
    error: null
  }
}
```

## Usage Examples

### Basic Usage

```javascript
import useCentralizedStore from '../store';

function MyComponent() {
  const {
    environment,
    location,
    businessData,
    ui,
    hero,
    description,
    footer,
    availability,
    
    // Actions
    initializeStore,
    loadBusinessData,
    setCurrentLocation,
    setHeroData,
    setDescription,
    setLoading,
    setError
  } = useCentralizedStore();

  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <div>
      <h1>{hero.title}</h1>
      <p>{description.text}</p>
      {ui.isLoading && <Spinner />}
    </div>
  );
}
```

### Business-Specific Hooks

```javascript
// Hotel-specific hook
import { useHotelStore } from '../store';

function HotelComponent() {
  const { rooms, facilities, attractions, roomsCalendar } = useHotelStore();
  
  return (
    <div>
      <RoomsList rooms={rooms} />
      <FacilitiesList facilities={facilities} />
    </div>
  );
}

// Clinic-specific hook
import { useClinicStore } from '../store';

function ClinicComponent() {
  const { services, gallery, availabilityCalendar } = useClinicStore();
  
  return (
    <div>
      <ServicesList services={services} />
      <Gallery gallery={gallery} />
    </div>
  );
}

// Gym-specific hook
import { useGymStore } from '../store';

function GymComponent() {
  const { classes, packages, facilities } = useGymStore();
  
  return (
    <div>
      <ClassesList classes={classes} />
      <PackagesList packages={packages} />
    </div>
  );
}
```

### Data Loading

```javascript
// Load all business data
await loadBusinessData();

// Load specific data type
await loadBusinessData('rooms');
await loadBusinessData('services');
await loadBusinessData('classes');
```

### Location Management

```javascript
const { location, setCurrentLocation, switchLocation, switchLocationBySlug } = useCentralizedStore();

// Switch location by ID
switchLocation(123);

// Switch location by slug
switchLocationBySlug('unirii');

// Set custom location
setCurrentLocation({ id: 123, name: 'Unirii', slug: 'unirii' });
```

### Availability Management (Clinic-specific)

```javascript
const { 
  availability, 
  fetchMonthAvailability, 
  getAvailabilityLevel,
  getAvailableSlots 
} = useCentralizedStore();

// Fetch availability for a month
await fetchMonthAvailability(2024, 1); // January 2024

// Get availability level for a date
const level = getAvailabilityLevel(new Date('2024-01-15'));

// Get available slots for a date
const slots = getAvailableSlots(new Date('2024-01-15'));
```

## Integration with dataService

The centralized store is designed to work seamlessly with the `dataService.js`:

### Automatic Data Loading

```javascript
// Store automatically uses dataService functions
const homeData = getCurrentHomeData();
const heroData = getCurrentDataByType('hero');
const businessType = getCurrentBusinessType();
```

### Business Type Detection

```javascript
// Store automatically detects business type from environment
const { environment } = useCentralizedStore();
console.log(environment.businessType); // 'hotel', 'clinic', or 'gym'
```

### Tenant Management

```javascript
// Store automatically uses tenant ID from environment
const { environment } = useCentralizedStore();
console.log(environment.tenantId); // e.g., 100000
```

## Migration from Individual Stores

The centralized store provides backward compatibility by exporting the same hook names:

```javascript
// Old way (still works)
import useLocationStore from '../store/locationStore';
import useDescriptionStore from '../store/descriptionStore';

// New way (recommended)
import { useLocationStore, useDescriptionStore } from '../store';
```

## Business Data Strategies

### Hotel Strategy
- **Data Types**: `rooms`, `facilities`, `attractions`, `roomscalendar`
- **Initial State**: Empty arrays for rooms, facilities, attractions
- **Data Transformation**: Maps dataService response to store structure

### Clinic Strategy
- **Data Types**: `services`, `gallery`, `availabilitycalendar`
- **Initial State**: Empty arrays for services, gallery, empty object for availability
- **Data Transformation**: Handles clinic-specific data structure

### Gym Strategy
- **Data Types**: `facilities`, `packages`, `classes`
- **Initial State**: Empty arrays for classes, packages, facilities
- **Data Transformation**: Maps gym-specific data from dataService

## Best Practices

### 1. Initialize Store Early
```javascript
// In your main App component or router
useEffect(() => {
  initializeStore();
}, []);
```

### 2. Use Business-Specific Hooks
```javascript
// Instead of accessing businessData directly
const { businessData } = useCentralizedStore();
const rooms = businessData.rooms;

// Use business-specific hooks
const { rooms } = useHotelStore();
```

### 3. Handle Loading States
```javascript
const { ui, loadBusinessData } = useCentralizedStore();

useEffect(() => {
  loadBusinessData();
}, []);

if (ui.isLoading) return <Spinner />;
if (ui.error) return <ErrorMessage error={ui.error} />;
```

### 4. Use Error Boundaries
```javascript
const { ui, setError } = useCentralizedStore();

useEffect(() => {
  if (ui.error) {
    // Handle error (show notification, log, etc.)
    console.error('Store error:', ui.error);
  }
}, [ui.error]);
```

## Performance Considerations

### 1. Selective Re-renders
```javascript
// Subscribe only to needed state
const currentLocation = useCentralizedStore(state => state.location.currentLocation);
const isLoading = useCentralizedStore(state => state.ui.isLoading);
```

### 2. Memoization
```javascript
const { businessData } = useCentralizedStore();
const rooms = useMemo(() => businessData.rooms || [], [businessData.rooms]);
```

### 3. Lazy Loading
```javascript
// Load data only when needed
const { loadBusinessData } = useCentralizedStore();

const handleViewRooms = async () => {
  await loadBusinessData('rooms');
};
```

## Testing

### Mock Store for Testing
```javascript
// In your test setup
import { create } from 'zustand';

const mockStore = create(() => ({
  environment: { businessType: 'hotel', tenantId: 100000 },
  location: { currentLocation: null, allLocations: [] },
  businessData: { rooms: [], facilities: [] },
  ui: { isLoading: false, error: null },
  // ... other state
}));

// Mock the store in your tests
jest.mock('../store', () => ({
  __esModule: true,
  default: mockStore
}));
```

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live data updates
2. **Offline Support**: Enhanced offline capabilities with sync
3. **Multi-language**: Internationalization support
4. **Analytics**: Built-in analytics and tracking
5. **Plugin System**: Extensible architecture for custom business types

## Troubleshooting

### Common Issues

1. **Store not initializing**: Ensure `initializeStore()` is called early in the app lifecycle
2. **Data not loading**: Check that `dataService` is properly configured with environment variables
3. **Business type mismatch**: Verify `VITE_BUSINESS_TYPE` environment variable is set correctly
4. **Persistent state issues**: Check browser storage and clear if needed

### Debug Mode

```javascript
// Enable debug logging
const { environment, businessData } = useCentralizedStore();
console.log('Store State:', { environment, businessData });
``` 