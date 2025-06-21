import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaUsers, FaStar, FaCheck, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart, FaShare, FaCalendarAlt } from 'react-icons/fa';
import { useCurrentDataByType } from '../../../../hooks/useBusinessData';
import { useHotelStore } from '../../../../store';
import Calendar from '../../../../components/Calendar/Calendar';
import styles from './RoomDetails.module.css';

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [nights, setNights] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Use the new data flow architecture
  const { data: roomsData, loading, error } = useCurrentDataByType('rooms');
  const { ui } = useHotelStore();

  // Find room data from the fetched rooms
  const room = roomsData?.find(r => r.id === parseInt(roomId));

  // Handle loading state
  if (loading || ui.isLoading) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  // Handle error state
  if (error || ui.error) {
    return (
      <div className={styles.error}>
        <p>Eroare la încărcarea datelor: {error?.message || ui.error}</p>
        <button onClick={() => window.location.reload()}>Încearcă din nou</button>
      </div>
    );
  }

  // Handle room not found
  if (!room) {
    navigate('/rooms');
    return null;
  }

  // Calculate nights
  useEffect(() => {
    if (selectedDates.length === 2) {
      const start = selectedDates[0];
      const end = selectedDates[1];
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    }
  }, [selectedDates]);

  const handleDateSelect = (date) => {
    if (selectedDates.length === 0) {
      setSelectedDates([date]);
    } else if (selectedDates.length === 1) {
      const startDate = selectedDates[0];
      if (date < startDate) {
        setSelectedDates([date, startDate]);
      } else {
        setSelectedDates([startDate, date]);
      }
    } else {
      setSelectedDates([date]);
    }
  };

  const handleBooking = () => {
    if (selectedDates.length !== 2) {
      alert('Vă rugăm să selectați o perioadă de cazare');
      return;
    }

    navigate(`/room/${roomId}/booking`, { 
      state: { 
        room, 
        startDate: selectedDates[0].toISOString().split('T')[0],
        endDate: selectedDates[1].toISOString().split('T')[0],
        nights,
        totalPrice: room.price * nights 
      } 
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Generate additional images for gallery (using the main image for demo)
  const roomImages = [
    room.image,
    room.image, // In a real app, these would be different images
    room.image,
    room.image
  ];

  return (
    <div className={styles.roomDetailsPage}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.roomTitle}>
            <h1>{room.name}</h1>
            <div className={styles.roomMeta}>
              <div className={styles.rating}>
                <FaStar />
                <span>{room.rating}</span>
                <span className={styles.dot}>•</span>
                <span>{room.type}</span>
                <span className={styles.dot}>•</span>
                <span>{room.size}</span>
              </div>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.actionButton}>
              <FaShare />
              <span>Partajează</span>
            </button>
            <button className={`${styles.actionButton} ${isFavorite ? styles.favorite : ''}`} onClick={toggleFavorite}>
              <FaHeart />
              <span>Salvează</span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <img src={roomImages[selectedImage]} alt={room.name} />
            <div className={styles.imageOverlay}>
              <div className={styles.roomTypeBadge}>{room.type}</div>
            </div>
          </div>
          <div className={styles.imageThumbnails}>
            {roomImages.map((image, index) => (
              <div 
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${room.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.contentSection}>
            {/* Room Overview */}
            <div className={styles.overviewSection}>
              <div className={styles.overviewHeader}>
                <h2>Despre această cameră</h2>
                <div className={styles.roomSpecs}>
                  <div className={styles.specItem}>
                    <FaBed />
                    <span>{room.capacity} persoane</span>
                  </div>
                  <div className={styles.specItem}>
                    <FaUsers />
                    <span>{room.size}</span>
                  </div>
                </div>
              </div>
              <p className={styles.description}>{room.description}</p>
            </div>

            {/* Amenities */}
            <div className={styles.section}>
              <h3>Ce oferă această cameră</h3>
              <div className={styles.amenitiesList}>
                {room.amenities?.map((amenity, index) => (
                  <div key={index} className={styles.amenityItem}>
                    <FaCheck />
                    <span>{amenity}</span>
                  </div>
                )) || (
                  <p>Nu sunt amenități disponibile pentru această cameră.</p>
                )}
              </div>
            </div>

            {/* Features */}
            <div className={styles.section}>
              <h3>Caracteristici speciale</h3>
              <div className={styles.featuresList}>
                {room.features?.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                    <FaCheck />
                    <span>{feature}</span>
                  </div>
                )) || (
                  <p>Nu sunt caracteristici speciale disponibile pentru această cameră.</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className={styles.section}>
              <h3>Locație</h3>
              <div className={styles.locationInfo}>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt />
                  <span>Strada Exemplu, Nr. 123, Orașul</span>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone />
                  <span>+40 123 456 789</span>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <span>contact@hotel-exemplu.ro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className={styles.bookingSidebar}>
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceInfo}>
                  <span className={styles.priceAmount}>{room.price}</span>
                  <span className={styles.priceCurrency}>{room.currency}</span>
                  <span className={styles.pricePeriod}>noapte</span>
                </div>
                <div className={styles.rating}>
                  <FaStar />
                  <span>{room.rating}</span>
                </div>
              </div>

              <div className={styles.calendarSection}>
                <h4>Selectează perioada</h4>
                <Calendar 
                  selectedDates={selectedDates}
                  onDateSelect={handleDateSelect}
                  showCheckButton={false}
                />
              </div>

              {selectedDates.length === 2 && (
                <div className={styles.totalPrice}>
                  <span>Total pentru {nights} noapte{nights > 1 ? 'i' : ''}</span>
                  <span className={styles.totalAmount}>{room.price * nights} {room.currency}</span>
                </div>
              )}

              <button 
                className={styles.bookButton}
                onClick={handleBooking}
                disabled={!room.availability || selectedDates.length !== 2}
              >
                {selectedDates.length !== 2 ? 'Selectează perioada' : 'Rezervă'}
              </button>

              {!room.availability && (
                <p className={styles.unavailableMessage}>
                  Această cameră nu este disponibilă pentru perioada selectată.
                </p>
              )}

              <div className={styles.bookingNote}>
                <p>Nu vei fi încărcat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails; 