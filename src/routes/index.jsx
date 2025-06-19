import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { businessConfig, isPageActive, getAllLocations } from '../config/businessConfig';
import useLocationStore from '../store/locationStore';
import PageError from '../components/PageError';

// Import pages
import Home from './Home';
import Settings from './pages/Settings';
import SignIn from './pages/SignIn';

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

const pageComponents = {
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
  const location = useLocation();
  
  if (!isPageActive(page)) {
    return (
      <PageError 
        message={`This page is not available for the current business type (${businessConfig.type}) or is not active in the configuration.`}
      />
    );
  }

  return <Component />;
};

// Location-aware route component
const LocationRoute = ({ page, Component }) => {
  const { currentLocation } = useLocationStore();
  
  if (!isPageActive(page)) {
    return (
      <PageError 
        message={`This page is not available for the current business type (${businessConfig.type}) or is not active in the configuration.`}
      />
    );
  }

  return <Component location={currentLocation} />;
};

// Location selector component for route-based location switching
const LocationRedirect = () => {
  const { currentLocation, allLocations, initializeLocations } = useLocationStore();
  
  // Initialize locations if needed
  if (allLocations.length === 0) {
    initializeLocations();
  }
  
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
  const allLocations = getAllLocations();
  const hasMultipleLocations = allLocations.length > 1;

  return (
    <Routes>
      {/* Root route - redirects based on location */}
      <Route path="/" element={<LocationRedirect />} />
      
      {/* Auth routes */}
      <Route path="/signin" element={<SignIn />} />
      
      {/* Settings route - available for all business types */}
      <Route path="/settings" element={<Settings />} />
      
      {/* Location-specific routes */}
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
            Object.entries(pageComponents).map(([page, Component]) => (
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
          {Object.entries(pageComponents).map(([page, Component]) => (
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