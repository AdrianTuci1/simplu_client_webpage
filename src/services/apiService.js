// API Service that uses external OAuth tokens
// This service handles API calls using the tokens received from external OAuth provider

import authService from './authService';

class ApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
  }

  // Make authenticated API calls using external OAuth tokens
  async makeAuthenticatedRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    return await authService.makeAuthenticatedRequest(url, options);
  }

  // Example: Get user profile using external OAuth token
  async getUserProfile() {
    const response = await this.makeAuthenticatedRequest('/user/profile');
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return await response.json();
  }

  // Example: Update user settings using external OAuth token
  async updateUserSettings(settings) {
    const response = await this.makeAuthenticatedRequest('/user/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Failed to update user settings');
    }
    return await response.json();
  }

  // Example: Create booking using external OAuth token
  async createBooking(bookingData) {
    const response = await this.makeAuthenticatedRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  }

  // Example: Get available rooms using external OAuth token
  async getAvailableRooms(params) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.makeAuthenticatedRequest(`/rooms/available?${queryString}`);
    if (!response.ok) {
      throw new Error('Failed to fetch available rooms');
    }
    return await response.json();
  }

  // Example: Get user's bookings using external OAuth token
  async getUserBookings() {
    const response = await this.makeAuthenticatedRequest('/user/bookings');
    if (!response.ok) {
      throw new Error('Failed to fetch user bookings');
    }
    return await response.json();
  }

  // Check if user is authenticated before making requests
  isAuthenticated() {
    return authService.isAuthenticated();
  }

  // Get current user info from external OAuth provider
  getUserInfo() {
    return authService.getUserInfo();
  }

  // Logout user (clears all OAuth tokens)
  logout() {
    authService.logout();
  }
}

// Create singleton instance
const apiService = new ApiService();
export default apiService; 