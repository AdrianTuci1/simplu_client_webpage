import React, { useState, useEffect } from 'react';
import useLocationStore from '../../store/locationStore';
import { FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './LocationSelector.css';

const LocationSelector = ({ onLocationChange }) => {
  const { currentLocation, allLocations, switchLocation, getLocationInfo, initializeLocations } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize locations on component mount
  useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);
  
  const locationInfo = getLocationInfo();
  
  // Dacă nu sunt multiple locații, nu afișăm selectorul
  if (!locationInfo.isMultiLocation) {
    return null;
  }

  const handleLocationSelect = (location) => {
    switchLocation(location.id);
    setIsOpen(false);
    
    // Call the callback if provided
    if (onLocationChange) {
      onLocationChange(location);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="location-selector">
      <button 
        className="location-selector-button" 
        onClick={toggleDropdown}
        aria-label="Select location"
      >
        <FaMapMarkerAlt className="location-icon" />
        <span className="location-name">{currentLocation?.name}</span>
        {isOpen ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
      </button>
      
      {isOpen && (
        <div className="location-dropdown">
          {allLocations.map((location) => (
            <button
              key={location.id}
              className={`location-option ${location.id === currentLocation?.id ? 'active' : ''}`}
              onClick={() => handleLocationSelect(location)}
            >
              <div className="location-option-content">
                <div className="location-option-name">{location.name}</div>
                <div className="location-option-address">{location.address}</div>
              </div>
              {location.id === currentLocation?.id && (
                <div className="location-option-indicator">✓</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 