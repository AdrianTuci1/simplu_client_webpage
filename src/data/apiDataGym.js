
export const homeDataGym = {
    tenantId: 1,
    businessType: "hotel",
    currentLocation: 1,
    availablePages: ["packages", "classes"],
    locations: [
        {
            "id": 1,
            "name": "Location 1",
            "slug": "location-1",
            "coordinates": [46.7712, 23.6236],
        },
        {
            "id": 2,
            "name": "Location 2",
            "slug": "location-2",
            "coordinates": [46.7712, 23.6236],
        },
    ],
    locationData: {
        hero: {
            coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            logoImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            blurAmount: 10,
            tintColor: "#000000",
            bussinesName: "Gym Dynamics",
            bussinesSlug: "Unirii",
        },
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
    },
}

export const availablePackages = {
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


// GET /api/settings/?tenantId?userId
// POST /api/settings/?tenantId?userId

export const settings = {
    tenantId: 1,
    userId: 1,
    settings: {
        "language": "en",
        "currency": "USD",
        "theme": "light",
        "notifications": true,
        "emailNotifications": true,
    },
    userInfo: {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+40722222222",
        "address": "Strada Unirii, nr. 1, Cluj-Napoca",
        "city": "Cluj-Napoca",
    },
}  