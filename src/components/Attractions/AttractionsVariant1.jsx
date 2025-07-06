import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useAttractionsData } from '../../utils/componentHelpers';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './AttractionsVariant1.css';

const AttractionsVariant1 = () => {
  // Use the new homepage data system
  const { data: attractions, loading, error } = useAttractionsData();

  // Calculate if loop should be enabled based on number of slides
  const shouldEnableLoop = attractions && attractions.length > 3;

  if (loading) {
    return (
      <div className="attractions-container">
        <h2 className="attractions-title">ATRACTII LOCALE</h2>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Se încarcă atracțiile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attractions-container">
        <h2 className="attractions-title">ATRACTII LOCALE</h2>
        <div className="error-container">
          <p>Eroare la încărcarea atracțiilor: {error}</p>
        </div>
      </div>
    );
  }

  if (!attractions || attractions.length === 0) {
    return (
      <div className="attractions-container">
        <h2 className="attractions-title">ATRACTII LOCALE</h2>
        <div className="no-data-container">
          <p>Nu sunt atracții disponibile momentan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="attractions-container">
      <h2 className="attractions-title">ATRACTII LOCALE</h2>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        loop={shouldEnableLoop}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="attractions-swiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: attractions.length > 1
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
            loop: attractions.length > 2
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: attractions.length > 3
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: attractions.length > 3
          }
        }}
      >
        {attractions.map((attraction) => (
          <SwiperSlide key={attraction.id}>
            <div className="attraction-card">
              <div className="attraction-image">
                <img src={attraction.image} alt={attraction.name} />
              </div>
              <div className="attraction-info">
                <h3>{attraction.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AttractionsVariant1; 