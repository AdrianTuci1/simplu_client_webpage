import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../api';
import './AuthCallback.css';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus('processing');
        
        // Handle the OAuth callback
        // TODO: Handle OAuth callback
      const tokenData = { success: true };
        
        console.log('OAuth authentication successful:', tokenData);
        
        setStatus('success');
        
        // Redirect to the intended page or home
        setTimeout(() => {
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
          navigate(returnUrl, { replace: true });
        }, 1500);
        
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError(error.message);
        setStatus('error');
        
        // Redirect to signin page after error
        setTimeout(() => {
          navigate('/signin', { 
            replace: true,
            state: { error: error.message }
          });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  if (status === 'processing') {
    return (
      <div className="auth-callback">
        <div className="callback-card">
          <div className="loading-spinner"></div>
          <h2>Processing Authentication...</h2>
          <p>Please wait while we complete your sign-in.</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="auth-callback">
        <div className="callback-card success">
          <div className="success-icon">✓</div>
          <h2>Authentication Successful!</h2>
          <p>You have been successfully signed in. Redirecting...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="auth-callback">
        <div className="callback-card error">
          <div className="error-icon">✗</div>
          <h2>Authentication Failed</h2>
          <p>{error}</p>
          <p>Redirecting to sign-in page...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback; 