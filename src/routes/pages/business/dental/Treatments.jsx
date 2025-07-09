import React, { useState, useMemo } from 'react';
import TreatmentCard from '../../../../components/Cards/TreatmentCard';
import CategoryFilter from '../../../../components/Cards/CategoryFilter';
import { useTreatments } from '../../../../hooks';
import styles from './Treatments.module.css';

const Treatments = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Use the new hook to get treatments data
  const { data: treatments, loading, error } = useTreatments({ locationId: 1 });

  // Extract unique categories from treatments
  const categories = useMemo(() => {
    if (!treatments || treatments.length === 0) return [];
    const uniqueCategories = [...new Set(treatments.map(treatment => treatment.category))];
    return uniqueCategories.sort();
  }, [treatments]);

  // Filter treatments based on selected category
  const filteredTreatments = useMemo(() => {
    if (!treatments || treatments.length === 0) return [];
    if (!selectedCategory) {
      return treatments;
    }
    return treatments.filter(treatment => treatment.category === selectedCategory);
  }, [treatments, selectedCategory]);

  const handleTreatmentSelect = (treatment) => {
    console.log('Selected treatment:', treatment);
    // Handle treatment selection - could open modal, navigate to booking, etc.
  };

  // Handle loading state
  if (loading) {
    return (
      <div className={styles.treatmentsPage}>
        <div className={styles.loading}>Se încarcă tratamentele...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={styles.treatmentsPage}>
        <div className={styles.error}>
          <p>Eroare la încărcarea datelor: {error}</p>
          <button onClick={() => window.location.reload()}>Încearcă din nou</button>
        </div>
      </div>
    );
  }

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