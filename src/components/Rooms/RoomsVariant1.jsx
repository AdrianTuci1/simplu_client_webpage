import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './RoomsVariant1.module.css';
import useRoomsStore from './roomsStore';

const RoomsVariant1 = () => {
  const { 
    rooms, 
    loading, 
    error, 
    loadRooms 
  } = useRoomsStore();

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  // Debug: Log rooms data
  useEffect(() => {
    console.log('Rooms data from store:', rooms);
    console.log('Loading state:', loading);
    console.log('Error state:', error);
  }, [rooms, loading, error]);

  // Format price for display
  const formatPrice = (price, currency = 'RON') => {
    return `de la ${price} ${currency}/noapte`;
  };

  if (loading) {
    return (
      <section className={styles.roomsSection}>
        <div className={styles.roomsContainer}>
          <h2 className={styles.roomsTitle}>CAMERELE NOASTRE</h2>
          <div className={styles.loadingMessage}>Se încarcă camerele...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.roomsSection}>
        <div className={styles.roomsContainer}>
          <h2 className={styles.roomsTitle}>CAMERELE NOASTRE</h2>
          <div className={styles.errorMessage}>Eroare la încărcarea camerelor: {error}</div>
        </div>
      </section>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <section className={styles.roomsSection}>
        <div className={styles.roomsContainer}>
          <h2 className={styles.roomsTitle}>CAMERELE NOASTRE</h2>
          <div className={styles.noRoomsMessage}>Nu sunt camere disponibile momentan.</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.roomsSection}>
      <div className={styles.roomsContainer}>
        <h2 className={styles.roomsTitle}>CAMERELE NOASTRE</h2>
        
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={styles.roomsSwiper}
        >
          {rooms.map((room) => (
            <SwiperSlide key={room.id} className={styles.roomSlide}>
              <div className={styles.roomCard}>
                <div className={styles.roomImage}>
                  <img src={room.image} alt={room.name} loading="lazy" />
                  <div className={styles.roomOverlay}>
                    <div className={styles.roomPrice}>
                      {formatPrice(room.price, room.currency)}
                    </div>
                  </div>
                </div>
                <div className={styles.roomContent}>
                  <h3 className={styles.roomName}>{room.name}</h3>
                  <p className={styles.roomDescription}>{room.description}</p>
                  <button 
                    className={styles.bookButton}
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