# External OAuth Authentication Flow

This document explains how the external OAuth authentication system works in your application.

## 🔄 **Complete Authentication Flow**

### **Step-by-Step Process**

```
1. User clicks "OAuth Sign In" on your website
   ↓
2. User is redirected to external OAuth provider (different domain)
   ↓
3. User registers/logs in on external provider
   ↓
4. External provider redirects back to your website with authorization code
   ↓
5. Your website exchanges code for access token
   ↓
6. User is authenticated and can access protected resources
```

## 📋 **Detailed Flow Breakdown**

### **Step 1: Initiation (Your Website → External Provider)**

**Location**: `src/routes/pages/SignIn.jsx` - `handleOAuthSignIn()`

```javascript
const handleOAuthSignIn = async () => {
  // Store return URL for after authentication
  const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/';
  const oauthReturnUrl = `${window.location.origin}/auth/callback?returnUrl=${encodeURIComponent(returnUrl)}`;
  
  // Update redirect URI for this session
  authService.redirectUri = oauthReturnUrl;
  
  // Redirect user to external OAuth provider
  authService.initiateExternalOAuthFlow();
};
```

**What happens:**
1. User clicks "OAuth Sign In" button
2. System stores the current page URL as return URL
3. Generates a random state parameter for CSRF protection
4. Builds authorization URL with parameters:
   - `client_id`: Your app's ID on the external provider
   - `redirect_uri`: Where to send user back after auth
   - `response_type`: "code" (authorization code flow)
   - `state`: Random string for security
   - `scope`: Requested permissions
5. Redirects user to external provider's login page

### **Step 2: External Authentication (External Provider)**

**Location**: External OAuth provider's domain (e.g., `https://auth.external-provider.com`)

**What happens:**
1. User sees external provider's login/registration page
2. User enters credentials or creates new account
3. External provider validates credentials
4. External provider generates authorization code
5. External provider redirects back to your callback URL with:
   - `code`: Authorization code
   - `state`: Same state parameter sent earlier
   - `error`: (if authentication failed)

### **Step 3: Callback Handling (External Provider → Your Website)**

**Location**: `src/routes/pages/AuthCallback.jsx`

```javascript
const handleCallback = async () => {
  try {
    // Handle the OAuth callback
    const tokenData = await authService.handleExternalOAuthCallback();
    
    // Redirect to intended page
    const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
    navigate(returnUrl, { replace: true });
    
  } catch (error) {
    // Handle errors and redirect to signin page
    navigate('/signin', { 
      replace: true,
      state: { error: error.message }
    });
  }
};
```

**What happens:**
1. User lands on `/auth/callback` with authorization code
2. System verifies state parameter matches stored value
3. Extracts authorization code from URL parameters
4. Exchanges code for access token with external provider
5. Stores tokens securely in browser storage
6. Redirects user to original intended page

### **Step 4: Token Exchange (Your Website ↔ External Provider)**

**Location**: `src/services/authService.js` - `exchangeCodeWithExternalProvider()`

```javascript
async exchangeCodeWithExternalProvider(code) {
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

  const tokenData = await response.json();
  this.storeTokens(tokenData);
  return tokenData;
}
```

**What happens:**
1. Your website makes server-to-server request to external provider
2. Sends authorization code to exchange for tokens
3. External provider validates code and returns:
   - `access_token`: For API calls
   - `refresh_token`: For getting new access tokens
   - `expires_in`: Token expiration time
   - `user_info`: User profile data (optional)
4. Tokens are stored securely in browser storage

## 🔧 **Configuration Required**

### **Environment Variables**

```bash
# OAuth Provider Configuration
VITE_OAUTH_CLIENT_ID=your_client_id_from_external_provider
VITE_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
VITE_EXTERNAL_AUTH_URL=https://auth.external-provider.com/oauth/authorize
VITE_EXTERNAL_TOKEN_URL=https://auth.external-provider.com/oauth/token
```

### **External Provider Setup**

You need to configure your app on the external OAuth provider:

1. **Register your application** on the external provider
2. **Get client ID** and optionally client secret
3. **Set redirect URI** to `https://yourdomain.com/auth/callback`
4. **Configure scopes** (permissions) your app needs
5. **Set up user registration/login** on the external provider

## 🛡️ **Security Features**

### **CSRF Protection**
- Random state parameter generated for each auth request
- State verified on callback to prevent CSRF attacks
- State stored in localStorage and cleared after verification

### **Token Security**
- Access tokens stored in sessionStorage (cleared on tab close)
- Refresh tokens stored in localStorage (persistent)
- Automatic token refresh when expired
- Secure token transmission in Authorization header

### **Error Handling**
- Comprehensive error handling at each step
- User-friendly error messages
- Graceful fallback to signin page on errors
- Console logging for debugging

## 🔄 **Token Management**

### **Automatic Token Refresh**

```javascript
async getValidAccessToken() {
  if (!this.getAccessToken() || this.isTokenExpired()) {
    await this.refreshAccessToken();
  }
  return this.getAccessToken();
}
```

### **API Request Authentication**

```javascript
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
  
  // Handle 401 errors with automatic token refresh
  if (response.status === 401) {
    await this.refreshAccessToken();
    const newToken = await this.getValidAccessToken();
    requestOptions.headers.Authorization = `Bearer ${newToken}`;
    return await fetch(url, requestOptions);
  }
  
  return response;
}
```

## 📱 **User Experience Flow**

### **For New Users:**
1. Click "OAuth Sign In" → Redirected to external provider
2. Register new account on external provider
3. Redirected back to your website → Automatically logged in
4. Can access protected features immediately

### **For Existing Users:**
1. Click "OAuth Sign In" → Redirected to external provider
2. Log in with existing credentials
3. Redirected back to your website → Automatically logged in
4. Can access protected features immediately

### **Error Scenarios:**
1. **Authentication failed** → Redirected to signin page with error message
2. **Network issues** → User sees loading state, then error message
3. **Invalid state** → Security error, redirected to signin page
4. **Token refresh failed** → User logged out, redirected to signin page

## 🔗 **Integration with Your API Service**

The authenticated user can now make API calls using the external OAuth tokens:

```javascript
import apiService from '../services/api';

// API calls automatically use the external OAuth tokens
const userProfile = await apiService.user.getProfile();
const homeData = await apiService.home.getHomeData('hotel', 1);
const booking = await apiService.booking.createRoomBooking(bookingData);
```

## 🚀 **Benefits of This Approach**

1. **No Password Management**: External provider handles user credentials
2. **Enhanced Security**: Professional OAuth provider security standards
3. **User Convenience**: Single sign-on across multiple services
4. **Scalability**: Can handle large user bases without infrastructure
5. **Compliance**: OAuth provider handles data protection regulations
6. **Reduced Liability**: User data stored by trusted external provider

## 🔮 **Future Enhancements**

1. **Multiple OAuth Providers**: Support Google, Facebook, GitHub, etc.
2. **Social Login**: Allow users to sign in with social media accounts
3. **Role-Based Access**: Different permissions based on user roles
4. **Multi-Factor Authentication**: Enhanced security through MFA
5. **Session Management**: Better control over user sessions
6. **Analytics**: Track authentication patterns and success rates 