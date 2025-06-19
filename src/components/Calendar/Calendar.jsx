import { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = ({ 
  selectedDates = [], 
  onDateSelect, 
  onCheckAvailability,
  showCheckButton = true 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getAvailabilityStatus = (date) => {
    if (!date) return null;
    const day = date.getDate();
    const random = (day * 7) % 4;
    if (random === 0) return 'available';
    if (random === 1) return 'busy';
    if (random === 2) return 'partial';
    return 'available';
  };

  const isDateSelected = (date) => {
    if (!date) return false;
    return selectedDates.some(selectedDate => 
      selectedDate.toDateString() === date.toDateString()
    );
  };

  const isDateInRange = (date) => {
    if (!date || selectedDates.length < 2) return false;
    const start = selectedDates[0];
    const end = selectedDates[1];
    return date >= start && date <= end;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const status = getAvailabilityStatus(date);
    if (status === 'busy') return;
    
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const monthNames = [
    'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  const dayNames = ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={prevMonth} className={styles.navButton}>‹</button>
        <h3 className={styles.monthTitle}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={nextMonth} className={styles.navButton}>›</button>
      </div>
      
      <div className={styles.calendarGrid}>
        {dayNames.map((day, index) => (
          <div key={index} className={styles.dayHeader}>{day}</div>
        ))}
        
        {days.map((day, index) => {
          const status = getAvailabilityStatus(day);
          const isSelected = isDateSelected(day);
          const isInRange = isDateInRange(day);
          
          return (
            <div 
              key={index} 
              className={`
                ${styles.day} 
                ${day ? styles[status] : styles.emptyDay}
                ${isSelected ? styles.selected : ''}
                ${isInRange ? styles.inRange : ''}
              `}
              onClick={() => handleDateClick(day)}
            >
              {day ? day.getDate() : ''}
            </div>
          );
        })}
      </div>
      
      {showCheckButton && selectedDates.length === 2 && onCheckAvailability && (
        <button 
          onClick={onCheckAvailability}
          className={styles.checkButton}
        >
          Vezi camerele libere
        </button>
      )}
    </div>
  );
};

export default Calendar; 