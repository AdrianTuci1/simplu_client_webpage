// API function to get home page data
const API_BASE_URL = import.meta.env.VITE_API || '';
import { getHomeData } from '../config/demoMode.js';

export const getHomePage = async ({ tenantId, locationId }) => {
  if (!tenantId) throw new Error('Missing tenantId');
  
  // Check if we should use demo data
  const demoData = getHomeData({ tenantId, locationId });
  if (demoData !== 'API_CALL') {
    return demoData;
  }
  
  // Make real API call
  let url = `${API_BASE_URL}/api/home?tenantId=${tenantId}`;
  if (locationId) url += `&locationId=${locationId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch home page data');
  }
  return await response.json();
};
