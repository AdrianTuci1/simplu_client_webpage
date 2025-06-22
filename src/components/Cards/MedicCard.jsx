import React from 'react';
import { IoTimeOutline, IoCalendarOutline } from 'react-icons/io5';
import styles from './MedicCard.module.css';

const MedicCard = ({ medic }) => {
  const { 
    id,
    name, 
    description, 
    image, 
    specialization, 
    availabilityHours, 
    availabilityDays 
  } = medic;

  // Function to convert day names to 3-letter format
  const formatDayToThreeLetters = (day) => {
    const dayMap = {
      'monday': 'MON',
      'tuesday': 'TUE', 
      'wednesday': 'WED',
      'thursday': 'THU',
      'friday': 'FRI',
      'saturday': 'SAT',
      'sunday': 'SUN',
      'luni': 'LUN',
      'marti': 'MAR',
      'miercuri': 'MIE',
      'joi': 'JOI',
      'vineri': 'VIN',
      'sambata': 'SAM',
      'duminica': 'DUM'
    };
    
    const normalizedDay = day.toLowerCase().trim();
    return dayMap[normalizedDay] || day.substring(0, 3).toUpperCase();
  };

  // Parse availability days string and convert to array
  const parseAvailabilityDays = (daysString) => {
    if (!daysString) return [];
    
    // Split by common separators and clean up
    const days = daysString
      .split(/[,;|]/)
      .map(day => day.trim())
      .filter(day => day.length > 0);
    
    return days;
  };

  const availableDays = parseAvailabilityDays(availabilityDays);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.medicInfo}>
          <div className={styles.medicAvatar}>
            {image ? (
              <img src={image} alt={name} className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <span>MD</span>
              </div>
            )}
          </div>
          <div className={styles.medicDetails}>
            <h3 className={styles.medicName}>Dr. {name}</h3>
            <p className={styles.medicSpecialization}>{specialization}</p>
            {description && (
              <p className={styles.medicDescription}>{description}</p>
            )}
          </div>
        </div>
        
        <div className={styles.availabilityInfo}>
          <div className={styles.availabilityItem}>
            <IoTimeOutline className={styles.icon} />
            <span className={styles.availabilityText}>{availabilityHours}</span>
          </div>
          
          {availableDays.length > 0 && (
            <div className={styles.availabilityItem}>
              <div className={styles.daysContainer}>
                {availableDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={styles.dayCircle}
                    title={day}
                  >
                    {formatDayToThreeLetters(day)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className={styles.actionButton}>
          <button className={styles.bookButton}>
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicCard; 