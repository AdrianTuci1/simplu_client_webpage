import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import simplifiedConfig from '../config/simplifiedConfig';
import { useHomepageData } from '../contexts/HomepageDataContext';
import PageError from '../components/PageError';

// Import pages
import Home from './Home';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';
import AuthCallback from './pages/AuthCallback';

// Import business pages
import Medics from './pages/business/dental/Medics';
import Treatments from './pages/business/dental/Treatments';
import Packages from './pages/business/gym/Packages';
import Classes from './pages/business/gym/Classes';
import Rooms from './pages/business/hotel/Rooms';
import RoomDetails from './pages/business/hotel/RoomDetails';
import RoomBooking from './pages/business/hotel/RoomBooking';
import Facilities from './pages/business/hotel/Facilities';
import Attractions from './pages/business/hotel/Attractions';

// Page component mapping
const PAGE_COMPONENTS = {
  MEDICS: Medics,
  TREATMENTS: Treatments,
  PACKAGES: Packages,
  CLASSES: Classes,
  ROOMS: Rooms,
  FACILITIES: Facilities,
  ATTRACTIONS: Attractions,
};

// Protected Route component
const ProtectedRoute = ({ page, Component }) => {
  if (!simplifiedConfig.isPageActive(page)) {
    return (
      <PageError 
        message={`This page is not available for the current business type (${simplifiedConfig.getType()})`}
      />
    );
  }
  return <Component />;
};

// Location-aware route component
const LocationRoute = ({ page, Component }) => {
  const { data } = useHomepageData();
  const currentLocation = data?.currentLocation;
  
  if (!simplifiedConfig.isPageActive(page)) {
    return (
      <PageError 
        message={`This page is not available for the current business type (${simplifiedConfig.getType()})`}
      />
    );
  }

  return <Component location={currentLocation} />;
};

// Location redirect component
const LocationRedirect = () => {
  const { data } = useHomepageData();
  const currentLocation = data?.currentLocation;
  const allLocations = data?.locations || [];
  
  // If no location is selected, redirect to the first available location
  if (!currentLocation && allLocations.length > 0) {
    return <Navigate to={`/${allLocations[0].slug}`} replace />;
  }
  
  // If current location exists, redirect to it
  if (currentLocation) {
    return <Navigate to={`/${currentLocation.slug}`} replace />;
  }
  
  // Fallback to home if no locations are available
  return <Navigate to="/" replace />;
};

const AppRoutes = () => {
  const { data } = useHomepageData();
  const allLocations = data?.locations || [];
  const hasMultipleLocations = allLocations.length > 1;

  return (
    <Routes>
      {/* Root route - redirects based on location */}
      <Route path="/" element={<LocationRedirect />} />
      
      {/* Auth routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Settings route - available for all business types */}
      <Route path="/settings" element={<Settings />} />
      
      {hasMultipleLocations ? (
        // Multiple locations - use location-based routing
        <>
          {/* Location-specific home routes */}
          {allLocations.map(location => (
            <Route 
              key={location.slug}
              path={`/${location.slug}`}
              element={<Home location={location} />}
            />
          ))}
          
          {/* Location-specific business pages */}
          {allLocations.map(location => 
            Object.entries(PAGE_COMPONENTS).map(([page, Component]) => (
              <Route 
                key={`${location.slug}-${page}`}
                path={`/${location.slug}/${page.toLowerCase()}`}
                element={<LocationRoute page={page} Component={Component} />}
              />
            ))
          )}
          
          {/* Location-specific room routes */}
          {allLocations.map(location => (
            <React.Fragment key={`rooms-${location.slug}`}>
              <Route 
                path={`/${location.slug}/room/:roomId`}
                element={<RoomDetails location={location} />}
              />
              <Route 
                path={`/${location.slug}/room/:roomId/booking`}
                element={<RoomBooking location={location} />}
              />
            </React.Fragment>
          ))}
        </>
      ) : (
        // Single location - use traditional routing
        <>
          {/* Dynamic routes based on active pages */}
          {Object.entries(PAGE_COMPONENTS).map(([page, Component]) => (
            <Route 
              key={page}
              path={`/${page.toLowerCase()}`}
              element={<ProtectedRoute page={page} Component={Component} />}
            />
          ))}

          {/* Room specific routes */}
          <Route path="/room/:roomId" element={<RoomDetails />} />
          <Route path="/room/:roomId/booking" element={<RoomBooking />} />
        </>
      )}

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 