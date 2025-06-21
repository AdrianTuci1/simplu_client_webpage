import React, { useState } from 'react';

const AuthFlowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "User Clicks OAuth Sign In",
      description: "User clicks the OAuth Sign In button on your website",
      code: `handleOAuthSignIn() {
  // Store return URL
  const returnUrl = '/dashboard';
  
  // Generate state for CSRF protection
  const state = generateRandomState();
  
  // Redirect to external provider
  window.location.href = 
    'https://auth.external-provider.com/oauth/authorize?' +
    'client_id=your_client_id&' +
    'redirect_uri=https://yourdomain.com/auth/callback&' +
    'response_type=code&' +
    'state=' + state;
}`,
      domain: "Your Website",
      action: "Redirects to external provider"
    },
    {
      id: 2,
      title: "External Authentication",
      description: "User registers or logs in on the external OAuth provider",
      code: `// User sees external provider's login page
// User enters credentials or creates account
// External provider validates credentials
// External provider generates authorization code`,
      domain: "External OAuth Provider",
      action: "Validates user and generates code"
    },
    {
      id: 3,
      title: "Callback with Authorization Code",
      description: "External provider redirects back to your website with authorization code",
      code: `// External provider redirects to:
https://yourdomain.com/auth/callback?
  code=AUTHORIZATION_CODE&
  state=ORIGINAL_STATE&
  error=null`,
      domain: "External Provider → Your Website",
      action: "Redirects with authorization code"
    },
    {
      id: 4,
      title: "Exchange Code for Tokens",
      description: "Your website exchanges the authorization code for access tokens",
      code: `exchangeCodeWithExternalProvider(code) {
  const response = await fetch(
    'https://auth.external-provider.com/oauth/token',
    {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: 'your_client_id',
        code: code,
        redirect_uri: 'https://yourdomain.com/auth/callback'
      })
    }
  );
  
  const tokenData = await response.json();
  // { access_token, refresh_token, expires_in, user_info }
}`,
      domain: "Your Website ↔ External Provider",
      action: "Server-to-server token exchange"
    },
    {
      id: 5,
      title: "Store Tokens & Authenticate",
      description: "Tokens are stored securely and user is authenticated",
      code: `storeTokens(tokenData) {
  // Store access token in sessionStorage
  sessionStorage.setItem('access_token', tokenData.access_token);
  
  // Store refresh token in localStorage
  localStorage.setItem('refresh_token', tokenData.refresh_token);
  
  // Store user info
  sessionStorage.setItem('user_info', JSON.stringify(tokenData.user_info));
}

// User is now authenticated!
// Redirect to original intended page
navigate('/dashboard');`,
      domain: "Your Website",
      action: "Stores tokens and authenticates user"
    },
    {
      id: 6,
      title: "Make Authenticated API Calls",
      description: "User can now make authenticated API calls using the tokens",
      code: `// API calls automatically include the token
const userProfile = await apiService.user.getProfile();
const homeData = await apiService.home.getHomeData('hotel', 1);
const booking = await apiService.booking.createRoomBooking(bookingData);

// Token is automatically included in headers:
// Authorization: Bearer ACCESS_TOKEN`,
      domain: "Your Website → Your API",
      action: "Uses tokens for authenticated requests"
    }
  ];

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const goToStep = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  return (
    <div className="auth-flow-diagram">
      <h2>OAuth Authentication Flow</h2>
      
      {/* Flow Overview */}
      <div className="flow-overview">
        <div className="flow-step">
          <div className="step-number">1</div>
          <div className="step-label">Your Website</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <div className="step-number">2</div>
          <div className="step-label">External Provider</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <div className="step-number">3</div>
          <div className="step-label">Your Website</div>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-step">
          <div className="step-number">4</div>
          <div className="step-label">Authenticated</div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="step-navigation">
        <button onClick={prevStep} className="nav-button">
          ← Previous
        </button>
        
        <div className="step-indicators">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={`step-indicator ${index === activeStep ? 'active' : ''}`}
            >
              {step.id}
            </button>
          ))}
        </div>
        
        <button onClick={nextStep} className="nav-button">
          Next →
        </button>
      </div>

      {/* Current Step Details */}
      <div className="step-details">
        <div className="step-header">
          <h3>Step {steps[activeStep].id}: {steps[activeStep].title}</h3>
          <div className="step-domain">{steps[activeStep].domain}</div>
        </div>
        
        <div className="step-description">
          {steps[activeStep].description}
        </div>
        
        <div className="step-action">
          <strong>Action:</strong> {steps[activeStep].action}
        </div>
        
        <div className="step-code">
          <h4>Code Example:</h4>
          <pre>
            <code>{steps[activeStep].code}</code>
          </pre>
        </div>
      </div>

      {/* Security Features */}
      <div className="security-features">
        <h3>Security Features</h3>
        <div className="security-grid">
          <div className="security-item">
            <h4>🛡️ CSRF Protection</h4>
            <p>Random state parameter prevents cross-site request forgery attacks</p>
          </div>
          <div className="security-item">
            <h4>🔐 Token Security</h4>
            <p>Access tokens stored in sessionStorage, refresh tokens in localStorage</p>
          </div>
          <div className="security-item">
            <h4>🔄 Auto Refresh</h4>
            <p>Tokens automatically refreshed when expired</p>
          </div>
          <div className="security-item">
            <h4>🚫 Error Handling</h4>
            <p>Comprehensive error handling with graceful fallbacks</p>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="configuration">
        <h3>Required Configuration</h3>
        <div className="config-section">
          <h4>Environment Variables:</h4>
          <pre>
            <code>{`VITE_OAUTH_CLIENT_ID=your_client_id_from_external_provider
VITE_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
VITE_EXTERNAL_AUTH_URL=https://auth.external-provider.com/oauth/authorize
VITE_EXTERNAL_TOKEN_URL=https://auth.external-provider.com/oauth/token`}</code>
          </pre>
        </div>
        
        <div className="config-section">
          <h4>External Provider Setup:</h4>
          <ol>
            <li>Register your application on the external provider</li>
            <li>Get client ID and configure redirect URI</li>
            <li>Set up user registration/login on external provider</li>
            <li>Configure required scopes (permissions)</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AuthFlowDiagram; 