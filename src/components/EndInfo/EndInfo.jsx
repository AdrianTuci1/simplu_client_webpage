import { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import styles from './EndInfo.module.css';

const EndInfo = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (date) => {
    if (selectedDates.length === 0) {
      setSelectedDates([date]);
    } else if (selectedDates.length === 1) {
      const startDate = selectedDates[0];
      if (date < startDate) {
        setSelectedDates([date, startDate]);
      } else {
        setSelectedDates([startDate, date]);
      }
    } else {
      setSelectedDates([date]);
    }
  };

  const handleCheckAvailability = () => {
    if (selectedDates.length === 2) {
      console.log('Verificare camere libere pentru:', selectedDates);
      alert(`Verificare camere libere pentru perioada: ${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`);
    }
  };

  return (
    <div className={styles.endInfo}>
      <div className={styles.leftInfo}>
        <h2 className={styles.title}>Verifică disponibilitatea</h2>
        <p className={styles.description}>
          Selectează perioada dorită pentru a verifica disponibilitatea camerelor.
        </p>
      </div>
      
      <div className={styles.rightInfo}>
        <Calendar 
          selectedDates={selectedDates}
          onDateSelect={handleDateSelect}
          onCheckAvailability={handleCheckAvailability}
        />
      </div>
    </div>
  );
};

export default EndInfo;