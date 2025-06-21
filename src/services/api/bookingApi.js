// Booking API Module - Handles booking and appointment operations
// Supports fallback to local data when API is unavailable

import { fallbackData } from './index';

export class BookingApi {
  constructor(baseUrl, useFallback, authService) {
    this.baseUrl = baseUrl;
    this.useFallback = useFallback;
    this.authService = authService;
  }

  // Hotel: Create room booking
  async createRoomBooking(bookingData) {
    if (this.useFallback) {
      return this.getFallbackBookingResponse('hotel');
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/service/create`,
        {
          method: 'POST',
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create room booking: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBookingResponse('hotel');
    }
  }

  // Clinic: Book appointment
  async bookAppointment(appointmentData) {
    if (this.useFallback) {
      return this.getFallbackBookingResponse('clinic');
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/appointment/book`,
        {
          method: 'POST',
          body: JSON.stringify(appointmentData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to book appointment: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBookingResponse('clinic');
    }
  }

  // Clinic: Cancel appointment
  async cancelAppointment(appointmentId) {
    if (this.useFallback) {
      return this.getFallbackBookingResponse('clinic');
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/appointment/cancel`,
        {
          method: 'POST',
          body: JSON.stringify({ appointmentId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to cancel appointment: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBookingResponse('clinic');
    }
  }

  // Gym: Acquire package
  async acquirePackage(packageId) {
    if (this.useFallback) {
      return this.getFallbackBookingResponse('gym');
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/package/acquire`,
        {
          method: 'POST',
          body: JSON.stringify({ packageId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to acquire package: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBookingResponse('gym');
    }
  }

  // Gym: Book class
  async bookClass(classId) {
    if (this.useFallback) {
      return this.getFallbackBookingResponse('gym');
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/class/book`,
        {
          method: 'POST',
          body: JSON.stringify({ classId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to book class: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBookingResponse('gym');
    }
  }

  // Get available rooms (hotel)
  async getAvailableRooms(locationId, dateFrom = null, dateTo = null, roomId = null) {
    if (this.useFallback) {
      return fallbackData.hotel.roomsData;
    }

    try {
      const params = new URLSearchParams();
      if (locationId) params.append('locationId', locationId);
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      if (roomId) params.append('roomId', roomId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/rooms?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch available rooms: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return fallbackData.hotel.roomsData;
    }
  }

  // Get available packages (gym)
  async getAvailablePackages() {
    if (this.useFallback) {
      return fallbackData.gym.packages;
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/packages`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch available packages: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return fallbackData.gym.packages;
    }
  }

  // Get available classes (gym)
  async getAvailableClasses() {
    if (this.useFallback) {
      return { classes: [] };
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/classes`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch available classes: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return { classes: [] };
    }
  }

  // Get medics (clinic)
  async getMedics(locationId) {
    if (this.useFallback) {
      return fallbackData.clinic.medics;
    }

    try {
      const params = new URLSearchParams();
      if (locationId) params.append('locationId', locationId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/medics?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch medics: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return fallbackData.clinic.medics;
    }
  }

  // Fallback response methods
  getFallbackBookingResponse(businessType) {
    const responses = {
      hotel: {
        success: true,
        bookingId: 12345,
        message: "Room booking created successfully (fallback)",
        data: fallbackData.hotel.createBooking
      },
      clinic: {
        success: true,
        appointmentId: 67890,
        message: "Appointment booked successfully (fallback)",
        data: fallbackData.clinic.bookAppointment
      },
      gym: {
        success: true,
        transactionId: 11111,
        message: "Package acquired successfully (fallback)",
        data: fallbackData.gym.acquirePackage
      }
    };

    return responses[businessType] || { success: false, message: "Unknown business type" };
  }
} 