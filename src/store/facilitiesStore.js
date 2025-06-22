import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentDataByType } from '../services/dataService';

/**
 * Facilities Store using Zustand
 * Manages facilities data for gym and hotel businesses
 * Implements Observer Pattern for data updates
 */

const useFacilitiesStore = create(
  persist(
    (set, get) => ({
      // State
      facilities: [],
      loading: false,
      error: null,
      selectedFacility: null,
      filters: {
        category: 'all',
        type: 'all'
      },

      // Actions
      setFacilities: (facilities) => set({ facilities }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      setSelectedFacility: (facility) => set({ selectedFacility: facility }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),

      // Load facilities data
      loadFacilities: async (businessType = null) => {
        set({ loading: true, error: null });
        
        try {
          const facilitiesData = getCurrentDataByType('facilities');
          set({ 
            facilities: facilitiesData || [],
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      // Add new facility
      addFacility: (facility) => set((state) => ({
        facilities: [...state.facilities, { ...facility, id: Date.now() }]
      })),

      // Update facility
      updateFacility: (id, updates) => set((state) => ({
        facilities: state.facilities.map(facility =>
          facility.id === id ? { ...facility, ...updates } : facility
        )
      })),

      // Remove facility
      removeFacility: (id) => set((state) => ({
        facilities: state.facilities.filter(facility => facility.id !== id)
      })),

      // Get filtered facilities
      getFilteredFacilities: () => {
        const { facilities, filters } = get();
        let filtered = [...facilities];

        if (filters.category !== 'all') {
          filtered = filtered.filter(facility => 
            facility.category === filters.category
          );
        }

        if (filters.type !== 'all') {
          filtered = filtered.filter(facility => 
            facility.type === filters.type
          );
        }

        return filtered;
      },

      // Get facility by ID
      getFacilityById: (id) => {
        const { facilities } = get();
        return facilities.find(facility => facility.id === id);
      },

      // Get facility by name
      getFacilityByName: (name) => {
        const { facilities } = get();
        return facilities.find(facility => facility.name === name);
      },

      // Clear selected facility
      clearSelectedFacility: () => set({ selectedFacility: null }),

      // Reset store
      reset: () => set({
        facilities: [],
        loading: false,
        error: null,
        selectedFacility: null,
        filters: {
          category: 'all',
          type: 'all'
        }
      })
    }),
    {
      name: 'facilities-store',
      partialize: (state) => ({
        facilities: state.facilities,
        filters: state.filters,
        selectedFacility: state.selectedFacility
      })
    }
  )
);

export default useFacilitiesStore; 