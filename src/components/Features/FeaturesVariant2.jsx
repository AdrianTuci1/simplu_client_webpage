import React from 'react';
import { useServicesData } from '../../utils/componentHelpers';
import styles from './FeaturesVariant2.module.css';

const FeaturesVariant2 = () => {
  const { data: services, loading, error } = useServicesData();

  // Generate random colors for cards
  const generateRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Create 4 cards with services data
  const createCards = () => {
    const cards = [];
    
    // Add existing services
    if (services && services.length > 0) {
      services.forEach((service, index) => {
        if (index < 4) {
          cards.push({
            id: service.id || index + 1,
            type: 'TRATAMENT',
            name: service.name,
            color: generateRandomColor()
          });
        }
      });
    }
    
    // Fill remaining slots with "categorie lipsa"
    while (cards.length < 4) {
      cards.push({
        id: `missing-${cards.length + 1}`,
        type: 'CATEGORIE',
        name: 'categorie lipsa',
        color: generateRandomColor()
      });
    }
    
    return cards;
  };

  if (loading) {
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

  if (error) {
    return (
      <section className={`features ${styles.featuresVariant2}`}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p>Eroare la încărcarea serviciilor: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const cards = createCards();

  return (
    <section className={`features ${styles.featuresVariant2}`}>
      <div className={styles.container}>
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={styles.card}
              style={{ backgroundColor: card.color }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardType}>{card.type}</div>
                <div className={styles.cardName}>{card.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesVariant2; 