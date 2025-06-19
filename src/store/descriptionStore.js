import { create } from 'zustand';
import { DESCRIPTION_CHAR_LIMIT } from '../constants';

const useDescriptionStore = create((set) => ({
  description: '',
  location: [44.435971971072, 26.102325776537], // București coordinates
  setDescription: (text) => set((state) => ({
    description: text.length > DESCRIPTION_CHAR_LIMIT 
      ? text.substring(0, DESCRIPTION_CHAR_LIMIT) 
      : text
  })),
  setLocation: (coords) => set({ location: coords }),
}));

export default useDescriptionStore; 