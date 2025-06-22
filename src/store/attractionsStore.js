import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentDataByType } from '../services/dataService';

/**
 * Attractions Store using Zustand
 * Manages attractions data for hotel businesses
 * Implements Observer Pattern for data updates
 */

const useAttractionsStore = create(
  persist(
    (set, get) => ({
      // State
      attractions: [],
      loading: false,
      error: null,
      selectedAttraction: null,
      filters: {
        category: 'all',
        distance: 'all'
      },

      // Actions
      setAttractions: (attractions) => set({ attractions }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      setSelectedAttraction: (attraction) => set({ selectedAttraction: attraction }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),

      // Load attractions data
      loadAttractions: async () => {
        set({ loading: true, error: null });
        
        try {
          const attractionsData = getCurrentDataByType('attractions');
          set({ 
            attractions: attractionsData || [],
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      // Add new attraction
      addAttraction: (attraction) => set((state) => ({
        attractions: [...state.attractions, { ...attraction, id: Date.now() }]
      })),

      // Update attraction
      updateAttraction: (id, updates) => set((state) => ({
        attractions: state.attractions.map(attraction =>
          attraction.id === id ? { ...attraction, ...updates } : attraction
        )
      })),

      // Remove attraction
      removeAttraction: (id) => set((state) => ({
        attractions: state.attractions.filter(attraction => attraction.id !== id)
      })),

      // Get filtered attractions
      getFilteredAttractions: () => {
        const { attractions, filters } = get();
        let filtered = [...attractions];

        if (filters.category !== 'all') {
          filtered = filtered.filter(attraction => 
            attraction.category === filters.category
          );
        }

        if (filters.distance !== 'all') {
          // Implement distance filtering logic here
          // For now, just return all attractions
        }

        return filtered;
      },

      // Get attraction by ID
      getAttractionById: (id) => {
        const { attractions } = get();
        return attractions.find(attraction => attraction.id === id);
      },

      // Clear selected attraction
      clearSelectedAttraction: () => set({ selectedAttraction: null }),

      // Reset store
      reset: () => set({
        attractions: [],
        loading: false,
        error: null,
        selectedAttraction: null,
        filters: {
          category: 'all',
          distance: 'all'
        }
      })
    }),
    {
      name: 'attractions-store',
      partialize: (state) => ({
        attractions: state.attractions,
        filters: state.filters,
        selectedAttraction: state.selectedAttraction
      })
    }
  )
);

export default useAttractionsStore; 