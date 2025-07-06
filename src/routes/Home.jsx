import React, { useEffect } from 'react';
import { HomepageDataProvider, useHomepageData } from '../contexts/HomepageDataContext';
import { COMPONENT_CODES } from '../config/componentCodes';
import { getBusinessLayout } from '../utils/homepageDataManager';
import '../styles/Home.css';

// Inner Home component that uses the context
const HomeContent = ({ location }) => {
  const { 
    dataContext,
    loading, 
    error, 
    switchLocation,
    businessType 
  } = useHomepageData();

  // Update current location when location prop changes
  useEffect(() => {
    if (location && location.id) {
      switchLocation(location.id);
    }
  }, [location, switchLocation]);

  // Show loading state
  if (loading) {
    return (
      <div className="home-layout">
        <div className="loading-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="home-layout">
        <div className="error-container">
          <h2>Error loading homepage</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Get business-specific layout
  const layout = getBusinessLayout(businessType);

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
      {layout.map(renderComponent)}
    </div>
  );
};

// Main Home component with provider
const Home = ({ location, tenantId }) => {
  return (
    <HomepageDataProvider tenantId={tenantId} locationId={location?.id}>
      <HomeContent location={location} />
    </HomepageDataProvider>
  );
};

export default Home; 