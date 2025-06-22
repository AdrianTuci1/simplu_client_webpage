import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './EndInfo.module.css';

const EndInfo = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateSelect = (value) => {
    if (Array.isArray(value)) {
      setSelectedDates(value);
    } else {
      setSelectedDates([value]);
    }
  };

  const handleCheckAvailability = () => {
    if (selectedDates.length === 2) {
      console.log('Verificare camere libere pentru:', selectedDates);
      alert(`Verificare camere libere pentru perioada: ${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`);
    } else if (selectedDates.length === 1) {
      console.log('Verificare camere libere pentru:', selectedDates);
      alert(`Verificare camere libere pentru data: ${selectedDates[0].toLocaleDateString()}`);
    }
  };

  const formatDateRange = () => {
    if (selectedDates.length === 0) {
      return 'Selectează o dată';
    } else if (selectedDates.length === 1) {
      return selectedDates[0].toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } else if (selectedDates.length === 2) {
      const startDate = selectedDates[0].toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const endDate = selectedDates[1].toLocaleDateString('ro-RO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return `${startDate} - ${endDate}`;
    }
    return 'Selectează o dată';
  };

  return (
    <div className={styles.endInfo}>
      <div className={styles.leftInfo}>
        <h2 className={styles.title}>Verifică disponibilitatea</h2>
        <p className={styles.description}>
          Selectează perioada dorită pentru a verifica disponibilitatea camerelor.
        </p>
        
        <div className={styles.desktopDateRangeContainer}>
          <div className={styles.dateRangeContainer}>
            <h3 className={styles.dateRangeTitle}>Perioada selectată:</h3>
            <div className={styles.dateRange}>
              {formatDateRange()}
            </div>
          </div>
          
          <button 
            className={styles.checkAvailabilityBtn}
            onClick={handleCheckAvailability}
            disabled={selectedDates.length === 0}
          >
            Vezi camere libere
          </button>
        </div>
      </div>
      
      <div className={styles.rightInfo}>
        <Calendar 
          onChange={handleDateSelect}
          value={selectedDates}
          selectRange={true}
          className={styles.calendar}
          locale="ro-RO"
          minDate={new Date()}
        />
        
        <div className={styles.mobileCalendarFooter}>
          <div className={styles.dateRangeContainer}>
            <h3 className={styles.dateRangeTitle}>Perioada selectată:</h3>
            <div className={styles.dateRange}>
              {formatDateRange()}
            </div>
          </div>
          
          <button 
            className={styles.checkAvailabilityBtn}
            onClick={handleCheckAvailability}
            disabled={selectedDates.length === 0}
          >
            Vezi camere libere
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndInfo;