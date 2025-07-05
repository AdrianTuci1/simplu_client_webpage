// API function to get packages data
export const getPackages = async (locationId = 1) => {
  try {
    const response = await fetch(`/api/packages?locationId=${locationId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch packages data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages data:', error);
    throw error;
  }
};
