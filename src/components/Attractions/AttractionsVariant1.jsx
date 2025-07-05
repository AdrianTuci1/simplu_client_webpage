import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import useAttractionsStore from './attractionsStore';
import { useAttractions } from '../../hooks';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './AttractionsVariant1.css';

const AttractionsVariant1 = () => {
  const { 
    attractions, 
    loading, 
    error, 
    loadAttractions
  } = useAttractionsStore();

  const { data: attractionsData, loading: dataLoading, error: dataError, isDemoMode } = useAttractions({ locationId: 1 });

  useEffect(() => {
    loadAttractions();
  }, [loadAttractions]);

  // Use store data if available, otherwise fall back to API data
  const displayAttractions = attractions.length > 0 ? attractions : (attractionsData || []);

  // Calculate if loop should be enabled based on number of slides
  const shouldEnableLoop = displayAttractions.length > 3;

  if (loading || dataLoading) {
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

  if (error || dataError) {
    return (
      <div className="attractions-container">
        <h2 className="attractions-title">ATRACTII LOCALE</h2>
        <div className="error-container">
          <p>Eroare la încărcarea atracțiilor</p>
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
            loop: displayAttractions.length > 1
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
            loop: displayAttractions.length > 2
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: displayAttractions.length > 3
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: displayAttractions.length > 3
          }
        }}
      >
        {displayAttractions.map((attraction) => (
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