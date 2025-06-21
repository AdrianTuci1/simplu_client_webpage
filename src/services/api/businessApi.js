// Business API Module - Handles business-specific operations and data
// Supports fallback to local data when API is unavailable

import { fallbackData } from './index';

export class BusinessApi {
  constructor(baseUrl, useFallback, authService) {
    this.baseUrl = baseUrl;
    this.useFallback = useFallback;
    this.authService = authService;
  }

  // Get business information
  async getBusinessInfo(businessType, tenantId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessInfo(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (tenantId) params.append('tenantId', tenantId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/info?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business info: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessInfo(businessType);
    }
  }

  // Get business analytics
  async getBusinessAnalytics(businessType, dateFrom = null, dateTo = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessAnalytics(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/analytics?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business analytics: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessAnalytics(businessType);
    }
  }

  // Get business locations
  async getBusinessLocations(businessType) {
    if (this.useFallback) {
      return this.getFallbackBusinessLocations(businessType);
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/locations`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business locations: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessLocations(businessType);
    }
  }

  // Get business services (clinic specific)
  async getBusinessServices(locationId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessServices();
    }

    try {
      const params = new URLSearchParams();
      if (locationId) params.append('locationId', locationId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/services?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business services: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessServices();
    }
  }

  // Get business facilities
  async getBusinessFacilities(businessType, locationId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessFacilities(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (locationId) params.append('locationId', locationId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/facilities?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business facilities: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessFacilities(businessType);
    }
  }

  // Get business gallery
  async getBusinessGallery(businessType, locationId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessGallery(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (locationId) params.append('locationId', locationId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/gallery?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business gallery: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessGallery(businessType);
    }
  }

  // Get business contact information
  async getBusinessContact(businessType, locationId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessContact(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (locationId) params.append('locationId', locationId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/contact?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business contact: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessContact(businessType);
    }
  }

  // Get business social media
  async getBusinessSocialMedia(businessType, locationId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessSocialMedia(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (locationId) params.append('locationId', locationId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/social-media?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business social media: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessSocialMedia(businessType);
    }
  }

  // Update business information
  async updateBusinessInfo(businessData, businessType, tenantId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessInfo(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (tenantId) params.append('tenantId', tenantId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/info?${params.toString()}`,
        {
          method: 'PUT',
          body: JSON.stringify(businessData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update business info: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessInfo(businessType);
    }
  }

  // Fallback data methods
  getFallbackBusinessInfo(businessType) {
    const homeData = this.getFallbackHomeData(businessType);
    return {
      tenantId: homeData.tenantId,
      businessType: homeData.businessType,
      businessName: homeData.locationData?.hero?.bussinesName || 'Business Name',
      businessSlug: homeData.locationData?.hero?.bussinesSlug || 'business-slug',
      description: 'Business description from fallback data',
      established: '2020',
      employees: 50,
      rating: 4.5,
      reviews: 150
    };
  }

  getFallbackBusinessAnalytics(businessType) {
    return {
      totalBookings: 1250,
      totalRevenue: 45000,
      averageRating: 4.5,
      customerSatisfaction: 92,
      monthlyGrowth: 15,
      topServices: [
        { name: 'Service 1', bookings: 150 },
        { name: 'Service 2', bookings: 120 },
        { name: 'Service 3', bookings: 100 }
      ]
    };
  }

  getFallbackBusinessLocations(businessType) {
    const homeData = this.getFallbackHomeData(businessType);
    return homeData.locations || [];
  }

  getFallbackBusinessServices() {
    return {
      services: [
        {
          id: 1,
          name: "Service 1",
          category: "Category 1",
          description: "Service description",
          price: 100,
          duration: "60 minutes"
        },
        {
          id: 2,
          name: "Service 2",
          category: "Category 2",
          description: "Service description",
          price: 150,
          duration: "90 minutes"
        }
      ]
    };
  }

  getFallbackBusinessFacilities(businessType) {
    const homeData = this.getFallbackHomeData(businessType);
    return homeData.locationData?.facilities || [];
  }

  getFallbackBusinessGallery(businessType) {
    const homeData = this.getFallbackHomeData(businessType);
    return homeData.locationData?.gallery || [];
  }

  getFallbackBusinessContact(businessType) {
    const homeData = this.getFallbackHomeData(businessType);
    const footer = homeData.locationData?.footer;
    
    return {
      phone: footer?.phone || '+40722222222',
      email: footer?.email || 'contact@business.com',
      address: footer?.address || 'Business Address',
      city: footer?.city || 'Cluj-Napoca',
      country: footer?.country || 'Romania',
      workingHours: {
        monday: '09:00 - 18:00',
        tuesday: '09:00 - 18:00',
        wednesday: '09:00 - 18:00',
        thursday: '09:00 - 18:00',
        friday: '09:00 - 18:00',
        saturday: '09:00 - 14:00',
        sunday: 'Closed'
      }
    };
  }

  getFallbackBusinessSocialMedia(businessType) {
    const homeData = this.getFallbackHomeData(businessType);
    return homeData.locationData?.footer?.socialMedia || [];
  }

  getFallbackHomeData(businessType) {
    switch (businessType) {
      case 'hotel':
        return fallbackData.hotel.homeData;
      case 'clinic':
        return fallbackData.clinic.homeData;
      case 'gym':
        return fallbackData.gym.homeData;
      default:
        return fallbackData.hotel.homeData;
    }
  }
} 