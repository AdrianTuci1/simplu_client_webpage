import { useState, useCallback, useMemo } from 'react';
import Calendar from 'react-calendar';
import styles from './EndInfo.module.css';

const EndInfo = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  // Simulează zilele indisponibile (în practică acestea ar veni de la API)
  const unavailableDates = useMemo(() => {
    const today = new Date();
    const unavailableDates = [];
    
    // Adaugă câteva zile indisponibile pentru demonstrație
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Simulează că weekend-urile și unele zile ale săptămânii sunt indisponibile
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isRandomUnavailable = Math.random() < 0.3; // 30% șanse să fie indisponibil
      
      if (isWeekend || isRandomUnavailable) {
        unavailableDates.push(date);
      }
    }
    
    return unavailableDates;
  }, []);

  const handleDateSelect = useCallback((value) => {
    if (Array.isArray(value)) {
      setSelectedDates(value);
    } else {
      setSelectedDates([value]);
    }
  }, []);

  const handleCheckAvailability = useCallback(() => {
    if (selectedDates.length === 2) {
      console.log('Verificare camere libere pentru:', selectedDates);
      alert(`Verificare camere libere pentru perioada: ${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`);
    }
  }, [selectedDates]);

  const formatDateRange = useCallback(() => {
    if (selectedDates.length < 2) {
      return 'Selectează minim 2 zile';
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
    return 'Selectează minim 2 zile';
  }, [selectedDates]);

  // Funcție pentru a verifica dacă o dată este indisponibilă
  const isDateUnavailable = useCallback((date) => {
    return unavailableDates.some(unavailableDate => 
      unavailableDate.toDateString() === date.toDateString()
    );
  }, [unavailableDates]);

  // Funcție pentru a dezactiva zilele indisponibile și cele din trecut
  const tileDisabled = useCallback(({ date, view }) => {
    if (view !== 'month') return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    // Dezactivează zilele din trecut
    if (checkDate < today) {
      return true;
    }
    
    // Dezactivează zilele indisponibile
    return isDateUnavailable(date);
  }, [isDateUnavailable]);

  // Funcție pentru a adăuga clase CSS personalizate
  const tileClassName = useCallback(({ date, view }) => {
    if (view !== 'month') return null;
    
    const classes = [];
    
    // Adaugă clasa pentru zilele din trecut
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (checkDate < today) {
      classes.push(styles.pastDate);
    }
    
    if (isDateUnavailable(date)) {
      classes.push(styles.unavailableDate);
    }
    
    return classes.join(' ');
  }, [isDateUnavailable]);

  return (
    <div className={styles.endInfo}>
      <div className={styles.leftInfo}>
        <h2 className={styles.title}>Verifică disponibilitatea</h2>
        <p className={styles.description}>
          Selectează perioada dorită pentru a verifica disponibilitatea camerelor.
        </p>
        
        <div className={styles.availabilityLegend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColor}></div>
            <span>Disponibil</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.unavailableLegend}`}></div>
            <span>Indisponibil</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.pastLegend}`}></div>
            <span>Zile trecute</span>
          </div>
        </div>
        
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
            disabled={selectedDates.length < 2}
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
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          view="month"
          maxDetail="month"
          showNavigation={true}
          showNeighboringMonth={true}
          navigationLabel={({ date, view, label, locale }) => {
            if (view === 'month') {
              return date.toLocaleDateString('ro-RO', { 
                month: 'long', 
                year: 'numeric' 
              });
            }
            return label;
          }}
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
            disabled={selectedDates.length < 2}
          >
            Vezi camere libere
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndInfo;