import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBed, FaUsers, FaArrowRight, FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { useRooms } from '../../../../hooks';
// Demo hotel store
const useHotelStore = () => ({
  ui: {
    isLoading: false,
    error: null
  }
});
import styles from './Rooms.module.css';



const Rooms = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all'); // 'all' or 'available'
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  // Use the simplified hooks
  const { data: roomsData, loading, error, isDemoMode } = useRooms({ locationId: 1 });
  const { ui } = useHotelStore();

  // Hide navbar for this page
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.style.display = 'none';
    }

    // Cleanup function to show navbar when component unmounts
    return () => {
      if (navbar) {
        navbar.style.display = 'flex';
      }
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRoomDetails = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  const handleBooking = (room) => {
    // Redirect to booking page or open booking modal
    alert(`Rezervare pentru ${room.name} - ${room.price} ${room.currency}/noapte`);
  };

  const handleFilterChange = (type) => {
    setFilterType(type);
  };

  // Handle loading state
  if (loading || ui.isLoading) {
    return (
      <div className={styles.roomsPage}>
        <div className={styles.loading}>Se încarcă...</div>
      </div>
    );
  }

  // Handle error state
  if (error || ui.error) {
    return (
      <div className={styles.roomsPage}>
        <div className={styles.error}>
          <p>Eroare la încărcarea datelor: {error?.message || ui.error}</p>
          <button onClick={() => window.location.reload()}>Încearcă din nou</button>
        </div>
      </div>
    );
  }

  const filteredRooms = filterType === 'all' 
    ? (roomsData || [])
    : (roomsData || []).filter(room => room.availability);

  return (
    <div className={styles.roomsPage}>
      {/* Top Filter Bar with Back Button */}
      <div className={styles.topFilterBar}>
        <div className={styles.filterContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            <FaArrowLeft />
            <span>Înapoi</span>
          </button>
          
          <div className={styles.filterSwitch}>
            <button 
              className={`${styles.switchBtn} ${filterType === 'all' ? styles.active : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              Toate
            </button>
            <button 
              className={`${styles.switchBtn} ${filterType === 'available' ? styles.active : ''}`}
              onClick={() => handleFilterChange('available')}
            >
              Disponibile
            </button>
          </div>

          <div className={styles.dateRange}>
            <div className={styles.dateInputGroup}>
              <FaCalendarAlt className={styles.calendarIcon} />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
            <span className={styles.dateSeparator}>-</span>
            <div className={styles.dateInputGroup}>
              <FaCalendarAlt className={styles.calendarIcon} />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Rooms List */}
      <div className={styles.roomsContainer}>
        <div className={styles.roomsList}>
          {filteredRooms.map((room) => (
            <div key={room.id} className={styles.roomCardWide}>
              <div className={styles.roomImageContainer}>
                <img src={room.image} alt={room.name} />
                <div className={styles.roomTypeBadge}>{room.type}</div>
              </div>
              
              <div className={styles.roomInfo}>
                <div className={styles.roomHeader}>
                  <div className={styles.roomTitleSection}>
                    <h3 className={styles.roomName}>{room.name}</h3>
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
                  <div className={styles.roomPrice}>
                    <span className={styles.priceAmount}>{room.price}</span>
                    <span className={styles.priceCurrency}>{room.currency}/noapte</span>
                  </div>
                </div>

                <p className={styles.roomDescription}>{room.description}</p>

                <div className={styles.roomActions}>
                  <button 
                    className={styles.btnDetails}
                    onClick={() => handleRoomDetails(room.id)}
                  >
                    Vezi Detalii <FaArrowRight />
                  </button>
                  <button 
                    className={styles.btnBook}
                    onClick={() => handleBooking(room)}
                  >
                    Rezervă Acum
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms; 