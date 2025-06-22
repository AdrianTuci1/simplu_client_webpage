import React, { useState, useEffect, useRef } from 'react';
import useLocationStore from '../../store/locationStore';
import { FaMapMarkerAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './LocationSelector.css';

const LocationSelector = ({ onLocationChange }) => {
  const { currentLocation, allLocations, switchLocation, getLocationInfo, initializeLocations } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const selectorRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Initialize locations on component mount
  useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);
  
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
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Calculate dropdown position on mobile to prevent overflow
    if (newIsOpen && window.innerWidth <= 768) {
      setTimeout(() => {
        calculateDropdownPosition();
      }, 0);
    }
  };

  const calculateDropdownPosition = () => {
    if (!selectorRef.current || !dropdownRef.current) return;

    const selectorRect = selectorRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const position = {};

    // Check horizontal overflow
    if (selectorRect.left + dropdownRect.width > viewportWidth) {
      position.right = '0';
      position.left = 'auto';
    }

    // Check vertical overflow
    if (selectorRect.bottom + dropdownRect.height > viewportHeight) {
      position.bottom = '100%';
      position.top = 'auto';
      position.marginTop = '0';
      position.marginBottom = '4px';
    }

    setDropdownPosition(position);
  };

  return (
    <div className="location-selector" ref={selectorRef}>
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
        <div 
          className="location-dropdown" 
          ref={dropdownRef}
          style={dropdownPosition}
        >
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