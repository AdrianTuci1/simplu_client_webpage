import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './FeaturesVariant1.module.css';

const facilities = [
  {
    id: 'fitness',
    name: 'Sala Fitness',
    location: 'Etaj 1',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww',
      'https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png',
      'https://www.wellnessgym.ro/wp-content/uploads/2024/05/fitness-wellness-gym-bucuresti.jpg',
      '/images/fitness-4.jpg',
    ]
  },
  {
    id: 'aerobic',
    name: 'Aerobic',
    location: 'Etaj 2',
    images: [
      '/images/aerobic-1.jpg',
      '/images/aerobic-2.jpg',
      '/images/aerobic-3.jpg',
    ]
  },
  {
    id: 'piscina',
    name: 'Piscină',
    location: 'Etaj 0',
    images: [
      '/images/piscina-1.jpg',
      '/images/piscina-2.jpg',
      '/images/piscina-3.jpg',
      '/images/piscina-4.jpg',
    ]
  },
  {
    id: 'sauna',
    name: 'Saună',
    location: 'Etaj 0',
    images: [
      '/images/sauna-1.jpg',
      '/images/sauna-2.jpg',
      '/images/sauna-3.jpg',
    ]
  }
];

const FeaturesVariant1 = () => {
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleFacilityChange = (facility) => {
    setSelectedFacility(facility);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
  };

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
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
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
            {selectedFacility.images.map((image, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.carouselItem}>
                  <div className={styles.imageContainer}>
                    <img src={image} alt={`${selectedFacility.name} ${index + 1}`} />
                  </div>
                  <div className={styles.imageInfo}>
                    <h3>{selectedFacility.name}</h3>
                    <p>{selectedFacility.location}</p>
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