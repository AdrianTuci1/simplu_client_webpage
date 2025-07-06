import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useGalleryData } from '../../utils/componentHelpers';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './GalleryVariant1.css';

const GalleryVariant1 = () => {
  // Use the new homepage data system
  const { data: gallery, loading, error } = useGalleryData();
  
  // Gallery Settings
  const settings = {
    slidesPerView: 1.2,
    spaceBetween: 20,
    loop: true,
    navigation: true,
    grabCursor: true,
    autoplay: false,
    autoplayDelay: 3000
  };

  if (loading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-container">
            <div className="loading-message">Se încarcă galeria...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-container">
            <div className="error-message">Eroare la încărcarea galeriei: {error}</div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (!gallery || gallery.length === 0) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="gallery-container">
            <div className="empty-state">
              <p>Nu sunt imagini disponibile în galerie</p>
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
            {gallery.map((image) => (
              <SwiperSlide key={image.id} className="gallery-slide">
                <div className="image-container">
                  <img src={image.image} alt={image.name} className="gallery-image" />
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