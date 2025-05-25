import { Link, useLocation } from 'react-router-dom';
import { businessConfig, isPageActive } from '../config/businessConfig';
import { FaHome, FaUserMd, FaTooth, FaDumbbell, FaCalendarAlt, FaBed, FaSwimmingPool, FaMapMarkedAlt, FaCog, FaChartLine } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
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

  return (
    <nav className="navbar">      
      <div className="navbar-menu">
        {/* Home link is always active */}
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
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
              to={`/${page.toLowerCase()}`}
              className={`nav-link ${location.pathname === `/${page.toLowerCase()}` ? 'active' : ''}`}
              title={getPageTitle(page)}
            >
              {getPageIcon(page)}
              <span className="nav-text">{getPageTitle(page)}</span>
            </Link>
          )
        ))}

        {/* Separator */}
        <div className="nav-separator" />

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
    </nav>
  );
};

export default Navbar; 