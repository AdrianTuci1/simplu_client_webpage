// API function to get services data
export const getServices = async (locationId = 1) => {
  try {
    const response = await fetch(`/api/services?locationId=${locationId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch services data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services data:', error);
    throw error;
  }
};
