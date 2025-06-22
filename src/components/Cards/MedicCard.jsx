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
          <div className={styles.availabilityItem}>
            <IoCalendarOutline className={styles.icon} />
            <span className={styles.availabilityText}>{availabilityDays}</span>
          </div>
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