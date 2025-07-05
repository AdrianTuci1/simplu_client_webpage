import { create } from 'zustand';

const useClassesStore = create((set) => ({
  classes: [
    {
      id: 1,
      title: 'Zumba',
      description: 'Experimentează energia și bucuria dansului cu clasele noastre de Zumba. Perfecte pentru toate nivelurile, aceste clase combina mișcări de dans latino cu exerciții cardio pentru un antrenament distractiv și eficient.',
      image: 'https://www.guardian.in/cdn/shop/articles/benefits-of-zumba.jpg?v=1712652853&width=2048',
      details: [
        '60 minute per sesiune',
        'Toate nivelurile sunt binevenite',
        'Muzică energizantă',
        'Arderea caloriilor într-un mod distractiv'
      ]
    },
    {
      id: 2,
      title: 'Înot',
      description: 'Descoperă beneficiile înotului cu clasele noastre profesionale. De la începători până la avansați, oferim instruire personalizată pentru a îmbunătăți tehnica și rezistența în apă.',
      image: 'https://www.metroymcas.org/clientuploads/Blog/Hero_Images/Swimlessons.jpeg',
      details: [
        '45 minute per sesiune',
        'Instruire personalizată',
        'Toate stilurile de înot',
        'Perfect pentru toate vârstele'
      ]
    }
  ],

  // Actions
  addClass: (newClass) => set((state) => ({
    classes: [...state.classes, newClass]
  })),

  updateClass: (updatedClass) => set((state) => ({
    classes: state.classes.map((c) => 
      c.id === updatedClass.id ? updatedClass : c
    )
  })),

  deleteClass: (classId) => set((state) => ({
    classes: state.classes.filter((c) => c.id !== classId)
  }))
}));

export default useClassesStore; 