import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroVariant1.css';
import { useHeroData, useLocationSwitcher } from '../../utils/componentHelpers';
import LocationSelector from '../LocationSelector/LocationSelector';
import { FaEdit } from 'react-icons/fa';

const EditPanel = ({ onClose, heroData }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Local state for editing
  const [editData, setEditData] = useState({
    coverImage: heroData?.coverImage || '',
    logoImage: heroData?.logoImage || '',
    blurAmount: heroData?.blurAmount || 0,
    tintColor: heroData?.tintColor || 'rgba(0,0,0,0)',
    title: heroData?.bussinesName || heroData?.title || '',
    subtitle: heroData?.bussinesSlug || heroData?.subtitle || ''
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // For now, just close the panel since we're in demo mode
      // In a real app, you would save the data here
      console.log('Saving hero data:', editData);
      onClose();
    } catch (error) {
      console.error('Error saving hero data:', error);
    } finally {
      setIsLoading(false);
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
        <button className="save-button" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

const HeroVariant1 = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Use the new homepage data system
  const { data: hero, loading: isLoading, error } = useHeroData();
  const { 
    switchLocation, 
    allLocations,
  } = useLocationSwitcher();
  
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

  // Check if we have multiple locations
  const isMultiLocation = allLocations.length > 1;

  // Show loading state
  if (isLoading || !hero) {
    return (
      <section className="hero hero-variant-1">
        <div className="loading">Se încarcă...</div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="hero hero-variant-1">
        <div className="error">
          <p>Eroare la încărcarea datelor: {error}</p>
          <button onClick={() => window.location.reload()}>Încearcă din nou</button>
        </div>
      </section>
    );
  }

  return (
    <section className="hero hero-variant-1">
      <div className="main-frame">
        {/* Background layer with blur effect */}
        <div 
          className="background-layer"
          style={{ 
            backgroundImage: hero?.coverImage ? `url(${hero.coverImage})` : 'none',
            filter: `blur(${hero?.blurAmount || 0}px)`,
          }}
        />
        
        {/* Tint overlay */}
        <div 
          className="tint-overlay"
          style={{ 
            backgroundColor: hero?.tintColor === 'rgba(0,0,0,0)' || hero?.tintColor === '#000000' ? 'rgba(54, 4, 51, 0.3)' : hero?.tintColor || 'rgba(54, 4, 51, 0.3)'
          }}
        />
        
        {/* Edit button */}
        <button className="edit-button" onClick={handleEdit}>
          <FaEdit />
        </button>
        
        {/* Logo container */}
        <div className="logo-container">
          {hero?.logoImage && <img src={hero.logoImage} alt="Company Logo" className="logo" />}
        </div>
      </div>
      
      {/* Content container - moved outside main-frame */}
      <div className="content-container">
        <div className="content">
          {isMultiLocation && (
            <div className="location-content">
              <LocationSelector 
                onLocationChange={handleLocationChange} 
                title={hero?.bussinesName || hero?.title || ''} 
                subtitle={hero?.bussinesSlug || hero?.subtitle || ''} 
              />
            </div>
          )}
        </div>
      </div>
      
      {isEditing && hero && <EditPanel onClose={handleClose} heroData={hero} />}
    </section>
  );
};

export default HeroVariant1; 