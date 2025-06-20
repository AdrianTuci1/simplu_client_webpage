// Optained by GET /api/homepage server takes requestUrl and gets tenantId (SELECT tenantId FROM tenants WHERE requestUrl = ?)

export const homeDataHotel = {
    tenantId: 1,
    businessType: "hotel",
    currentLocation: 1,
    availablePages: ["rooms", "facilities"],
    "locations": [
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
    "locationData": {
        "hero": {
            "coverImage": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "logoImage": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "blurAmount": 10,
            "tintColor": "#000000",
            "bussinesName": "Hotel Transylvania",
            "bussinesSlug": "Transylvania",
        },
        "attractions": [
            {
                "id": 1,
                "name": "Attraction 1",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
                "id": 2,
                "name": "Attraction 2",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
                "id": 3,
                "name": "Attraction 3",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
                "id": 4,
                "name": "Attraction 4",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
        ],
        "facilities": [
            {
                "id": 1,
                "name": "Hotel",
                "images": [
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                ],
            },
            {
                "id": 2,
                "name": "Piscina",
                "images": [
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                ],
            },
            {
                "id": 3,
                "name": "Restaurant",
                "images": [
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                ],
            },
        ],
        "rooms": [
            {
                "id": 1,
                "name": "Room 1",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
                "id": 2,
                "name": "Room 2",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
                "id": 3,
                "name": "Room 3",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
            {
                "id": 4,
                "name": "Room 4",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            },
        ],
        "roomsCalendar": {      
        },
    },
    "footer": {
        "logo": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "socialMedia": [
            {
                "id": 1,
                "name": "Facebook",
                "url": "https://www.facebook.com/hoteltransylvania",
            },
            {
                "id": 2,
                "name": "Instagram",
                "url": "https://www.instagram.com/hoteltransylvania",
            },
            {
                "id": 3,
                "name": "Twitter",
                "url": "https://www.twitter.com/hoteltransylvania",
            },
        ],
        "links": [
            {
                "id": 1,
                "name": "Home",
                "url": "/",
            }
        ],
        "phone": "+40722222222",
        "email": "hoteltransylvania@gmail.com",
        "address": "Strada Transylvania, nr. 1, Cluj-Napoca",
        "city": "Cluj-Napoca",
        "country": "Romania",
        "copyright": "Hotel Transylvania",
    }

}


// Optained by GET /api/?=tenantId&=locationId&?dateFrom&?dateTo&? roomId optional

export const availableRooms = {
    "rooms": [
        {
            "id": 1,
            "name": "Room 1",
            "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        },
        {
            "id": 2,
            "name": "Room 2",
            "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        },
    ],
}


// POST /api/service/create?serviceId

export const createBookingHotel = 
{
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer <token>",
        "tenantId": 1,
        "locationId": 1,
        "serviceId": 1,
        "userId": 1,
    },
    body: {
        rooms: [
        {
            "roomId": 1,
            "dateFrom": "2025-01-01",
            "dateTo": "2025-01-02",
            "adults": 2,
        },
        {
            "roomId": 2,
            "dateFrom": "2025-01-01",
            "dateTo": "2025-01-02",
            "adults": 2,
        },
        ],
        specialRequests: "No special requests",
    }
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
            "address": "Strada Transylvania, nr. 1, Cluj-Napoca",
            "city": "Cluj-Napoca",
        }

}



// We get sign in from another url login page that uses Oauth2.0
// OAuth2.0 implementation is now handled by src/services/authService.js
// See src/config/externalAuthConfig.js for configuration details

