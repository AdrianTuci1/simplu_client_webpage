import React, { useEffect } from 'react';
import { businessConfig, getInitialLocation } from '../config/businessConfig';
import { COMPONENT_CODES } from '../config/componentCodes';
import useLocationStore from '../store/locationStore';
import '../styles/Home.css';

const Home = ({ location }) => {
  const { switchLocationBySlug, resetToInitialLocation, initializeLocations, allLocations } = useLocationStore();

  // Initialize locations on component mount
  useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);

  // Update current location when location prop changes
  useEffect(() => {
    if (location && location.slug) {
      switchLocationBySlug(location.slug);
    } else {
      // If no location prop, reset to initial location
      resetToInitialLocation();
    }
  }, [location, switchLocationBySlug, resetToInitialLocation]);

  const renderComponent = (code, index) => {
    if (code === 0) return null;
    
    const Component = COMPONENT_CODES[code];
    if (!Component) {
      console.warn(`Component not found for code: ${code}`);
      return null;
    }

    return <Component key={`section-${index}`} />;
  };

  return (
    <div className="home-layout">
      {businessConfig.homeLayout.map(renderComponent)}
    </div>
  );
};

export default Home; 