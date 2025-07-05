import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// Demo data for rooms store
const getCurrentDataByType = (type) => {
  const demoData = {
    rooms: [
      { id: 1, name: 'Demo Room 1', price: 100, capacity: 2, image: 'https://via.placeholder.com/300x200' },
      { id: 2, name: 'Demo Room 2', price: 150, capacity: 3, image: 'https://via.placeholder.com/300x200' }
    ]
  };
  return demoData[type] || [];
};

/**
 * Rooms Store using Zustand
 * Manages rooms data for hotel businesses
 * Implements Observer Pattern for data updates
 */

const useRoomsStore = create(
  persist(
    (set, get) => ({
      // State
      rooms: [],
      loading: false,
      error: null,
      selectedRoom: null,
      filters: {
        type: 'all',
        priceRange: 'all',
        capacity: 'all'
      },

      // Actions
      setRooms: (rooms) => set({ rooms }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
      
      setSelectedRoom: (room) => set({ selectedRoom: room }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),

      // Load rooms data
      loadRooms: async () => {
        set({ loading: true, error: null });
        
        try {
          const roomsData = getCurrentDataByType('rooms');
          set({ 
            rooms: roomsData || [],
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error.message, 
            loading: false 
          });
        }
      },

      // Add new room
      addRoom: (room) => set((state) => ({
        rooms: [...state.rooms, { ...room, id: Date.now() }]
      })),

      // Update room
      updateRoom: (id, updates) => set((state) => ({
        rooms: state.rooms.map(room =>
          room.id === id ? { ...room, ...updates } : room
        )
      })),

      // Remove room
      removeRoom: (id) => set((state) => ({
        rooms: state.rooms.filter(room => room.id !== id)
      })),

      // Get filtered rooms
      getFilteredRooms: () => {
        const { rooms, filters } = get();
        let filtered = [...rooms];

        if (filters.type !== 'all') {
          filtered = filtered.filter(room => 
            room.type === filters.type
          );
        }

        if (filters.priceRange !== 'all') {
          // Implement price range filtering logic here
          // For now, just return all rooms
        }

        if (filters.capacity !== 'all') {
          // Implement capacity filtering logic here
          // For now, just return all rooms
        }

        return filtered;
      },

      // Get room by ID
      getRoomById: (id) => {
        const { rooms } = get();
        return rooms.find(room => room.id === id);
      },

      // Get rooms by type
      getRoomsByType: (type) => {
        const { rooms } = get();
        return rooms.filter(room => room.type === type);
      },

      // Get available rooms
      getAvailableRooms: () => {
        const { rooms } = get();
        return rooms.filter(room => room.availability !== false);
      },

      // Clear selected room
      clearSelectedRoom: () => set({ selectedRoom: null }),

      // Reset store
      reset: () => set({
        rooms: [],
        loading: false,
        error: null,
        selectedRoom: null,
        filters: {
          type: 'all',
          priceRange: 'all',
          capacity: 'all'
        }
      })
    }),
    {
      name: 'rooms-store',
      partialize: (state) => ({
        rooms: state.rooms,
        filters: state.filters,
        selectedRoom: state.selectedRoom
      })
    }
  )
);

export default useRoomsStore; 