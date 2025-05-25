import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './FeaturesVariant1.css';

const facilities = [
  {
    id: 'fitness',
    name: 'Sala Fitness',
    location: 'Etaj 1',
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3ltfGVufDB8fDB8fHww',
      'https://www.hussle.com/blog/wp-content/uploads/2020/12/Gym-structure-1080x675.png',
      'https://www.wellnessgym.ro/wp-content/uploads/2024/05/fitness-wellness-gym-bucuresti.jpg',
      '/images/fitness-4.jpg',
    ]
  },
  {
    id: 'aerobic',
    name: 'Aerobic',
    location: 'Etaj 2',
    images: [
      '/images/aerobic-1.jpg',
      '/images/aerobic-2.jpg',
      '/images/aerobic-3.jpg',
    ]
  },
  {
    id: 'piscina',
    name: 'Piscină',
    location: 'Etaj 0',
    images: [
      '/images/piscina-1.jpg',
      '/images/piscina-2.jpg',
      '/images/piscina-3.jpg',
      '/images/piscina-4.jpg',
    ]
  },
  {
    id: 'sauna',
    name: 'Saună',
    location: 'Etaj 0',
    images: [
      '/images/sauna-1.jpg',
      '/images/sauna-2.jpg',
      '/images/sauna-3.jpg',
    ]
  }
];

const FeaturesVariant1 = () => {
  const [selectedFacility, setSelectedFacility] = useState(facilities[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    // Set initial count
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return selectedFacility.images.length - visibleCount;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= selectedFacility.images.length - visibleCount) {
        return 0;
      }
      return prev + 1;
    });
  };

  const getVisibleImages = () => {
    const images = selectedFacility.images;
    let result = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % images.length;
      result.push(images[index]);
    }

    return result;
  };

  return (
    <section className="features features-variant-1">
      <div className="container">
        <div className="facilities-list">
          {facilities.map((facility) => (
            <button
              key={facility.id}
              className={`facility-btn ${selectedFacility.id === facility.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedFacility(facility);
                setCurrentIndex(0);
              }}
            >
              {facility.name}
            </button>
          ))}
        </div>

        <div className="carousel-container">
          <button 
            className="carousel-nav prev"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>

          <div className="carousel">
            {getVisibleImages().map((image, index) => (
              <div key={index} className="carousel-item">
                <div className="image-container">
                  <img src={image} alt={`${selectedFacility.name} ${index + 1}`} />
                </div>
                <div className="image-info">
                  <h3>{selectedFacility.name}</h3>
                  <p>{selectedFacility.location}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="carousel-nav next"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesVariant1; 