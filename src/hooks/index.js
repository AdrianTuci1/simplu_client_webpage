// Simplified hooks (automatically choose between API and local data based on isDemoMode)
export {
    useSimplifiedData,
    useHomeData,
    useSettings,
    useUserSettings,
    useUserProfile,
    useUserBookings,
    useHeroData,
    useFacilities,
    useAttractions,
    useRooms,
    useServices,
    usePackages,
    useClasses,
    useGallery,
    useFooter,
    useLocations,
    useAvailablePages
} from './useSimplifiedData.js';

// Export API functions
export {
    getHomePage,
    getServices,
    getPackages,
    authenticate
} from '../api/index.js'; 