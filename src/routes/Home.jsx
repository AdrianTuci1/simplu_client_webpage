import React, { useEffect } from 'react';
import simplifiedConfig from '../config/simplifiedConfig';
import { COMPONENT_CODES } from '../config/componentCodes';
import { useLocations } from '../hooks/useSimplifiedData';
import '../styles/Home.css';

const Home = ({ location }) => {
  const { 
    switchLocation, 
    allLocations,
  } = useLocations();

  // Update current location when location prop changes
  useEffect(() => {
    if (location && location.id) {
      switchLocation(location.id);
    }
  }, [location, switchLocation]);

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
      {simplifiedConfig.getHomeLayout().map(renderComponent)}
    </div>
  );
};

export default Home; 