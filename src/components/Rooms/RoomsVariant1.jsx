import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './RoomsVariant1.css';

const RoomsVariant1 = () => {
  const rooms = [
    {
      id: 1,
      name: "Camera Deluxe",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "O cameră spațioasă cu vedere panoramică la munte",
      price: "de la 450 RON/noapte"
    },
    {
      id: 2,
      name: "Camera Standard",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "O cameră confortabilă pentru o pereche",
      price: "de la 320 RON/noapte"
    },
    {
      id: 3,
      name: "Camera Family",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Perfectă pentru familii cu copii",
      price: "de la 580 RON/noapte"
    },
    {
      id: 4,
      name: "Camera Executive",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Pentru călătoriile de afaceri",
      price: "de la 520 RON/noapte"
    },
    {
      id: 5,
      name: "Camera Suite",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description: "Experiența supremă de cazare",
      price: "de la 750 RON/noapte"
    }
  ];

  return (
    <section className="rooms-section">
      <div className="rooms-container">
        <div className="rooms-header">
          <p className="rooms-subtitle">Descoperă confortul și eleganța în fiecare detaliu</p>
          <h2 className="rooms-title">Camerele Noastre</h2>
        </div>
        
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="rooms-swiper"
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.id} className="room-slide">
              <div className="room-card">
                <div className="room-image">
                  <img src={room.image} alt={room.name} loading="lazy" />
                  <div className="room-overlay">
                    <div className="room-price">{room.price}</div>
                  </div>
                </div>
                <div className="room-content">
                  <h3 className="room-name">{room.name}</h3>
                  <p className="room-description">{room.description}</p>
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
    </section>
  );
};

export default RoomsVariant1; 