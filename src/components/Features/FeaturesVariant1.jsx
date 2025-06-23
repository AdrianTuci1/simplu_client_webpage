import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { useFacilitiesStore } from '../../store';
import { useFacilities, getCurrentBusinessType } from '../../hooks/index.js';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './FeaturesVariant1.module.css';

const FeaturesVariant1 = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  
  const { 
    facilities, 
    loading, 
    error, 
    loadFacilities
  } = useFacilitiesStore();

  const { data: facilitiesData, loading: dataLoading, error: dataError } = useFacilities();

  // Get current business type to determine which data to use
  const currentBusinessType = getCurrentBusinessType();

  useEffect(() => {
    loadFacilities(currentBusinessType);
  }, [loadFacilities, currentBusinessType]);

  // Use store data if available, otherwise fall back to API data
  const displayFacilities = facilities.length > 0 ? facilities : (facilitiesData || []);

  // Set initial selected facility
  const [selectedFacility, setSelectedFacility] = useState(
    displayFacilities.length > 0 ? displayFacilities[0] : null
  );

  // Update selected facility when facilities data changes
  useEffect(() => {
    if (displayFacilities.length > 0 && !selectedFacility) {
      setSelectedFacility(displayFacilities[0]);
    }
  }, [displayFacilities, selectedFacility]);

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
  };

  if (loading || dataLoading) {
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

  if (error || dataError) {
    return (
      <section className={`features ${styles.featuresVariant1}`}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p>Eroare la încărcarea facilităților</p>
          </div>
        </div>
      </section>
    );
  }

  if (!selectedFacility || displayFacilities.length === 0) {
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
            {displayFacilities.map((facility) => (
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