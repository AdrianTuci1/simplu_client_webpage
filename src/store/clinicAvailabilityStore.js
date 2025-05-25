import { create } from 'zustand';

const useClinicAvailabilityStore = create((set) => ({
  // State
  availability: {},
  isLoading: false,
  error: null,

  // Actions
  setAvailability: (availability) => set({ availability }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  // Fetch availability for a specific month
  fetchMonthAvailability: async (year, month) => {
    set({ isLoading: true, error: null });
    try {
      // Generate mock data for the entire month
      const mockAvailability = {};
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) {
          mockAvailability[dateStr] = { level: 'closed', slots: 0 };
          continue;
        }

        // Generate random availability
        const random = Math.random();
        if (random < 0.3) {
          mockAvailability[dateStr] = { level: 'high', slots: Math.floor(Math.random() * 3) };
        } else if (random < 0.7) {
          mockAvailability[dateStr] = { level: 'medium', slots: Math.floor(Math.random() * 4) + 3 };
        } else {
          mockAvailability[dateStr] = { level: 'low', slots: Math.floor(Math.random() * 3) + 7 };
        }
      }

      set({ 
        availability: mockAvailability,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch availability data',
        isLoading: false 
      });
    }
  },

  // Get availability level for a specific date
  getAvailabilityLevel: (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return useClinicAvailabilityStore.getState().availability[dateStr]?.level || null;
  },

  // Get available slots for a specific date
  getAvailableSlots: (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return useClinicAvailabilityStore.getState().availability[dateStr]?.slots || 0;
  },

  // Get color for availability level
  getAvailabilityColor: (level) => {
    const colors = {
      high: 'rgba(255, 107, 107, 0.2)',
      medium: 'rgba(255, 217, 61, 0.2)',
      low: 'rgba(107, 255, 107, 0.2)',
      closed: 'rgba(200, 200, 200, 0.1)'
    };
    return colors[level] || null;
  },

  // Get border color for availability level
  getAvailabilityBorderColor: (level) => {
    const colors = {
      high: '#ff6b6b',
      medium: '#ffd93d',
      low: '#6bff6b',
      closed: '#c8c8c8'
    };
    return colors[level] || null;
  }
}));

export default useClinicAvailabilityStore; 