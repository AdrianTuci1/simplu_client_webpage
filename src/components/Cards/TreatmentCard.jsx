import React from 'react';
import { IoTimeOutline, IoPricetagOutline } from 'react-icons/io5';
import styles from './TreatmentCard.module.css';

const TreatmentCard = ({ treatment, onSelect }) => {
  const { 
    id,
    name, 
    duration, 
    price, 
    color, 
    category 
  } = treatment;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (duration) => {
    const hours = parseInt(duration);
    return hours === 1 ? '1 hour' : `${hours} hours`;
  };

  return (
    <div className={styles.card} onClick={() => onSelect && onSelect(treatment)}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <div 
            className={styles.categoryBadge}
            style={{ backgroundColor: color || '#2196F3' }}
          >
            {category}
          </div>
          <div className={styles.treatmentName}>
            <h3>{name}</h3>
          </div>
        </div>
        
        <div className={styles.treatmentDetails}>
          <div className={styles.detailItem}>
            <IoTimeOutline className={styles.icon} />
            <span className={styles.detailText}>{formatDuration(duration)}</span>
          </div>
          <div className={styles.detailItem}>
            <IoPricetagOutline className={styles.icon} />
            <span className={styles.detailText}>{formatPrice(price)}</span>
          </div>
        </div>
        
        <div className={styles.actionButton}>
          <button className={styles.bookButton}>
            Book Treatment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard; 