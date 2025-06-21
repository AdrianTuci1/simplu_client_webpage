// Settings API Module - Handles user and business settings
// Supports fallback to local data when API is unavailable

import { fallbackData } from './index';

export class SettingsApi {
  constructor(baseUrl, useFallback, authService) {
    this.baseUrl = baseUrl;
    this.useFallback = useFallback;
    this.authService = authService;
  }

  // Get user settings
  async getUserSettings(tenantId = null, userId = null) {
    if (this.useFallback) {
      return this.getFallbackUserSettings();
    }

    try {
      const params = new URLSearchParams();
      if (tenantId) params.append('tenantId', tenantId);
      if (userId) params.append('userId', userId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/settings?${params.toString()}`
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
  async updateUserSettings(settings, tenantId = null, userId = null) {
    if (this.useFallback) {
      return this.getFallbackUserSettings();
    }

    try {
      const params = new URLSearchParams();
      if (tenantId) params.append('tenantId', tenantId);
      if (userId) params.append('userId', userId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/settings?${params.toString()}`,
        {
          method: 'POST',
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

  // Get business settings
  async getBusinessSettings(businessType, tenantId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessSettings(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (tenantId) params.append('tenantId', tenantId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/settings?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch business settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessSettings(businessType);
    }
  }

  // Update business settings
  async updateBusinessSettings(settings, businessType, tenantId = null) {
    if (this.useFallback) {
      return this.getFallbackBusinessSettings(businessType);
    }

    try {
      const params = new URLSearchParams();
      if (tenantId) params.append('tenantId', tenantId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/business/settings?${params.toString()}`,
        {
          method: 'POST',
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update business settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackBusinessSettings(businessType);
    }
  }

  // Get notification settings
  async getNotificationSettings(userId = null) {
    if (this.useFallback) {
      return this.getFallbackNotificationSettings();
    }

    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/notifications/settings?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch notification settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackNotificationSettings();
    }
  }

  // Update notification settings
  async updateNotificationSettings(settings, userId = null) {
    if (this.useFallback) {
      return this.getFallbackNotificationSettings();
    }

    try {
      const params = new URLSearchParams();
      if (userId) params.append('userId', userId);

      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/notifications/settings?${params.toString()}`,
        {
          method: 'POST',
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update notification settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackNotificationSettings();
    }
  }

  // Get language settings
  async getLanguageSettings() {
    if (this.useFallback) {
      return this.getFallbackLanguageSettings();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/language/settings`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch language settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackLanguageSettings();
    }
  }

  // Update language settings
  async updateLanguageSettings(language) {
    if (this.useFallback) {
      return this.getFallbackLanguageSettings();
    }

    try {
      const response = await this.authService.makeAuthenticatedRequest(
        `${this.baseUrl}/language/settings`,
        {
          method: 'POST',
          body: JSON.stringify({ language }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update language settings: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('API call failed, using fallback data:', error.message);
      return this.getFallbackLanguageSettings();
    }
  }

  // Fallback data methods
  getFallbackUserSettings() {
    return {
      tenantId: 1,
      userId: 1,
      settings: {
        language: "en",
        currency: "USD",
        theme: "light",
        notifications: true,
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true
      },
      userInfo: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+40722222222",
        address: "Strada Example, nr. 1, Cluj-Napoca",
        city: "Cluj-Napoca",
        country: "Romania"
      }
    };
  }

  getFallbackBusinessSettings(businessType) {
    const settings = {
      hotel: fallbackData.hotel.settings,
      clinic: fallbackData.clinic.settings,
      gym: fallbackData.gym.settings
    };

    return settings[businessType] || this.getFallbackUserSettings();
  }

  getFallbackNotificationSettings() {
    return {
      email: {
        enabled: true,
        bookingConfirmations: true,
        bookingReminders: true,
        marketingEmails: false
      },
      sms: {
        enabled: false,
        bookingConfirmations: false,
        bookingReminders: true
      },
      push: {
        enabled: true,
        bookingConfirmations: true,
        bookingReminders: true,
        promotions: false
      }
    };
  }

  getFallbackLanguageSettings() {
    return {
      currentLanguage: "en",
      availableLanguages: [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "ro", name: "Română", flag: "🇷🇴" },
        { code: "hu", name: "Magyar", flag: "🇭🇺" }
      ],
      autoDetect: true
    };
  }
} 