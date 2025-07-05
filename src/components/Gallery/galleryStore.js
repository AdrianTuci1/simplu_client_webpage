import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGalleryStore = create(
  persist(
    (set, get) => ({
      // State
      images: [
        {
          id: 1,
          src: 'https://img.qunomedical.com/images.ctfassets.net/kfkw517g6gvn/4I49n9FXlZGuDQY3b8SxHt/4ab5b0e4b8df6a43cd35616b2313c466/580A0044.jpg?w=1700&q=75&func=fit&force_format=webp&org_if_sml=1',
          alt: 'Imagine 1',
          title: 'Cabinet Dentar Modern',
          description: 'Cabinetul nostru modern cu tehnologie de ultimă generație'
        },
        {
          id: 2,
          src: 'https://localdentalclinics.com.au/blogs/1678785522.png',
          alt: 'Imagine 2',
          title: 'Sala de Așteptare',
          description: 'Sala de așteptare confortabilă și primitoare'
        },
        {
          id: 3,
          src: 'https://hddentalclinic.ro/wp-content/uploads/2023/04/HD-Dental-Clinic-Cabinet-Dentar-Bucuresti-6.jpg',
          alt: 'Imagine 3',
          title: 'Echipament Medical',
          description: 'Echipament medical modern pentru tratamente de calitate'
        },
        {
          id: 4,
          src: '/images/gallery/image4.jpg',
          alt: 'Imagine 4',
          title: 'Zona de Tratament',
          description: 'Zone de tratament specializate pentru fiecare tip de procedură'
        },
        {
          id: 5,
          src: '/images/gallery/image5.jpg',
          alt: 'Imagine 5',
          title: 'Laborator Dentar',
          description: 'Laboratorul nostru pentru lucrări protetice de precizie'
        }
      ],
      
      // Gallery Settings
      settings: {
        slidesPerView: 1.2,
        spaceBetween: 20,
        loop: true,
        navigation: true,
        grabCursor: true,
        autoplay: false,
        autoplayDelay: 3000
      },

      // UI State
      ui: {
        isLoading: false,
        error: null,
        isEditing: false,
        selectedImage: null,
        isFullscreen: false
      },

      // Actions - Images
      addImage: (image) => set((state) => ({
        images: [...state.images, { ...image, id: Date.now() }]
      })),

      updateImage: (id, updates) => set((state) => ({
        images: state.images.map(img => 
          img.id === id ? { ...img, ...updates } : img
        )
      })),

      deleteImage: (id) => set((state) => ({
        images: state.images.filter(img => img.id !== id)
      })),

      reorderImages: (newOrder) => set((state) => ({
        images: newOrder.map(id => state.images.find(img => img.id === id))
      })),

      // Actions - Settings
      updateSettings: (settings) => set((state) => ({
        settings: { ...state.settings, ...settings }
      })),

      setSlidesPerView: (slidesPerView) => set((state) => ({
        settings: { ...state.settings, slidesPerView }
      })),

      setSpaceBetween: (spaceBetween) => set((state) => ({
        settings: { ...state.settings, spaceBetween }
      })),

      toggleLoop: () => set((state) => ({
        settings: { ...state.settings, loop: !state.settings.loop }
      })),

      toggleNavigation: () => set((state) => ({
        settings: { ...state.settings, navigation: !state.settings.navigation }
      })),

      toggleAutoplay: () => set((state) => ({
        settings: { ...state.settings, autoplay: !state.settings.autoplay }
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

      setSelectedImage: (image) => set((state) => ({
        ui: { ...state.ui, selectedImage: image }
      })),

      setIsFullscreen: (isFullscreen) => set((state) => ({
        ui: { ...state.ui, isFullscreen }
      })),

      // API Actions
      fetchGalleryData: async () => {
        set((state) => ({ ui: { ...state.ui, isLoading: true, error: null } }));
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would fetch from API
          // const response = await fetch('/api/gallery');
          // const data = await response.json();
          
          // For now, we'll use the default images
          set((state) => ({ 
            ui: { ...state.ui, isLoading: false }
          }));
        } catch (error) {
          set((state) => ({ 
            ui: { ...state.ui, isLoading: false, error: error.message }
          }));
        }
      },

      saveGalleryData: async () => {
        set((state) => ({ ui: { ...state.ui, isLoading: true, error: null } }));
        
        try {
          const { images, settings } = get();
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // In a real app, you would save to API
          // const response = await fetch('/api/gallery', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ images, settings })
          // });
          
          set((state) => ({ 
            ui: { ...state.ui, isLoading: false, isEditing: false }
          }));
        } catch (error) {
          set((state) => ({ 
            ui: { ...state.ui, isLoading: false, error: error.message }
          }));
        }
      },

      // Utility methods
      getImageById: (id) => {
        const { images } = get();
        return images.find(img => img.id === id);
      },

      getImageCount: () => {
        const { images } = get();
        return images.length;
      },

      getVisibleImages: (limit = null) => {
        const { images } = get();
        return limit ? images.slice(0, limit) : images;
      },

      // Reset to initial state
      resetGallery: () => {
        set({
          images: [
            {
              id: 1,
              src: 'https://img.qunomedical.com/images.ctfassets.net/kfkw517g6gvn/4I49n9FXlZGuDQY3b8SxHt/4ab5b0e4b8df6a43cd35616b2313c466/580A0044.jpg?w=1700&q=75&func=fit&force_format=webp&org_if_sml=1',
              alt: 'Imagine 1',
              title: 'Cabinet Dentar Modern',
              description: 'Cabinetul nostru modern cu tehnologie de ultimă generație'
            },
            {
              id: 2,
              src: 'https://localdentalclinics.com.au/blogs/1678785522.png',
              alt: 'Imagine 2',
              title: 'Sala de Așteptare',
              description: 'Sala de așteptare confortabilă și primitoare'
            },
            {
              id: 3,
              src: 'https://hddentalclinic.ro/wp-content/uploads/2023/04/HD-Dental-Clinic-Cabinet-Dentar-Bucuresti-6.jpg',
              alt: 'Imagine 3',
              title: 'Echipament Medical',
              description: 'Echipament medical modern pentru tratamente de calitate'
            },
            {
              id: 4,
              src: '/images/gallery/image4.jpg',
              alt: 'Imagine 4',
              title: 'Zona de Tratament',
              description: 'Zone de tratament specializate pentru fiecare tip de procedură'
            },
            {
              id: 5,
              src: '/images/gallery/image5.jpg',
              alt: 'Imagine 5',
              title: 'Laborator Dentar',
              description: 'Laboratorul nostru pentru lucrări protetice de precizie'
            }
          ],
          settings: {
            slidesPerView: 1.2,
            spaceBetween: 20,
            loop: true,
            navigation: true,
            grabCursor: true,
            autoplay: false,
            autoplayDelay: 3000
          },
          ui: {
            isLoading: false,
            error: null,
            isEditing: false,
            selectedImage: null,
            isFullscreen: false
          }
        });
      }
    }),
    {
      name: 'gallery-storage',
      partialize: (state) => ({
        images: state.images,
        settings: state.settings
      })
    }
  )
);

export default useGalleryStore; 