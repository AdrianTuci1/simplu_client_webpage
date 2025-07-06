import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useFacilitiesData } from '../../utils/componentHelpers';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './FeaturesVariant1.module.css';

const FeaturesVariant1 = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  
  // Use the new homepage data system
  const { data: facilities, loading, error } = useFacilitiesData();

  // Set initial selected facility
  const [selectedFacility, setSelectedFacility] = useState(
    facilities && facilities.length > 0 ? facilities[0] : null
  );

  // Update selected facility when facilities data changes
  useEffect(() => {
    if (facilities && facilities.length > 0 && !selectedFacility) {
      setSelectedFacility(facilities[0]);
    }
  }, [facilities, selectedFacility]);

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
  };

  if (loading) {
    return (
      <section className={`features ${styles.featuresVariant1}`}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Se încarcă facilitățile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`features ${styles.featuresVariant1}`}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p>Eroare la încărcarea facilităților: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!selectedFacility || !facilities || facilities.length === 0) {
    return (
      <section className={`features ${styles.featuresVariant1}`}>
        <div className={styles.container}>
          <div className={styles.noDataContainer}>
            <p>Nu sunt facilități disponibile</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`features ${styles.featuresVariant1}`}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.facilitiesList}>
            {facilities.map((facility) => (
              <button
                key={facility.id}
                className={`${styles.facilityBtn} ${selectedFacility.id === facility.id ? styles.active : ''}`}
                onClick={() => handleFacilityChange(facility)}
              >
                {facility.name}
              </button>
            ))}
          </div>
          
          <div className={styles.navigationControls}>
            <button 
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={() => swiperInstance?.slidePrev()}
            >
              <FaChevronLeft />
            </button>
            <button 
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={() => swiperInstance?.slideNext()}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className={styles.carouselContainer}>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            onSwiper={setSwiperInstance}
            className={styles.swiper}
          >
            {selectedFacility.images && selectedFacility.images.map((image, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.carouselItem}>
                  <div className={styles.imageContainer}>
                    <img src={image} alt={`${selectedFacility.name} ${index + 1}`} />
                  </div>
                  <div className={styles.imageInfo}>
                    <h3>{selectedFacility.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturesVariant1; 