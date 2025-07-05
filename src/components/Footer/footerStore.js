import { create } from 'zustand';

const useFooterStore = create((set) => ({
  contact: {
    email: 'contact@example.com',
    phone: '+40 123 456 789',
    address: 'Strada Exemplu, Nr. 123, București'
  },
  program: {
    weekdays: '09:00 - 20:00',
    saturday: '10:00 - 18:00',
    sunday: 'Închis'
  },
  socialMedia: [
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'LinkedIn', url: '#' }
  ],
  setContact: (contact) => set({ contact }),
  setProgram: (program) => set({ program }),
  setSocialMedia: (socialMedia) => set({ socialMedia })
}));

export default useFooterStore; 