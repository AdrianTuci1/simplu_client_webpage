# API Service Directory

This directory contains a modular API service architecture with fallback support to local data files.

## 📁 Directory Structure

```
src/services/api/
├── index.js          # Main API service entry point
├── homeApi.js        # Homepage and business data operations
├── userApi.js        # User profile and account operations
├── bookingApi.js     # Booking and appointment operations
├── settingsApi.js    # User and business settings
├── businessApi.js    # Business-specific operations
└── README.md         # This documentation
```

## 🏗️ Architecture Overview

### **Modular Design**
- **Separation of Concerns**: Each API module handles specific business domains
- **Unified Interface**: Main `index.js` provides a single entry point
- **Fallback Support**: Automatic fallback to local data when API is unavailable
- **Business-Specific**: Tailored operations for hotel, clinic, and gym businesses

### **Fallback Strategy**
- **Environment-Based**: Controlled by `VITE_USE_API_FALLBACK` environment variable
- **Automatic Detection**: Falls back when API base URL is not configured
- **Local Data Integration**: Uses `src/data/` directory as fallback source
- **Graceful Degradation**: Maintains functionality even without API connectivity

## 🚀 Usage

### **Basic Usage**

```javascript
import apiService from '../services/api';

// Check API status
const status = apiService.getStatus();
console.log('Using fallback:', status.useFallback);

// Get homepage data
const homeData = await apiService.home.getHomeData('hotel', 1);

// Get user profile
const profile = await apiService.user.getProfile();

// Create booking
const booking = await apiService.booking.createRoomBooking(bookingData);
```

### **Business-Specific Operations**

```javascript
// Hotel operations
const rooms = await apiService.booking.getAvailableRooms(1, '2025-01-01', '2025-01-03');
const booking = await apiService.booking.createRoomBooking(bookingData);

// Clinic operations
const medics = await apiService.booking.getMedics(1);
const appointment = await apiService.booking.bookAppointment(appointmentData);

// Gym operations
const packages = await apiService.booking.getAvailablePackages();
const packageAcquisition = await apiService.booking.acquirePackage(1);
```

### **Settings Management**

```javascript
// User settings
const userSettings = await apiService.settings.getUserSettings();
await apiService.settings.updateUserSettings(newSettings);

// Business settings
const businessSettings = await apiService.settings.getBusinessSettings('hotel');
await apiService.settings.updateBusinessSettings(settings, 'hotel');

// Notification settings
const notifications = await apiService.settings.getNotificationSettings();
await apiService.settings.updateNotificationSettings(notificationSettings);
```

## 📊 API Modules

### **HomeApi** (`homeApi.js`)
Handles homepage and business data operations.

**Key Methods:**
- `getHomeData(businessType, locationId, requestUrl)` - Get complete homepage data
- `getHeroData(businessType, locationId)` - Get hero section data
- `getFacilitiesData(businessType, locationId)` - Get facilities information
- `getGalleryData(businessType, locationId)` - Get gallery images
- `getFooterData(businessType, locationId)` - Get footer information

### **UserApi** (`userApi.js`)
Manages user profile and account operations.

**Key Methods:**
- `getProfile()` - Get user profile information
- `updateProfile(profileData)` - Update user profile
- `getUserBookings(businessType)` - Get user bookings/appointments
- `getUserAppointments()` - Get clinic appointments
- `getUserPackages()` - Get gym packages
- `getUserClasses()` - Get gym classes

### **BookingApi** (`bookingApi.js`)
Handles all booking and appointment operations.

**Key Methods:**
- `createRoomBooking(bookingData)` - Hotel room booking
- `bookAppointment(appointmentData)` - Clinic appointment booking
- `cancelAppointment(appointmentId)` - Cancel clinic appointment
- `acquirePackage(packageId)` - Gym package acquisition
- `bookClass(classId)` - Gym class booking
- `getAvailableRooms(locationId, dateFrom, dateTo)` - Get available hotel rooms
- `getMedics(locationId)` - Get clinic medics

### **SettingsApi** (`settingsApi.js`)
Manages user and business settings.

**Key Methods:**
- `getUserSettings(tenantId, userId)` - Get user settings
- `updateUserSettings(settings, tenantId, userId)` - Update user settings
- `getBusinessSettings(businessType, tenantId)` - Get business settings
- `getNotificationSettings(userId)` - Get notification preferences
- `getLanguageSettings()` - Get language configuration

### **BusinessApi** (`businessApi.js`)
Handles business-specific operations and analytics.

**Key Methods:**
- `getBusinessInfo(businessType, tenantId)` - Get business information
- `getBusinessAnalytics(businessType, dateFrom, dateTo)` - Get business analytics
- `getBusinessLocations(businessType)` - Get business locations
- `getBusinessServices(locationId)` - Get clinic services
- `getBusinessContact(businessType, locationId)` - Get contact information
- `getBusinessSocialMedia(businessType, locationId)` - Get social media links

## 🔧 Configuration

### **Environment Variables**

```bash
# API Configuration
VITE_API_BASE_URL=https://api.example.com
VITE_USE_API_FALLBACK=true

# OAuth Configuration (for authentication)
VITE_OAUTH_CLIENT_ID=your_client_id
VITE_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

### **Fallback Data Structure**

The API service uses the following fallback data structure:

```javascript
export const fallbackData = {
  hotel: {
    homeData: homeDataHotel,
    roomsData,
    createBooking: createBookingHotel,
    settings: settingsHotel
  },
  clinic: {
    homeData: homeDataClinic,
    settings: settingsClinic,
    bookAppointment,
    cancelAppointment,
    medics
  },
  gym: {
    homeData: homeDataGym,
    packages: availablePackages,
    acquirePackage,
    bookClass,
    settings: settingsGym
  }
};
```

## 🔄 Data Flow

### **API-First Flow**
```
Component → API Service → External API → Response
```

### **Fallback Flow**
```
Component → API Service → Local Data → Response
```

### **Hybrid Flow**
```
Component → API Service → External API → Error → Local Data → Response
```

## 🛡️ Error Handling

### **Automatic Fallback**
- API calls automatically fall back to local data on failure
- Console warnings are logged for debugging
- No application crashes due to API failures

### **Error Types**
- **Network Errors**: Connection timeouts, DNS failures
- **HTTP Errors**: 4xx/5xx status codes
- **Authentication Errors**: Invalid tokens, expired sessions
- **Data Errors**: Malformed responses, missing fields

### **Error Recovery**
```javascript
try {
  const data = await apiService.home.getHomeData('hotel');
  // Use API data
} catch (error) {
  // Fallback data is automatically used
  console.log('Using fallback data due to:', error.message);
}
```

## 🧪 Testing

### **Unit Testing**
```javascript
// Mock API service for testing
jest.mock('../services/api', () => ({
  home: {
    getHomeData: jest.fn().mockResolvedValue(mockHomeData)
  },
  user: {
    getProfile: jest.fn().mockResolvedValue(mockUserProfile)
  }
}));
```

### **Integration Testing**
```javascript
// Test with fallback mode
process.env.VITE_USE_API_FALLBACK = 'true';
const apiService = new ApiService();
const data = await apiService.home.getHomeData('hotel');
expect(data).toEqual(expectedFallbackData);
```

## 🔄 Migration Guide

### **From Old API Service**
```javascript
// Old way
import apiService from '../services/apiService';
const profile = await apiService.getUserProfile();

// New way
import apiService from '../services/api';
const profile = await apiService.user.getProfile();
```

### **From Direct Data Imports**
```javascript
// Old way
import { homeDataHotel } from '../data/apiDataHotel';

// New way
import apiService from '../services/api';
const homeData = await apiService.home.getHomeData('hotel');
```

## 📈 Performance Considerations

### **Caching Strategy**
- Local data is cached in memory
- API responses can be cached using browser storage
- Consider implementing request deduplication

### **Optimization Tips**
- Use specific API methods instead of generic ones
- Implement request batching for multiple calls
- Consider lazy loading for non-critical data

## 🔮 Future Enhancements

### **Planned Features**
- **Request Caching**: Implement intelligent caching strategy
- **Retry Logic**: Add exponential backoff for failed requests
- **Request Queuing**: Queue requests during offline periods
- **Real-time Updates**: WebSocket integration for live data
- **Offline Support**: Service worker for offline functionality

### **Extensibility**
- **Plugin System**: Allow custom API modules
- **Middleware Support**: Request/response interceptors
- **Custom Fallbacks**: User-defined fallback strategies
- **Analytics Integration**: Track API usage and performance 