import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroVariant1.css';
import { useHeroData, useLocations } from '../../hooks';
import { useLocations } from '../../hooks';
import LocationSelector from '../LocationSelector/LocationSelector';
import { FaEdit } from 'react-icons/fa';

const EditPanel = ({ hero, onClose, onSave }) => {
  // Local state for editing
  const [editData, setEditData] = useState({
    coverImage: hero?.coverImage || '',
    logoImage: hero?.logoImage || '',
    blurAmount: hero?.blurAmount || 0,
    tintColor: hero?.tintColor || 'rgba(0,0,0,0)',
    title: hero?.bussinesName || hero?.title || '',
    subtitle: hero?.bussinesSlug || hero?.subtitle || ''
  });

  const [isSaving, setIsSaving] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedHero = {
        ...hero,
        coverImage: editData.coverImage,
        logoImage: editData.logoImage,
        blurAmount: editData.blurAmount,
        tintColor: editData.tintColor,
        bussinesName: editData.title,
        bussinesSlug: editData.subtitle
      };
      
      await onSave(updatedHero);
      onClose();
    } catch (error) {
      console.error('Error saving hero data:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
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
                  setEditData(prev => ({ ...prev, coverImage: reader.result }));
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
                  setEditData(prev => ({ ...prev, logoImage: reader.result }));
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
            value={editData.title}
            onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
            className="text-input"
          />
        </div>
        <div className="edit-section">
          <h3>Subtitle</h3>
          <input 
            type="text" 
            value={editData.subtitle}
            onChange={(e) => setEditData(prev => ({ ...prev, subtitle: e.target.value }))}
            className="text-input"
          />
        </div>
        <div className="edit-section">
          <h3>Blur Amount</h3>
          <input 
            type="range" 
            min="0" 
            max="20" 
            value={editData.blurAmount} 
            onChange={(e) => setEditData(prev => ({ ...prev, blurAmount: Number(e.target.value) }))}
          />
          <span>{editData.blurAmount}px</span>
        </div>
        <div className="edit-section">
          <h3>Tint Color</h3>
          <input 
            type="color" 
            value={editData.tintColor} 
            onChange={(e) => setEditData(prev => ({ ...prev, tintColor: e.target.value }))}
          />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={editData.tintColor.match(/[\d.]+\)$/)?.[0]?.slice(0, -1) || 0} 
            onChange={(e) => {
              const color = editData.tintColor.match(/rgba?\([\d\s,]+\)/)?.[0];
              if (color) {
                const newAlpha = e.target.value;
                setEditData(prev => ({ 
                  ...prev, 
                  tintColor: color.replace(/[\d.]+\)$/, `${newAlpha})`)
                }));
              }
            }}
          />
        </div>
        <button className="save-button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

const HeroVariant1Simplified = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get current location from location store
  const { currentLocation, switchLocation, getLocationInfo, initializeLocations, allLocations } = useLocations();
  
  // Use simplified hooks for data fetching
  const { 
    data: hero, 
    loading: heroLoading, 
    error: heroError, 
    isDemoMode: heroDemoMode,
    refresh: refreshHero 
  } = useHeroData({ 
    businessType: 'hotel', 
    locationId: currentLocation?.id 
  });

  const { 
    data: locations, 
    loading: locationsLoading, 
    error: locationsError, 
    isDemoMode: locationsDemoMode 
  } = useLocations({ 
    businessType: 'hotel' 
  });
  
  // Initialize locations on component mount
  useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);
  
  const locationInfo = getLocationInfo();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSave = async (updatedHero) => {
    // In a real app, you would save to API here
    console.log('Saving hero data:', updatedHero);
    
    // For demo purposes, just refresh the data
    await refreshHero();
  };

  // Handle location change and navigation
  const handleLocationChange = (location) => {
    switchLocation(location.id);
    
    // Navigate to the new location's home page
    if (location.slug) {
      navigate(`/${location.slug}`);
    }
  };

  // Show loading state
  if (heroLoading) {
    return (
      <div className="hero-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading hero data...</p>
          {heroDemoMode && <p className="demo-indicator">Demo Mode: ON</p>}
        </div>
      </div>
    );
  }

  // Show error state
  if (heroError) {
    return (
      <div className="hero-container">
        <div className="error-message">
          <h2>Error Loading Hero Data</h2>
          <p>{heroError}</p>
          <button onClick={refreshHero}>Retry</button>
        </div>
      </div>
    );
  }

  // Show no data state
  if (!hero) {
    return (
      <div className="hero-container">
        <div className="no-data-message">
          <h2>No Hero Data Available</h2>
          <p>No hero data found for the current location.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-container">
      {/* Demo Mode Indicator */}
      {heroDemoMode && (
        <div className="demo-mode-indicator">
          <span>Demo Mode: Using Local Data</span>
        </div>
      )}

      {/* Location Selector */}
      {locationInfo.isMultiLocation && (
        <LocationSelector 
          locations={allLocations}
          currentLocation={currentLocation}
          onLocationChange={handleLocationChange}
        />
      )}

      {/* Hero Content */}
      <div 
        className="hero-content"
        style={{
          backgroundImage: `url(${hero.coverImage})`,
          filter: `blur(${hero.blurAmount}px)`
        }}
      >
        <div 
          className="hero-overlay"
          style={{ backgroundColor: hero.tintColor }}
        >
          <div className="hero-text">
            {hero.logoImage && (
              <img 
                src={hero.logoImage} 
                alt="Logo" 
                className="hero-logo"
              />
            )}
            
            <h1 className="hero-title">
              {hero.bussinesName || hero.title}
            </h1>
            
            <p className="hero-subtitle">
              {hero.bussinesSlug || hero.subtitle}
            </p>
            
            <div className="hero-actions">
              <button 
                className="cta-button primary"
                onClick={() => navigate('/rooms')}
              >
                Book Now
              </button>
              
              <button 
                className="cta-button secondary"
                onClick={() => navigate('/facilities')}
              >
                View Facilities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button (for demo purposes) */}
      <button 
        className="edit-button"
        onClick={handleEdit}
        title="Edit Hero Data"
      >
        <FaEdit />
      </button>

      {/* Edit Panel */}
      {isEditing && (
        <EditPanel 
          hero={hero}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}

      {/* Debug Information (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-info">
          <h4>Debug Information:</h4>
          <p><strong>Demo Mode:</strong> {heroDemoMode ? 'ON' : 'OFF'}</p>
          <p><strong>Current Location:</strong> {currentLocation?.name || 'None'}</p>
          <p><strong>Location ID:</strong> {currentLocation?.id || 'None'}</p>
          <p><strong>Business Type:</strong> hotel</p>
          <p><strong>Hero Data:</strong> {hero ? 'Loaded' : 'Not loaded'}</p>
          <p><strong>Locations Data:</strong> {locations ? 'Loaded' : 'Not loaded'}</p>
        </div>
      )}
    </div>
  );
};

export default HeroVariant1Simplified; 