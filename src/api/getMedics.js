// API function to get medics data
const API_BASE_URL = import.meta.env.VITE_API || '';
import { getMedicsData } from '../config/demoMode.js';

export const getMedics = async ({ tenantId, locationId }) => {
  if (!tenantId) throw new Error('Missing tenantId');
  
  // Check if we should use demo data
  const demoData = getMedicsData({ tenantId, locationId });
  if (demoData !== 'API_CALL') {
    return demoData;
  }
  
  // Make real API call
  let url = `${API_BASE_URL}/api/medics?tenantId=${tenantId}`;
  if (locationId) url += `&locationId=${locationId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch medics data');
  }
  return await response.json();
}; 