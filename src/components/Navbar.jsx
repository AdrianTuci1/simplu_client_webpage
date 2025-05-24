import { Link, useLocation } from 'react-router-dom';
import { businessConfig, isPageActive } from '../config/businessConfig';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
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
      <div className="navbar-brand">
        <Link to="/">{businessConfig.type}</Link>
      </div>
      
      <div className="navbar-menu">
        {/* Home link is always active */}
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>

        {/* Business specific pages */}
        {Object.keys(businessConfig.activePages).map((page) => (
          isPageActive(page) && (
            <Link
              key={page}
              to={`/${page.toLowerCase()}`}
              className={location.pathname === `/${page.toLowerCase()}` ? 'active' : ''}
            >
              {getPageTitle(page)}
            </Link>
          )
        ))}

        {/* Settings link is always available */}
        <Link 
          to="/settings" 
          className={location.pathname === '/settings' ? 'active' : ''}
        >
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 