export const homeData = {
    tenantId: 1,
    businessType: "gym",
    currentLocation: 1,
    availablePages: ["packages", "classes"],
    locations: [
        {
            "id": 1,
            "name": "Gym Dynamics",
            "slug": "Unirii",
            "coordinates": [44.425184, 26.129523],
            "address": "Strada Unirii, nr. 1, Cluj-Napoca",
            "phone": "+40722222222",
            "email": "gymdynamics@gmail.com",
            "city": "Cluj-Napoca",
            "country": "Romania",
            // Location-specific data
            "data": {
                hero: {
                    coverImage: "https://ik.imagekit.io/rezeve/cms/images/blog-posts/cddd91bd-71e2-4414-9479-2f0f15e13a95~1.jpg",
                    logoImage: "https://cdn.create.vista.com/downloads/fbd28bf1-87dc-4a56-9d08-233df71ba0b7_1024.jpeg",
                    blurAmount: 1,
                    tintColor: "rgba(54, 4, 51, 0.3)",
                    bussinesName: "Gym Dynamics",
                    bussinesSlug: "Unirii",
                },
                description: './gymdesc.md',
                coordinates: [44.425184, 26.129523],
                facilities: [
                    {
                        "id": 1,
                        "name": "Gym",
                        "images": [
                            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                        ],
                    },
                    {
                        "id": 2,
                        "name": "Piscina",
                        "images": [
                            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                        ],
                    },
                    {
                        "id": 3,
                        "name": "Restaurant",
                        "images": [
                            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                        ],
                    },
                ],
                packages: [
                    {
                        "id": 1,
                        "name": "Package 1",
                        "price": 100,
                        "duration": "1 month",
                        "features": [
                            "Feature 1",
                            "Feature 2",
                            "Feature 3",
                        ],
                    },
                    {
                        "id": 2,
                        "name": "Package 2",
                        "price": 200,
                        "duration": "3 months",
                        "features": [
                            "Feature 1",
                            "Feature 2",
                            "Feature 3",
                        ],
                    },
                    {
                        "id": 3,
                        "name": "Package 3",
                        "price": 300,
                        "duration": "6 months",
                        "features": [
                            "Feature 1",
                            "Feature 2",
                            "Feature 3",
                        ],
                    },
                ],
                classes: [
                    {
                        "id": 1,
                        "name": "Class 1",
                        "description": "Description 1",
                    },
                    {
                        "id": 2,
                        "name": "Class 2",
                        "description": "Description 2",
                    },
                ],
                footer: {
                    logo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    socialMedia: [
                        {
                            "id": 1,
                            "name": "Facebook",
                            "url": "https://www.facebook.com/gymdynamics",
                        },
                    ],
                    links: [
                        {
                            "id": 1,
                            "name": "Home",
                            "url": "/",
                        },
                    ],
                    phone: "+40722222222",
                    email: "gymdynamics@gmail.com",
                    address: "Strada Unirii, nr. 1, Cluj-Napoca",
                    city: "Cluj-Napoca",
                    country: "Romania",
                    copyright: "Gym Dynamics",
                },
            }
        },
        {
            "id": 2,
            "name": "Location 2",
            "slug": "location-2",
            "coordinates": [46.7712, 23.6236],
            "address": "Strada Victoriei, nr. 45, Cluj-Napoca",
            "phone": "+40722222223",
            "email": "location2@gmail.com",
            "city": "Cluj-Napoca",
            "country": "Romania",
            // Location-specific data for location 2
            "data": {
                hero: {
                    coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    logoImage: "https://cdn.create.vista.com/downloads/fbd28bf1-87dc-4a56-9d08-233df71ba0b7_1024.jpeg",
                    blurAmount: 2,
                    tintColor: "rgba(0, 0, 0, 0.4)",
                    bussinesName: "Gym Dynamics",
                    bussinesSlug: "location-2",
                },
                description: "./gymdesc-location2.md",
                coordinates: [46.7712, 23.6236],
                facilities: [
                    {
                        "id": 1,
                        "name": "Fitness Center",
                        "images": [
                            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                        ],
                    },
                    {
                        "id": 2,
                        "name": "Spa",
                        "images": [
                            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                        ],
                    },
                ],
                packages: [
                    {
                        "id": 1,
                        "name": "Premium Package",
                        "price": 150,
                        "duration": "1 month",
                        "features": [
                            "Premium Feature 1",
                            "Premium Feature 2",
                            "Premium Feature 3",
                        ],
                    },
                    {
                        "id": 2,
                        "name": "VIP Package",
                        "price": 250,
                        "duration": "3 months",
                        "features": [
                            "VIP Feature 1",
                            "VIP Feature 2",
                            "VIP Feature 3",
                        ],
                    },
                ],
                classes: [
                    {
                        "id": 1,
                        "name": "Premium Class 1",
                        "description": "Premium Description 1",
                    },
                    {
                        "id": 2,
                        "name": "VIP Class 2",
                        "description": "VIP Description 2",
                    },
                ],
                footer: {
                    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                    socialMedia: [
                        {
                            "id": 1,
                            "name": "Facebook",
                            "url": "https://www.facebook.com/gymdynamics-location2",
                        },
                    ],
                    links: [
                        {
                            "id": 1,
                            "name": "Home",
                            "url": "/",
                        },
                    ],
                    phone: "+40722222223",
                    email: "location2@gmail.com",
                    address: "Strada Victoriei, nr. 45, Cluj-Napoca",
                    city: "Cluj-Napoca",
                    country: "Romania",
                    copyright: "Gym Dynamics Location 2",
                },
            }
        },
    ],
}

// Helper function to get location data by location ID
export const getLocationDataById = (locationId) => {
    const location = homeDataGym.locations.find(loc => loc.id === locationId);
    return location ? location.data : null;
};

// Helper function to get current location data
export const getCurrentLocationData = () => {
    return getLocationDataById(homeDataGym.currentLocation);
};

// Helper function to get location by ID
export const getLocationById = (locationId) => {
    return homeDataGym.locations.find(loc => loc.id === locationId);
};

// Helper function to get location by slug
export const getLocationBySlug = (slug) => {
    return homeDataGym.locations.find(loc => loc.slug === slug);
};

// Helper function to get all locations
export const getAllLocations = () => {
    return homeDataGym.locations;
};

// Helper function to get current location
export const getCurrentLocation = () => {
    return getLocationById(homeDataGym.currentLocation);
};

export const services = {
    packages: [
        {
            "id": 1,
            "name": "Package 1",
            "price": 100,
            "duration": "1 month",
            "features": [
                "Feature 1",
                "Feature 2",
                "Feature 3",
            ],
        },
        {
            "id": 2,
            "name": "Package 2",
            "price": 200,
            "duration": "3 months",
            "features": [
                "Feature 1",
                "Feature 2",
                "Feature 3",
            ],
        },
        {
            "id": 3,
            "name": "Package 3",
            "price": 300,
            "duration": "6 months",
            "features": [
                "Feature 1",
                "Feature 2",
                "Feature 3",
            ],
        },
    ],
}


// POST /api/package/acquire?packageId

export const acquirePackage = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>",
        "tenantId": 1,
        "locationId": 1,
        "userId": 1,
    },
    body: {
        "packageId": 1,
    },
}


// POST /api/class/book?classId 
export const bookClass = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>",
        "tenantId": 1,
        "locationId": 1,
        "userId": 1,
    },
    body: {
        "classId": 1,
    },
}

