import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCurrentDataByType } from '../services/dataService';

/**
 * Services Store using Zustand
 * Manages services data for clinic businesses
 * Implements Observer Pattern for data updates
 */

const useServicesStore = create(
  persist(
    (set, get) => ({
      // State
      services: [],
      loading: false,
      error: null,
      selectedService: null,
      filters: {
        category: 'all',
        type: 'all'
      },

      // Actions
      setServices: (services) => set({ services }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      setSelectedService: (service) => set({ selectedService: service }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),

      // Load services data
      loadServices: async (businessType = null) => {
        set({ loading: true, error: null });
        
        try {
          const servicesData = getCurrentDataByType('services');
          set({ 
            services: servicesData || [],
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      // Add new service
      addService: (service) => set((state) => ({
        services: [...state.services, { ...service, id: Date.now() }]
      })),

      // Update service
      updateService: (id, updates) => set((state) => ({
        services: state.services.map(service =>
          service.id === id ? { ...service, ...updates } : service
        )
      })),

      // Remove service
      removeService: (id) => set((state) => ({
        services: state.services.filter(service => service.id !== id)
      })),

      // Get filtered services
      getFilteredServices: () => {
        const { services, filters } = get();
        let filtered = [...services];

        if (filters.category !== 'all') {
          filtered = filtered.filter(service => 
            service.category === filters.category
          );
        }

        if (filters.type !== 'all') {
          filtered = filtered.filter(service => 
            service.type === filters.type
          );
        }

        return filtered;
      },

      // Get service by ID
      getServiceById: (id) => {
        const { services } = get();
        return services.find(service => service.id === id);
      },

      // Get service by name
      getServiceByName: (name) => {
        const { services } = get();
        return services.find(service => service.name === name);
      },

      // Get services by category
      getServicesByCategory: (category) => {
        const { services } = get();
        return services.filter(service => service.category === category);
      },

      // Clear selected service
      clearSelectedService: () => set({ selectedService: null }),

      // Reset store
      reset: () => set({
        services: [],
        loading: false,
        error: null,
        selectedService: null,
        filters: {
          category: 'all',
          type: 'all'
        }
      })
    }),
    {
      name: 'services-store',
      partialize: (state) => ({
        services: state.services,
        filters: state.filters,
        selectedService: state.selectedService
      })
    }
  )
);

export default useServicesStore; 