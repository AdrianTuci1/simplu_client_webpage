import React, { useState, useMemo } from 'react';
import TreatmentCard from '../../../../components/Cards/TreatmentCard';
import CategoryFilter from '../../../../components/Cards/CategoryFilter';
import styles from './Treatments.module.css';

const Treatments = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Extract unique categories from treatments
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(treatments.treatments.map(treatment => treatment.category))];
    return uniqueCategories.sort();
  }, []);

  // Filter treatments based on selected category
  const filteredTreatments = useMemo(() => {
    if (!selectedCategory) {
      return treatments.treatments;
    }
    return treatments.treatments.filter(treatment => treatment.category === selectedCategory);
  }, [selectedCategory]);

  const handleTreatmentSelect = (treatment) => {
    console.log('Selected treatment:', treatment);
    // Handle treatment selection - could open modal, navigate to booking, etc.
  };

  return (
    <div className={styles.treatmentsPage}>

      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className={styles.treatmentsGrid}>
        {filteredTreatments.map((treatment) => (
          <TreatmentCard
            key={treatment.id}
            treatment={treatment}
            onSelect={handleTreatmentSelect}
          />
        ))}
      </div>
      
      {filteredTreatments.length === 0 && (
        <div className={styles.noTreatments}>
          <p>No treatments found for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default Treatments; 