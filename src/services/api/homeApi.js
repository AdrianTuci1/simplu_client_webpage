// Home API Module - Handles homepage data fetching
// Supports fallback to local data when API is unavailable

import { fallbackData } from './index';

export class HomeApi {
  constructor(baseUrl, useFallback, authService) {
    this.baseUrl = baseUrl;
    this.useFallback = useFallback;
    this.authService = authService;
  }

  // Get homepage data for a specific business type and location
  async getHomeData(businessType, locationId = null, requestUrl = null) {
    if (this.useFallback) {
      return this.getFallbackHomeData(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (requestUrl) params.append('requestUrl', requestUrl);
      if (locationId) params.append('locationId', locationId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/homepage?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch homepage data: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackHomeData(businessType);
    }
  }

  // Get fallback data from local files
  getFallbackHomeData(businessType) {
    switch (businessType) {
      case 'hotel':
        return fallbackData.hotel.homeData;
      case 'clinic':
        return fallbackData.clinic.homeData;
      case 'gym':
        return fallbackData.gym.homeData;
      default:
        throw new Error(`Unknown business type: ${businessType}`);
    }
  }

  // Get hero section data
  async getHeroData(businessType, locationId) {
    const homeData = await this.getHomeData(businessType, locationId);
    return homeData.locationData?.hero || null;
  }

  // Get attractions data (hotel specific)
  async getAttractionsData(locationId) {
    const homeData = await this.getHomeData('hotel', locationId);
    return homeData.locationData?.attractions || [];
  }

  // Get facilities data
  async getFacilitiesData(businessType, locationId) {
    const homeData = await this.getHomeData(businessType, locationId);
    return homeData.locationData?.facilities || [];
  }

  // Get rooms data (hotel specific)
  async getRoomsData(locationId) {
    const homeData = await this.getHomeData('hotel', locationId);
    return homeData.locationData?.rooms || [];
  }

  // Get services data (clinic specific)
  async getServicesData(locationId) {
    const homeData = await this.getHomeData('clinic', locationId);
    return homeData.locationData?.services || [];
  }

  // Get packages data (gym specific)
  async getPackagesData(locationId) {
    const homeData = await this.getHomeData('gym', locationId);
    return homeData.locationData?.packages || [];
  }

  // Get classes data (gym specific)
  async getClassesData(locationId) {
    const homeData = await this.getHomeData('gym', locationId);
    return homeData.locationData?.classes || [];
  }

  // Get gallery data
  async getGalleryData(businessType, locationId) {
    const homeData = await this.getHomeData(businessType, locationId);
    return homeData.locationData?.gallery || [];
  }

  // Get footer data
  async getFooterData(businessType, locationId) {
    const homeData = await this.getHomeData(businessType, locationId);
    return homeData.locationData?.footer || null;
  }

  // Get available pages for business type
  async getAvailablePages(businessType) {
    const homeData = await this.getHomeData(businessType);
    return homeData.availablePages || [];
  }

  // Get locations list
  async getLocations(businessType) {
    const homeData = await this.getHomeData(businessType);
    return homeData.locations || [];
  }

  // Get current location
  async getCurrentLocation(businessType) {
    const homeData = await this.getHomeData(businessType);
    return homeData.currentLocation || 1;
  }

  // Get tenant ID
  async getTenantId(businessType) {
    const homeData = await this.getHomeData(businessType);
    return homeData.tenantId || 1;
  }
} 