import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { businessConfig, isPageActive } from '../config/businessConfig';
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Auth routes */}
      <Route path="/signin" element={<SignIn />} />
      
      {/* Settings route - available for all business types */}
      <Route path="/settings" element={<Settings />} />
      
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

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 