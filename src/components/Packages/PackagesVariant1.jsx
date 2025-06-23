import React from 'react';
import usePackagesStore from '../../store/packages/packagesStore';
import styles from './PackagesVariant1.module.css';
import PackageCard from './PackageCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const PackagesVariant1 = () => {
  const packages = usePackagesStore(state => state.getAllPackages());

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