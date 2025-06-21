import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ApiServiceExample = () => {
  const [apiStatus, setApiStatus] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userBookings, setUserBookings] = useState(null);
  const [userAppointments, setUserAppointments] = useState(null);
  const [userPackages, setUserPackages] = useState(null);
  const [userClasses, setUserClasses] = useState(null);
  const [userSettings, setUserSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check API status on component mount
  useEffect(() => {
    const status = apiService.getStatus();
    setApiStatus(status);
  }, []);

  // Load homepage data
  const loadHomeData = async (businessType = 'hotel') => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiService.home.getHomeData(businessType, 1);
      setHomeData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load user profile
  const loadUserProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const profile = await apiService.user.getProfile();
      setUserProfile(profile);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test booking operations
  const testBooking = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Test hotel booking
      const bookingData = {
        rooms: [
          {
            roomId: 1,
            dateFrom: "2025-01-01",
            dateTo: "2025-01-03",
            adults: 2,
          }
        ],
        specialRequests: "No special requests"
      };
      
      const booking = await apiService.booking.createRoomBooking(bookingData);
      console.log('Booking created:', booking);
      
      // Test clinic appointment
      const appointmentData = {
        serviceId: 1,
        date: "2025-01-01",
        time: "10:00",
        description: "Regular checkup"
      };
      
      const appointment = await apiService.booking.bookAppointment(appointmentData);
      console.log('Appointment booked:', appointment);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test settings operations
  const testSettings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userSettings = await apiService.settings.getUserSettings();
      console.log('User settings:', userSettings);
      
      const businessSettings = await apiService.settings.getBusinessSettings('hotel');
      console.log('Business settings:', businessSettings);
      
      const notifications = await apiService.settings.getNotificationSettings();
      console.log('Notification settings:', notifications);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test business operations
  const testBusinessOperations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const businessInfo = await apiService.business.getBusinessInfo('hotel');
      console.log('Business info:', businessInfo);
      
      const analytics = await apiService.business.getBusinessAnalytics('hotel');
      console.log('Business analytics:', analytics);
      
      const contact = await apiService.business.getBusinessContact('hotel');
      console.log('Business contact:', contact);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test user data operations
  const testUserData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Test user bookings for different business types
      const hotelBookings = await apiService.user.getUserBookings('hotel');
      setUserBookings(hotelBookings);
      console.log('Hotel bookings:', hotelBookings);
      
      const clinicAppointments = await apiService.user.getUserAppointments();
      setUserAppointments(clinicAppointments);
      console.log('Clinic appointments:', clinicAppointments);
      
      const gymPackages = await apiService.user.getUserPackages();
      setUserPackages(gymPackages);
      console.log('Gym packages:', gymPackages);
      
      const gymClasses = await apiService.user.getUserClasses();
      setUserClasses(gymClasses);
      console.log('Gym classes:', gymClasses);
      
      const settings = await apiService.user.getUserSettings();
      setUserSettings(settings);
      console.log('User settings:', settings);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Test demo mode functionality
  const testDemoMode = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Demo mode status:', apiService.isDemoMode());
      console.log('Using fallback:', apiService.isUsingFallback());
      
      // Test all user operations in demo mode
      const profile = await apiService.user.getProfile();
      console.log('Demo profile:', profile);
      
      const bookings = await apiService.user.getUserBookings();
      console.log('Demo bookings:', bookings);
      
      const settings = await apiService.user.getUserSettings();
      console.log('Demo settings:', settings);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-service-example">
      <h2>API Service Example</h2>
      
      {/* API Status */}
      <div className="api-status">
        <h3>API Status</h3>
        {apiStatus && (
          <div className="status-info">
            <p><strong>Base URL:</strong> {apiStatus.baseUrl}</p>
            <p><strong>Using Fallback:</strong> {apiStatus.useFallback ? 'Yes' : 'No'}</p>
            <p><strong>Demo Mode:</strong> {apiStatus.isDemo ? 'Yes' : 'No'}</p>
            <p><strong>Authenticated:</strong> {apiStatus.isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>Has User Info:</strong> {apiStatus.hasUserInfo ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <h3>Test Operations</h3>
        
        <div className="button-group">
          <button onClick={() => loadHomeData('hotel')} disabled={loading}>
            Load Hotel Data
          </button>
          <button onClick={() => loadHomeData('clinic')} disabled={loading}>
            Load Clinic Data
          </button>
          <button onClick={() => loadHomeData('gym')} disabled={loading}>
            Load Gym Data
          </button>
        </div>
        
        <div className="button-group">
          <button onClick={loadUserProfile} disabled={loading}>
            Load User Profile
          </button>
          <button onClick={testUserData} disabled={loading}>
            Test User Data
          </button>
          <button onClick={testDemoMode} disabled={loading}>
            Test Demo Mode
          </button>
        </div>
        
        <div className="button-group">
          <button onClick={testBooking} disabled={loading}>
            Test Booking Operations
          </button>
          <button onClick={testSettings} disabled={loading}>
            Test Settings Operations
          </button>
        </div>
        
        <div className="button-group">
          <button onClick={testBusinessOperations} disabled={loading}>
            Test Business Operations
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}

      {/* Home Data Display */}
      {homeData && (
        <div className="data-display">
          <h3>Home Data</h3>
          <div className="data-section">
            <h4>Business Info</h4>
            <p><strong>Type:</strong> {homeData.businessType}</p>
            <p><strong>Tenant ID:</strong> {homeData.tenantId}</p>
            <p><strong>Current Location:</strong> {homeData.currentLocation}</p>
            <p><strong>Available Pages:</strong> {homeData.availablePages?.join(', ')}</p>
          </div>
          
          <div className="data-section">
            <h4>Hero Section</h4>
            <p><strong>Business Name:</strong> {homeData.locationData?.hero?.bussinesName}</p>
            <p><strong>Business Slug:</strong> {homeData.locationData?.hero?.bussinesSlug}</p>
          </div>
          
          <div className="data-section">
            <h4>Locations</h4>
            <ul>
              {homeData.locations?.map(location => (
                <li key={location.id}>
                  {location.name} ({location.slug})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* User Profile Display */}
      {userProfile && (
        <div className="data-display">
          <h3>User Profile</h3>
          <div className="data-section">
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>Phone:</strong> {userProfile.phone}</p>
            <p><strong>Address:</strong> {userProfile.address}</p>
            <p><strong>City:</strong> {userProfile.city}</p>
            <p><strong>Country:</strong> {userProfile.country}</p>
          </div>
        </div>
      )}

      {/* User Bookings Display */}
      {userBookings && (
        <div className="data-display">
          <h3>User Bookings</h3>
          <div className="data-section">
            {userBookings.bookings && userBookings.bookings.length > 0 ? (
              <ul>
                {userBookings.bookings.map(booking => (
                  <li key={booking.id}>
                    <strong>ID:</strong> {booking.id} | 
                    <strong>Room:</strong> {booking.roomName || booking.roomId} | 
                    <strong>Status:</strong> {booking.status || booking.roomStatus}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings found</p>
            )}
          </div>
        </div>
      )}

      {/* User Appointments Display */}
      {userAppointments && (
        <div className="data-display">
          <h3>User Appointments</h3>
          <div className="data-section">
            {userAppointments.appointments && userAppointments.appointments.length > 0 ? (
              <ul>
                {userAppointments.appointments.map(appointment => (
                  <li key={appointment.id}>
                    <strong>ID:</strong> {appointment.id} | 
                    <strong>Service:</strong> {appointment.serviceName || appointment.appointmentName} | 
                    <strong>Date:</strong> {appointment.date || appointment.appointmentDate} | 
                    <strong>Time:</strong> {appointment.time || appointment.appointmentTime}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments found</p>
            )}
          </div>
        </div>
      )}

      {/* User Packages Display */}
      {userPackages && (
        <div className="data-display">
          <h3>User Packages</h3>
          <div className="data-section">
            {userPackages.packages && userPackages.packages.length > 0 ? (
              <ul>
                {userPackages.packages.map(packageItem => (
                  <li key={packageItem.id}>
                    <strong>ID:</strong> {packageItem.id} | 
                    <strong>Name:</strong> {packageItem.packageName || packageItem.name} | 
                    <strong>Status:</strong> {packageItem.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No packages found</p>
            )}
          </div>
        </div>
      )}

      {/* User Classes Display */}
      {userClasses && (
        <div className="data-display">
          <h3>User Classes</h3>
          <div className="data-section">
            {userClasses.classes && userClasses.classes.length > 0 ? (
              <ul>
                {userClasses.classes.map(classItem => (
                  <li key={classItem.id}>
                    <strong>ID:</strong> {classItem.id} | 
                    <strong>Class:</strong> {classItem.className} | 
                    <strong>Date:</strong> {classItem.date} | 
                    <strong>Time:</strong> {classItem.time}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No classes found</p>
            )}
          </div>
        </div>
      )}

      {/* User Settings Display */}
      {userSettings && (
        <div className="data-display">
          <h3>User Settings</h3>
          <div className="data-section">
            <p><strong>Language:</strong> {userSettings.language}</p>
            <p><strong>Currency:</strong> {userSettings.currency}</p>
            <p><strong>Theme:</strong> {userSettings.theme}</p>
            <p><strong>Notifications:</strong> {userSettings.notifications ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Email Notifications:</strong> {userSettings.emailNotifications ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="usage-instructions">
        <h3>Usage Instructions</h3>
        <div className="code-examples">
          <h4>Basic Usage</h4>
          <pre>
{`import apiService from '../services/api';

// Get homepage data
const homeData = await apiService.home.getHomeData('hotel', 1);

// Get user profile
const profile = await apiService.user.getProfile();

// Create booking
const booking = await apiService.booking.createRoomBooking(bookingData);`}
          </pre>
          
          <h4>User Data Operations</h4>
          <pre>
{`// Get user bookings (business-type specific)
const hotelBookings = await apiService.user.getUserBookings('hotel');
const clinicAppointments = await apiService.user.getUserAppointments();
const gymPackages = await apiService.user.getUserPackages();
const gymClasses = await apiService.user.getUserClasses();

// Get and update user settings
const settings = await apiService.user.getUserSettings();
const updatedSettings = await apiService.user.updateUserSettings(newSettings);`}
          </pre>
          
          <h4>Demo Mode</h4>
          <pre>
{`// Check if in demo mode
const isDemo = apiService.isDemoMode();
const usingFallback = apiService.isUsingFallback();

// Demo mode uses fallback data from apiUserData.js
// Set VITE_IS_DEMO=true in your .env file to enable demo mode`}
          </pre>
          
          <h4>Business-Specific Operations</h4>
          <pre>
{`// Hotel operations
const rooms = await apiService.booking.getAvailableRooms(1, '2025-01-01', '2025-01-03');

// Clinic operations
const medics = await apiService.booking.getMedics(1);

// Gym operations
const packages = await apiService.booking.getAvailablePackages();`}
          </pre>
          
          <h4>Settings Management</h4>
          <pre>
{`// User settings
const userSettings = await apiService.settings.getUserSettings();

// Business settings
const businessSettings = await apiService.settings.getBusinessSettings('hotel');

// Notification settings
const notifications = await apiService.settings.getNotificationSettings();`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiServiceExample; 