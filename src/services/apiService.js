// Legacy API Service - Redirects to new modular API service
// This file maintains backward compatibility while using the new architecture

import apiService from './api';

// Re-export the main API service for backward compatibility
export default apiService;

// Re-export individual modules for direct access
export { 
  HomeApi, 
  UserApi, 
  BookingApi, 
  SettingsApi, 
  BusinessApi 
} from './api';

// Re-export fallback data
export { fallbackData } from './api';

// Legacy method aliases for backward compatibility
const legacyApiService = {
  // Main service methods
  ...apiService,

  // Legacy method aliases
  async makeAuthenticatedRequest(endpoint, options = {}) {
    return await apiService.makeAuthenticatedRequest(endpoint, options);
  },

  async getUserProfile() {
    return await apiService.getUserProfile();
  },

  async updateUserSettings(settings) {
    return await apiService.updateUserSettings(settings);
  },

  async getUserBookings() {
    return await apiService.getUserBookings();
  },

  // Additional legacy methods that might be used
  async getHomeData(businessType, locationId) {
    return await apiService.home.getHomeData(businessType, locationId);
  },

  async getBusinessSettings(businessType) {
    return await apiService.settings.getBusinessSettings(businessType);
  },

  async createBooking(bookingData) {
    return await apiService.booking.createRoomBooking(bookingData);
  },

  async bookAppointment(appointmentData) {
    return await apiService.booking.bookAppointment(appointmentData);
  },

  async getAvailableRooms(locationId, dateFrom, dateTo) {
    return await apiService.booking.getAvailableRooms(locationId, dateFrom, dateTo);
  },

  async getMedics(locationId) {
    return await apiService.booking.getMedics(locationId);
  },

  async getPackages() {
    return await apiService.booking.getAvailablePackages();
  },

  async acquirePackage(packageId) {
    return await apiService.booking.acquirePackage(packageId);
  },

  async bookClass(classId) {
    return await apiService.booking.bookClass(classId);
  }
};

// Export the legacy service with backward compatibility
export { legacyApiService };

// Console warning for developers
console.warn(
  '⚠️  The old apiService.js is deprecated. ' +
  'Please migrate to the new modular API service at src/services/api/. ' +
  'See src/services/api/README.md for migration guide.'
); 