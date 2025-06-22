import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './GalleryVariant1.css';

const GalleryVariant1 = () => {
  // Use local state with default gallery data
  const [images] = useState([
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Imagine 1',
      title: 'Cabinet Dentar Modern',
      description: 'Cabinetul nostru modern cu tehnologie de ultimă generație'
    },
    {
      id: 2,
      src: 'https://localdentalclinics.com.au/blogs/1678785522.png',
      alt: 'Imagine 2',
      title: 'Sala de Așteptare',
      description: 'Sala de așteptare confortabilă și primitoare'
    },
    {
      id: 3,
      src: 'https://hddentalclinic.ro/wp-content/uploads/2023/04/HD-Dental-Clinic-Cabinet-Dentar-Bucuresti-6.jpg',
      alt: 'Imagine 3',
      title: 'Echipament Medical',
      description: 'Echipament medical modern pentru tratamente de calitate'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Imagine 4',
      title: 'Zona de Tratament',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      alt: 'Imagine 5',
      title: 'Zona de Tratament',
    }
  ]);
  
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

  // Show empty state
  if (!images || images.length === 0) {
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