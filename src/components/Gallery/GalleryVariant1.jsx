import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './GalleryVariant1.css';

// Import from centralized store registry
import { useGalleryStore } from '../../store';

const GalleryVariant1 = () => {
  // Use the gallery store
  const {
    images,
    settings,
    ui,
    fetchGalleryData,
    setSelectedImage,
    setIsFullscreen
  } = useGalleryStore();

  // Fetch gallery data on component mount
  useEffect(() => {
    fetchGalleryData();
  }, [fetchGalleryData]);

  // Handle image click for fullscreen view
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  // Show loading state
  if (ui.isLoading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">Galerie</h2>
          <div className="gallery-container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Se încarcă galeria...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (ui.error) {
    return (
      <section className="gallery-section">
        <div className="container">
          <h2 className="section-title">Galerie</h2>
          <div className="gallery-container">
            <div className="error-state">
              <p>Eroare la încărcarea galeriei: {ui.error}</p>
              <button onClick={fetchGalleryData} className="retry-button">
                Încearcă din nou
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <h2 className="section-title">Galerie</h2>
        <div className="gallery-container">
          <Swiper
            grabCursor={settings.grabCursor}
            slidesPerView={settings.slidesPerView}
            spaceBetween={settings.spaceBetween}
            loop={settings.loop}
            navigation={settings.navigation}
            autoplay={settings.autoplay ? {
              delay: settings.autoplayDelay,
              disableOnInteraction: false,
            } : false}
            modules={[Navigation, Autoplay]}
            className="gallery-swiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id} className="gallery-slide">
                <div className="image-container" onClick={() => handleImageClick(image)}>
                  <img src={image.src} alt={image.alt} className="gallery-image" />
                  {image.title && (
                    <div className="image-overlay">
                      <h3 className="image-title">{image.title}</h3>
                      {image.description && (
                        <p className="image-description">{image.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {ui.isFullscreen && ui.selectedImage && (
        <div className="fullscreen-modal" onClick={() => setIsFullscreen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-button" 
              onClick={() => setIsFullscreen(false)}
            >
              ×
            </button>
            <img 
              src={ui.selectedImage.src} 
              alt={ui.selectedImage.alt} 
              className="fullscreen-image" 
            />
            {ui.selectedImage.title && (
              <div className="fullscreen-info">
                <h3>{ui.selectedImage.title}</h3>
                {ui.selectedImage.description && (
                  <p>{ui.selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryVariant1; 