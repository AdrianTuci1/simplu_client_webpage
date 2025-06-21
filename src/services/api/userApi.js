// User API Module - Handles user-related operations
// Supports fallback to local data when API is unavailable

export class UserApi {
  constructor(baseUrl, useFallback, authService) {
    this.baseUrl = baseUrl;
    this.useFallback = useFallback;
    this.authService = authService;
  }

  // Get user profile
  async getProfile() {
    if (this.useFallback) {
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
    if (this.useFallback) {
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
  async getUserBookings(businessType = 'hotel') {
    if (this.useFallback) {
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
    if (this.useFallback) {
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
    if (this.useFallback) {
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
    if (this.useFallback) {
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

  // Fallback data methods
  getFallbackUserProfile() {
    return {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+40722222222",
      address: "Strada Example, nr. 1, Cluj-Napoca",
      city: "Cluj-Napoca",
      country: "Romania",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    };
  }

  getFallbackUserBookings(businessType) {
    switch (businessType) {
      case 'hotel':
        return {
          bookings: [
            {
              id: 1,
              roomId: 1,
              roomName: "Room 1",
              dateFrom: "2025-01-01",
              dateTo: "2025-01-03",
              adults: 2,
              status: "confirmed"
            }
          ]
        };
      default:
        return { bookings: [] };
    }
  }

  getFallbackUserAppointments() {
    return {
      appointments: [
        {
          id: 1,
          serviceId: 1,
          serviceName: "Dental Checkup",
          date: "2025-01-01",
          time: "10:00",
          status: "confirmed"
        }
      ]
    };
  }

  getFallbackUserPackages() {
    return {
      packages: [
        {
          id: 1,
          packageId: 1,
          packageName: "Premium Package",
          startDate: "2025-01-01",
          endDate: "2025-02-01",
          status: "active"
        }
      ]
    };
  }

  getFallbackUserClasses() {
    return {
      classes: [
        {
          id: 1,
          classId: 1,
          className: "Yoga Class",
          date: "2025-01-01",
          time: "18:00",
          status: "booked"
        }
      ]
    };
  }
} 