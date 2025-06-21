// User API Module - Handles user-related operations
// Supports fallback to local data when API is unavailable

import { userDataHotel, userDataClinic, userDataGym } from '../../data/apiUserData.js';
import { getCurrentBusinessType } from '../../config/businessConfig.js';

export class UserApi {
  constructor(baseUrl, useFallback, authService) {
    this.baseUrl = baseUrl;
    this.useFallback = useFallback;
    this.authService = authService;
    this.isDemo = import.meta.env.VITE_IS_DEMO === 'true';
  }

  // Get user profile
  async getProfile() {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserProfile();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/profile`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user profile: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserProfile();
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserProfile();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/profile`,
        {
          method: 'PUT',
          body: JSON.stringify(profileData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update user profile: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserProfile();
    }
  }

  // Get user bookings/appointments
  async getUserBookings(businessType = null) {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserBookings(businessType);
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/bookings`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user bookings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserBookings(businessType);
    }
  }

  // Get user appointments (clinic specific)
  async getUserAppointments() {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserAppointments();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/appointments`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user appointments: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserAppointments();
    }
  }

  // Get user packages (gym specific)
  async getUserPackages() {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserPackages();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/packages`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user packages: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserPackages();
    }
  }

  // Get user classes (gym specific)
  async getUserClasses() {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserClasses();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/classes`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user classes: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserClasses();
    }
  }

  // Get user settings
  async getUserSettings() {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserSettings();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/settings`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserSettings();
    }
  }

  // Update user settings
  async updateUserSettings(settings) {
    if (this.useFallback || this.isDemo) {
      return this.getFallbackUserSettings();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/user/settings`,
        {
          method: 'PUT',
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update user settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackUserSettings();
    }
  }

  // Helper method to get current business type
  getCurrentBusinessType() {
    return getCurrentBusinessType();
  }

  // Helper method to get user data based on business type
  getUserDataByBusinessType(businessType = null) {
    const currentBusinessType = businessType || this.getCurrentBusinessType();
    
    switch (currentBusinessType.toLowerCase()) {
      case 'hotel':
        return userDataHotel;
      case 'clinic':
        return userDataClinic;
      case 'gym':
        return userDataGym;
      default:
        console.warn(`Unknown business type: ${currentBusinessType}. Using hotel data as fallback.`);
        return userDataHotel;
    }
  }

  // Fallback data methods
  getFallbackUserProfile() {
    const userData = this.getUserDataByBusinessType();
    return {
      id: userData.userId,
      name: userData.userInfo.name,
      email: userData.userInfo.email,
      phone: userData.userInfo.phone,
      address: userData.userInfo.address,
      city: userData.userInfo.city,
      country: "Romania",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    };
  }

  getFallbackUserBookings(businessType = null) {
    const userData = this.getUserDataByBusinessType(businessType);
    
    switch (userData.userType) {
      case 'hotel':
        return {
          bookings: userData.activeBookings || []
        };
      case 'clinic':
        return {
          bookings: userData.followingAppointment || []
        };
      case 'gym':
        return {
          bookings: userData.activePackage ? [userData.activePackage] : []
        };
      default:
        return { bookings: [] };
    }
  }

  getFallbackUserAppointments() {
    const userData = this.getUserDataByBusinessType();
    
    if (userData.userType === 'clinic') {
      return {
        appointments: userData.followingAppointment || []
      };
    }
    
    return { appointments: [] };
  }

  getFallbackUserPackages() {
    const userData = this.getUserDataByBusinessType();
    
    if (userData.userType === 'gym') {
      return {
        packages: userData.activePackage ? [userData.activePackage] : []
      };
    }
    
    return { packages: [] };
  }

  getFallbackUserClasses() {
    // For demo purposes, return some sample classes
    const userData = this.getUserDataByBusinessType();
    
    if (userData.userType === 'gym') {
      return {
        classes: [
          {
            id: 1,
            classId: 1,
            className: "Yoga Class",
            date: "2025-01-01",
            time: "18:00",
            status: "booked"
          },
          {
            id: 2,
            classId: 2,
            className: "Pilates",
            date: "2025-01-02",
            time: "19:00",
            status: "booked"
          }
        ]
      };
    }
    
    return { classes: [] };
  }

  getFallbackUserSettings() {
    const userData = this.getUserDataByBusinessType();
    return userData.settings || {};
  }
} 