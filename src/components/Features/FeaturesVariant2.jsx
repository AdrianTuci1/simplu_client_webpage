import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useServicesData } from '../../utils/componentHelpers';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './FeaturesVariant2.module.css';

const FeaturesVariant2 = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  
  // Use the new homepage data system
  const { data: services, loading, error } = useServicesData();

  // Transform services data to match the expected format
  const transformServicesToFeatures = (servicesList) => {
    return servicesList.map((service, index) => ({
      id: service.id || index + 1,
      name: service.name,
      description: service.description || service.category,
      images: service.images || [service.image] || [],
      category: service.category,
      color: getServiceColor(index)
    }));
  };

  // Generate colors for services
  const getServiceColor = (index) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    return colors[index % colors.length];
  };

  // Set initial selected service
  const [selectedService, setSelectedService] = useState(
    services && services.length > 0 ? transformServicesToFeatures(services)[0] : null
  );

  // Update selected service when services data changes
  useEffect(() => {
    if (services && services.length > 0 && !selectedService) {
      const features = transformServicesToFeatures(services);
      setSelectedService(features[0]);
    }
  }, [services, selectedService]);

  const handleServiceChange = (service) => {
    setSelectedService(service);
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
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

  if (!selectedService || !services || services.length === 0) {
    return (
      <section className={`features ${styles.featuresVariant2}`}>
        <div className={styles.container}>
          <div className={styles.noDataContainer}>
            <p>Nu sunt servicii disponibile</p>
          </div>
        </div>
      </section>
    );
  }

  const features = transformServicesToFeatures(services);

  return (
    <section className={`features ${styles.featuresVariant2}`}>
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <div className={styles.servicesList}>
            {features.map((service) => (
              <button
                key={service.id}
                className={`${styles.serviceBtn} ${selectedService.id === service.id ? styles.active : ''}`}
                onClick={() => handleServiceChange(service)}
                style={{ 
                  backgroundColor: selectedService.id === service.id ? service.color : 'transparent',
                  borderColor: service.color
                }}
              >
                {service.name}
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
            {selectedService.images && selectedService.images.map((image, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.carouselItem}>
                  <div className={styles.imageContainer}>
                    <img src={image} alt={`${selectedService.name} ${index + 1}`} />
                  </div>
                  <div className={styles.imageInfo}>
                    <h3>{selectedService.name}</h3>
                    <p>{selectedService.description}</p>
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

export default FeaturesVariant2; 