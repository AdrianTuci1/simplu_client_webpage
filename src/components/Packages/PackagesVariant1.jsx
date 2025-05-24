import React, { useState } from 'react';
import usePackagesStore from '../../store/packages/packagesStore';
import styles from './PackagesVariant1.module.css';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
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

const PackagesVariant1 = () => {
  const packages = usePackagesStore(state => state.getAllPackages());
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + packages.length) % packages.length);
  };

  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + packages.length) % packages.length;
    const next = (currentIndex + 1) % packages.length;
    return [prev, currentIndex, next];
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Membership Plans
          </h2>
          <p className={styles.subtitle}>
            Choose your path to fitness excellence
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.navButtonLeft}`}
          >
            <BiChevronLeft className={styles.navIcon} />
          </button>
          
          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.navButtonRight}`}
          >
            <BiChevronRight className={styles.navIcon} />
          </button>

          <div className={styles.carousel}>
            <div className={styles.slidesContainer}>
              {getVisibleIndices().map((index, position) => {
                const pkg = packages[index];
                const isActive = position === 1;
                
                return (
                  <div
                    key={`${pkg.id}-${position}`}
                    className={`${styles.slide} ${isActive ? styles.activeSlide : ''}`}
                  >
                    <div className={`${styles.card} ${getTierColor(pkg.tier)}`}>
                      <div className={styles.colorBar} />
                      <div className={styles.cardContent}>
                        {isActive ? (
                          <>
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
                          </>
                        ) : (
                          <div className={styles.inactiveContent}>
                            <div className={styles.iconWrapper}>
                              {getPackageIcon(pkg.name)}
                            </div>
                            <h3 className={styles.cardTitle}>{pkg.name}</h3>
                            {pkg.entry_limit && (
                              <div className={styles.entryInfo}>
                                <span>{pkg.entry_limit} intrări</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesVariant1; 