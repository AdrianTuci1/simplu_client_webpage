import React from 'react';
import { COMPONENT_CODES } from '../config/componentCodes';
import { getBusinessLayout } from '../utils/homepageDataManager';
import { getBusinessType } from '../config/demoMode';
import '../styles/Home.css';

const Home = ({ location }) => {
  // Get business type directly
  const businessType = getBusinessType();
  
  // Get business-specific layout
  const layout = getBusinessLayout(businessType);

  const renderComponent = (code, index) => {
    if (code === 0) return null;
    
    const Component = COMPONENT_CODES[code];
    if (!Component) {
      console.warn(`Component not found for code: ${code}`);
      return null;
    }

    return <Component key={`section-${index}`} location={location} />;
  };

  return (
    <div className="home-layout">
      {layout.map(renderComponent)}
    </div>
  );
};

export default Home; 