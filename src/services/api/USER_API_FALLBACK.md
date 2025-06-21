# User API Fallback Data Implementation

## Overview

The UserApi module now supports fallback data from `apiUserData.js` when the `VITE_IS_DEMO` environment variable is set to "true". This allows for easy testing and demonstration without requiring a live API connection.

## Environment Variables

### VITE_IS_DEMO
- **Type**: String
- **Values**: "true" | "false" (or any other value)
- **Default**: "false"
- **Purpose**: When set to "true", all UserApi methods will use fallback data instead of making API calls

### VITE_USE_API_FALLBACK
- **Type**: String
- **Values**: "true" | "false"
- **Default**: "false"
- **Purpose**: When set to "true" or when no API base URL is provided, API calls will fall back to local data

## Fallback Data Structure

The fallback data is organized by business type in `src/data/apiUserData.js`:

### Hotel User Data (`userDataHotel`)
```javascript
{
  tenantId: 1,
  userId: 1,
  userRole: "user",
  userType: "hotel",
  settings: { /* user settings */ },
  userInfo: { /* user profile info */ },
  activeBookings: [ /* hotel bookings */ ]
}
```

### Clinic User Data (`userDataClinic`)
```javascript
{
  tenantId: 1,
  userId: 1,
  userRole: "user",
  userType: "clinic",
  settings: { /* user settings */ },
  userInfo: { /* user profile info */ },
  followingAppointment: [ /* clinic appointments */ ]
}
```

### Gym User Data (`userDataGym`)
```javascript
{
  tenantId: 1,
  userId: 1,
  userRole: "user",
  userType: "gym",
  settings: { /* user settings */ },
  userInfo: { /* user profile info */ },
  activePackage: { /* gym package */ }
}
```

## API Methods

### User Profile
```javascript
// Get user profile
const profile = await apiService.user.getProfile();

// Update user profile
const updatedProfile = await apiService.user.updateProfile(profileData);
```

### User Bookings/Appointments
```javascript
// Get user bookings (business-type specific)
const hotelBookings = await apiService.user.getUserBookings('hotel');
const clinicAppointments = await apiService.user.getUserAppointments();
const gymPackages = await apiService.user.getUserPackages();
const gymClasses = await apiService.user.getUserClasses();
```

### User Settings
```javascript
// Get user settings
const settings = await apiService.user.getUserSettings();

// Update user settings
const updatedSettings = await apiService.user.updateUserSettings(newSettings);
```

## Business Type Detection

The UserApi automatically detects the current business type using the `getCurrentBusinessType()` function from the business configuration. This ensures that the appropriate fallback data is used for each business type.

## Demo Mode Usage

### Enable Demo Mode
Set the environment variable in your `.env` file:
```bash
VITE_IS_DEMO=true
```

### Check Demo Mode Status
```javascript
// Check if in demo mode
const isDemo = apiService.isDemoMode();

// Check if using fallback data
const usingFallback = apiService.isUsingFallback();

// Get full API status
const status = apiService.getStatus();
console.log(status.isDemo); // true/false
```

### Demo Mode Behavior
When `VITE_IS_DEMO=true`:
- All UserApi methods return fallback data immediately
- No API calls are made
- Data is business-type specific
- Console warnings are logged for API call attempts

## Testing

Use the `ApiServiceExample` component to test the fallback functionality:

1. Set `VITE_IS_DEMO=true` in your environment
2. Navigate to the example component
3. Click "Test Demo Mode" to verify fallback behavior
4. Click "Test User Data" to test all user data operations

## Fallback Data Sources

The fallback data comes from:
- `src/data/apiUserData.js` - User-specific data for each business type
- Business type detection from `src/config/businessConfig.js`
- Environment configuration from `src/services/dataService.js`

## Error Handling

When API calls fail, the UserApi automatically falls back to local data and logs a warning:
```javascript
console.warn('API call failed, using fallback data:', error.message);
```

This ensures graceful degradation when the API is unavailable, even when not in demo mode. 