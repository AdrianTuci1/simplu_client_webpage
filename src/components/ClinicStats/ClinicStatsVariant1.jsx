import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ClinicStatsVariant1.css';
import useClinicAvailabilityStore from '../../store/clinicAvailabilityStore';

const ClinicStatsVariant1 = () => {
  const [date, setDate] = useState(new Date());
  const { 
    availability,
    isLoading,
    error,
    fetchMonthAvailability,
    getAvailabilityLevel,
    getAvailabilityColor,
    getAvailabilityBorderColor
  } = useClinicAvailabilityStore();

  // Mock clinic statistics
  const clinicStats = {
    totalPatients: 1250,
    monthlyAppointments: 320,
    averageRating: 4.8,
    doctorsCount: 5,
    specialties: ['General Dentistry', 'Orthodontics', 'Cosmetic Dentistry'],
  };

  useEffect(() => {
    const currentDate = new Date();
    fetchMonthAvailability(currentDate.getFullYear(), currentDate.getMonth());
  }, [fetchMonthAvailability]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    fetchMonthAvailability(activeStartDate.getFullYear(), activeStartDate.getMonth());
  };

  const tileClassName = ({ date }) => {
    const level = getAvailabilityLevel(date);
    return level ? 'occupied' : null;
  };

  const tileStyle = ({ date }) => {
    const level = getAvailabilityLevel(date);
    if (!level) return null;
    
    return {
      backgroundColor: getAvailabilityColor(level),
      border: `2px solid ${getAvailabilityBorderColor(level)}`,
      borderRadius: '4px'
    };
  };

  return (
    <div className="clinic-stats-container">
      <div className="clinic-stats-grid">
        <div className="calendar-section">
          <Calendar
            onChange={handleDateChange}
            value={date}
            onActiveStartDateChange={handleActiveStartDateChange}
            tileClassName={tileClassName}
            tileStyle={tileStyle}
            minDetail="month"
            maxDetail="month"
          />
        </div>

        <div className="working-hours-section">
          <div className="working-hours">
            <div className="schedule-item">
              <span className="day">L-V:</span>
              <span className="hours">09:00 - 18:00</span>
            </div>
            <div className="schedule-item">
              <span className="day">S-D:</span>
              <span className="hours">10:00 - 14:00</span>
            </div>
          </div>
          <div className="occupancy-legend">
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: getAvailabilityColor('high'), border: `2px solid ${getAvailabilityBorderColor('high')}` }}></span>
              <span>Grad ridicat</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: getAvailabilityColor('medium'), border: `2px solid ${getAvailabilityBorderColor('medium')}` }}></span>
              <span>Grad mediu</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: getAvailabilityColor('low'), border: `2px solid ${getAvailabilityBorderColor('low')}` }}></span>
              <span>Grad scăzut</span>
            </div>
            <div className="legend-item">
              <span className="legend-color" style={{ backgroundColor: getAvailabilityColor('closed'), border: `2px solid ${getAvailabilityBorderColor('closed')}` }}></span>
              <span>Închis</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-number">{clinicStats.totalPatients}</p>
              <h3>Pacienți Totali</h3>
            </div>
            <div className="stat-card">
              <p className="stat-number">{clinicStats.monthlyAppointments}</p>
              <h3>Programări Lunare</h3>
            </div>
            <div className="stat-card">
              <p className="stat-number">{clinicStats.averageRating}/5.0</p>
              <h3>Rating Mediu</h3>
            </div>
            <div className="stat-card">
              <p className="stat-number">{clinicStats.doctorsCount}</p>
              <h3>Medici</h3>
            </div>
          </div>
          <div className="specialties-section">
            <div className="specialties-list">
              {clinicStats.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicStatsVariant1; 