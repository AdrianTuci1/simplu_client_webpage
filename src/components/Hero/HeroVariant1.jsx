import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroVariant1.css';
import useHeroStore from '../../store/heroStore';
import useLocationStore from '../../store/locationStore';
import LocationSelector from '../LocationSelector/LocationSelector';
import { FaEdit } from 'react-icons/fa';

const EditPanel = ({ onClose }) => {
  const {
    coverImage,
    setCoverImage,
    logoImage,
    setLogoImage,
    blurAmount,
    setBlurAmount,
    tintColor,
    setTintColor,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    saveHeroData
  } = useHeroStore();

  const handleSave = async () => {
    await saveHeroData();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-panel">
        <button className="close-button" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="edit-section">
          <h3>Cover Image</h3>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setCoverImage(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <div className="edit-section">
          <h3>Logo Image</h3>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setLogoImage(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
        <div className="edit-section">
          <h3>Title</h3>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-input"
          />
        </div>
        <div className="edit-section">
          <h3>Subtitle</h3>
          <input 
            type="text" 
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="text-input"
          />
        </div>
        <div className="edit-section">
          <h3>Blur Amount</h3>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={blurAmount} 
            onChange={(e) => setBlurAmount(Number(e.target.value))}
          />
          <span>{blurAmount}px</span>
        </div>
        <div className="edit-section">
          <h3>Tint Color</h3>
          <input 
            type="color" 
            value={tintColor} 
            onChange={(e) => setTintColor(e.target.value)}
          />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={tintColor.match(/[\d.]+\)$/)[0].slice(0, -1)} 
            onChange={(e) => {
              const color = tintColor.match(/rgba?\([\d\s,]+\)/)[0];
              const newAlpha = e.target.value;
              setTintColor(color.replace(/[\d.]+\)$/, `${newAlpha})`));
            }}
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

const HeroVariant1 = () => {
  const navigate = useNavigate();
  const {
    coverImage,
    logoImage,
    blurAmount,
    tintColor,
    isEditing,
    setIsEditing,
    title,
    subtitle,
    fetchHeroData
  } = useHeroStore();

  const { switchLocation, getLocationInfo, initializeLocations, allLocations } = useLocationStore();
  
  // Initialize locations on component mount
  useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);
  
  const locationInfo = getLocationInfo();

  useEffect(() => {
    fetchHeroData();
  }, [fetchHeroData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  // Handle location change and navigation
  const handleLocationChange = (location) => {
    switchLocation(location.id);
    
    // Navigate to the new location's home page
    if (location.slug) {
      navigate(`/${location.slug}`);
    }
  };

  return (
    <section className="hero hero-variant-1">
      <div 
        className="main-frame" 
        style={{ 
          backgroundImage: `url(${coverImage})`,
          filter: `blur(${blurAmount}px)`,
        }}
      >
        <div 
          className="tint-overlay"
          style={{ backgroundColor: tintColor }}
        />
        <button className="edit-button" onClick={handleEdit}>
          <FaEdit />
        </button>
        
        {/* Location Navigation */}
        {locationInfo.isMultiLocation && (
          <div className="location-selector-container">
            <LocationSelector onLocationChange={handleLocationChange} />
          </div>
        )}
        
        <div className="logo-container">
          <img src={logoImage} alt="Company Logo" className="logo" />
        </div>
      </div>
      <div className="content-container">
        <div className="content">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
      {isEditing && <EditPanel onClose={handleClose} />}
    </section>
  );
};

export default HeroVariant1; 