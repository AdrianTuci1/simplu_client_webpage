import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getCurrentBusinessType, 
  getCurrentTenantId,
  getCurrentHomeData,
  getCurrentSettings,
  getCurrentDataByType,
  BUSINESS_TYPES
} from '../services/dataService';
import { DESCRIPTION_CHAR_LIMIT } from '../constants';

/**
 * Centralized Store Registry using Zustand
 * Acts as an index/registry for all component-specific stores
 * Provides business-specific data strategies and environment configuration
 * Implements Strategy Pattern for different business types
 */

// Business-specific data strategies
const businessDataStrategies = {
  [BUSINESS_TYPES.HOTEL]: {
    getInitialState: () => ({
      rooms: [],
      bookings: [],
      facilities: [],
      attractions: []
    }),
    getDataTypes: () => ['rooms', 'facilities', 'attractions', 'roomscalendar'],
    transformData: (data, type) => {
      switch (type) {
        case 'rooms':
          return data?.rooms || [];
        case 'facilities':
          return data?.facilities || [];
        case 'attractions':
          return data?.attractions || [];
        case 'roomscalendar':
          return data?.roomsCalendar || [];
        default:
          return data;
      }
    }
  },
  [BUSINESS_TYPES.CLINIC]: {
    getInitialState: () => ({
      services: [],
      medics: [],
      appointments: [],
      availability: {}
    }),
    getDataTypes: () => ['services', 'gallery', 'availabilitycalendar'],
    transformData: (data, type) => {
      switch (type) {
        case 'services':
          return data?.services || [];
        case 'gallery':
          return data?.gallery || [];
        case 'availabilitycalendar':
          return data?.availabilityCalendar || {};
        default:
          return data;
      }
    }
  },
  [BUSINESS_TYPES.GYM]: {
    getInitialState: () => ({
      classes: [],
      packages: [],
      facilities: []
    }),
    getDataTypes: () => ['facilities', 'packages', 'classes'],
    transformData: (data, type) => {
      switch (type) {
        case 'facilities':
          return data?.facilities || [];
        case 'packages':
          return data?.packages || [];
        case 'classes':
          return data?.classes || [];
        default:
          return data;
      }
    }
  }
};

// Create the centralized registry store
const useCentralizedStore = create(
  persist(
    (set, get) => {
      const currentBusinessType = getCurrentBusinessType();
      const currentTenantId = getCurrentTenantId();
      const businessStrategy = businessDataStrategies[currentBusinessType];

      return {
        // Environment and Configuration
        environment: {
          businessType: currentBusinessType,
          tenantId: currentTenantId,
          isMultiTenant: false
        },

        // Business Data (dynamic based on business type)
        businessData: businessStrategy ? businessStrategy.getInitialState() : {},

        // UI State
        ui: {
          isLoading: false,
          error: null,
          isEditing: false
        },

        // Actions - Environment & Configuration
        setEnvironment: (environment) => set({ environment }),
        updateBusinessType: (businessType) => {
          const newStrategy = businessDataStrategies[businessType];
          set((state) => ({
            environment: { ...state.environment, businessType },
            businessData: newStrategy ? newStrategy.getInitialState() : {}
          }));
        },

        // Actions - Business Data
        loadBusinessData: async (dataType = null) => {
          set((state) => ({ ui: { ...state.ui, isLoading: true, error: null } }));

          try {
            const businessType = get().environment.businessType;
            const strategy = businessDataStrategies[businessType];

            if (!strategy) {
              throw new Error(`No strategy found for business type: ${businessType}`);
            }

            if (dataType) {
              // Load specific data type
              const data = getCurrentDataByType(dataType);
              const transformedData = strategy.transformData(data, dataType);
              
              set((state) => ({
                businessData: { ...state.businessData, [dataType]: transformedData },
                ui: { ...state.ui, isLoading: false }
              }));
            } else {
              // Load all business data
              const dataTypes = strategy.getDataTypes();
              const newBusinessData = { ...strategy.getInitialState() };

              for (const type of dataTypes) {
                try {
                  const data = getCurrentDataByType(type);
                  newBusinessData[type] = strategy.transformData(data, type);
                } catch (error) {
                  console.warn(`Failed to load data type: ${type}`, error);
                }
              }

              set((state) => ({
                businessData: newBusinessData,
                ui: { ...state.ui, isLoading: false }
              }));
            }
          } catch (error) {
            set((state) => ({
              ui: { ...state.ui, isLoading: false, error: error.message }
            }));
          }
        },

        updateBusinessData: (dataType, data) => set((state) => ({
          businessData: { ...state.businessData, [dataType]: data }
        })),

        // Actions - UI State
        setLoading: (isLoading) => set((state) => ({
          ui: { ...state.ui, isLoading }
        })),

        setError: (error) => set((state) => ({
          ui: { ...state.ui, error }
        })),

        setIsEditing: (isEditing) => set((state) => ({
          ui: { ...state.ui, isEditing }
        })),

        // Initialize store with data from dataService
        initializeStore: async () => {
          try {
            // Load business-specific data
            await get().loadBusinessData();

          } catch (error) {
            console.error('Error initializing store:', error);
            get().setError(error.message);
          }
        },

        // Reset store to initial state
        resetStore: () => {
          const businessType = getCurrentBusinessType();
          const strategy = businessDataStrategies[businessType];
          
          set({
            businessData: strategy ? strategy.getInitialState() : {},
            ui: { isLoading: false, error: null, isEditing: false }
          });
        }
      };
    },
    {
      name: 'centralized-store',
      partialize: (state) => ({
        environment: state.environment,
        businessData: state.businessData
      })
    }
  )
);

// Export the centralized store
export default useCentralizedStore;

// Export convenience hooks for specific business types
export const useHotelStore = () => {
  const store = useCentralizedStore();
  return {
    ...store,
    rooms: store.businessData.rooms || [],
    facilities: store.businessData.facilities || [],
    attractions: store.businessData.attractions || [],
    roomsCalendar: store.businessData.roomscalendar || []
  };
};

export const useClinicStore = () => {
  const store = useCentralizedStore();
  return {
    ...store,
    services: store.businessData.services || [],
    gallery: store.businessData.gallery || [],
    availabilityCalendar: store.businessData.availabilitycalendar || {}
  };
};

export const useGymStore = () => {
  const store = useCentralizedStore();
  return {
    ...store,
    classes: store.businessData.classes || [],
    packages: store.businessData.packages || [],
    facilities: store.businessData.facilities || []
  };
};

// Import and re-export all component-specific stores
// This acts as a registry/index for all stores

// Location Store
export { default as useLocationStore } from './locationStore';

// Hero Store
export { default as useHeroStore } from './heroStore';

// Description Store
export { default as useDescriptionStore } from './descriptionStore';

// Footer Store
export { default as useFooterStore } from './footerStore';

// Clinic Availability Store
export { default as useClinicAvailabilityStore } from './clinicAvailabilityStore';

// Classes Store
export { default as useClassesStore } from './useClassesStore';

// Packages Store
export { default as usePackagesStore } from './packages/packagesStore';

// Gallery Store
export { default as useGalleryStore } from './galleryStore';

// Legacy exports for backward compatibility
export const useLocationStoreLegacy = useCentralizedStore;
export const useDescriptionStoreLegacy = useCentralizedStore;
export const useClinicAvailabilityStoreLegacy = useCentralizedStore;
export const useFooterStoreLegacy = useCentralizedStore;
export const useClassesStoreLegacy = useCentralizedStore;
export const useHeroStoreLegacy = useCentralizedStore;
export const usePackagesStoreLegacy = useCentralizedStore; 