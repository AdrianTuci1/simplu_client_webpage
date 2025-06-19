import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaCheck, FaBed, FaUsers } from 'react-icons/fa';
import styles from './RoomBooking.module.css';

const RoomBooking = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Get booking data from navigation state
  useEffect(() => {
    if (location.state) {
      setBookingData(location.state);
    } else {
      // If no state, redirect back to rooms
      navigate('/rooms');
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setBookingComplete(true);
  };

  const handleConfirmBooking = () => {
    // Here you would typically send the booking to your backend
    console.log('Booking confirmed:', {
      roomId,
      bookingData,
      formData
    });
    
    // Navigate to confirmation page or back to rooms
    navigate('/rooms');
  };

  if (!bookingData) {
    return <div className={styles.loading}>Se încarcă...</div>;
  }

  if (bookingComplete) {
    return (
      <div className={styles.bookingPage}>
        <div className={styles.container}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <FaCheck />
            </div>
            <h1>Rezervarea a fost confirmată!</h1>
            <p>Mulțumim pentru rezervare. Veți primi un email de confirmare în curând.</p>
            
            <div className={styles.bookingSummary}>
              <h2>Detalii Rezervare</h2>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Cameră</span>
                  <span className={styles.summaryValue}>{bookingData.room.name}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Check-in</span>
                  <span className={styles.summaryValue}>{new Date(bookingData.startDate).toLocaleDateString('ro-RO')}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Check-out</span>
                  <span className={styles.summaryValue}>{new Date(bookingData.endDate).toLocaleDateString('ro-RO')}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span className={styles.summaryLabel}>Total</span>
                  <span className={styles.summaryValue}>{bookingData.totalPrice} {bookingData.room.currency}</span>
                </div>
              </div>
            </div>

            <button className={styles.confirmButton} onClick={handleConfirmBooking}>
              Înapoi la Camere
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bookingPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBack}>
            <FaArrowLeft />
            <span>Înapoi</span>
          </button>
          <h1>Rezervare Cameră</h1>
        </div>

        <div className={styles.mainContent}>
          {/* Booking Summary */}
          <div className={styles.summaryCard}>
            <h2>Detalii Rezervare</h2>
            <div className={styles.roomInfo}>
              <img src={bookingData.room.image} alt={bookingData.room.name} />
              <div className={styles.roomDetails}>
                <h3>{bookingData.room.name}</h3>
                <p className={styles.roomType}>{bookingData.room.type}</p>
                <div className={styles.roomSpecs}>
                  <span><FaBed /> {bookingData.room.capacity} persoane</span>
                  <span><FaUsers /> {bookingData.room.size}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.bookingDetails}>
              <div className={styles.detailItem}>
                <FaCalendarAlt />
                <div>
                  <span>Check-in: {new Date(bookingData.startDate).toLocaleDateString('ro-RO')}</span>
                  <span>Check-out: {new Date(bookingData.endDate).toLocaleDateString('ro-RO')}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span>Număr nopți: {bookingData.nights}</span>
                <span className={styles.totalPrice}>{bookingData.totalPrice} {bookingData.room.currency}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className={styles.formCard}>
            <h2>Informații Guest</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">Prenume *</label>
                  <div className={styles.inputWrapper}>
                    <FaUser />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Prenumele dvs."
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">Nume *</label>
                  <div className={styles.inputWrapper}>
                    <FaUser />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Numele dvs."
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <div className={styles.inputWrapper}>
                    <FaEnvelope />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="email@exemplu.com"
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Telefon *</label>
                  <div className={styles.inputWrapper}>
                    <FaPhone />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+40 123 456 789"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="guests">Număr de persoane *</label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  required
                >
                  {[...Array(bookingData.room.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} persoană{i + 1 > 1 ? 'e' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="specialRequests">Cerințe speciale</label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  placeholder="Cerințe speciale, alerții alimentare, etc."
                  rows="4"
                />
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.cancelButton}
                  onClick={handleBack}
                >
                  Anulează
                </button>
                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Se procesează...' : 'Confirmă Rezervarea'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking; 