import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../../api';
import './styles.css';

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Check for error from OAuth callback
  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
      // Clear the error from location state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement traditional email/password authentication
      console.log(isSignIn ? 'Sign in:' : 'Register:', formData);
      
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home or intended page
      const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
      navigate(returnUrl, { replace: true });
      
    } catch (error) {
      setError('Authentication failed. Please try again.');
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOAuthSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Store current URL as return URL
      const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
      const oauthReturnUrl = `${window.location.origin}/auth/callback?returnUrl=${encodeURIComponent(returnUrl)}`;
      
      // TODO: Implement OAuth flow
      console.log('OAuth flow would be initiated here');
      
      // For now, just simulate success
      setTimeout(() => {
        navigate(returnUrl, { replace: true });
      }, 1000);
      
    } catch (error) {
      setError('Failed to initiate external OAuth authentication. Please try again.');
      console.error('External OAuth initiation error:', error);
      setIsLoading(false);
    }
  };

  const handlePasskeySignIn = () => {
    // TODO: Implement passkey authentication
    console.log('Passkey sign in clicked');
  };

  return (
    <div className="signin-section">
      <div className="signin-card">
        <div className="signin-header">
          <h2 className="signin-title">
            {isSignIn ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="signin-subtitle">
            {isSignIn ? 'Sign in to your account' : 'Register a new account'}
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="toggle-container">
          <button
            onClick={() => setIsSignIn(true)}
            className={`toggle-button ${isSignIn ? 'active' : ''}`}
            disabled={isLoading}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`toggle-button ${!isSignIn ? 'active' : ''}`}
            disabled={isLoading}
          >
            Register
          </button>
        </div>

        <form className="signin-form" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          {!isSignIn && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="form-input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : (isSignIn ? 'Sign in' : 'Create account')}
          </button>
        </form>

        <div className="divider">
          <span className="divider-text">Or continue with</span>
        </div>

        <div className="alternative-buttons">
          <button
            onClick={handleOAuthSignIn}
            className="alternative-button"
            disabled={isLoading}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            {isLoading ? 'Processing...' : 'OAuth Sign In'}
          </button>
          <button
            onClick={handlePasskeySignIn}
            className="alternative-button"
            disabled={isLoading}
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            Passkey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 