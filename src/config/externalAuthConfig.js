// External OAuth Provider Configuration
// This file documents how to configure your app to work with an external OAuth provider

export const externalAuthConfig = {
  // Example configuration for different OAuth providers
  
  // Google OAuth2.0
  google: {
    clientId: 'your_google_client_id',
    externalAuthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    externalTokenUrl: 'https://oauth2.googleapis.com/token',
    scope: 'openid email profile',
  },
  
  // Microsoft OAuth2.0
  microsoft: {
    clientId: 'your_microsoft_client_id',
    externalAuthUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    externalTokenUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    scope: 'openid email profile',
  },
  
  // Custom OAuth Provider
  custom: {
    clientId: 'your_custom_client_id',
    externalAuthUrl: 'https://your-auth-server.com/oauth/authorize',
    externalTokenUrl: 'https://your-auth-server.com/oauth/token',
    scope: 'read write profile',
  },
};

// Environment variables you need to set:
/*
VITE_OAUTH_CLIENT_ID=your_client_id_here
VITE_EXTERNAL_AUTH_URL=https://your-auth-provider.com/oauth/authorize
VITE_EXTERNAL_TOKEN_URL=https://your-auth-provider.com/oauth/token
VITE_OAUTH_REDIRECT_URI=http://localhost:5173/auth/callback
*/

// OAuth Flow Steps:
/*
1. User clicks "OAuth Sign In" button
2. App redirects to external OAuth provider (externalAuthUrl)
3. User authenticates on external provider's domain
4. External provider redirects back to your app with authorization code
5. App exchanges code for access token with external provider
6. App stores tokens and user info locally
7. User is now authenticated and can make API calls
*/

// Security Considerations:
/*
- Always use HTTPS in production
- Validate state parameter to prevent CSRF attacks
- Store tokens securely (sessionStorage for access tokens, localStorage for refresh tokens)
- Implement token refresh logic
- Clear tokens on logout
- Use appropriate scopes for your application needs
*/ 