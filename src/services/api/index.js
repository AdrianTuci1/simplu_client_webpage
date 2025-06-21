// API Service Index - Main entry point for all API operations
// Provides unified interface with fallback to local data

import authService from '../authService';
import { 
  homeDataHotel, 
  roomsData, 
  createBookingHotel, 
  settingsHotel 
} from '../../data/apiDataHotel';
import { 
  homeDataClinic, 
  settings as settingsClinic, 
  bookAppointment, 
  cancelAppointment, 
  medics 
} from '../../data/apiDataClinic';
import { 
  homeDataGym, 
  availablePackages, 
  acquirePackage, 
  bookClass, 
  settings as settingsGym 
} from '../../data/apiDataGym';
import {
  userDataHotel,
  userDataClinic,
  userDataGym
} from '../../data/apiUserData';

// Import specialized API modules
import { HomeApi } from './homeApi';
import { UserApi } from './userApi';
import { BookingApi } from './bookingApi';
import { SettingsApi } from './settingsApi';
import { BusinessApi } from './businessApi';

class ApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
    this.useFallback = import.meta.env.VITE_USE_API_FALLBACK === 'true' || !this.baseUrl;
    this.isDemo = import.meta.env.VITE_IS_DEMO === 'true';
    
    // Initialize specialized API modules
    this.home = new HomeApi(this.baseUrl, this.useFallback, authService);
    this.user = new UserApi(this.baseUrl, this.useFallback, authService);
    this.booking = new BookingApi(this.baseUrl, this.useFallback, authService);
    this.settings = new SettingsApi(this.baseUrl, this.useFallback, authService);
    this.business = new BusinessApi(this.baseUrl, this.useFallback, authService);
  }

  // Main authentication check
  isAuthenticated() {
    return authService.isAuthenticated();
  }

  // Get current user info
  getUserInfo() {
    return authService.getUserInfo();
  }

  // Logout user
  logout() {
    authService.logout();
  }

  // Check if using fallback data
  isUsingFallback() {
    return this.useFallback || this.isDemo;
  }

  // Check if in demo mode
  isDemoMode() {
    return this.isDemo;
  }

  // Get API status
  getStatus() {
    return {
      baseUrl: this.baseUrl,
      useFallback: this.useFallback,
      isDemo: this.isDemo,
      isAuthenticated: this.isAuthenticated(),
      hasUserInfo: !!this.getUserInfo()
    };
  }

  // Legacy methods for backward compatibility
  async makeAuthenticatedRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    return await authService.makeAuthenticatedRequest(url, options);
  }

  async getUserProfile() {
    return await this.user.getProfile();
  }

  async updateUserSettings(settings) {
    return await this.settings.updateUserSettings(settings);
  }

  async getUserBookings() {
    return await this.booking.getUserBookings();
  }
}

// Create singleton instance
const apiService = new ApiService();

// Export the main service and individual modules
export default apiService;
export { 
  HomeApi, 
  UserApi, 
  BookingApi, 
  SettingsApi, 
  BusinessApi 
};

// Export fallback data for direct access if needed
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
  },
  userData: {
    hotel: userDataHotel,
    clinic: userDataClinic,
    gym: userDataGym
  }
}; 