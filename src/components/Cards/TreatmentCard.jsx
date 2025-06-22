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

  // Function to extract initials from treatment name
  const getInitials = (name) => {
    if (!name) return 'TR';
    
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    
    return words
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  const treatmentInitials = getInitials(name);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(id, treatment);
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.cardContent}>
        <div className={styles.mainContent}>
          <div className={styles.leftSection}>
            <div className={styles.headerRow}>
              <div 
                className={styles.treatmentIcon}
                style={{ backgroundColor: color || '#2196F3' }}
              >
                <span className={styles.initials}>{treatmentInitials}</span>
              </div>
              <div className={styles.treatmentInfo}>
                <h3 className={styles.treatmentName}>{name}</h3>
                <div 
                  className={styles.categoryBadge}
                  style={{ backgroundColor: color || '#2196F3' }}
                >
                  {category}
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.rightSection}>
            <div className={styles.detailItem}>
              <IoTimeOutline className={styles.icon} />
              <span className={styles.detailText}>{formatDuration(duration)}</span>
            </div>
            <div className={styles.detailItem}>
              <IoPricetagOutline className={styles.icon} />
              <span className={styles.detailText}>{formatPrice(price)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard; 