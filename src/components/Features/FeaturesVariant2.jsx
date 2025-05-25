import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './FeaturesVariant2.css';

const features = [
  {
    id: 1,
    type: 'CATEGORIE',
    name: 'Fitness',
    color: '#FFE4E1', // Light pink
  },
  {
    id: 2,
    type: 'TRATAMENT',
    name: 'Masaj',
    color: '#E0FFFF', // Light cyan
  },
  {
    id: 3,
    type: 'CATEGORIE',
    name: 'Aerobic',
    color: '#F0FFF0', // Light green
  },
  {
    id: 4,
    type: 'TRATAMENT',
    name: 'Saună',
    color: '#FFF0F5', // Light pink
  }
];

const FeaturesVariant2 = () => {
  return (
    <section className="features features-variant-2">
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className="feature-card"
              style={{ backgroundColor: feature.color }}
            >
              <div className="feature-content">
                <span className="feature-type">{feature.type}</span>
                <h3 className="feature-name">{feature.name}</h3>
                <button className="feature-button">
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
          {/* Placeholder cards for missing items */}
          {Array.from({ length: 4 - features.length }).map((_, index) => (
            <div key={`missing-${index}`} className="feature-card missing">
              <div className="feature-content">
                <span className="feature-type">CARD LIPSA</span>
                <h3 className="feature-name">CARD LIPSA</h3>
                <button className="feature-button" disabled>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesVariant2; 