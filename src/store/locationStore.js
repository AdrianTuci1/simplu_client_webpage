import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getAllLocations, 
  getCurrentLocation, 
  getInitialLocation,
  hasMultipleLocations 
} from '../config/businessConfig';

const useLocationStore = create(
  persist(
    (set, get) => ({
      // State - initialize with null, will be set on first access
      currentLocation: null,
      allLocations: [],
      
      // Initialize locations on first access
      initializeLocations: () => {
        const allLocations = getAllLocations();
        const initialLocation = getInitialLocation();
        
        set({ 
          allLocations,
          currentLocation: initialLocation
        });
        
        return { allLocations, currentLocation: initialLocation };
      },
      
      // Actions
      setCurrentLocation: (location) => {
        set({ currentLocation: location });
      },
      
      switchLocation: (locationId) => {
        const { allLocations } = get();
        const location = allLocations.find(loc => loc.id === locationId);
        if (location) {
          set({ currentLocation: location });
        }
      },
      
      switchLocationBySlug: (slug) => {
        const { allLocations } = get();
        const location = allLocations.find(loc => loc.slug === slug);
        if (location) {
          set({ currentLocation: location });
        }
      },
      
      // Reset to initial location (first location)
      resetToInitialLocation: () => {
        const initialLocation = getInitialLocation();
        set({ currentLocation: initialLocation });
      },
      
      refreshLocations: () => {
        const allLocations = getAllLocations();
        const initialLocation = getInitialLocation();
        
        set({ 
          allLocations,
          currentLocation: get().currentLocation || initialLocation
        });
      },
      
      getLocationInfo: () => {
        const { currentLocation, allLocations } = get();
        
        // Initialize if not already done
        if (allLocations.length === 0) {
          return get().initializeLocations();
        }
        
        return {
          current: currentLocation,
          all: allLocations,
          isMultiLocation: hasMultipleLocations(),
          totalLocations: allLocations.length,
          initialLocation: getInitialLocation()
        };
      }
    }),
    {
      name: 'location-storage',
      partialize: (state) => ({ 
        currentLocation: state.currentLocation 
      })
    }
  )
);

export default useLocationStore; 