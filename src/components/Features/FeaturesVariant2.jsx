import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from './FeaturesVariant2.module.css';

const features = [
  {
    id: 1,
    type: 'CATEGORIE',
    name: 'Fitness',
    color: '#FFE4E1', // Light pink
  },
  {
    id: 2,
    type: 'TRATAMENT',
    name: 'Masaj',
    color: '#E0FFFF', // Light cyan
  },
  {
    id: 3,
    type: 'CATEGORIE',
    name: 'Aerobic',
    color: '#F0FFF0', // Light green
  },
  {
    id: 4,
    type: 'TRATAMENT',
    name: 'Saună',
    color: '#FFF0F5', // Light pink
  }
];

const FeaturesVariant2 = () => {
  return (
    <section className={`features ${styles.featuresVariant2}`}>
      <div className={styles.container}>
        <div className={styles.featuresGrid}>
          {features.map((feature, _) => (
            <div 
              key={feature.id} 
              className={styles.featureCard}
              style={{ backgroundColor: feature.color }}
            >
              <div className={styles.featureContent}>
                <span className={styles.featureType}>{feature.type}</span>
                <h3 className={styles.featureName}>{feature.name}</h3>
                <button className={styles.featureButton}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
          {/* Placeholder cards for missing items */}
          {Array.from({ length: 4 - features.length }).map((_, index) => (
            <div key={`missing-${index}`} className={`${styles.featureCard} ${styles.missing}`}>
              <div className={styles.featureContent}>
                <span className={styles.featureType}>CARD LIPSA</span>
                <h3 className={styles.featureName}>CARD LIPSA</h3>
                <button className={styles.featureButton} disabled>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesVariant2; 