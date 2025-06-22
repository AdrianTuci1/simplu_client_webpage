import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './GalleryVariant1.css';

// Import from centralized store registry
import { useGalleryStore } from '../../store';

const GalleryVariant1 = () => {
  // Use the gallery store
  const {
    images,
    settings,
    ui,
    fetchGalleryData
  } = useGalleryStore();

  // Fetch gallery data on component mount
  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  // Show loading state
  if (ui.isLoading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Se încarcă galeria...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (ui.error) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-container">
            <div className="error-state">
              <p>Eroare la încărcarea galeriei: {ui.error}</p>
              <button onClick={fetchGalleryData} className="retry-button">
                Încearcă din nou
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-container">
          <div className="gallery-header">
            <div className="gallery-navigation">
              <div className="swiper-button-prev-custom"></div>
              <div className="swiper-button-next-custom"></div>
            </div>
          </div>
          <Swiper
            grabCursor={settings.grabCursor}
            slidesPerView={settings.slidesPerView}
            spaceBetween={settings.spaceBetween}
            loop={settings.loop}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            autoplay={settings.autoplay ? {
              delay: settings.autoplayDelay,
              disableOnInteraction: false,
            } : false}
            modules={[Navigation, Autoplay]}
            className="gallery-swiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className="gallery-slide">
                <div className="image-container">
                  <img src={image.src} alt={image.alt} className="gallery-image" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GalleryVariant1; 