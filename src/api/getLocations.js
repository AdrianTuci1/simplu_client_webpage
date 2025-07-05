// API function to get locations by tenantId
export const getLocations = async ({ tenantId }) => {
  // Simulare demo/mock
  if (!tenantId) throw new Error('Missing tenantId');
  // În realitate aici ar fi un fetch către backend
  return [
    { id: 1, name: 'Hotel Central', slug: 'hotel-central', type: 'hotel' },
    { id: 2, name: 'Hotel Premium', slug: 'hotel-premium', type: 'hotel' }
  ];
}; 