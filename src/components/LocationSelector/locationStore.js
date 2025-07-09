import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getDemoData } from '../../config/demoMode';

/**
 * Location Store using Zustand
 * Manages location state and switching functionality
 */
const useLocationStore = create(
  persist(
    (set, get) => ({
      // State
      currentLocationId: 1,
      allLocations: [],
      loading: false,
      error: null,

      // Actions
      setCurrentLocationId: (locationId) => set({ currentLocationId: locationId }),
      
      setAllLocations: (locations) => set({ allLocations: locations }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),

      // Initialize locations from demo data
      initializeLocations: () => {
        const demoData = getDemoData();
        const locations = demoData?.homeData?.locations || [];
        set({ 
          allLocations: locations,
          currentLocationId: locations[0]?.id || 1
        });
      },

      // Switch to a different location
      switchLocation: (locationId) => {
        const { allLocations } = get();
        const location = allLocations.find(loc => loc.id === locationId);
        
        if (location) {
          set({ currentLocationId: locationId });
          return location;
        } else {
          console.warn(`Location ${locationId} not found`);
          return null;
        }
      },

      // Get current location object
      getCurrentLocation: () => {
        const { currentLocationId, allLocations } = get();
        return allLocations.find(loc => loc.id === currentLocationId) || allLocations[0];
      },

      // Get location by ID
      getLocationById: (locationId) => {
        const { allLocations } = get();
        return allLocations.find(loc => loc.id === locationId);
      },

      // Get location by slug
      getLocationBySlug: (slug) => {
        const { allLocations } = get();
        return allLocations.find(loc => loc.slug === slug);
      },

      // Check if multiple locations exist
      hasMultipleLocations: () => {
        const { allLocations } = get();
        return allLocations.length > 1;
      },

      // Reset to initial location
      resetToInitialLocation: () => {
        const { allLocations } = get();
        if (allLocations.length > 0) {
          set({ currentLocationId: allLocations[0].id });
        }
      },

      // Clear store
      reset: () => set({
        currentLocationId: 1,
        allLocations: [],
        loading: false,
        error: null
      })
    }),
    {
      name: 'location-store',
      partialize: (state) => ({
        currentLocationId: state.currentLocationId,
        allLocations: state.allLocations
      })
    }
  )
);

export default useLocationStore; 