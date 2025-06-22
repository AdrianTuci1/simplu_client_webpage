import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useServicesStore } from '../../store';
import { useServices, getCurrentBusinessType } from '../../hooks/useBusinessData';
import styles from './FeaturesVariant2.module.css';

const FeaturesVariant2 = () => {
  const { 
    services, 
    loading, 
    error, 
    loadServices
  } = useServicesStore();

  const { data: servicesData, loading: dataLoading, error: dataError } = useServices();

  // Get current business type to determine which data to use
  const currentBusinessType = getCurrentBusinessType();

  useEffect(() => {
    loadServices(currentBusinessType);
  }, [loadServices, currentBusinessType]);

  // Use store data if available, otherwise fall back to API data
  const displayServices = services.length > 0 ? services : (servicesData || []);

  // Transform services data to match the expected format
  const transformServicesToFeatures = (servicesList) => {
    return servicesList.map((service, index) => ({
      id: service.id,
      type: 'SERVICIU',
      name: service.name,
      color: getColorByIndex(index),
      category: service.category
    }));
  };

  // Generate colors for services
  const getColorByIndex = (index) => {
    const colors = [
      '#FFE4E1', // Light pink
      '#E0FFFF', // Light cyan
      '#F0FFF0', // Light green
      '#FFF0F5', // Light pink
      '#F5F5DC', // Beige
      '#E6E6FA', // Lavender
      '#F0F8FF', // Alice blue
      '#FFFACD'  // Lemon chiffon
    ];
    return colors[index % colors.length];
  };

  if (loading || dataLoading) {
    return (
      <section className={`features ${styles.featuresVariant2}`}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Se încarcă serviciile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || dataError) {
    return (
      <section className={`features ${styles.featuresVariant2}`}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p>Eroare la încărcarea serviciilor</p>
          </div>
        </div>
      </section>
    );
  }

  const features = transformServicesToFeatures(displayServices);

  return (
    <section className={`features ${styles.featuresVariant2}`}>
      <div className={styles.container}>
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
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
          {/* Placeholder cards for missing items to maintain grid layout */}
          {Array.from({ length: Math.max(0, 4 - features.length) }).map((_, index) => (
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