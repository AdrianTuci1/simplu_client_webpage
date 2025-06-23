import React from 'react';
import styles from './PackagesVariant1.module.css';
import { FaDumbbell, FaRunning, FaHeartbeat, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { IoCheckmarkCircle } from 'react-icons/io5';

const getPackageIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('basic') || lowerName.includes('starter')) return <FaRunning />;
  if (lowerName.includes('premium')) return <FaDumbbell />;
  if (lowerName.includes('elite')) return <FaHeartbeat />;
  if (lowerName.includes('family')) return <FaUsers />;
  if (lowerName.includes('student')) return <FaGraduationCap />;
  return <FaDumbbell />;
};

const getTierColor = (tier) => {
  switch (tier) {
    case 'gold':
      return styles.gold;
    case 'silver':
      return styles.silver;
    case 'black':
      return styles.black;
    case 'service':
      return styles.service;
    default:
      return styles.none;
  }
};

const PackageCard = ({ pkg }) => {
  return (
    <div className={`${styles.card} ${getTierColor(pkg.tier)}`}>
      <div className={styles.colorBar} />
      <div className={styles.cardContent}>
        <div className={styles.activeHeader}>
          <div className={styles.iconWrapper}>
            {getPackageIcon(pkg.name)}
          </div>
          <h3 className={styles.cardTitle}>{pkg.name}</h3>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{pkg.price}€</span>
            <span className={styles.period}>/lună</span>
          </div>
          {pkg.entry_limit && (
            <div className={styles.entryInfo}>
              <span>{pkg.entry_limit} intrări/lună</span>
            </div>
          )}
        </div>
        <ul className={styles.featuresList}>
          {pkg.features.map((feature) => (
            <li key={feature} className={styles.featureItem}>
              <IoCheckmarkCircle className={styles.featureIcon} />
              <span className={styles.featureText}>{feature}</span>
            </li>
          ))}
        </ul>
        <button className={styles.ctaButton}>
          Selectează
        </button>
      </div>
    </div>
  );
};

export default PackageCard; 