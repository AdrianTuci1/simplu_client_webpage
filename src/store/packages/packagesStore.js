import { create } from 'zustand';

const usePackagesStore = create((set, get) => ({
  packages: [
    {
      id: 1,
      name: 'Basic Fitness',
      price: 199,
      period: 'month',
      tier: 'silver',
      entry_type: 'monthly',
      entry_limit: 20,
      features: [
        'Acces la sala de fitness',
        'Acces la zona de cardio',
        'Acces la vestiare',
        'Acces la grupuri de fitness',
        'Acces la parcare'
      ],
      description: 'Perfect pentru începători sau cei care doresc acces la facilități de bază.',
      image: '/images/packages/basic-fitness.jpg'
    },
    {
      id: 2,
      name: 'Premium Fitness',
      price: 299,
      period: 'month',
      tier: 'gold',
      entry_type: 'monthly',
      entry_limit: null,
      features: [
        'Acces la toate zonele Basic',
        'Acces la bazinul de înot',
        'Acces la saună',
        'Acces la zona de masaj',
        'Acces la zona de relaxare',
        'Acces la toate clasele de grup'
      ],
      description: 'Cel mai popular pachet, oferind acces complet la toate facilitățile.',
      image: '/images/packages/premium-fitness.jpg'
    },
    {
      id: 3,
      name: 'Elite Package',
      price: 499,
      period: 'month',
      tier: 'black',
      entry_type: 'monthly',
      entry_limit: null,
      features: [
        'Acces la toate zonele Premium',
        'Acces la zona VIP',
        'Acces la sala privată',
        'Acces la spa-ul exclusivist',
        'Acces la toate facilitățile premium',
        'Acces la evenimente exclusive'
      ],
      description: 'Experiența fitness ultimă cu servicii premium și beneficii exclusive.',
      image: '/images/packages/elite-package.jpg'
    },
    {
      id: 4,
      name: 'Family Package',
      price: 699,
      period: 'month',
      tier: 'gold',
      entry_type: 'monthly',
      entry_limit: null,
      features: [
        'Acces pentru 2 adulți și 2 copii',
        'Acces la toate zonele Premium',
        'Acces la zona de familie',
        'Acces la bazinul pentru copii',
        'Acces la clasele pentru copii',
        'Acces la vestiare de familie'
      ],
      description: 'Perfect pentru familii care doresc să rămână în formă împreună.',
      image: '/images/packages/family-package.jpg'
    },
    {
      id: 5,
      name: 'Student Package',
      price: 149,
      period: 'month',
      tier: 'silver',
      entry_type: 'monthly',
      entry_limit: 15,
      features: [
        'Acces la toate zonele Basic',
        'Acces la zona de studiu',
        'Acces la grupuri de studenți',
        'Acces la programe speciale pentru studenți',
        'Acces la evenimente pentru studenți'
      ],
      description: 'Rate speciale pentru studenți cu carnet de student valid.',
      image: '/images/packages/student-package.jpg'
    }
  ],

  // Selectors
  getAllPackages: () => get().packages,
  getPackageById: (id) => get().packages.find(pkg => pkg.id === id)
}));

export default usePackagesStore; 