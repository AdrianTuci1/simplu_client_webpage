import { create } from 'zustand';

const useHeroStore = create((set) => ({
  // State
  coverImage: 'https://5.imimg.com/data5/SELLER/Default/2024/2/384014748/BN/DD/EQ/199925747/gym-interior-designers.jpg',
  logoImage: 'https://marketplace.canva.com/EAFxdcos7WU/1/0/1600w/canva-dark-blue-and-brown-illustrative-fitness-gym-logo-oqe3ybeEcQQ.jpg',
  blurAmount: 0,
  tintColor: 'rgba(0,0,0,0)',
  isEditing: false,
  title: 'Better Gym',
  subtitle: 'Unirii',

  // Actions
  setCoverImage: (image) => set({ coverImage: image }),
  setLogoImage: (image) => set({ logoImage: image }),
  setBlurAmount: (amount) => set({ blurAmount: amount }),
  setTintColor: (color) => set({ tintColor: color }),
  setIsEditing: (isEditing) => set({ isEditing }),
  setTitle: (title) => set({ title }),
  setSubtitle: (subtitle) => set({ subtitle }),

  // API Actions
  fetchHeroData: async () => {
    try {
      const response = await fetch('/api/hero');
      const data = await response.json();
      set({
        coverImage: data.coverImage,
        logoImage: data.logoImage,
        blurAmount: data.blurAmount,
        tintColor: data.tintColor,
        title: data.title,
        subtitle: data.subtitle,
      });
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  },

  saveHeroData: async () => {
    try {
      const state = useHeroStore.getState();
      const response = await fetch('/api/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coverImage: state.coverImage,
          logoImage: state.logoImage,
          blurAmount: state.blurAmount,
          tintColor: state.tintColor,
          title: state.title,
          subtitle: state.subtitle,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save hero data');
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
    }
  },
}));

export default useHeroStore; 