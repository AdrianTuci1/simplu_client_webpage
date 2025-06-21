import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ApiServiceExample = () => {
  const [apiStatus, setApiStatus] = useState(null);
  const [homeData, setHomeData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
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
          <button onClick={testBooking} disabled={loading}>
            Test Booking Operations
          </button>
        </div>
        
        <div className="button-group">
          <button onClick={testSettings} disabled={loading}>
            Test Settings Operations
          </button>
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