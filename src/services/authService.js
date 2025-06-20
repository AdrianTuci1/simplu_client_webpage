// OAuth2.0 Client Service
// This service handles receiving credentials from an external OAuth provider
// The actual authentication happens on a separate domain/server

class AuthService {
  constructor() {
    // These should be configured for your external OAuth provider
    this.clientId = import.meta.env.VITE_OAUTH_CLIENT_ID || '1234567890';
    this.redirectUri = import.meta.env.VITE_OAUTH_REDIRECT_URI || `${window.location.origin}/auth/callback`;
    
    // External OAuth provider URLs (replace with your actual provider)
    this.externalAuthUrl = import.meta.env.VITE_EXTERNAL_AUTH_URL || 'https://auth.external-provider.com/oauth/authorize';
    this.externalTokenUrl = import.meta.env.VITE_EXTERNAL_TOKEN_URL || 'https://auth.external-provider.com/oauth/token';
  }

  // Step 1: Redirect user to external OAuth provider
  initiateExternalOAuthFlow() {
    const state = this.generateRandomState();
    const scope = 'read write profile'; // Adjust based on your needs
    
    // Store state in localStorage for verification
    localStorage.setItem('oauth_state', state);
    
    // Build authorization URL for external provider
    const authUrl = new URL(this.externalAuthUrl);
    authUrl.searchParams.append('client_id', this.clientId);
    authUrl.searchParams.append('redirect_uri', this.redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('scope', scope);
    
    // Redirect user to external OAuth provider
    window.location.href = authUrl.toString();
  }

  // Step 2: Handle the callback from external OAuth provider
  async handleExternalOAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    // Verify state parameter
    const storedState = localStorage.getItem('oauth_state');
    if (state !== storedState) {
      throw new Error('OAuth state mismatch - possible CSRF attack');
    }
    
    // Clear stored state
    localStorage.removeItem('oauth_state');
    
    if (error) {
      throw new Error(`OAuth error: ${error}`);
    }
    
    if (!code) {
      throw new Error('No authorization code received from external provider');
    }
    
    // Step 3: Exchange code for tokens with external provider
    return await this.exchangeCodeWithExternalProvider(code);
  }

  // Step 3: Exchange authorization code for tokens with external provider
  async exchangeCodeWithExternalProvider(code) {
    try {
      const response = await fetch(this.externalTokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.clientId,
          code: code,
          redirect_uri: this.redirectUri,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Token exchange failed: ${errorData.error || response.statusText}`);
      }

      const tokenData = await response.json();
      
      // Store tokens securely
      this.storeTokens(tokenData);
      
      return tokenData;
    } catch (error) {
      console.error('External token exchange error:', error);
      throw error;
    }
  }

  // Store tokens received from external provider
  storeTokens(tokenData) {
    // Store access token in session storage
    sessionStorage.setItem('access_token', tokenData.access_token);
    
    // Store refresh token if provided
    if (tokenData.refresh_token) {
      localStorage.setItem('refresh_token', tokenData.refresh_token);
    }
    
    // Store token expiry
    if (tokenData.expires_in) {
      const expiryTime = Date.now() + (tokenData.expires_in * 1000);
      sessionStorage.setItem('token_expiry', expiryTime.toString());
    }

    // Store user info if provided
    if (tokenData.user_info) {
      sessionStorage.setItem('user_info', JSON.stringify(tokenData.user_info));
    }
  }

  // Get current access token from external provider
  getAccessToken() {
    return sessionStorage.getItem('access_token');
  }

  // Check if token is expired
  isTokenExpired() {
    const expiryTime = sessionStorage.getItem('token_expiry');
    if (!expiryTime) return true;
    
    return Date.now() > parseInt(expiryTime);
  }

  // Refresh access token using external provider
  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(this.externalTokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: this.clientId,
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const tokenData = await response.json();
      this.storeTokens(tokenData);
      
      return tokenData.access_token;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw error;
    }
  }

  // Get valid access token (refresh if needed)
  async getValidAccessToken() {
    if (!this.getAccessToken() || this.isTokenExpired()) {
      await this.refreshAccessToken();
    }
    return this.getAccessToken();
  }

  // Get user info from stored data
  getUserInfo() {
    const userInfo = sessionStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  // Logout user (clear all stored data)
  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('token_expiry');
    sessionStorage.removeItem('user_info');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('oauth_state');
    
    // Redirect to home page
    window.location.href = '/';
  }

  // Generate random state for CSRF protection
  generateRandomState() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAccessToken();
    return token && !this.isTokenExpired();
  }

  // Make authenticated API calls using the external token
  async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getValidAccessToken();
    
    const requestOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, requestOptions);
    
    if (response.status === 401) {
      // Token might be invalid, try to refresh
      await this.refreshAccessToken();
      // Retry the request with new token
      const newToken = await this.getValidAccessToken();
      requestOptions.headers.Authorization = `Bearer ${newToken}`;
      return await fetch(url, requestOptions);
    }
    
    return response;
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService; 