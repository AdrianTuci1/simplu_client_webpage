import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './RoomsVariant1.css';

const RoomsVariant1 = () => {
  const rooms = [
    {
      id: 1,
      name: "Camera Deluxe",
      image: "https://www.merahotels.ro/image/MzE3NC5qcGcvODAwLzgwMC8xLzEvNzAvLy8/tipuridecameredehotel.jpg?v=901905092238134634514111",
      description: "O cameră spațioasă cu vedere la munte",
    },
    {
      id: 2,
      name: "Camera Standard",
      image: "https://hello-hotels-bucuresti.continentalhotels.ro/wp-content/uploads/sites/9/2025/04/Hello-Hotels-Camera-Standard-dubla-8.jpg",
      description: "O cameră confortabilă pentru o pereche",
    },
    {
      id: 3,
      name: "Camera Family",
      image: "https://www.bucuresti-hotel.com/public/videos/hotel-with-single-room.jpg",
      description: "Perfectă pentru familii cu copii",
    },
  ];

  return (
    <div className="rooms-container">
      <h2 className="rooms-title">Camerele Noastre</h2>
      <Swiper
        slidesPerView={1.20}
        centeredSlides={true}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        className="rooms-swiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.id} className="room-slide">
            <div className="room-card">
              <div className="room-image">
                <img src={room.image} alt={room.name} />
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <button 
                  className="book-button"
                  onClick={() => window.location.href = '/rezervare'}
                >
                  Rezervă Acum
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RoomsVariant1; 