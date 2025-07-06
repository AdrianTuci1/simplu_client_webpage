import React from 'react';
import { usePackagesData } from '../../utils/componentHelpers';
import styles from './PackagesVariant1.module.css';
import PackageCard from './PackageCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const PackagesVariant1 = () => {
  // Use the new homepage data system
  const { data: packages, loading, error } = usePackagesData();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>Membership Plans</h2>
            <p className={styles.subtitle}>Choose your path to fitness excellence</p>
          </div>
          <div className={styles.loadingMessage}>Se încarcă pachetele...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>Membership Plans</h2>
            <p className={styles.subtitle}>Choose your path to fitness excellence</p>
          </div>
          <div className={styles.errorMessage}>Eroare la încărcarea pachetelor: {error}</div>
        </div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>Membership Plans</h2>
            <p className={styles.subtitle}>Choose your path to fitness excellence</p>
          </div>
          <div className={styles.noPackagesMessage}>Nu sunt pachete disponibile momentan.</div>
        </div>
      </div>
    );
  }

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
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={10}
            className={`${styles.swiper} mySwiper`}
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id} className={styles.swiperSlide}>
                <PackageCard pkg={pkg} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PackagesVariant1; 