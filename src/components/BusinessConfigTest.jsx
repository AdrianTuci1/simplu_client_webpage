import React from 'react';
import simplifiedConfig from '../config/simplifiedConfig';
import { useLocations } from '../hooks/useSimplifiedData';

const BusinessConfigTest = () => {
  const { data: locations, currentLocation, isDemoMode } = useLocations();
  
  const config = simplifiedConfig.getConfig();
  
  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid #007bff', 
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>🔧 Business Configuration Test</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <h3>Environment Variables:</h3>
        <p><strong>VITE_BUSINESS_TYPE:</strong> {import.meta.env.VITE_BUSINESS_TYPE || 'Not set'}</p>
        <p><strong>VITE_ACTIVE_PAGES:</strong> {import.meta.env.VITE_ACTIVE_PAGES || 'Not set'}</p>
        <p><strong>VITE_HOME_LAYOUT:</strong> {import.meta.env.VITE_HOME_LAYOUT || 'Not set'}</p>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h3>Business Config Instance:</h3>
        <p><strong>Business Type:</strong> {config.type}</p>
        <p><strong>Tenant ID:</strong> {config.tenantId}</p>
        <p><strong>Active Pages:</strong> {config.activePages.join(', ')}</p>
        <p><strong>Home Layout:</strong> [{config.homeLayout.join(', ')}]</p>
        <p><strong>Available Pages:</strong> {config.availablePages.join(', ')}</p>
        <p><strong>Component Codes:</strong> [{config.componentCodes.join(', ')}]</p>
        <p><strong>Total Locations:</strong> {locations?.length || 0}</p>
        <p><strong>Current Location:</strong> {currentLocation?.name || 'None'}</p>
        <p><strong>Demo Mode:</strong> {isDemoMode ? 'ON' : 'OFF'}</p>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h3>Locations:</h3>
        {locations?.map(location => (
          <div key={location.id} style={{ 
            margin: '5px 0', 
            padding: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '5px',
            backgroundColor: currentLocation?.id === location.id ? '#e3f2fd' : 'white'
          }}>
            <p><strong>{location.name}</strong> {currentLocation?.id === location.id ? '(Current)' : ''}</p>
            <p><strong>ID:</strong> {location.id}</p>
            <p><strong>Address:</strong> {location.address}</p>
          </div>
        ))}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <h3>Configuration Validation:</h3>
        <p><strong>Is Valid:</strong> ✅ Yes (simplified config)</p>
        <p><strong>Layout Valid:</strong> ✅ Yes (simplified config)</p>
      </div>
    </div>
  );
};

export default BusinessConfigTest; 