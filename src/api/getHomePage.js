// API function to get home page data
export const getHomePage = async ({ tenantId, locationId }) => {
  if (!tenantId) throw new Error('Missing tenantId');
  let url = `/api/home?tenantId=${tenantId}`;
  if (locationId) url += `&locationId=${locationId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch home page data');
  }
  return await response.json();
};
