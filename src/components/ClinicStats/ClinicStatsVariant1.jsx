import React, { useState, useEffect } from 'react';
import './ClinicStatsVariant1.css';
import styles from './ClinicStatsVariant1.module.css';
import useClinicAvailabilityStore from '../../store/clinicAvailabilityStore';

const ClinicStatsVariant1 = () => {
  const [date, setDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month'); // 'month' or 'year'
  const { 
    availability,
    isLoading,
    error,
    fetchMonthAvailability,
    getAvailabilityLevel,
    getAvailabilityColor,
    getAvailabilityBorderColor
  } = useClinicAvailabilityStore();

  // Popular treatments data
  const popularTreatments = [
    'Consultatie generala',
    'Curatare dentara',
    'Albire dentara',
    'Tratament carii',
    'Extractie dinti',
    'Ortodontie'
  ];

  useEffect(() => {
    const currentDate = new Date();
    fetchMonthAvailability(currentDate.getFullYear(), currentDate.getMonth());
  }, [fetchMonthAvailability]);


  // Custom Calendar Functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const isCurrentDay = (day, month, year) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  const isSelectedDay = (day, month, year) => {
    return day === date.getDate() && month === date.getMonth() && year === date.getFullYear();
  };

  const getDayAvailability = (day, month, year) => {
    const checkDate = new Date(year, month, day);
    return getAvailabilityLevel(checkDate);
  };

  const getDayClassName = (day, month, year) => {
    const classes = [styles.day];
    
    if (isCurrentDay(day, month, year)) {
      classes.push(styles.currentDay);
    } else if (isSelectedDay(day, month, year)) {
      classes.push(styles.selectedDay);
    }
    
    const availability = getDayAvailability(day, month, year);
    if (availability) {
      classes.push(styles[`occupied${availability.charAt(0).toUpperCase() + availability.slice(1)}`]);
    }
    
    return classes.join(' ');
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + direction);
    setDate(newDate);
    fetchMonthAvailability(newDate.getFullYear(), newDate.getMonth());
  };

  const navigateYear = (direction) => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + direction);
    setDate(newDate);
    fetchMonthAvailability(newDate.getFullYear(), newDate.getMonth());
  };

  const handleMonthYearClick = () => {
    setCurrentView(currentView === 'month' ? 'year' : 'month');
  };

  const selectDay = (day) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), day);
    setDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className={`${styles.day} ${styles.otherMonth}`}></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={getDayClassName(day, month, year)}
          onClick={() => selectDay(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  const monthNames = [
    'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  const weekdayNames = ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'];

  const handleRequestAppointment = () => {
    // Handle appointment request logic here
    console.log('Requesting appointment for date:', date);
  };

  return (
    <div className="clinic-stats-container">
      <div className="clinic-stats-grid">
        <div className="calendar-section">
          <div className="calendar-availability-container">
            <div className={styles.calendarContainer}>
              <div className={styles.calendarNavigation}>
                <div 
                  className={styles.dateLabel}
                  onClick={handleMonthYearClick}
                >
                  {currentView === 'month' 
                    ? `${monthNames[date.getMonth()]} ${date.getFullYear()}`
                    : date.getFullYear()
                  }
                </div>
                <button 
                  className={styles.navigationButton}
                  onClick={() => currentView === 'month' ? navigateMonth(-1) : navigateYear(-1)}
                >
                  ‹
                </button>
                <button 
                  className={styles.navigationButton}
                  onClick={() => currentView === 'month' ? navigateMonth(1) : navigateYear(1)}
                >
                  ›
                </button>
              </div>
              
              <div className={styles.calendarBody}>
                <div className={styles.weekdays}>
                  {weekdayNames.map((day, index) => (
                    <div key={index} className={styles.weekday}>
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className={styles.daysGrid}>
                  {generateCalendarDays()}
                </div>
              </div>
            </div>
            
            <div className="availability-column">
              <h4>Disponibilitate</h4>
              <div className="availability-items">
                <div className="availability-item">
                  <span className="availability-color" style={{ backgroundColor: getAvailabilityColor('high'), border: `2px solid ${getAvailabilityBorderColor('high')}` }}></span>
                  <span className="availability-text">Grad ridicat</span>
                </div>
                <div className="availability-item">
                  <span className="availability-color" style={{ backgroundColor: getAvailabilityColor('medium'), border: `2px solid ${getAvailabilityBorderColor('medium')}` }}></span>
                  <span className="availability-text">Grad mediu</span>
                </div>
                <div className="availability-item">
                  <span className="availability-color" style={{ backgroundColor: getAvailabilityColor('low'), border: `2px solid ${getAvailabilityBorderColor('low')}` }}></span>
                  <span className="availability-text">Grad scăzut</span>
                </div>
                <div className="availability-item">
                  <span className="availability-color" style={{ backgroundColor: getAvailabilityColor('closed'), border: `2px solid ${getAvailabilityBorderColor('closed')}` }}></span>
                  <span className="availability-text">Închis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="working-hours-section">
            <h3>Program de lucru</h3>
            <div className="working-hours">
              <div className="schedule-item">
                <span className="day">Luni - Vineri</span>
                <span className="hours">09:00 - 18:00</span>
              </div>
              <div className="schedule-item">
                <span className="day">Sâmbătă - Duminică</span>
                <span className="hours">10:00 - 14:00</span>
              </div>
            </div>
          </div>

          <div className="treatments-section">
            <h3>Tratamente populare</h3>
            <div className="treatments-grid">
              {popularTreatments.map((treatment, index) => (
                <div key={index} className="treatment-chip">
                  {treatment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="appointment-button-container">
        <button 
          className="request-appointment-btn"
          onClick={handleRequestAppointment}
        >
          Solicită o programare
        </button>
      </div>
    </div>
  );
};

export default ClinicStatsVariant1; 