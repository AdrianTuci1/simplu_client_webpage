import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  getCurrentDataByType,
  getCurrentBusinessType,
  getCurrentTenantId
} from '../services/dataService';

/**
 * Hero Store using the new Data Flow Architecture
 * Integrates with dataService for data fetching
 * Follows the Hybrid Access Pattern from DATA_FLOW_ARCHITECTURE.md
 */

const useHeroStore = create(
  persist(
    (set, get) => ({
      // State - initialized with default values
      coverImage: '',
      logoImage: '',
      blurAmount: 0,
      tintColor: 'rgba(0,0,0,0)',
      title: '',
      subtitle: '',
      businessName: '',
      businessSlug: '',

      // UI State
      isLoading: false,
      error: null,
      isEditing: false,

      // Actions - State Setters
      setCoverImage: (image) => set({ coverImage: image }),
      setLogoImage: (image) => set({ logoImage: image }),
      setBlurAmount: (amount) => set({ blurAmount: amount }),
      setTintColor: (color) => set({ tintColor: color }),
      setTitle: (title) => set({ title }),
      setSubtitle: (subtitle) => set({ subtitle }),
      setBusinessName: (businessName) => set({ businessName }),
      setBusinessSlug: (businessSlug) => set({ businessSlug }),

      // Actions - UI State
      setIsEditing: (isEditing) => set({ isEditing }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Actions - Data Loading (following Data Flow Architecture)
      loadHeroData: async () => {
        set({ isLoading: true, error: null });

        try {
          // Use dataService to get hero data
          const heroData = getCurrentDataByType('hero');
          
          if (heroData) {
            set({
              coverImage: heroData.coverImage || '',
              logoImage: heroData.logoImage || '',
              blurAmount: heroData.blurAmount || 0,
              tintColor: heroData.tintColor || 'rgba(0,0,0,0)',
              title: heroData.bussinesName || heroData.title || '',
              subtitle: heroData.bussinesSlug || heroData.subtitle || '',
              businessName: heroData.bussinesName || '',
              businessSlug: heroData.bussinesSlug || '',
              isLoading: false
            });
          } else {
            throw new Error('No hero data available');
          }
        } catch (error) {
          console.error('Error loading hero data:', error);
          set({ 
            error: error.message || 'Failed to load hero data',
            isLoading: false 
          });
        }
      },

      // Actions - Data Saving (for future API integration)
      saveHeroData: async () => {
        set({ isLoading: true, error: null });

        try {
          const state = get();
          const heroData = {
            coverImage: state.coverImage,
            logoImage: state.logoImage,
            blurAmount: state.blurAmount,
            tintColor: state.tintColor,
            bussinesName: state.businessName,
            bussinesSlug: state.businessSlug,
            title: state.title,
            subtitle: state.subtitle
          };

          // TODO: Replace with actual API call when backend is ready
          // const response = await fetch('/api/hero', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(heroData),
          // });
          // if (!response.ok) {
          //   throw new Error('Failed to save hero data');
          // }

          // For now, just simulate success
          console.log('Hero data saved:', heroData);
          set({ isLoading: false, isEditing: false });
        } catch (error) {
          console.error('Error saving hero data:', error);
          set({ 
            error: error.message || 'Failed to save hero data',
            isLoading: false 
          });
        }
      },

      // Actions - Store Management
      resetHeroData: () => {
        set({
          coverImage: '',
          logoImage: '',
          blurAmount: 0,
          tintColor: 'rgba(0,0,0,0)',
          title: '',
          subtitle: '',
          businessName: '',
          businessSlug: '',
          isLoading: false,
          error: null,
          isEditing: false
        });
      },

      // Actions - Environment Info
      getEnvironmentInfo: () => {
        return {
          businessType: getCurrentBusinessType(),
          tenantId: getCurrentTenantId()
        };
      },

      // Initialize store with data from dataService
      initializeStore: async () => {
        await get().loadHeroData();
      }
    }),
    {
      name: 'hero-store',
      partialize: (state) => ({
        coverImage: state.coverImage,
        logoImage: state.logoImage,
        blurAmount: state.blurAmount,
        tintColor: state.tintColor,
        title: state.title,
        subtitle: state.subtitle,
        businessName: state.businessName,
        businessSlug: state.businessSlug
      })
    }
  )
);

export default useHeroStore; 