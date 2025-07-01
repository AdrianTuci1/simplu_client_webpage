// Optained by GET /api/homepage server takes requestUrl and gets tenantId (SELECT tenantId FROM tenants WHERE requestUrl = ?)

export const homeDataHotel = {
    tenantId: 1,
    businessType: "hotel",
    currentLocation: 1,
    availablePages: ["rooms", "facilities"],
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
            "coverImage": "https://s1.at.atcdn.net/wp-content/uploads/2024/10/HERO-Ace-Hotel-Sydney-Lobby-Bar.jpg",
            "logoImage": "https://img.freepik.com/premium-vector/modern-hotel-logo-design_725568-16.jpg",
            "blurAmount": 0.2,
            "tintColor": "rgba(54, 4, 51, 0.2)",
            "bussinesName": "Hotel Transylvania",
            "bussinesSlug": "Transylvania",
        },
        description: "./description.md",
        coordinates: [46.7712, 23.6236],
        attractions: [
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
        facilities: [
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
        rooms: [
            {
                "id": 1,
                "name": "Camera Deluxe",
                "type": "Deluxe",
                "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "price": 450,
                "currency": "RON",
                "description": "O cameră spațioasă cu vedere panoramică la munte, perfectă pentru o escapadă romantică.",
            },
            {
                "id": 2,
                "name": "Camera Standard",
                "type": "Standard",
                "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "price": 320,
                "currency": "RON",
                "description": "O cameră confortabilă pentru o pereche, cu toate facilitățile necesare pentru o ședere plăcută.",
            },
            {
                "id": 3,
                "name": "Camera Family",
                "type": "Family",
                "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "price": 580,
                "currency": "RON",
                "description": "Perfectă pentru familii cu copii, această cameră spațioasă oferă confort și funcționalitate.",
            },
            {
                "id": 4,
                "name": "Camera Executive",
                "type": "Executive",
                "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                "price": 520,
                "currency": "RON",
                "description": "Pentru călătoriile de afaceri, această cameră executive oferă toate facilitățile necesare pentru productivitate și confort.",
            },
        ],
        roomsCalendar: {      
        },
        footer: {
        logo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        socialMedia: [
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
        links: [
            {
                "id": 1,
                "name": "Home",
                "url": "/",
            }
        ],
        phone: "+40722222222",
        email: "hoteltransylvania@gmail.com",
        address: "Strada Transylvania, nr. 1, Cluj-Napoca",
        city: "Cluj-Napoca",
        country: "Romania",
        copyright: "Hotel Transylvania",
    }
    },

}


// Optained by GET /api/?=tenantId&=locationId&?dateFrom&?dateTo&? roomId, dateFrom-dateTo optional

export const roomsData = {
    tenantId: 1,
    locationId: 1,
    rooms: [
        {
            "id": 1,
            "name": "Camera Deluxe",
            "type": "Deluxe",
            "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "price": 450,
            "currency": "RON",
            "rating": 4.8,
            "size": "35m²",
            "capacity": 2,
            "description": "O cameră spațioasă cu vedere panoramică la munte, perfectă pentru o escapadă romantică. Cameră cu pat king-size, baie privată cu duș și cadă, și balcon privat cu vedere la peisajul montan.",
            "amenities": [
                "Pat king-size",
                "Baie privată cu duș",
                "Cadă de hidromasaj",
                "Balcon privat",
                "Vedere la munte",
                "Wi-Fi gratuit",
                "TV cu ecran plat",
                "Minibar",
                "Aer condiționat",
                "Sistem de încălzire"
            ],
            "features": [
                "Vedere panoramică",
                "Balcon privat",
                "Cadă de hidromasaj",
                "Room service 24/7",
                "Acces la spa",
                "Parcare gratuită"
            ],
            "availability": true
        },
        {
            "id": 2,
            "name": "Camera Standard",
            "type": "Standard",
            "image": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "price": 320,
            "currency": "RON",
            "rating": 4.5,
            "size": "25m²",
            "capacity": 2,
            "description": "O cameră confortabilă pentru o pereche, cu toate facilitățile necesare pentru o ședere plăcută. Cameră cu pat dublu, baie privată și toate facilitățile moderne.",
            "amenities": [
                "Pat dublu",
                "Baie privată cu duș",
                "Wi-Fi gratuit",
                "TV cu ecran plat",
                "Aer condiționat",
                "Sistem de încălzire",
                "Birou de lucru",
                "Dulap pentru haine"
            ],
            "features": [
                "Vedere la oraș",
                "Room service",
                "Acces la piscină",
                "Parcare gratuită"
            ],
            "availability": true
        },
        {
            "id": 3,
            "name": "Camera Family",
            "type": "Family",
            "image": "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "price": 580,
            "currency": "RON",
            "rating": 4.7,
            "size": "45m²",
            "capacity": 4,
            "description": "Perfectă pentru familii cu copii, această cameră spațioasă oferă confort și funcționalitate. Cu două camere separate, baie privată și toate facilitățile necesare pentru o familie.",
            "amenities": [
                "Două camere separate",
                "Pat king-size + 2 paturi simple",
                "Baie privată cu duș",
                "Wi-Fi gratuit",
                "TV cu ecran plat în fiecare cameră",
                "Aer condiționat",
                "Sistem de încălzire",
                "Dulap pentru haine",
                "Birou de lucru",
                "Zonă de joacă pentru copii"
            ],
            "features": [
                "Cameră separată pentru copii",
                "Zonă de joacă",
                "Acces la piscină pentru copii",
                "Room service pentru familii",
                "Parcare gratuită"
            ],
            "availability": true
        },
        {
            "id": 4,
            "name": "Camera Executive",
            "type": "Executive",
            "image": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            "price": 520,
            "currency": "RON",
            "rating": 4.9,
            "size": "40m²",
            "capacity": 2,
            "description": "Pentru călătoriile de afaceri, această cameră executive oferă toate facilitățile necesare pentru productivitate și confort. Cu birou de lucru spațios, acces la business center și facilități premium.",
            "amenities": [
                "Pat king-size",
                "Baie privată cu duș",
                "Birou de lucru spațios",
                "Wi-Fi de mare viteză",
                "TV cu ecran plat",
                "Minibar",
                "Aer condiționat",
                "Sistem de încălzire",
                "Dulap pentru haine",
                "Seif electronic"
            ],
            "features": [
                "Acces la business center",
                "Room service premium",
                "Acces la sala de conferințe",
                "Parcare gratuită",
                "Transfer aeroport"
            ],
            "availability": true
        }
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

export const settingsHotel = {
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

