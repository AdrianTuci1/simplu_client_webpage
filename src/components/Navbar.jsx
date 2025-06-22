import { Link, useLocation } from 'react-router-dom';
import { businessConfig, isPageActive, getAllLocations } from '../config/businessConfig';
import useLocationStore from '../store/locationStore';
import { FaHome, FaUserMd, FaTooth, FaDumbbell, FaCalendarAlt, FaBed, FaSwimmingPool, FaMapMarkedAlt, FaCog, FaChartLine } from 'react-icons/fa';
import './Navbar.css';
import { useEffect } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { currentLocation, getLocationInfo, initializeLocations, allLocations } = useLocationStore();
  
  // Initialize locations on component mount
  useEffect(() => {
    if (allLocations.length === 0) {
      initializeLocations();
    }
  }, [allLocations.length, initializeLocations]);
  
  const locationInfo = getLocationInfo();
  const hasMultipleLocations = allLocations.length > 1;
  
  const getPageIcon = (page) => {
    const icons = {
      MEDICS: <FaUserMd />,
      TREATMENTS: <FaTooth />,
      PACKAGES: <FaDumbbell />,
      CLASSES: <FaCalendarAlt />,
      ROOMS: <FaBed />,
      FACILITIES: <FaSwimmingPool />,
      ATTRACTIONS: <FaMapMarkedAlt />,
      SETTINGS: <FaCog />
    };
    return icons[page] || null;
  };

  const getPageTitle = (page) => {
    const titles = {
      MEDICS: 'Medics',
      TREATMENTS: 'Treatments',
      PACKAGES: 'Packages',
      CLASSES: 'Classes',
      ROOMS: 'Rooms',
      FACILITIES: 'Facilities',
      ATTRACTIONS: 'Attractions',
      SETTINGS: 'Settings'
    };
    return titles[page] || page;
  };

  // Helper function to get the correct path for navigation
  const getPagePath = (page) => {
    if (hasMultipleLocations && currentLocation) {
      return `/${currentLocation.slug}/${page.toLowerCase()}`;
    }
    return `/${page.toLowerCase()}`;
  };

  // Helper function to check if a path is active
  const isPathActive = (path) => {
    // For exact path matching
    if (location.pathname === path) {
      return true;
    }
    
    // For location-based paths, check if we're on the exact page
    if (hasMultipleLocations && currentLocation) {
      const expectedPath = `/${currentLocation.slug}/${path.split('/').pop()}`;
      return location.pathname === expectedPath;
    }
    
    return false;
  };

  // Helper function to check if home is active
  const isHomeActive = () => {
    if (hasMultipleLocations && currentLocation) {
      return location.pathname === `/${currentLocation.slug}` || location.pathname === `/${currentLocation.slug}/`;
    }
    return location.pathname === "/" || location.pathname === "";
  };

  return (
    <nav className="navbar">      
      <div className="navbar-menu">
        {/* Left group: Home and Business pages */}
        <div className="nav-group nav-group-left">
          {/* Home link is always active */}
          <Link 
            to={hasMultipleLocations && currentLocation ? `/${currentLocation.slug}` : "/"} 
            className={`nav-link ${isHomeActive() ? 'active' : ''}`}
            title="Home"
          >
            <FaHome className="nav-icon" />
            <span className="nav-text">Home</span>
          </Link>

          {/* Business specific pages */}
          {businessConfig.activePages.map((page) => (
            isPageActive(page) && (
              <Link
                key={page}
                to={getPagePath(page)}
                className={`nav-link ${isPathActive(getPagePath(page)) ? 'active' : ''}`}
                title={getPageTitle(page)}
              >
                {getPageIcon(page)}
                <span className="nav-text">{getPageTitle(page)}</span>
              </Link>
            )
          ))}
        </div>

        {/* Right group: Dashboard and Settings */}
        <div className="nav-group nav-group-right">
          {/* Dashboard link */}
          <a 
            href="https://dashboard.simplu.ro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-link"
            title="Dashboard"
          >
            <FaChartLine className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </a>

          {/* Settings link is always available */}
          <Link 
            to="/settings" 
            className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
            title="Settings"
          >
            <FaCog className="nav-icon" />
            <span className="nav-text">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 