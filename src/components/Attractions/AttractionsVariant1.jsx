import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './AttractionsVariant1.css';

const AttractionsVariant1 = () => {
  const attractions = [
    {
      id: 1,
      name: "Trasee Montane",
      image: "https://www.romaniatourism.com/images/brasov/brasov-romania.jpg",
    },
    {
      id: 2,
      name: "Lacul de Munte",
      image: "https://holaromania.com/wp-content/uploads/2020/08/brasov-transilvania-rumania-oton%CC%83o-adrian-dascal.jpg",
    },
    {
      id: 3,
      name: "Pădurea Seculară",
      image: "https://xplorer.ro/wp-content/uploads/2023/02/Locuri-de-vizitat-langa-Brasov-1-1024x682.webp",
    },
    {
      id: 4,
      name: "Cascada",
      image: "https://www.clubulcopiilor.ro/wp-content/uploads/2023/05/Prapastiile-Zarnestiului-681x1024.webp",
    },
  ];

  // Calculate if loop should be enabled based on number of slides
  const shouldEnableLoop = attractions.length > 3; // Enable loop only if we have more than 3 slides

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